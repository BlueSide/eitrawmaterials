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

        /*
        this.spData.getList('CasesSnapshots').subscribe((data) => {
            this.initQuarterSelector(data.value.map((item) => {return {date: item['SnapshotDate'], person: item['ID']}}));
        });

        this.spData.getGroup('StartLife Members').subscribe((data) => {
            data.value.forEach((item) => {
                this.people.push({id: item['Id'], name: item['Title']});
            });
        });
        
        this.filterChain = (data: any[]) => {
            let quarterFilter = this.quarterFilter.doFilter(data);
            let personFilter = this.personFilter.doFilter(data);
            
            return this.and(quarterFilter, personFilter);
        };
*/
    }
    
    public onChange(): void
    {
    }

}
