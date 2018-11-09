import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClcComponent } from './clc/clc.component';
import { HQComponent } from './hq/hq.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HQComponent },
    { path: ':clc', component: ClcComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
