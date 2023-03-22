import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { IConcAndList, IConcs } from '../../conclusions/concls.interfaces';
import { ConcsService } from '../../conclusions/concs.service';
import { IDevicesCreateDto } from '../devices.interfaces';
import { DevicesService } from '../devices.service';
import { DevicesValidators } from '../devices.validators';

@Component({
  selector: 'app-devices-create',
  templateUrl: './devices-create.component.html',
  styleUrls: ['./devices-create.component.scss']
})
export class DevicesCreateComponent implements OnInit {

  form: FormGroup
  concs: IConcs[]
  isSubmit = false

  constructor(
    private devService: DevicesService,
    private devValidators: DevicesValidators,
    private concsService: ConcsService,
    private mes: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      dem: new FormControl('Server', Validators.required),
      model: new FormControl('SuperMicro', Validators.required),
      sn: new FormControl('JLFDKJG34', Validators.required, this.devValidators.devUniq.bind(this.devValidators)),
      point: new FormControl('', Validators.required),
      reg: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      list: new FormControl('', Validators.required),
      listId: new FormControl('', Validators.required)
    },
      {
        asyncValidators: this.devValidators.pointUniq.bind(this.devValidators)
      }
    )
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

  submitDeviceCreate() {
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

    this.devService.create(deviceCreateDto)
      .subscribe({
        next: () => {
          this.mes.show(`Device has been create`, MessageType.success)
          this.isSubmit = false
          this.form.reset()
          this.router.navigate(['/spwork', 'devices', 'list'])
        },
        error: err => {
          console.error(`Device-create-component error: ${err.error.message}`)
          this.mes.show(`Error device create: ${err.error.message}`, MessageType.danger)
          this.isSubmit = false
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
