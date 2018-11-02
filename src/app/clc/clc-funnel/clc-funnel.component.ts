import { Component, OnInit } from '@angular/core';
import { BSDataComponent } from '../../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../../global-filter.service';
import { environment } from '../../../environments/environment';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
    selector: 'clc-funnel',
    templateUrl: './clc-funnel.component.html',
    styleUrls: ['./clc-funnel.component.scss']
})
export class ClcFunnelComponent extends BSDataComponent
{
    //NOTE: Short names for development
    public rows: SPField[] = [
        {name: 'TRL', internalName: 'TRL_x0020_current_x0020_during_x'},
        {name: 'CRL', internalName: 'CRL_x0020_current_x0020_during_x'},
        {name: 'IRL', internalName: 'IRL_x0020_current_x0020_level_x0'},
    ];

    public columns: SPField[] = [
        {name: '0', internalName: '0'},
        {name: '1', internalName: '1'},
        {name: '2', internalName: '2'},
        {name: '3', internalName: '3'},
        {name: '4', internalName: '4'},
        {name: '5', internalName: '5'},
        {name: '6', internalName: '6'},
        {name: '7', internalName: '7'},
        {name: '8', internalName: '8'},
        {name: '9', internalName: '9'},
    ];

    public list: Map<any, Map<any, number>>;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);

        this.subscribe(LIST_NAME);
    }

    public getFunnelValue(column, row): number
    {
        if(this.lists[LIST_NAME])
        {
            // Filter non-numerical items
            let nonNullItems: any[] = this.lists[LIST_NAME].filter(
                // NOTE: '-' is an actual choice, so we need to filter it out as well
                (item) => item[row.internalName] && item[row.internalName][0] !== '-'
            );
            
            // Get the first character, container the actual level and iterpret it as a number
            let valueArray: number[] = nonNullItems.map((item) => item[row.internalName][0]);

            return valueArray.filter((item) => item === column.internalName).length;
        }
    }

    public getOnMarket(): number
    {
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter(
                (item) => item['Phase_x0020_for_x0020_business_x'] === '5. Market introduction'
            ).length;
        }
    }
    
    public getHref(column, row)
    {
        let result = environment.sharePointUrl + '/Lists/Cases/AllItems.aspx?useFiltersInViewXml=1';

        if(!column)
        {
            result += `&FilterField1=Status&FilterValue1=${encodeURIComponent(row.internalName)}`;
        }
        else if(!row)
        {
            result += `&FilterField1=Phase&FilterValue1=${encodeURIComponent(column.internalName)}`;
        }
        else
        {
            result += `&FilterField1=Phase&FilterValue1=${encodeURIComponent(column.internalName)}&FilterType1=Choice&FilterField2=Status&FilterValue2=${encodeURIComponent(row.internalName)}&FilterType2=Choice`;
        }
        
        return result;
    }

    public onNewData(): void
    {

    }
}
