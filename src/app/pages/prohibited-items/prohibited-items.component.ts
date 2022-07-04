import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-prohibited-items',
  templateUrl: './prohibited-items.component.html',
  styleUrls: ['./prohibited-items.component.scss'],
})
export class ProhibitedItemsComponent implements OnInit {
  constructor(private service: ServicesService) {}

  userId: any;
  userName: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.getUser();
  }

  getUser() {
    this.service.getUserInfo(this.userId).subscribe((res) => {
      this.userName = res.firstNameEN + ' ' + res.lastNameEN;
    });
  }

  items = [
    'Ateşli Silah Parçaları ve Aksesuarları',
    'Pompalanan gaz CO balonu ve aksesuarları ile olan 0.177 (4.5mm) kalibreli pnömatik silahlar',
    'Pnömatik silahlar için CO balonları',
    'Gazlı tüfekler - elektrikli pnömatik, herhangi bir kalibre ile olan ve onun aksesuarları',
    'Feinstein tüfekleri ve onların aksesuarları',
    "'bio' olarak adlandırılan her türlü tatlandırıcı, örneğin Sıfır Yerçekimi, vb",
    "'Sprey', pompalanan balon tipi",
    'Arbalet, oklar, yay',
  ];
}
