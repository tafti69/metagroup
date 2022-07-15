import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePartner } from 'app/models/shops';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  constructor(private service: ServicesService) {}

  form: FormGroup;

  partners: any = [];

  lang: any;

  isLoading = false;
  image: any;
  extension: any;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      this.lang = 'AZE';
      localStorage.setItem('lang', 'AZE');
    }

    this.form = new FormGroup({
      ruNameCtrl: new FormControl('', Validators.required),
      kaNameCtrl: new FormControl('', Validators.required),
      azNameCtrl: new FormControl('', Validators.required),
      imageCtrl: new FormControl('', Validators.required),
      urlCtrl: new FormControl('', Validators.required),
    });

    this.getPartners();
  }

  getPartners() {
    this.isLoading = true;
    this.service.getPartners(this.lang).subscribe((res) => {
      this.partners = res;
      this.isLoading = false;
    });
  }

  deletePartner(id: number) {
    this.service.DeletePartners(id).subscribe((res) => {
      window.location.reload();
    });
  }

  onCreatePartner() {
    const form = this.form.value;

    let model = new CreatePartner();

    model.azName = form.azNameCtrl;
    model.kaName = form.kaNameCtrl;
    model.ruName = form.ruNameCtrl;
    model.image = this.image;
    model.url = form.urlCtrl;
    model.extension = this.extension;
    this.isLoading = true;
    this.service.createPartner(model).subscribe((res) => {
      this.isLoading = false;
      window.location.reload();
    }),
      (errorRes) => {
        console.log(errorRes);
      };
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      var base64 = reader.result?.toString();
      if (base64 !== null) {
        this.image = base64?.split(',')[1];
        this.extension = `.${file.name.split('.')[1]}`;
      }
    };
  }
}
