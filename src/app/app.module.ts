import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SPDataService } from './sp-dashboard/sp-data.service';
import { GlobalFilterService } from './global-filter.service';

import { AppComponent } from './app.component';
import { FunnelComponent } from './funnel/funnel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PushPullComponent } from './funnel/push-pull/push-pull.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
    declarations: [
        AppComponent,
        FunnelComponent,
        NavbarComponent,
        PieChartComponent,
        BarChartComponent,
        PushPullComponent,
        ThemeSwitcherComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        SPDataService,
        GlobalFilterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
