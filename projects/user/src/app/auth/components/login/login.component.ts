import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthRej, LoginRej, LoginRes } from '../../content/Auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup;

  constructor (
    private fb: FormBuilder,
    private ser: LoginService,
    private router: Router,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })
  }

  login() {
    const model: LoginRej = {
      email: this.formLogin.value['email'],
      password: this.formLogin.value['password'],
      role: "user",
    }
    this.ser.loginService(model).subscribe((res: any) => {
      this.router.navigate(['/tasks'])
      this.toster.success("Login Success", 'Success');
      localStorage.setItem('token', res.token)
    })
  }

}
