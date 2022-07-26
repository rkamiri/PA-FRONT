import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/userService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../shared/services/authService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {
  confirmPwd: String = "";
  pwd: String = "";
  activatedToken: boolean = false;
  private token: string = "";
  private wasChanged = false;

  constructor(private userService: UserService, private authService: AuthService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  disabled() :boolean {
    return this.confirmPwd === "" || this.confirmPwd.length < 6
     || this.pwd === "" || this.pwd.length < 6 || this.wasChanged ||!this.activatedToken;
  }

  changePwd() {
    if(this.disabled()){{
      return;
    }}
    this.userService.changePassword(this.pwd, this.token).subscribe(
    () => {
      this.wasChanged = true
      this.authService.logout();
      this.snackBar.open("Your password has been changed !", "You have been disconnected", {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    },
    (error) => {
      this.snackBar.open("An error has occured ...", "Try again", {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    if(token) {
      this.token = token;
      this.userService.checkToken(token).subscribe(data => {
        this.activatedToken = data;
      })
    } else {
      this.activatedToken = false;
    }

  }

}
