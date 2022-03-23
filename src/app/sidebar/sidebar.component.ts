import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../models/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  isAdmin: boolean = false;
  show: boolean = true;
  name: string;

  closeSidebar() {
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
  }
}
