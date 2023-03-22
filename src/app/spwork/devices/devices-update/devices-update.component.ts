import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { ModalWindowService } from 'src/app/shared/services/modal-window.service';
import { MessageType, ModalWindowButtons, ModalWindowType } from 'src/app/shared/shared.interfaces';
import { IConcAndList, IConcs } from '../../conclusions/concls.interfaces';
import { ConcsService } from '../../conclusions/concs.service';
import { IDevicesCreateDto } from '../devices.interfaces';
import { DevicesService } from '../devices.service';
import { DevicesValidators } from '../devices.validators';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-devices-update',
  templateUrl: './devices-update.component.html',
  styleUrls: ['./devices-update.component.scss']
})
export class DevicesUpdateComponent implements OnInit {

  devId: number
  form: FormGroup
  concs: IConcs[]
  isSubmit = false

  constructor(
    private devService: DevicesService,
    private devValidators: DevicesValidators,
    private concsService: ConcsService,
    private mes: MessageService,
    private modal: ModalWindowService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
            this.devId = params['id']
            return this.devService.getOne(this.devId)
          }
        )
      ).subscribe({
        next: dev => {
          this.devService.devUpdate = dev
          this.form = new FormGroup({
            dem: new FormControl(dev.dem, Validators.required),
            model: new FormControl(dev.model, Validators.required),
            sn: new FormControl(dev.sn, Validators.required, this.devValidators.devUpdateUniq.bind(this.devValidators)),
            point: new FormControl(dev.points ? dev.points[0].point : '', Validators.required),
            reg: new FormControl(dev.points ? dev.points[0].list.conc.reg : '', Validators.required),
            date: new FormControl(dev.points ? dev.points[0].list.conc.date : '', Validators.required),
            list: new FormControl(dev.points ? dev.points[0].list.list : '', Validators.required),
            listId: new FormControl(dev.points ? dev.points[0].list.id : '', Validators.required)
          },
          {
            asyncValidators: this.devValidators.pointDevUpdateUniq.bind(this.devValidators)
          }
        )},
        error: err => {
          console.error(`Error get update device: ${err.error.message}`)
          this.mes.show(`Error get update device ${err.error.message}`, MessageType.success)
        }
    })
  }

  concsLoad() {
    this.concsService.getAll()
      .subscribe({
        next: concs => this.concs = concs,
        error: err => {
          console.log(`Error get all concs: ${err.error.message}`)
          this.mes.show(`Error get all concs: ${err.error.message}`, MessageType.danger)
        }
      })
  }

  submitDeviceUpdate() {
    if(this.form.invalid) {
      return
    }

    this.isSubmit = true

    const deviceCreateDto: IDevicesCreateDto = {
      dem: this.form.value.dem,
      model: this.form.value.model,
      sn: this.form.value.sn,
      point: this.form.value.point,
      listId: this.form.value.listId
    }

    this.devService.update(this.devId, deviceCreateDto)
      .subscribe({
        next: () => {
          this.mes.show(`Device has been update`, MessageType.success)
          this.isSubmit = false
          this.form.reset()
          this.router.navigate(['/spwork', 'devices', 'list'])
        },
        error: err => {
          console.error(`Error device update : ${err.error.message}`)
          this.mes.show(`Error device update: ${err.error.message}`, MessageType.danger)
          this.isSubmit = false
        }
      })
  }


  devRemove() {
    this.modal.show(`Do you sure to remove this device?`, ModalWindowType.danger, ModalWindowButtons.OkAndCancel)
      .subscribe(res => {
        if(res) {
          this.devService.remove(this.devId)
            .subscribe(() => {
              this.router.navigate(['/spwork', 'devices', 'list'])
              this.mes.show(`Device has been removed`, MessageType.success)
            })
        }
      })
  }


  chooseList(event: IConcAndList) {
    this.form.controls['reg'].setValue(event.reg)
    this.form.controls['date'].setValue(event.date)
    this.form.controls['list'].setValue(event.list)
    this.form.controls['listId'].setValue(event.listId)
  }


}
