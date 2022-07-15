import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: ServicesService) { }

  forgotPassword: string;
  code: any;
  codeVisible: boolean = false;

  ngOnInit(): void {
  }

  sendCode(forgotPassword) {
    // this.service.sendVerificationCode(forgotPassword).subscribe(res => {
    //   console.log(res);
    // })
    this.codeVisible = true;
  }

}
