import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { IAccountCreateDto } from '../cases.interfaces';
import { CasesService } from '../cases.service';
import { CasesValidators } from '../cases.validators';

@Component({
  selector: 'app-cases-create',
  templateUrl: './cases-create.component.html',
  styleUrls: ['./cases-create.component.scss']
})
export class CasesCreateComponent implements OnInit {

  form: FormGroup
  isSubmit = false

  constructor(
    private casesService: CasesService,
    private casesValidators: CasesValidators,
    private mes: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      year: new FormControl('', Validators.required),
      caseName: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required)
    }, 
      {
        asyncValidators: this.casesValidators.volumeUniq.bind(this.casesValidators)
      }
    )

  }

  accountCreateSubmit() {
    if(this.form.invalid) {
      return
    }

    this.isSubmit = true

    const accountCreateDto: IAccountCreateDto = {
      year: this.form.value.year,
      case: this.form.value.caseName,
      volume: this.form.value.volume
    }

    this.casesService.accountCreate(accountCreateDto)
      .subscribe({
        next: () => {
          this.mes.show(`Volume has been successful created`, MessageType.success)
          this.isSubmit = false
          this.router.navigate(['/spwork', 'cases', 'list'])
        },
        error: err => {
          console.error(`Error create volume: ${err.error.message}`)
          this.mes.show(`Error create volume: ${err.error.message}`, MessageType.danger)
          this.isSubmit = false
        }
      })

  }

  yearsAddCase(yearId: number) {
    if(this.form.invalid) {
      return
    }


  //   const yearAddCase: IYearsAddCaseDto = {
  //     yearId,
  //     caseCreateDto: {
  //       case: this.form.value.caseName
  //     }
  //   }

  //   this.casesService.yearsAddCase(yearAddCase)
  //     .subscribe({
  //       next: () => {
  //         this.mes.show(`Case has been added to year`, MessageType.success)

  //       },
  //       error: err => {
  //         console.error(`Error form cases.component.ts on yearsCreate(): ${err.message}`)
  //         this.mes.show(`Error form cases.component.ts on yearsCreate(): ${err.message}`, MessageType.danger)

  //       }
  //     })

  }


}
