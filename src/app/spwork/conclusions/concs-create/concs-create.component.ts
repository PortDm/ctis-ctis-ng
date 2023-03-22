import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConcsService } from '../concs.service';
import { IConcsCreateDto } from '../concls.interfaces';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { Router } from '@angular/router';
import { ConcsValidators } from '../concs.validators';

@Component({
  selector: 'app-concs-create',
  templateUrl: './concs-create.component.html',
  styleUrls: ['./concs-create.component.scss']
})
export class ConcsCreateComponent implements OnInit {

  form: FormGroup
  isSubmit = false

  constructor(
    private concsService: ConcsService,
    private concsValidators: ConcsValidators,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      reg: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      countOfLists: new FormControl(1, Validators.required)
    },
      {
        asyncValidators: [this.concsValidators.uniqConcs.bind(this.concsValidators)]
      } 
    )
  }


  submitConcsCreate() {
    if(this.form.invalid) {
      return
    }

    this.isSubmit = true
    const concsCreateDto: IConcsCreateDto = {
      reg: this.form.value.reg,
      date: this.form.value.date,
      countOfLists: this.form.value.countOfLists
    }
    this.concsService.create(concsCreateDto)
      .subscribe({
        next: () => {
          this.message.show(`Conclusion has been created`, MessageType.success)
          this.isSubmit = false
          this.form.reset()
          this.router.navigate(['/spwork', 'concs', 'list'])
        },
        error: err => {
          console.error(`Error create conclusion: ${err.error.message}`)
          this.message.show(`Error create conclusion: ${err.error.message}`, MessageType.danger)
          this.isSubmit = false
        }
      })
  }

}
