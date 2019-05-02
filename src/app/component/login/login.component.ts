import { SocketioService } from './../../service/socketio.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    public socketioSrv: SocketioService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.api.login(this.formGroup.value).subscribe(
      v => {
        this.socketioSrv.token = v;
        this.socketioSrv.socket = new Socket({
          url: environment.socketioUrl,
          options: {
            query: {
              Authorization: 'Bearer ' + v
            }
          }
        });
        this.socketioSrv.connect();
      },
      e => {
        const error = JSON.parse(e.error);
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    );
  }

  signup() {
    this.api
      .signup({ ...this.formGroup.value, role: 'ROLE_STUDENT' })
      .pipe(concatMap(v => this.api.login(this.formGroup.value)))
      .subscribe(
        v => {
          this.socketioSrv.token = v;
          this.socketioSrv.socket = new Socket({
            url: environment.socketioUrl,
            options: {
              query: {
                Authorization: 'Bearer ' + v
              }
            }
          });
          this.socketioSrv.connect();
        },
        (e: HttpErrorResponse) => {
          this.snackBar.open(e.error.message, 'OK', { duration: 5000 });
        }
      );
  }

  reset() {
    this.formGroup.reset();
    this.socketioSrv.disconnect();
    this.socketioSrv.socket = undefined;
    this.socketioSrv.token = undefined;
  }

  getControl(controlName: string) {
    return this.formGroup.controls[controlName];
  }
}
