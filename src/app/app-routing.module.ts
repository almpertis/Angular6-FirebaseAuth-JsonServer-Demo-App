import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './services/auth-guard.service';
import { ClientDetailsComponent } from './client-details/client-details.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
