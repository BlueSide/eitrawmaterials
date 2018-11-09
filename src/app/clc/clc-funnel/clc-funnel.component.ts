import { Component, OnInit } from '@angular/core';
import { BSDataComponent } from '../../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../../global-filter.service';
import { ClcService } from '../clc.service';
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

    public columns: any[] = [
        {name: '1', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '1 - Basic principles observed',
         'CRL_x0020_current_x0020_during_x': '1 - Hypothesizing on possible needs in market',
         'IRL_x0020_current_x0020_level_x0': '1 - Complete First-Pass Canvas'},
        {name: '2', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '2 - Technology concept and/or application formulated',
         'CRL_x0020_current_x0020_during_x': '2 - Identified specific needs in market',
         'IRL_x0020_current_x0020_level_x0': '2 - Market Size/Competitive Analysis'},
        {name: '3', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '3 - Analytical and experimental proof-of-concept of critical function and/or characteristics',
         'CRL_x0020_current_x0020_during_x': '3 - First market feedback established',
         'IRL_x0020_current_x0020_level_x0': '3 - Problem/Solution Validation'},
        {name: '4', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '4 - Technology validation in laboratory',
         'CRL_x0020_current_x0020_during_x': '4 - Confirmed problem/needs from several customers and/or users',
         'IRL_x0020_current_x0020_level_x0': '4 - Prototype Low Fidelity'},
        {name: '5', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '5 - Technology in relevant environment',
         'CRL_x0020_current_x0020_during_x': '5 - Established interest for product and relations with target customers',
         'IRL_x0020_current_x0020_level_x0': '5 - Validate Product/Market Fit'},
        {name: '6', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '6 - Technology demonstration in a relevant environment',
         'CRL_x0020_current_x0020_during_x': '6 - Benefits of the product confirmed through partnership and /first customer testing',
         'IRL_x0020_current_x0020_level_x0': '6 - Validate Right Side of Canvas'},
        {name: '7', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '7 - Technology prototype demonstration in an operational environment',
         'CRL_x0020_current_x0020_during_x': '7 - Customers in extended product testing and/or first test sales',
         'IRL_x0020_current_x0020_level_x0': '7 - Prototype High Fidelity'},
        {name: '8', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '8 - Actual Technology system completed and qualified through test and demonstration',
         'CRL_x0020_current_x0020_during_x': '8 - First products sold',
         'IRL_x0020_current_x0020_level_x0': '8 - Validate Left Side of Canvas'},
        {name: '9', internalName: '1',
         'TRL_x0020_current_x0020_during_x': '9 - Actual Technology system proven in operational environment',
         'CRL_x0020_current_x0020_during_x': '9 - Widespread product sales',
         'IRL_x0020_current_x0020_level_x0': '9 - Validate Metrics That Matter'}
    ];

    public list: Map<any, Map<any, number>>;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService,
                private clcs: ClcService)
    {
        super(spData, globalFilter);

        this.subscribe(LIST_NAME);
    }

    public getFunnelValue(column, row): number
    {
        if(this.lists[LIST_NAME])
        {
            // Filter non-numerical and rejected items
            let nonNullItems: any[] = this.lists[LIST_NAME].filter(
                // NOTE: '-' is an actual choice, so we need to filter it out as well
                (item) => item[row.internalName] && item[row.internalName][0] !== '-'
                            && item['Status'] !== 'Rejected'
            );
            
            // Get the first character, container the actual level and iterpret it as a number
            let valueArray: number[] = nonNullItems.map((item) => item[row.internalName][0]);

            return valueArray.filter((item) => item === column.name).length;
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

    public getOnMarketHref(): string
    {
        let result: string = environment.sharePointUrl + '/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1';
        result += `&FilterField1=Phase_x0020_for_x0020_business_x&FilterValue1=5%2E%20Market%20introduction&FilterType1=Choice`;
        result += `&FilterField2=KIC_x0020_Group_x0020_Entity_x00&FilterValue2=${encodeURIComponent(this.clcs.activeClc.field)}`;
        return result;
    }

    public getHref(column, row): string
    {
        let result: string = environment.sharePointUrl + '/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1';
        let field: string = row.internalName;
        let choice: string = column[field];
        result += `&FilterField1=${field}&FilterValue1=${encodeURIComponent(choice)}&FilterType1=Choice&FilterFields2=Status&FilterValues2=Active%3B%23On%20hold%3B%23Closed&FilterTypes2=Choice`;
        result += `&FilterField3=KIC_x0020_Group_x0020_Entity_x00&FilterValue3=${encodeURIComponent(this.clcs.activeClc.field)}`;
        
        return result;
    }

    public onNewData(): void
    {
        //
    }
}
