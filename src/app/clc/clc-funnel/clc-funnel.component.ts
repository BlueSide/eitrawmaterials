import { Component, OnInit } from '@angular/core';
import { BSDataComponent } from '../../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../../global-filter.service';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
    selector: 'clc-funnel',
    templateUrl: './clc-funnel.component.html',
    styleUrls: ['./clc-funnel.component.scss']
})
export class ClcFunnelComponent extends BSDataComponent
{

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);

        this.subscribe(LIST_NAME);
    }

    public onNewData(): void
    {
        
    }
}
