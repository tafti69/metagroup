import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInModel, SignUpModel } from 'app/models/auth';
import { passwordMatchingValidatior } from 'app/models/confirmed.validator';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: ServicesService, private router: Router) {}

  form: FormGroup;
  errorMsg = '';
  errCode: string;
  success = false;
  isLoading = false;
  errorResponse = false;
  isValidFormSubmitted = null;
  codeVisible: boolean = false;
  ngCode: number;
  newCode: number;

  cities: any = [];
  lang: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    console.log(this.codeVisible);
    
    this.form = new FormGroup(
      {
        email: new FormControl('', Validators.required),
        firstNameEN: new FormControl('', Validators.required),
        firstNameKA: new FormControl('', Validators.required),
        lastNameEN: new FormControl('', Validators.required),
        lastNameKA: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        whatsAppNumber: new FormControl('', Validators.required),
        personalID: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), ]),
        region: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
        isOrg: new FormControl(''),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchingValidatior }
    );

    this.getCity();
  }

  // get f(){
  //   return this.form.controls;
  // }

  get personalID() {
    return this.form.get('personalID');
} 

get password() {
  return this.form.get('password');
} 

  getCity() {
    this.userService.getCity(this.lang).subscribe((res) => {
      this.cities = res;
    });
  }

  onlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  verify() {
    
    if(this.newCode === +this.ngCode) {
      const form = this.form.value;
      this.isValidFormSubmitted = false;
      if (this.form.valid) {
        let model = new SignUpModel();
  
        model.email = form.email;
        model.firstNameEN = form.firstNameEN;
        model.firstNameKA = form.firstNameKA;
        model.lastNameEN = form.lastNameEN;
        model.lastNameKA = form.lastNameKA;
        model.phoneNumber = form.phoneNumber.toString();
        model.whatsAppNumber = form.whatsAppNumber.toString();
        model.personalID = form.personalID.toString();
        model.region = form.region;
        model.address = form.address;
        model.password = form.password;
        model.isOrganization =
          form.isOrg === 'organisation'
            ? true
            : form.isOrg === 'individual'
            ? false
            : null;
        this.isLoading = true;
        
      this.userService.createUser(model).subscribe(
        (value) => {
          this.isValidFormSubmitted = true;
          this.isLoading = false;
          let model2 = new SignInModel();
          model2.email = this.form.value.email;
          model2.password = this.form.value.password;
          this.isLoading = true;
  
          this.userService.loginUser(model2).subscribe((res) => {
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
          });
        },
        (errorRes) => {
          this.isLoading = false;
          this.errorResponse = true;
          this.codeVisible = false;
          if (errorRes.error[0].code === 'DuplicateUserName') {
            this.errorMsg = errorRes.error[0].description;
          }
          if(errorRes.error[0].code === 'PasswordTooShort') {
            this.errorMsg = errorRes.error[0].description;
          }
          console.log(errorRes);
        }
      );
    }

    }

    else {
      this.errCode = "Code is not correct."
    }
}

  signUp() {
    const form = this.form.value;
    this.isValidFormSubmitted = false;
    if (this.form.valid) {
      let model = new SignUpModel();

      model.email = form.email;
      model.firstNameEN = form.firstNameEN;
      model.firstNameKA = form.firstNameKA;
      model.lastNameEN = form.lastNameEN;
      model.lastNameKA = form.lastNameKA;
      model.phoneNumber = form.phoneNumber.toString();
      model.whatsAppNumber = form.whatsAppNumber.toString();
      model.personalID = form.personalID.toString();
      model.region = form.region;
      model.address = form.address;
      model.password = form.password;
      model.isOrganization =
        form.isOrg === 'organisation'
          ? true
          : form.isOrg === 'individual'
          ? false
          : null;
      this.isLoading = true;

      this.codeVisible = true;

      this.userService.sendVerificationCode(model.phoneNumber).subscribe(resp => {
        this.newCode = resp.code;
        this.isValidFormSubmitted = true;
        this.isLoading = false;
      })

    } else {
      this.errorMsg = 'There is an error. Fill in the forms correctly!';
      return;
    }
  }
}
