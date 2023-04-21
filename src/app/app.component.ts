import { Component, DoCheck } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'authentication';
  isAdmin = false;
  isMenuVisible = false;
  constructor(private router: Router) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isAdmin = true;
    }
  }
  ngDoCheck(): void {
    let currentRoute = this.router.url;
    console.log('current route', currentRoute);
    let role = sessionStorage.getItem('role');
    if (currentRoute == '/login' || currentRoute == '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
    if (role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
