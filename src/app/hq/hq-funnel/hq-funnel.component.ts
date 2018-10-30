import { Component, Input } from '@angular/core';
import { BSDataComponent } from '../../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../../global-filter.service';
import { environment } from '../../../environments/environment';
import { ThemeService, Theme } from '../../theme.service';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
  selector: 'hq-funnel',
  templateUrl: './hq-funnel.component.html',
  styleUrls: ['./hq-funnel.component.scss']
})
export class FunnelComponent extends BSDataComponent
{
    public columns: any[] = [
        {name: 'New lead', internalName: '1. New lead', value: 0 },
        {name: 'Pre-assessment', internalName: '2. Pre-assessment', value: 0 },
        {name: 'Intake', internalName: '3. Intake/Evaluation', value: 0 },
        {name: 'Support', internalName: '4. Support', value: 0 },
        {name: 'Market introduction', internalName: '5. Market introduction', value: 0 },
    ];

    public rows: Theme[] = [];

    public list: Map<any, Map<any, number>>;
    
    constructor(spData: SPDataService, globalFilter: GlobalFilterService,
            private themes: ThemeService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);

        this.rows = themes.getThemes();
        
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
            let result = 0;
            for(let i = this.columns.indexOf(column);
                i < this.columns.length;
                ++i)
            {
                result += this.countItems(this.columns[i], row);
            }
            return result;
        }


    }

    private countItems(column: SPField, row: Theme): number
    {
        
        if(this.lists[LIST_NAME])
        {
            let items = this.lists[LIST_NAME].filter((item) => {
                return (
                    item['Phase_x0020_for_x0020_business_x'] === column.internalName
                        && item['Themes']
                );
            });

            return this.countMultiChoice(items.map((item) => item['Themes']), row.internalName);
        }

    }
    
    public getHref(column, row)
    {
        let result = environment.sharePointUrl + '/Lists/Cases/AllItems.aspx?useFiltersInViewXml=1';

        if(!column)
        {
            result += `&FilterField1=Themes&FilterValue1=${encodeURIComponent(row.internalName)}`;
        }
        else if(!row)
        {
            result += `&FilterField1=Phase&FilterValue1=${encodeURIComponent(column.internalName)}`;
        }
        else
        {
            result += `&FilterField1=Phase&FilterValue1=${encodeURIComponent(column.internalName)}&FilterType1=Choice&FilterField2=Themes&FilterValue2=${encodeURIComponent(row.internalName)}&FilterType2=Choice`;
        }
        
        return result;
    }

    private countMultiChoice(data: any[], field: string): number
    {
        let count = 0;
        for(let item of data)
        {
            if(item)
            {
                for(let choice of item)
                {
                    if(choice === field) count++;
                }
            }
        }

        return count;
    }

    private countColumn(column: SPField): number
    {
        return this.lists[LIST_NAME].filter((item) => {
            return (item['Phase_x0020_for_x0020_business_x'] === column.internalName);
        }).length;
    }

    protected onNewData(): void
    {
        // NOTE: Calculate column totals
        for(let column of this.columns)
        {
            let result = 0;
            for(let i = this.columns.indexOf(column);
                i < this.columns.length;
                ++i)
            {
                result += this.countColumn(this.columns[i]);
            }
            column.value = result;
        }        
    }
}


