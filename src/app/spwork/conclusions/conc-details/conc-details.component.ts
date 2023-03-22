import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { DevicesService } from '../../devices/devices.service';
import { IConcs, IConcsAddDevs } from '../concls.interfaces';
import { ConcsService } from '../concs.service';

@Component({
  selector: 'app-conc-details',
  templateUrl: './conc-details.component.html',
  styleUrls: ['./conc-details.component.scss']
})
export class ConcDetailsComponent implements OnInit {

  conc: IConcs
  concId: number

  constructor(
    private route: ActivatedRoute,
    private concsService: ConcsService,
    private devService: DevicesService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.loading()
  }

  loading() {
    this.route.params
    .pipe(
      switchMap(params => {
        this.concId = params['id']
        return this.concsService.getOneById(this.concId)
      })
    ).subscribe(conc => {
      this.conc = conc
    })
  }

  // addDevsFromCart() {
  //   let devIds: number[] = []
  //   this.devService.devsInCart.forEach(d => devIds.push(d.id))

  //   const concAddDevs: IConcsAddDevs = {
  //     concId: this.concId,
  //     devIds
  //   }
  //   this.concsService.addDevs(concAddDevs)
  //     .subscribe({
  //       next: () => {
  //         this.message.show(`Devices has add to conc`, MessageType.success)
  //         this.loading()
  //       },
  //       error: err => {
  //         console.error(`Error add devices to conc: ${err.message}`)
  //         this.message.show(`Error add devices to conc`, MessageType.danger)
  //       }
  //     })
  // }

}
