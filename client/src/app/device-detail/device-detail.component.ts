import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import { Device} from '../model/device';
@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceDetailComponent implements OnInit {
  @Input() device: Device;
  constructor() { }

  ngOnInit() {
  }

}
