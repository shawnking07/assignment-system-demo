import { LoginComponent } from './component/login/login.component';
import { ChatWindowComponent } from './component/chat/chat-window/chat-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'private-chat/:id', component: ChatWindowComponent},
  {path: 'room-chat', component: ChatWindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
