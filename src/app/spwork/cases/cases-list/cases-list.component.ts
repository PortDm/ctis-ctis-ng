import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { IYears } from '../cases.interfaces';
import { CasesService } from '../cases.service';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {
  years: IYears[] =[]
  form: FormGroup

  constructor(
    private casesService: CasesService,
    private mes: MessageService
  ) { }

  ngOnInit(): void {
      this.loadYears()
    }
  
    loadYears() {
      this.casesService.yearsGetAll()
      .subscribe({
        next: years => this.years = years,
        error: err => {
          console.error(`Error form cases-list.component.ts on yearsGetAll(): ${err.error.message}`)
          this.mes.show(`Error form cases-list.component.ts on yearsGetAll(): ${err.error.message}`, MessageType.danger)
        }
      })
    }
}
