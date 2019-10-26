import { ClientComponent } from './client/client.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FormUploadComponent } from './upload/form-upload';
import { AuthGuard } from './_guards';
import { ProfileComponent } from './profile/profile.component';
import{ DashboardComponent} from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import {SummaryComponent} from './summary/summary.component';
import {AddCandidateComponent} from './add-candidate/add-candidate.component';
import {NotificationComponent} from './notification/notification.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'upload', component: FormUploadComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile/:slug', component: ProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'addCandidate', component: AddCandidateComponent },
    { path: 'notification', component: NotificationComponent},
    { path: 'client', component: ClientComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);