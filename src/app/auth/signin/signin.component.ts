import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInModel } from 'src/app/models/auth';
import { ServicesService } from 'src/app/services.service';

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

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.form.valid) {
      let model = new SignInModel();
      model.email = this.form.value.email;
      model.password = this.form.value.password;
      this.isLoading = true;
      this.userService.loginUser(model).subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      }),
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.errorResponse = true;
          this.err = 'Invalid email or password. Try again';
        };
    } else {
      this.err = 'Invalid email or password. Try again';
      return;
    }
  }
}
