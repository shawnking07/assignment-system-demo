import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatBadgeModule
} from '@angular/material';
import { LoginComponent } from './component/login/login.component';
import { ChatWindowComponent } from './component/chat/chat-window/chat-window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OnlineUsersComponent } from './component/chat/online-users/online-users.component';
import { SocketIoModule } from 'ngx-socket-io';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SendComponent } from './component/chat/send/send.component';
import { ReceiveComponent } from './component/chat/receive/receive.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, ChatWindowComponent, OnlineUsersComponent, SendComponent, ReceiveComponent],
  entryComponents: [ReceiveComponent, SendComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatBadgeModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
