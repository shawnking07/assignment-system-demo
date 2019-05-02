import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, tap, concatMap } from 'rxjs/operators';
import { SocketioService } from 'src/app/service/socketio.service';
import { combineLatest, Subscription, Observable } from 'rxjs';
import { ImessageBody } from '../message-body';
import { ReceiveComponent } from '../receive/receive.component';
import { SendComponent } from '../send/send.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  user: any;

  value = '';

  sub: Subscription;

  @ViewChild('msgContent', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private router: ActivatedRoute,
    private socketio: SocketioService,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.sub = this.router.params
      .pipe(map(v => v.id))
      .pipe(
        tap(p => {
          if (Array.isArray(this.socketio.onlines)) {
            this.user = this.socketio.onlines.find(_o => _o.id === p);
          }
          this.container.clear();
          const index = this.socketio.onlines.findIndex(v => v.id === p);
          this.socketio.onlines[index].unread = false;
          this.socketio.onlines = [...this.socketio.onlines];
        }),
        concatMap(p => this.socketio.chat$.pipe(filter(c => c.from === p)))
      )
      .subscribe(v => {
        const receiveFactory = this.cfr.resolveComponentFactory(
          ReceiveComponent
        );
        if (this.container) {
          const componentRef = this.container.createComponent(receiveFactory);
          componentRef.instance.value = v.content;
        }
      });
  }

  keydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.send();
    }
  }

  send() {
    const data: ImessageBody = {
      to: this.user.id,
      content: this.value
    };

    this.socketio.socket.emit('chat', data, e => console.log(e));
    this.value = '';
    const sendFactory = this.cfr.resolveComponentFactory(SendComponent);
    if (this.container) {
      const componentRef = this.container.createComponent(sendFactory);
      componentRef.instance.value = data.content;
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
