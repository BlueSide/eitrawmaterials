import { Component, OnInit } from '@angular/core';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { environment } from '../../environments/environment';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
  selector: 'funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent extends BSDataComponent
{
    
    public columns: SPField[] = [
        {name: 'New lead', internalName: '1. Lead'},
        {name: 'Pre-assessment', internalName: '2. Intake done'},
        {name: 'Intake', internalName: '3. Support started'},
        {name: 'Support', internalName: '4. Entered stage 1'},
        {name: 'Market introduction', internalName: '5. Entered stage 2'},
    ];

    public rows: SPField[] = [
        {name: 'Active', internalName: 'Active'},
        {name: 'On-hold', internalName: 'On-hold'},
        {name: 'Rejected', internalName: 'Rejected'},
        {name: 'Closed', internalName: 'Closed'},
    ];

    public list: Map<any, Map<any, number>>;
    
    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);
    }

    
    public getColumnTotal(column: any)
    {
        return 0;
/*
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return item[LIST_NAME] === column.internalName;
            }).length;
        }
        return null;
*/
    }
    
    public getRowTotal(row: any)
    {
        //TODO: Remove early return when we have data!!
        return 0;
        /*
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return item['Status'] === row.internalName;
            }).length;
        }
        return null;
*/
    }

    public getTotal()
    {
        //TODO: Remove early return when we have data!!
        return 0;
        /*
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].length;
        }
        return 0;
*/
    }

    public getFunnelValue(column, row): number
    {
        //TODO: Remove early return when we have data!!
        return 0;
          /*
      if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return (
                    item['Phase'] === column.internalName
                        && item['Status'] === row.internalName
                )
            }).length;
        }
*/
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

    protected onNewData(): void
    {
    }
}


