import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceLoginService } from '../../services/login.service';
import { Login, LoginResponse } from 'projects/admin/src/Models/Auth';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ser: ServiceLoginService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      role: ['admin'],
    });
    console.log(this.loginForm.value);
  }

  login() {
    console.log(this.loginForm.value);

    const observe = {
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.spinner.hide();
        //this.toastr.success('Done')
        this.router.navigate(['/tasks']);
      },
      error: (err: any) => {
        this.spinner.hide();
        //this.toastr.error(err.message)
      },
    };

    this.spinner.show();
    this.ser.createLogin(this.loginForm.value).subscribe(observe);
  }
}
