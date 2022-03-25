import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService, public translate: TranslateService) {
    // translate.addLangs(['ru', 'ka', 'az']);
    // translate.setDefaultLang('az');
  }

  ngOnInit(): void {
    //  this.initFacebookService();
  }



  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }
}
