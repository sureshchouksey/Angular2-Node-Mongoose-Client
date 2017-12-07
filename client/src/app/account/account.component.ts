import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  user = {};
  isLoading = true;


 constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    console.log(this.user);
  }

  getUser() {
    console.log('currentUser',this.auth.currentUser);
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

}
