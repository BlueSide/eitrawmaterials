import { Component } from '@angular/core';
import { ThemeService, Theme } from '../theme.service';
import { SPDataService } from '../sp-dashboard/sp-data.service';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent
{
    //NOTE: We inject the ThemeService as public so we can use it in the template
    constructor(public themes: ThemeService, private spData: SPDataService) { }

    public toggleTheme(theme: Theme)
    {
        theme.filter.enabled = !theme.filter.enabled;
        this.spData.filter();
    }
}
