import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReceivedMariosComponent } from './pages/received-marios/received-marios.component';
import { SentMariosComponent } from './pages/sent-marios/sent-marios.component';
import { AddMariosComponent } from './pages/add-marios/add-marios.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'received-marios',
    component: ReceivedMariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sent-marios',
    component: SentMariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-marios',
    component: AddMariosComponent,
    canActivate: [AuthGuard]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
