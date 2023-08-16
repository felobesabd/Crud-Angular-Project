import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthRej } from '../../content/Auth';
import { group } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!:FormGroup;

  constructor(private fb: FormBuilder,
    private ser: LoginService, public toster:ToastrService) {}

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    }, {validators: this.checkPass})
  }

  createAccount() {
    const model: AuthRej = {
      username:this.formRegister.value['username'],
      email: this.formRegister.value['email'],
      password: this.formRegister.value['password'],
      confirmPassword: this.formRegister.value['confirmPassword'],
      role: "user",
    }
    this.ser.createAccService(model).subscribe(res => {
      this.toster.success("sucsess");
    })
  }

  checkPass:ValidatorFn = (group:AbstractControl):ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : {"notSame": true};
  }

}
