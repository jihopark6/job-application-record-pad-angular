import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { MemoComponent } from './components/memo/memo.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new', component: ApplicationFormComponent },
    { path: 'edit/:id', component: ApplicationFormComponent },
    { path: 'memo', component: MemoComponent }
];
