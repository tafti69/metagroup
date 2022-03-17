import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../models/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isAdmin:boolean = false;
  constructor(private router: Router) {Emitters.user.subscribe(data=>{this.isAdmin = data})}

  show = true;
  name: string;


  closeSidebar() {
    this.show = !this.show;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    console.log(this.isAdmin);
    
  }

}
