import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService) {
    // translate.addLangs(['ru', 'ka', 'az']);
  }

  show = false;

  lang: any;

  changeLanguage(value: string) {
    localStorage.setItem('lang', value);
    this.translate.use(value);
  }


  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    if (this.lang === undefined || this.lang === null) {
      localStorage.setItem('lang', 'AZE');
      this.lang = 'AZE';
    }

    if (this.lang === 'AZE') {
      this.langButtons[0].isClicked = true;
      this.langButtons[1].isClicked = false;
      this.langButtons[2].isClicked = false;
    } else if (this.lang === 'KA') {
      this.langButtons[0].isClicked = false;
      this.langButtons[1].isClicked = true;
      this.langButtons[2].isClicked = false;
    } else {
      this.langButtons[0].isClicked = false;
      this.langButtons[1].isClicked = false;
      this.langButtons[2].isClicked = true;
    }
  }

  openMenu() {
    this.show = !this.show;
  }

  langButtons = [
    { image: '/assets/aze.svg', isClicked: true },
    { image: '/assets/geo.svg', isClicked: false },
    { image: '/assets/russ.svg', isClicked: false },
  ];

  setActive(button: any): void {
    for (let but of this.langButtons) {
      but.isClicked = false;
    }

    localStorage.setItem('lang', button);
    this.translate.use(button);

    console.log(button);
    

    button.isClicked = true;
    if (this.langButtons[0].isClicked) {
      localStorage.setItem('lang', 'AZE');
    } else if (this.langButtons[1].isClicked) {
      localStorage.setItem('lang', 'KA');
    } else {
      localStorage.setItem('lang', 'RU');
    }
    window.location.reload();
  }
}
