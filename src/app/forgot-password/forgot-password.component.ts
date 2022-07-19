import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private service: ServicesService, private router: Router) {}

  forgotPassword: string;
  ngCode: any;
  newCode: any;
  codeVisible: boolean = false;
  errPhone: string = '';
  errCode: string = '';

  ngOnInit(): void {}

  sendCode(forgotPassword) {
    if (forgotPassword) {
      this.codeVisible = true;
      // this.service.sendVerificationCode(forgotPassword).subscribe((res) => {
      //   console.log(res);
      //   this.newCode = res.code;
      // });
    } else {
      this.errPhone = 'Please enter your phone number';
    }
  }

  verify() {
    console.log(this.newCode);
    console.log(this.ngCode);

    if (this.newCode === this.ngCode) {
      this.router.navigate(['/newpassword']);
    } else {
      this.errCode = 'Code is not correct.';
    }
  }
}
