import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Device} from '../model/device';
import { PushNotificationService} from '../services/push-notification.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
import { Payload} from '../model/Payload';
import { Notification} from '../model/Notification';
import { APNPayload} from '../model/apnPayload';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
 notificationForm: FormGroup;
 apnNotificationForm:FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private pushNotificationService:PushNotificationService,
              private router:Router,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
            username: this.username,
            messageTitle: this.messageTitle,
            messageBody: this.messageBody,
            packageName: this.packageName
        });
    this.apnNotificationForm = this.formBuilder.group({
            deviceToken: this.deviceToken,
            apnMessageTitle: this.apnMessageTitle,
            apnMessageBody: this.apnMessageBody           
        })    
  }   
  deviceToken = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(100)]);
  apnMessageTitle = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  apnMessageBody = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);
  username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(100),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  
  messageTitle = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
  messageBody = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);

  packageName = new FormControl('', [Validators.required]);

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.messageTitle.pristine && !this.messageTitle.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.messageBody.pristine && !this.messageBody.valid };
  }

  setClassDeviceToken() {
    return { 'has-danger': !this.deviceToken.pristine && !this.deviceToken.valid };
  }
  setClassApnMessageTitle() {
    return { 'has-danger': !this.apnMessageTitle.pristine && !this.apnMessageTitle.valid };
  }
  setClassApnMessageBody() {
    return { 'has-danger': !this.apnMessageBody.pristine && !this.apnMessageBody.valid };
  }


  notification() {
    let payloadList:Array<Payload> = [];
    let notificationData = new Notification();
    let payload = new Payload();
    notificationData.title = this.notificationForm.value.messageTitle;
    notificationData.body = this.notificationForm.value.messageBody;
    payload.username = this.notificationForm.value.username;
    payload.packageName = this.notificationForm.value.packageName;
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

  apnNotification() {
    
    let notificationData = new Notification();
    let apnPayload = new APNPayload();
    notificationData.title = this.apnNotificationForm.value.apnMessageTitle;
    notificationData.body = this.apnNotificationForm.value.apnMessageBody;
    apnPayload.deviceToken = this.apnNotificationForm.value.deviceToken;    
    apnPayload.notification = notificationData;
    
    this.pushNotificationService.ApnSendNotification(apnPayload).subscribe(
      res => {
       this.toast.setMessage('send Notification Successfully!', 'success');       
         console.log('send Notification Successfully');
      },
      error => this.toast.setMessage('Notification Fail', 'danger')
    );
  }

}
