import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/authService";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  id: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginUser();
  }

  loginUser(): void {
    this.userService.login(this.loginForm.value).subscribe(
      () => {
        this.snackBar.open("Connected !", "Good job !", {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.userService.emitAuthStatus(true);
        this.dialogRef.close();
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      (error) => {
        this.snackBar.open("Connection error ...", "Try again", {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
