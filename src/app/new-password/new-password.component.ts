import { Component, OnInit } from '@angular/core';
import { SignInModel } from 'app/models/auth';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private service: ServicesService) { }

  email;
  newPassword;

  ngOnInit(): void {
  }

  continue() {
    let model = new SignInModel();
    model.email = this.email;
    model.password = this.newPassword;

    this.service.forgotPassword(model).subscribe(res => {
      console.log(res);
      
    })
  }
}
