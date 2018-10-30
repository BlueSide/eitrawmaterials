import { Injectable } from '@angular/core';
import { Filter } from './sp-dashboard/Filter';

const THEMES_FIELD: string = "Themes";

@Injectable({
    providedIn: 'root'
})
export class ThemeService
{
    private themes: Theme[] = [
        {
        name: 'Exploration and raw materials resource assessment',
        shortName: 'Exploration',
        internalName: 'A. Exploration and raw materials resource assessment',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'A. Exploration and raw materials resource assessment')
            }, false
        )
    },
        {
        name: 'Mining in challenging environments',
        shortName: 'Mining',
        internalName: 'B. Mining in challenging environments',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'B. Mining in challenging environments')
            }, false
        )
    },
        {
        name: 'Increased resource efficiency in mineral and metallurgical processes',
        shortName: 'Processes',
        internalName: 'C. Increased resource efficiency in mineral and metallurgical processes',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'C. Increased resource efficiency in mineral and metallurgical processes')
            }, false
        )
    },
        {
        name: 'Recycling and material chain optimisation for End-of-Life products',
        shortName: 'Recycling',
        internalName: 'D. Recycling and material chain optimisation for End-of-Life products',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'D. Recycling and material chain optimisation for End-of-Life products')
            }, false
        )
    },
        {
        name: 'Substitution of critical and toxic materials in products and for optimised performance',
        shortName: 'Substitution',
        internalName: 'E. Substitution of critical and toxic materials in products and for optimised performance',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'E. Substitution of critical and toxic materials in products and for optimised performance')
            }, false
        )
    },
        {
        name: 'Design of products and services for the circular economy',
        shortName: 'Circular economy',
        internalName: 'F. Design of products and services for the circular economy',
        filter: new Filter(
            (item) => {
                if(!item[THEMES_FIELD]) return false;
                return item[THEMES_FIELD].find((choice) => choice === 'F. Design of products and services for the circular economy')
            }, false
        )
    },
    ];

    constructor() { }

    public getThemes(): Theme[]
    {
        return this.themes;
    }

    public getTheme(index: number): Theme
    {
        return this.themes[index];
    }

    public getThemeByInternalName(internalName: string): Theme
    {
        return this.themes.find((theme) => theme.internalName === internalName);
    }

}

export class Theme
{
    name: string;
    shortName: string;
    internalName: string;
    filter: Filter;
}
