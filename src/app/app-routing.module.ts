import { ChatWindowComponent } from './component/chat/chat-window/chat-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'private-chat', component: ChatWindowComponent},
  {path: 'room-chat', component: ChatWindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
