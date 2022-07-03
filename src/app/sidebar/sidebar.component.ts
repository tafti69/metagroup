import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  isAdmin: boolean = false;
  show: boolean = true;
  name: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private responsive: BreakpointObserver
  ) {}

  onClick() {
    this.show = !this.show;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  main() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    let user = localStorage.getItem('userType');

    this.isAdmin = user === 'admin' ? true : false;

    // console.log('XSmall ' + Breakpoints.XSmall);

    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.show = false;
        this.renderer.listen('window', 'click', (e: Event) => {
          if (
            e.target !== this.toggleButton.nativeElement &&
            e.target !== this.menu.nativeElement
          ) {
            this.show = false;
          }
        });
      }
    });
  }
}
