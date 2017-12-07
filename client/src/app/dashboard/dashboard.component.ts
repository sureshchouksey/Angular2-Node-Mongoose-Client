import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Device} from '../model/device';
import { PushNotificationService} from '../services/push-notification.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Payload} from '../model/Payload';
import { Notification} from '../model/Notification';
import { DeviceDetailComponent} from '../device-detail/device-detail.component';
import { AuthService } from '../services/auth.service';

export class SearchDevice {
  username:string;
  deviceId:string;
  packageName:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  devices: Device[];
  selectedDevice:Device;
  isLoading = true;
  searchForm:FormGroup;
  notificationForm: FormGroup;
  username = new FormControl('');
  deviceId = new FormControl('');
  packageName = new FormControl('');
  messageTitle = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  messageBody = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);	
  constructor(private formBuilder:FormBuilder,
              private pushNotificationService:PushNotificationService,
              public toast: ToastComponent,public auth: AuthService ) { }

  ngOnInit() {
    
    this.getDevices();
     this.searchForm = this.formBuilder.group({
            username :this.username,                                    
            deviceId:this.deviceId,            
            packageName:this.packageName
        })
    this.notificationForm= this.formBuilder.group({
      messageTitle:this.messageTitle,
      messageBody:this.messageBody
    })  	
  }

  setClassEmail() {
    return { 'has-danger': !this.messageTitle.pristine && !this.messageTitle.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.messageBody.pristine && !this.messageBody.valid };
  }

  getDevices(){
  	 this.pushNotificationService.getAllDevices()
    	.subscribe(devices => {
    		this.devices = devices
    		console.log(this.devices);
    	},
      error => console.log(error),
      () => this.isLoading = false);
  }

  deleteDevice(device:Device){
    this.pushNotificationService.deleteDevice(device)
    	.subscribe(response => {
    		//this.devices = devices
        console.log(response);
         this.getDevices();
    	});
  }

  search(){
    let searchDevice= new SearchDevice();
    if(this.searchForm.value.username)
      searchDevice.username =this.searchForm.value.username;
    if(this.searchForm.value.deviceId)
      searchDevice.deviceId =this.searchForm.value.deviceId;
    if(this.searchForm.value.packageName)
     searchDevice.packageName =this.searchForm.value.packageName;
    console.log(searchDevice);
    this.pushNotificationService.searchDevice(searchDevice)
    	.subscribe(devices => {
    		this.devices = devices
    		console.log(this.devices);
    	});
  }

  checkAll(ev) {
    this.devices.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    if(this.devices)
      return this.devices.every(item => item.state);
  }

  viewDeviceDetail(id){
    this.pushNotificationService.getDeviceById(id)
    	.subscribe(device => {
    		this.selectedDevice = device
    		console.log(this.selectedDevice);
    	});
  }

  SendToAll(){
    let payloadList:Array<Payload> = [];
    let notificationData = new Notification();
    let payload = new Payload();
    let packageName:String;
    let selectedList:Array<Device> =[];
    let userList:Array<String> =[];
     selectedList = this.devices.filter(device => device.state === true);
     console.log(selectedList);
     selectedList.forEach((item,index)=>{
       if(item.hasOwnProperty('username')){
         userList.push(item.username);
         packageName = item.packageName;
       }
     })
    notificationData.title = this.notificationForm.value.messageTitle;
    notificationData.body = this.notificationForm.value.messageBody;
    payload.username = userList.toString();
    payload.packageName =packageName;
    payload.notification = notificationData;
    payloadList.push(payload);    
    this.pushNotificationService.sendNotification(payloadList).subscribe(
      res => {
         this.toast.setMessage('send Notification Successfully!', 'success');  
        console.log('send Notification Successfully');        
        
      },
      error => this.toast.setMessage('Notification Fail', 'danger')
    );
  }

}
