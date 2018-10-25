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
            (item) => item[THEMES_FIELD] === 'A. Exploration and raw materials resource assessment',
            false
        )
    },
        {
        name: 'Mining in challenging environments',
        shortName: 'Mining',
        internalName: 'B. Mining in challenging environments',
        filter: new Filter(
            (item) => item[THEMES_FIELD] === 'B. Mining in challenging environments',
            false
        )
    },
        {
        name: 'Increased resource efficiency in mineral and metallurgical processes',
        shortName: 'Processes',
        internalName: 'C. Increased resource efficiency in mineral and metallurgical processes',
        filter: new Filter(
            (item) => item[THEMES_FIELD] === 'C. Increased resource efficiency in mineral and metallurgical processes',
            false
        )
    },
        {
        name: 'Recycling and material chain optimisation for End-of-Life products',
        shortName: 'Recycling',
        internalName: 'D. Recycling and material chain optimisation for End-of-Life products',
        filter: new Filter(
            (item) => item[THEMES_FIELD] === 'D. Recycling and material chain optimisation for End-of-Life products',
            false
        )
    },
        {
        name: 'Substitution of critical and toxic materials in products and for optimised performance',
        shortName: 'Substitution',
        internalName: 'E. Substitution of critical and toxic materials in products and for optimised performance',
        filter: new Filter(
            (item) => item[THEMES_FIELD] === 'E. Substitution of critical and toxic materials in products and for optimised performance',
            false
        )
    },
        {
        name: 'Design of products and services for the circular economy',
        shortName: 'Circular economy',
        internalName: 'F. Design of products and services for the circular economy',
        filter: new Filter(
            (item) => item[THEMES_FIELD] === 'F. Design of products and services for the circular economy',
            false
        )
    },
    ];

    constructor() { }

    public getThemes(): Theme[]
    {
        return this.themes;
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
