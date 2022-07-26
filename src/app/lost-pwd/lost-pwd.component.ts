import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/userService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lost-pwd',
  templateUrl: './lost-pwd.component.html',
  styleUrls: ['./lost-pwd.component.scss']
})
export class LostPwdComponent implements OnInit {
  email: String = "";
  private wasChanged: boolean = false;

  constructor(private userService : UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  isEmail(email: String) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email.toString());
  }

  lostPassword() {
    this.userService.lostPassword(this.email).subscribe(
      () => {
        this.wasChanged = true
        this.snackBar.open("An email has been sent !", "Check your mailbox ...", {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      (error) => {
        this.snackBar.open("Cannot find your email ...", "Try again", {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      });
  }
}
