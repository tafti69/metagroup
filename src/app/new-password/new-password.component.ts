import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInModel } from 'app/models/auth';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router) { }

  isValidFormSubmitted = false;
  email;
  newPassword;
  form: NgForm

  ngOnInit(): void {
  }

  continue(form: NgForm) {
    let model = new SignInModel();
    model.email = this.email;
    model.password = this.newPassword;

    this.isValidFormSubmitted = false;
     if (form.invalid) {
        return;
     }
    this.service.forgotPassword(model).subscribe(res => {
      this.isValidFormSubmitted = true;
      this.router.navigate(['/home'])
    })
  }
}
