﻿import { CandidatureDetailsService } from './_services/candidature-details.service';
import { NgModule,NO_ERRORS_SCHEMA  }      from '@angular/core';
import { MDBBootstrapModule, MdbTableService,MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';;
import { FormUploadComponent } from './upload/form-upload/form-upload.component'
import {DataTableModule} from "angular-6-datatable";
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {CheckboxModule} from 'primeng/checkbox';;
import { ProfileComponent } from './profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {ToastModule} from 'primeng/toast';;
import { DashboardComponent } from './dashboard/dashboard.component'
import {ChartsModule,WavesModule} from 'angular-bootstrap-md';;
import { SummaryComponent } from './summary/summary.component'

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        DataTableModule,
        TableModule,
        TabViewModule,
        PaginatorModule,
        CodeHighlighterModule,
        CheckboxModule,
        MDBBootstrapModule.forRoot(),
        ToastModule,
        ChartsModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FormUploadComponent,
        ProfileComponent,
        DashboardComponent
,
        SummaryComponent        
        
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CandidatureDetailsService,
        MdbTableService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }