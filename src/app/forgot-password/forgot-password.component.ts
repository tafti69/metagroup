import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router) { }

  forgotPassword: string;
  code: any;
  newCode: any;
  codeVisible: boolean = false;
  err: string = ''

  ngOnInit(): void {
    
  }

  sendCode(forgotPassword) {
    this.service.sendVerificationCode(forgotPassword).subscribe(res => {
      console.log(res);
      this.newCode = res.code;
    })  
  }

  Verify() {
    if(this.code === this.newCode) {
      this.router.navigate(['/'])
    }
    else {
      this.err = 'Code is not correct.'
    }
  }
}
