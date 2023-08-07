import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReceivedMariosComponent } from './pages/received-marios/received-marios.component';
import { SentMariosComponent } from './pages/sent-marios/sent-marios.component';
import { AddMariosComponent } from './pages/add-marios/add-marios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'received-marios',
    component: ReceivedMariosComponent,
  },
  {
    path: 'sent-marios',
    component: SentMariosComponent,
  },
  {
    path: 'add-marios',
    component: AddMariosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
