import { Injectable } from '@angular/core';
import { Filter } from './sp-dashboard/Filter';
import { SPDataService } from './sp-dashboard/sp-data.service';
import { BSGlobalFilter } from './sp-dashboard/BSGlobalFilter'
import { ThemeService, Theme } from './theme.service'

@Injectable()
export class GlobalFilterService extends BSGlobalFilter
{
    public noopFilter = new Filter((item) => {
        return true;
    }, true);
    
    public clcFilter: Filter = this.noopFilter;
    public themeFilters: Filter[] = this.themes.getThemes().map((theme) => theme.filter);
    
    constructor(private spData: SPDataService, private themes: ThemeService)
    {
        super();
        this.filterChain = (data: any[]) => {

            let clcFilteredData: any[] = this.clcFilter.doFilter(data);
            
            let themeFilteredData: any[] = [];
            for(let themeFilter of this.themeFilters)
            {
                if(themeFilter.enabled)
                {
                    themeFilteredData = this.or(themeFilteredData, themeFilter.doFilter(data));
                }
            }

            if(themeFilteredData.length === 0) themeFilteredData = data;
            
            
            return this.and(clcFilteredData, themeFilteredData);
        };

    }

}
