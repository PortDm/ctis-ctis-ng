import { Component, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { EventEmitter } from '@angular/core';
import { IConcAndList, IConcs } from '../concls.interfaces';
import { ConcsService } from '../concs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-concs-list',
  templateUrl: './concs-list.component.html',
  styleUrls: ['./concs-list.component.scss']
})
export class ConcsListComponent implements OnInit {

  concs: IConcs[] = []
  concsFilterReg = ''
  concsFilterDateStart: Date
  concsFilterDateEnd: Date
  idVolume: number

  @Input('ref') ref: boolean = true
  @Input('lists') lists: boolean = false
  @Output() listId = new EventEmitter<IConcAndList>()

  chooseList(value: IConcAndList) {
    this.listId.emit(value)
  }

  constructor(
    private concsService: ConcsService,
    private message: MessageService,
    private route: ActivatedRoute,
    private mes: MessageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(queryParams => {
        this.idVolume = queryParams['idVolume']
        this.idVolume ? this.getByVolume(this.idVolume) : this.getAll()
      })
  }

  getAll() {
     this.concsService.getAll()
      .subscribe({
        next: concs => this.concs = concs,
        error: err => {
          console.log(`Error get all conclusions: ${err.error.message}`)
          this.message.show(`Error get all conclusions: ${err.error.message}`, MessageType.danger)
        }
      })
  }

  getByVolume(idVolume: number) {
    this.concsService.concsByVolume(idVolume)
      .subscribe({
        next: concs => this.concs = concs,
        error: err => {
          console.log(`Error load cases by volume: ${err.errors.message}`)
          this.mes.show(`Error load cases by volume: ${err.errors.message}`, MessageType.danger)
        }
      })
  }

}
