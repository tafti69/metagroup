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
  ngCode: number;
  newCode: number;
  codeVisible: boolean = false;
  errPhone: string;
  errCode: string;
  timeLeft: number = 60;
  enable: boolean = false;

  ngOnInit(): void {}

  sendCode(forgotPassword) {
    this.codeVisible = true;
    // if (forgotPassword) {
    //   this.codeVisible = true;
    //   this.service
    //     .sendVerificationCodeByUserName(forgotPassword)
    //     .subscribe((res) => {
    //       this.newCode = res.code;
    //     });

    // } else {
    //   this.errPhone = 'Please enter your phone number';
    // }
  }

  verify() {
    if (this.newCode === +this.ngCode) {
      this.router.navigate(['/newpassword']);
    } else {
      this.errCode = 'Code is not correct.';
    }
  }
}

// setInterval(() => {
//   if (this.timeLeft > 0) {
//     this.timeLeft--;
//   }
//   if (this.timeLeft === 0) {
//     this.enable = true;
//   }
// }, 1000);
