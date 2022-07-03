import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prohibited-items',
  templateUrl: './prohibited-items.component.html',
  styleUrls: ['./prohibited-items.component.scss'],
})
export class ProhibitedItemsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
