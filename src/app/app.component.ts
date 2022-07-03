import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private facebookService: FacebookService,
    public translate: TranslateService
  ) {
    translate.addLangs(['RU', 'KA', 'AZE']);
    const langExists: boolean = !!localStorage.getItem('lang');

    if (!langExists) {
      translate.setDefaultLang('AZE');
      localStorage.setItem('lang', 'AZE');
      translate.use('AZE');
    } else {
      const value: string = localStorage.getItem('lang');
      translate.setDefaultLang(value);
      translate.use(value);
    }
  }

  ngOnInit(): void {
    // this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }
}
