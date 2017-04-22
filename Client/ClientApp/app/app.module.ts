import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './components/login/login.component';

import { AzureService } from './services/mobile.service';
import { RouteActivationGuard } from './common/app.route-guard';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule, ReactiveFormsModule, 
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent, canActivate: [RouteActivationGuard] },
            { path: 'counter', component: CounterComponent, canActivate: [RouteActivationGuard] },
            { path: 'fetch-data', component: FetchDataComponent, canActivate: [RouteActivationGuard] },
            { path: '**', redirectTo: 'login' }
        ])
    ],
    providers: [
        AzureService,
        RouteActivationGuard
    ]
})
export class AppModule {
}
