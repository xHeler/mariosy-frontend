import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'received-marios',
    loadChildren: () =>
      import('./modules/received-marios/received-marios.module').then(
        (m) => m.ReceivedMariosModule
      ),
  },
  {
    path: 'sent-marios',
    loadChildren: () =>
      import('./modules/sent-marios/sent-marios.module').then(
        (m) => m.SentMariosModule
      ),
  },
  {
    path: 'add-marios',
    loadChildren: () =>
      import('./modules/add-marios/add-marios.module').then(
        (m) => m.AddMariosModule
      ),
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
