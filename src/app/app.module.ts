import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { RetryInterceptor } from './core/interceptors/retry.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ButtonComponent } from './shared/components/button/button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddMariosComponent } from './pages/add-marios/add-marios.component';
import { SentMariosComponent } from './pages/sent-marios/sent-marios.component';
import { ReceivedMariosComponent } from './pages/received-marios/received-marios.component';
import { InfoCardComponent } from './core/components/info-card/info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ButtonComponent,
    HomePageComponent,
    AddMariosComponent,
    SentMariosComponent,
    ReceivedMariosComponent,
    InfoCardComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
