import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Device} from '../model/device';
import { PushNotificationService} from '../services/push-notification.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-device-user',
  templateUrl: './device-user.component.html',
  styleUrls: ['./device-user.component.css']
})
export class DeviceUserComponent implements OnInit {

  deviceRegisterForm:FormGroup;

    username = new FormControl('',[Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(30),
                                Validators.pattern('[a-zA-Z0-9_.-\\s]*')]);
    platform = new FormControl('', [Validators.required]);
    
    apiKey = new FormControl('',[                           
                            ]);
    registrationToken = new FormControl('',[Validators.required]);
    deviceId = new FormControl('',[Validators.required,                            
                    Validators.pattern('[0-9]*')]);
    clientId = new FormControl('',[                            
                            Validators.pattern('[0-9]*')]);
    packageName = new FormControl('',[Validators.required                           
                    ]);
    topic = new FormControl('',[                            
                    Validators.pattern('[a-zA-Z0-9_.-\\s]*')]);
    
    constructor(private formBuilder:FormBuilder,
                private pushNotificationService:PushNotificationService,
                public toast: ToastComponent){}
    ngOnInit(){
        this.deviceRegisterForm = this.formBuilder.group({
            username :this.username,
            platform:this.platform,
            apiKey:this.apiKey,
            registrationToken:this.registrationToken,
            deviceId:this.deviceId,
            clientId:this.clientId,
            packageName:this.packageName,
            topic:this.topic
        })
    }

    setClassUsername() {
        return { 'has-danger': !this.username.pristine && !this.username.valid };
    }
    setClassApiKey() {
        return { 'has-danger': !this.apiKey.pristine && !this.apiKey.valid };
    }
    setClassRegistrationToken() {
        return { 'has-danger': !this.registrationToken.pristine && !this.registrationToken.valid };
    }
    setClassDeviceId() {
        return { 'has-danger': !this.deviceId.pristine && !this.deviceId.valid };
    }
    setClassClientId() {
        return { 'has-danger': !this.clientId.pristine && !this.clientId.valid };
    }
    setClassPackageName() {
        return { 'has-danger': !this.packageName.pristine && !this.packageName.valid };
    }
    setClassGroup() {
        return { 'has-danger': !this.topic.pristine && !this.topic.valid };
    }
    register() {
        console.log('register');
         this.pushNotificationService.register(this.deviceRegisterForm.value)
         .subscribe(devices => {
          this.toast.setMessage('you successfully registered!', 'success');  
          console.log(devices); 
         },
         error => this.toast.setMessage('Registration Fail', 'danger'));
        
     }


}
