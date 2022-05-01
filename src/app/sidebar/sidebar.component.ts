import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  // host: {
  //   '(window:click)': 'closeSidebar($event)',
  // },
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private responsive: BreakpointObserver) {}

  isAdmin: boolean = false;
  show: boolean = true;
  show2: boolean = true;
  name: string;

  // closeSidebar($event) {
  //   $event.stopPropagation();
  //   this.show2 = false;
  // }

  onClick() {
    this.show = !this.show;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    let user = localStorage.getItem('userType');

    this.isAdmin = user === 'admin' ? true : false;

    // console.log('XSmall ' + Breakpoints.XSmall);

    // this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
    //   if (result.matches) {
    //     console.log('screens matches HandsetLandscape');
    //   }
    // });
  }
}
