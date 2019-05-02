import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImessageBody } from '../component/chat/message-body';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: Socket;
  token: string;
  onlines: { id: string; username: string; unread: boolean }[] = [];

  history: ImessageBody[] = [];

  chat$: BehaviorSubject<ImessageBody> = new BehaviorSubject({});

  constructor() {}

  connect() {
    if (this.socket === undefined) {
      return;
    }
    this.socket.connect();
    this.socket.fromEvent('online').subscribe((v: any[]) => {
      this.onlines = v.map(i => {
        const old = this.onlines.find(o => o.id === i.id);
        return Object.assign(i, old);
      })
    });

    this.socket
      .fromEvent('chat')
      .subscribe((v: ImessageBody) => {
        this.chat$.next(v);
        this.history = [...this.history, v];
        const index = this.onlines.findIndex(o => o.id === v.from);
        if (index !== -1) {
          this.onlines[index].unread = true;
          this.onlines = [...this.onlines];
        }
      });
  }

  disconnect() {
    if (this.socket === undefined) {
      return;
    }
    this.socket.disconnect();
  }
}
