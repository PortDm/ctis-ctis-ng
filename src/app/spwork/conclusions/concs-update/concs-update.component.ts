import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { IConcsUpdateDto } from '../concls.interfaces';
import { ConcsService } from '../concs.service';
import { ConcsValidators } from '../concs.validators';

@Component({
  selector: 'app-concs-update',
  templateUrl: './concs-update.component.html',
  styleUrls: ['./concs-update.component.scss']
})
export class ConcsUpdateComponent implements OnInit {

  form: FormGroup
  isSubmit = false
  concId: number

  constructor(
    private concsService: ConcsService,
    private concsValidators: ConcsValidators,
    private message: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.concId = params['id']
          console.log(`update conc id: ${this.concId}`)
          return this.concsService.getOneById(this.concId)
        })
      ).subscribe({
          next: conc => {
            this.concsService.concUpdate = conc
            this.form = new FormGroup({
              reg: new FormControl(conc.reg, Validators.required),
              date: new FormControl(conc.date.toString().split('T')[0], Validators.required),
              countOfLists: new FormControl(conc.countOfLists, Validators.required)
            },
            {
              asyncValidators: [this.concsValidators.uniqUpdateConcs.bind(this.concsValidators)]
            } 
          )},
          error: err => {
            console.error(`Error conc to update: ${err.error.message}`)
            this.message.show(`Error conc to update: ${err.error.message}`, MessageType.danger)
          }
      })
  }


  submitConcsCreate() {
    if(this.form.invalid) {
      return
    }

    this.isSubmit = true
    const concUpdateDto: IConcsUpdateDto = {
      id: this.concId,
      reg: this.form.value.reg,
      date: this.form.value.date,
      // countOfLists: this.form.value.countOfLists
    }
    this.concsService.update(this.concId, concUpdateDto)
      .subscribe({
        next: () => {
          this.message.show(`Conclusion has been update`, MessageType.success)
          this.isSubmit = false
          this.form.reset()
          this.router.navigate(['/spwork', 'concs', 'list'])
        },
        error: err => {
          console.error(`Error update conclusion: ${err.error.message}`)
          this.message.show(`Error update conclusion: ${err.error.message}`, MessageType.danger)
          this.isSubmit = false
        }
      })
  }
}
