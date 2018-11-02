import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { SPDataService } from './sp-dashboard/sp-data.service';
import { GlobalFilterService } from './global-filter.service';

import { AppComponent } from './app.component';
import { FunnelComponent } from './hq/hq-funnel/hq-funnel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { ClcComponent } from './clc/clc.component';
import { HQComponent } from './hq/hq.component';
import { ClcFunnelComponent } from './clc/clc-funnel/clc-funnel.component';
import { ResultsOfSupportChartComponent } from './results-of-support-chart/results-of-support-chart.component';

// NOTE: Font Awesome icons
import { far } from '@fortawesome/free-regular-svg-icons';
import { NumberSuffixPipe } from './number-suffix.pipe'

// Add all icons to the library so you can use it in your page
library.add(far);

@NgModule({
    declarations: [
        AppComponent,
        FunnelComponent,
        NavbarComponent,
        PieChartComponent,
        BarChartComponent,
        ThemeSwitcherComponent,
        ClcComponent,
        HQComponent,
        ClcFunnelComponent,
        ResultsOfSupportChartComponent,
        NumberSuffixPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        FontAwesomeModule
    ],
    providers: [
        SPDataService,
        GlobalFilterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
