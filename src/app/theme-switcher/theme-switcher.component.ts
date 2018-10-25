import { Component } from '@angular/core';
import { ThemeService, Theme } from '../theme.service';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent
{

    constructor(private themes: ThemeService) { }

    public toggleTheme(theme: Theme)
    {
        theme.filter.enabled = !theme.filter.enabled;
    }
}
