import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  show = false;

  ngOnInit(): void {}

  openMenu() {
    this.show = !this.show;
  }

  langButtons = [
    { image: '/assets/aze.svg', isClicked: true },
    { image: '/assets/geo.svg', isClicked: false },
    { image: '/assets/tr.svg', isClicked: false },
  ];

  setActive(button: any): void {
    for (let but of this.langButtons) {
      but.isClicked = false;
    }

    button.isClicked = true;
    // if(this.langButtons[0].isClicked){
    //   localStorage.setItem("lang","KA");

    // }
    // else{
    //   localStorage.setItem("lang","AZE");

    // }
    // window.location.reload();
  }
}
