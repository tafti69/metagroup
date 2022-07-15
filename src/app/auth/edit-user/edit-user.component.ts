import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from 'app/models/auth';
import { passwordMatchingValidatior } from 'app/models/confirmed.validator';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(private userService: ServicesService) {}

  form: FormGroup;
  lang: any;
  cities: any = [];
  userId: any;
  userDTO: SignUpModel;
  loading: boolean = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.userId = localStorage.getItem('id');

    this.form = new FormGroup(
      {
        email: new FormControl('', Validators.required),
        firstNameEN: new FormControl('', Validators.required),
        firstNameKA: new FormControl('', Validators.required),
        lastNameEN: new FormControl('', Validators.required),
        lastNameKA: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        whatsAppNumber: new FormControl('', Validators.required),
        personalID: new FormControl('', [Validators.required]),
        region: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        isOrg: new FormControl(''),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchingValidatior }
    );

    this.getCity();
    this.getUser();
  }

  onlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getUser() {
    this.userService.getUserInfo(this.userId).subscribe((value) => {
      
      this.userDTO = value;
      this.form.patchValue({
        userId: this.userId,
        email: value.email,
        firstNameEN: value.firstNameEN,
        firstNameKA: value.firstNameKA,
        lastNameEN: value.lastNameEN,
        lastNameKA: value.lastNameKA,
        phoneNumber: value.phoneNumber.toString(),
        whatsAppNumber: value.whatsAppNumber.toString(),
        personalID: value.personalID.toString(),
        region: value.region,
        address: value.address,
        password: value.password,
        confirmPassword: value.password,
        isOrg: value.isOrganization === true ? 'organisation'
        : value.isOrganization === false
        ? 'individual'
        : null,
      });
    });
  }

  getCity() {
    this.userService.getCity(this.lang).subscribe((res) => {
      this.cities = res;
    });
  }

  updateUser() {

    this.loading = true;
    const form = this.form.value;
    let model = new SignUpModel();

    model.userId = this.userId;
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

    this.userService.updateUser(model).subscribe((value) => {
      this.form.patchValue({
        userId: this.userId,
        email: value.email,
        firstNameEN: value.firstNameEN,
        firtsNameKA: value.firstNameKA,
        lastNameEN: value.lastNameEN,
        lastNameKA: value.lastNameKA,
        phoneNumber: value.phoneNumber.toString(),
        whatsAppNumber: value.whatsAppNumber.toString(),
        personalID: value.personalID.toString(),
        region: value.region,
        address: value.address,
        password: value.password,
        isOrg: value.isOrganization,
      });
       this.loading = false;
        
    }, error => {
      console.log(error);
      
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000)
    
  }
}
