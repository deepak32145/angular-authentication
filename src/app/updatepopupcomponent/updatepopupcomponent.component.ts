import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-updatepopupcomponent',
  templateUrl: './updatepopupcomponent.component.html',
  styleUrls: ['./updatepopupcomponent.component.css'],
})
export class UpdatepopupcomponentComponent implements OnInit {
  roleList: any;
  editData: any;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toast: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.service.getUserRole().subscribe((res) => {
      this.roleList = res;
    });
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loadUserData(this.data.usercode);
    }
  }
  updateUser(): void {
    this.service
      .updateUser(this.registerForm.value.id, this.registerForm.value)
      .subscribe((res) => {
        this.toast.success('updated successfully');
        this.dialogref.close();
      });
  }

  loadUserData(code: any) {
    this.service.GetUserByCode(code).subscribe((res) => {
      this.editData = res;
      console.log('edit data', this.editData);
      this.registerForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        password: this.editData.password,
        email: this.editData.email,
        gender: this.editData.gender,
        role: this.editData.role,
        isactive: this.editData.isactive,
      });
    });
  }
}
