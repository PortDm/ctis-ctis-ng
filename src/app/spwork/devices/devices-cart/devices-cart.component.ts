import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices-cart',
  templateUrl: './devices-cart.component.html',
  styleUrls: ['./devices-cart.component.scss']
})
export class DevicesCartComponent implements OnInit {

  constructor(
    public devService: DevicesService
  ) { }

  ngOnInit(): void {
  }

}
