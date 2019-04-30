import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  token: string;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.api.login(this.formGroup.value).subscribe(v => this.token = v);
  }

  reset() {
    this.formGroup.reset();
    this.token = undefined;
  }

  getControl(controlName: string) {
    return this.formGroup.controls[controlName];
  }

}
