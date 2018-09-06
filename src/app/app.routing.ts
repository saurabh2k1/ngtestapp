import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_guards";
import { RegisterComponent } from "./register/register.component";

const appRoutes: Routes = [

    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},

    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);