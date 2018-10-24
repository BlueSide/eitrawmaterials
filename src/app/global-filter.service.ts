import { Injectable } from '@angular/core';
import { Filter } from './sp-dashboard/Filter';
import { SPDataService } from './sp-dashboard/sp-data.service';
import { BSGlobalFilter } from './sp-dashboard/BSGlobalFilter'

@Injectable()
export class GlobalFilterService extends BSGlobalFilter
{

    constructor(private spData: SPDataService)
    {
        super();
        
        this.filterChain = (data: any[]) => {
            
            return data;
        };

    }
}
