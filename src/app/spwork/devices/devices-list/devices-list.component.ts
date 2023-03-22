import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/admin/services/auth.service';
import { IDevices, IDevicesFilters } from '../devices.interfaces';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  devices: IDevices[] = []
  form: FormGroup

  constructor(
    private devicesService: DevicesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      dem: new FormControl(''),
      model: new FormControl(''),
      sn: new FormControl('')
    })
    this.loadDevs()
  }

  loadDevs() {
    const filtersDev: IDevicesFilters = {
      dem: this.form.value.dem,
      model: this.form.value.model,
      sn: this.form.value.sn
    }

    this.devicesService.filters(filtersDev)
      .subscribe({
        next: devs => this.devices = devs,
        error: err => console.log(`Error get devices-list-component: ${err}`)
      })
  }

  // addToCart(dev: IDevices) {
  //   this.devicesService.addDevInCart(dev)
  // }

}
