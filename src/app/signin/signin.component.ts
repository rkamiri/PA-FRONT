import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/authService";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: any = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  public usernameExists = false;
  public emailExists = false;

  constructor(private router: Router, private authService: AuthService, private dialogRef: MatDialogRef<SigninComponent>,private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.authService.testUsername(this.form.username).subscribe(data => {
      this.usernameExists = data;
      this.authService.testEmail(this.form.email).subscribe(data => {
        this.emailExists = data;
        if(!this.usernameExists && !this.emailExists){
          this.authService.register(this.form).subscribe(
            () => {
              this.authService.login({
                username: this.form.username,
                password: this.form.password
              }).subscribe(() => {
                this.authService.emitAuthStatus(true);
                this.authService.getCurrentUser().subscribe(() => {
                  this.dialogRef.close();
                  this.snackBar.open("Account created !", "You have been logged in.", {
                    duration: 3000,
                    panelClass: ['success-snackbar']
                  });
                  return this.router.navigate(['account/' + this.authService.loggedUser?.id]);
                })
              });
            },
            (error) => {
              this.snackBar.open("Account creation went wrong...", "Try again", {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          );
        }
      });
    });


  }

  disabled() {
    return this.form.username.length < 3  || this.form.firstname.length < 3 || this.form.lastname <3 || this.form.password < 6
      || this.form.email === 0;
  }
}
