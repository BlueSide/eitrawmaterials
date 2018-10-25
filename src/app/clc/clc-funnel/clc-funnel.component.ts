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
        {name: 'TRL', internalName: ''},
        {name: 'CRL', internalName: ''},
        {name: 'IRL', internalName: ''},
    ];

    public columns: SPField[] = [
        {name: '0', internalName: ''},
        {name: '1', internalName: ''},
        {name: '2', internalName: ''},
        {name: '3', internalName: ''},
        {name: '4', internalName: ''},
        {name: '5', internalName: ''},
        {name: '6', internalName: ''},
        {name: '7', internalName: ''},
        {name: '8', internalName: ''},
        {name: '9', internalName: ''},
    ];

    public list: Map<any, Map<any, number>>;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);

        this.subscribe(LIST_NAME);
    }

    public getColumnTotal(column: any)
    {
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return item['Phase_x0020_for_x0020_business_x'] === column.internalName;
            }).length;
        }
        return null;
    }

    public getFunnelValue(column, row): number
    {
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return (
                    item['Phase_x0020_for_x0020_business_x'] === column.internalName
                        && item['Status'] === row.internalName
                );
            }).length;
        }
    }

    public getOnMarket(): number
    {
        //TODO: Implement
        return 33;
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

