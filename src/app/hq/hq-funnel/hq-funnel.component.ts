import { Component, Input } from '@angular/core';
import { BSDataComponent } from '../../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../../global-filter.service';
import { environment } from '../../../environments/environment';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
  selector: 'hq-funnel',
  templateUrl: './hq-funnel.component.html',
  styleUrls: ['./hq-funnel.component.scss']
})
export class FunnelComponent extends BSDataComponent
{
    public columns: SPField[] = [
        {name: 'New lead', internalName: '1. New lead'},
        {name: 'Pre-assessment', internalName: '2. Pre-assessment'},
        {name: 'Intake', internalName: '3. Intake/Evaluation'},
        {name: 'Support', internalName: '4. Support'},
        {name: 'Market introduction', internalName: '5. Market introduction'},
    ];

    // NOTE: Actual names
    /*
    public rows: SPField[] = [
        {name: 'Exploration and raw materials resource assessment', internalName: 'A. Exploration and raw materials resource assessment'},
        {name: 'Mining in challenging environments', internalName: 'B. Mining in challenging environments'},
        {name: 'Increased resource efficiency in mineral and metallurgical processes', internalName: 'C. Increased resource efficiency in mineral and metallurgical processes'},
        {name: 'Recycling and material chain optimisation for End-of-Life products', internalName: 'D. Recycling and material chain optimisation for End-of-Life products'},
        {name: 'Substitution of critical and toxic materials in products and for optimised performance', internalName: 'E. Substitution of critical and toxic materials in products and for optimised performance'},
        {name: 'Design of products and services for the circular economy', internalName: 'F. Design of products and services for the circular economy'},
    ];
    */
    
    //NOTE: Short names for development
    public rows: SPField[] = [
        {name: 'Exploration', internalName: 'A. Exploration and raw materials resource assessment'},
        {name: 'Mining', internalName: 'B. Mining in challenging environments'},
        {name: 'Metallurgical processes', internalName: 'C. Increased resource efficiency in mineral and metallurgical processes'},
        {name: 'Recycling', internalName: 'D. Recycling and material chain optimisation for End-of-Life products'},
        {name: 'Toxic materials', internalName: 'E. Substitution of critical and toxic materials in products and for optimised performance'},
        {name: 'Design', internalName: 'F. Design of products and services for the circular economy'},
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
    
    public getRowTotal(row: any)
    {
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].filter((item) => {
                return item['Status'] === row.internalName;
            }).length;
        }
        return null;
    }

    public getTotal()
    {
        if(this.lists[LIST_NAME])
        {
            return this.lists[LIST_NAME].length;
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


