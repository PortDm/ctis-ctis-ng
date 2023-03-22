// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup } from '@angular/forms';
// import { MessageService } from 'src/app/shared/services/message.service';
// import { MessageType } from 'src/app/shared/shared.interfaces';
// import { IYears } from './cases.interfaces';
// import { CasesService } from './cases.service';

// @Component({
//   selector: 'app-cases',
//   templateUrl: './cases.component.html',
//   styleUrls: ['./cases.component.scss']
// })
// export class CasesComponent implements OnInit {

//   years: IYears[] =[]
//   form: FormGroup
//   formArray: FormArray
//   isYearSubmit = false
//   isYearAddCase = false

//   constructor(
//     private casesService: CasesService,
//     private mes: MessageService
//   ) { }

//   ngOnInit(): void {
//     this.loadYears()

//     this.form = new FormGroup({
//       yearName: new FormControl(''),
//       caseName: new FormControl(''),
//       arr: new FormArray([])
//     })

//     this.formArray = new FormArray([])
//   }

//   loadYears() {
//     this.casesService.yearsGetAll()
//     .subscribe({
//       next: years => {
//         this.years = years
//         console.log(`load years: ${years[0].year}`)
//       },
//       error: err => {
//         console.error(`Error form cases.component.ts on yearsGetAll(): ${err.message}`)
//         this.mes.show(`Error form cases.component.ts on yearsGetAll(): ${err.message}`, MessageType.danger)
//       }
//     })
//   }

//   // yearCreateSubmit() {
//   //   if(this.form.invalid) {
//   //     return
//   //   }

//   //   this.isYearSubmit = true

//   //   const yearCreate: IYearsCreateDto = {
//   //     year: this.form.value.yearName
//   //   }

//   //   this.casesService.caseCreate(yearCreate)
//   //     .subscribe({
//   //       next: () => {
//   //         this.mes.show(`Year has been successful created`, MessageType.success)
//   //         this.isYearSubmit = false
//   //         this.loadYears()
//   //       },
//   //       error: err => {
//   //         console.error(`Error form cases.component.ts on yearsCreate(): ${err.message}`)
//   //         this.mes.show(`Error form cases.component.ts on yearsCreate(): ${err.message}`, MessageType.danger)
//   //         this.isYearSubmit = false
//   //       }
//   //     })

//   // }

//   // yearsAddCase(yearId: number) {
//   //   if(this.form.invalid) {
//   //     return
//   //   }

//   //   this.isYearAddCase = true
//   //   const yearAddCase: IYearsAddCaseDto = {
//   //     yearId,
//   //     caseCreateDto: {
//   //       case: this.form.value.caseName
//   //     }
//   //   }

//   //   this.casesService.yearsAddCase(yearAddCase)
//   //     .subscribe({
//   //       next: () => {
//   //         this.mes.show(`Case has been added to year`, MessageType.success)
//   //         this.isYearAddCase = false
//   //       },
//   //       error: err => {
//   //         console.error(`Error form cases.component.ts on yearsCreate(): ${err.message}`)
//   //         this.mes.show(`Error form cases.component.ts on yearsCreate(): ${err.message}`, MessageType.danger)
//   //         this.isYearAddCase = false
//   //       }
//   //     })

//   // }

// }
