import { ClientComponent } from './client/client.component';
import { CandidatureDetailsService } from './_services/candidature-details.service';
import { NgModule,NO_ERRORS_SCHEMA  }      from '@angular/core';
import { MDBBootstrapModule, MdbTableService,MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import {NotificationService} from './notification/notification.service'
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
import {WavesModule} from 'angular-bootstrap-md';
import {ChartsModule} from 'ng2-charts'
import { OrgChartModule } from 'ng2-org-chart'
import {OrganizationChartModule} from 'primeng/organizationchart';
import { SummaryComponent } from './summary/summary.component';
import { ReportsComponent } from './reports/reports.component';
import {AddCandidateComponent} from './add-candidate/add-candidate.component'
import {MultiSelectModule}  from 'primeng/multiselect';
import {HttpInterceptorJwtAuthService} from 'src/app/_services/http/http-interceptor-jwt-auth.service';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';;
import { NotificationComponent } from './notification/notification.component'

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
        MultiSelectModule,
        ChartsModule,
        OrgChartModule,
        OrganizationChartModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        DropdownModule
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
        SummaryComponent ,
        ReportsComponent ,
        AddCandidateComponent ,
        NotificationComponent,
        ClientComponent     
        
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CandidatureDetailsService,
        MdbTableService,
        NotificationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorJwtAuthService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }