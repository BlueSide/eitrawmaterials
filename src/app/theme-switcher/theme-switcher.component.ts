import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit
{

    constructor(private themes: ThemeService) { }

    ngOnInit()
    {
    }

}
