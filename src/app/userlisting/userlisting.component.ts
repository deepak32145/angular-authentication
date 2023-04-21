import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UpdatepopupcomponentComponent } from '../updatepopupcomponent/updatepopupcomponent.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'status',
    'role',
    'action',
  ];
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog
  ) {
    this.loadUser();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {}

  loadUser() {
    this.service.GetAll().subscribe((res) => {
      this.userList = res;
      console.log('logging userlist', this.userList);
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  updateuser(code: any) {
    this.openPopUpForm('1000ms', '600ms', code);
  }

  openPopUpForm(enterAnimation: any, exitAnimation: any, code: string) {
    const popUp = this.dialog.open(UpdatepopupcomponentComponent, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '30%',
      data: {
        usercode: code,
      },
    });
    popUp.afterClosed().subscribe((res) => {
      this.loadUser();
    });
  }
}
