import { SocketioService } from './../../../service/socketio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit, OnDestroy {

  constructor(public socketio: SocketioService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}
}
