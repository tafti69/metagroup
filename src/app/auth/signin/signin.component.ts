import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters, SignInModel } from 'app/models/auth';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(private userService: ServicesService, private router: Router) {}

  form: FormGroup;
  err = '';
  isLoading = false;
  errorResponse = false;
  isAdmin = false;
  isLogged = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    let userId = localStorage.getItem('id');
    let user = localStorage.getItem('userType');

    if (userId) {
      if (user === 'admin') this.router.navigate(['/admin']);
      else this.router.navigate(['/dashboard']);
    }
  }

  login() {
    let model = new SignInModel();
    model.email = this.form.value.email;
    model.password = this.form.value.password;
    this.isLoading = true;

    this.userService.loginUser(model).subscribe(
      (res) => {
        console.log(res);

        this.isLoading = false;
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userName);

        if (res.isAdmin) {
          localStorage.setItem('userType', 'admin');
          this.router.navigate(['/admin']);
        } else {
          localStorage.setItem('userType', 'user');
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.errorResponse = true;
        this.err = 'Invalid email or password. Try again';
      }
    );
    if (!this.form.valid) {
      this.err = 'Invalid email or password. Try again';
      return;
    }
  }
}
