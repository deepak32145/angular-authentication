import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginform.valid) {
      this.service.GetUserByCode(this.loginform.value.id).subscribe((item) => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.router.navigate(['']);
          } else {
            this.toast.error('please contact admin, Inactive User');
          }
        } else {
          this.toast.error('Incorrect username or password');
        }
      });
    } else {
      this.toast.warning('please enter valid data');
    }
  }
}
