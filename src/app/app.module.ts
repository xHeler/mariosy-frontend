import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AddMariosFormComponent } from './core/components/add-marios-form/add-marios-form.component';
import { CommentTextAreaComponent } from './core/components/add-marios-form/components/comment-text-area/comment-text-area.component';
import { EmployeeSelectComponent } from './core/components/add-marios-form/components/employee-select/employee-select.component';
import { ReactionChipListComponent } from './core/components/add-marios-form/components/reaction-chip-list/reaction-chip-list.component';
import { TitleTextAreaComponent } from './core/components/add-marios-form/components/title-text-area/title-text-area.component';
import { InfoCardComponent } from './core/components/info-card/info-card.component';
import { MariosCardComponent } from './core/components/marios-card/marios-card.component';
import { MariosDialogComponent } from './core/components/marios-dialog/marios-dialog.component';
import { MariosListComponent } from './core/components/marios-list/marios-list.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { initializeKeycloak } from './core/initalizers/keycloak-init.factory';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { RetryInterceptor } from './core/interceptors/retry.interceptor';
import { SessionService } from './core/services/session.service';
import { AddMariosComponent } from './pages/add-marios/add-marios.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReceivedMariosComponent } from './pages/received-marios/received-marios.component';
import { SentMariosComponent } from './pages/sent-marios/sent-marios.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ReactionMessagePipe } from './shared/pipes/reaction-message.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';

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
    MariosCardComponent,
    MariosListComponent,
    TruncatePipe,
    MariosDialogComponent,
    ReactionMessagePipe,
    AddMariosFormComponent,
    ErrorDialogComponent,
    EmployeeSelectComponent,
    ReactionChipListComponent,
    TitleTextAreaComponent,
    CommentTextAreaComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatChipsModule,
    NgbModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, SessionService],
    },
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
