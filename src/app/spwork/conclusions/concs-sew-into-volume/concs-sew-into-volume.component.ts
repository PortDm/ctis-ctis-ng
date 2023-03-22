import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { ICases, IVolumns, IYears } from '../../cases/cases.interfaces';
import { CasesService } from '../../cases/cases.service';
import { IConcSewVolumeDto, IConcs } from '../concls.interfaces';
import { ConcsService } from '../concs.service';
import { ConcsValidators } from '../concs.validators';

@Component({
  selector: 'app-concs-sew-into-volume',
  templateUrl: './concs-sew-into-volume.component.html',
  styleUrls: ['./concs-sew-into-volume.component.scss']
})
export class ConcsSewIntoVolumeComponent implements OnInit {

  concs: IConcs[] = []
  years: IYears[] = []
  conc: IConcs
  volume: IVolumns

  form: FormGroup
  // startList: number

  constructor(
    private concsService: ConcsService,
    private concsValidator: ConcsValidators,
    private casesService: CasesService,
    private mes: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.concsLoad()
    this.yearsLoad()

    this.form = new FormGroup({
      concId: new FormControl('', Validators.required),
      volumeId: new FormControl('', Validators.required),
      startList: new FormControl('', Validators.required)
    },
      {
        asyncValidators: this.concsValidator.intersectionLists.bind(this.concsValidator)
      }
    )
  }

  concsLoad() {
    this.concs = []
    this.concsService.getAll()
      .subscribe({
        next: concs => this.concs = concs,
        error: err => {
          console.log(`error: load concs from sewConcsIntoVolume: ${err.errro.message}`)
          this.mes.show(`Error load concs for sew into Volume: ${err.errro.message}`, MessageType.danger)
        }
      })
  }

  yearsLoad() {
    this.casesService.yearsGetAll()
      .subscribe({
        next: years => this.years = years,
        error: err => {
          console.log(`error: load years from sewConcsIntoVolume; ${err}`)
          this.mes.show(`Error load years for sew conc into Volume: ${err}`, MessageType.danger)
        }
      })
  }

  chooseConc(index: number) {
    if(this.concs.length)
    this.conc = this.concs[index]
    this.form.controls['concId'].patchValue(this.concs[index].id)
  }

  chooseVolume(yearInd: number, caseInd: number, volumeInd: number) {
    let year: IYears
    if(this.years.length) {
      year = this.years[yearInd]
  
      let cse: ICases
      if(year.cases?.length) {
        cse = year.cases[caseInd]

        if(cse.volumns.length) {
          this.volume = cse.volumns[volumeInd]
          this.form.controls['volumeId'].setValue(cse.volumns[volumeInd].id) 
        }
      }
    }
    
  }

  sew() {
    if(this.form.invalid) {
      return
    }

    const concSewVolumeDto: IConcSewVolumeDto = {
      concId: this.form.value.concId,
      volumeId: this.form.value.volumeId,
      startList: this.form.value.startList
    }

    this.concsService.sewIntoVolume(concSewVolumeDto)
      .subscribe({
        next: () => {
          this.mes.show(`Conc sew into volume`, MessageType.success)
          this.concsLoad()
          this.form.reset()
          this.router.navigate(['/'])
            .then(() => this.router.navigate(['/spwork', 'concs', 'sew']))
        }, 
        error: err => {
          console.error(`Error conc sew into volume: ${err.error.message}`)
          this.mes.show(`Error conc sew into volume: ${err.error.message}`, MessageType.danger)
        }
      })
  }
  

}
