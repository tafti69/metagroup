import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddFileInvoice } from 'app/models/invoice';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  lang: any;

  isLoading = false;
  image: any;
  extension: any;
  orderId: any;
  trackingId: any;
  file: any;
  uploaded: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      imageCtrl: new FormControl('', Validators.required),
    });

    this.lang = localStorage.getItem('lang');
    this.orderId = this.route.snapshot.params.id;

    this.service.getFileName(this.orderId).subscribe((res) => {
      this.file = res;
    });
    this.isLoading = true;
    this.service.getById(this.lang, this.orderId).subscribe((res) => {
      this.uploaded = res.documentUploaded;
      this.isLoading = false;
    });
  }

  onSubmit() {
    let model = new AddFileInvoice();

    model.content = this.image;
    model.extension = this.extension;
    model.orderId = this.orderId;

    this.service.addFileForInvoice(model).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
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

  downloadInvoiceFile() {
    this.isLoading = true;
    this.service.downloadInvoiceFile(this.orderId).subscribe((resp) => {
      console.log(resp);
      this.isLoading = false;
      const blob = new Blob([resp], { type: 'octet/stream' });
      const object = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('download', this.file);
      a.setAttribute('href', object);
      const newEvent = new MouseEvent('click');
      a.dispatchEvent(newEvent);
    });
  }
}
