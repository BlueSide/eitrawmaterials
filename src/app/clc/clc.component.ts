import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';
import { SPDataService, SPField } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { ClcService, CLC } from './clc.service';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
    selector: 'app-clc',
    templateUrl: './clc.component.html',
    styleUrls: ['./clc.component.scss']
})
export class ClcComponent extends BSDataComponent
{
    public activeClc: CLC;

    public indicators: any = [
        { title: "Student startups - EIT labeled", value: 0 },
        { title: "Products/Services launched", value: 0 },
        { title: "Startups from innovation projects", value: 0 },
        { title: "Startups supported", value: 0 },
        { title: "Investment attracted", value: 0 },
        { title: "Success stories", value: 0 },
        
        { title: "Innovation projects", value: 0 },
        { title: "Feasability studies", value: 0 },
        { title: "SME project partners", value: 0 },
        { title: "Succesful matches", value: 0 },
        { title: "Partners in upscaling projects", value: 0 },
        { title: "KIC-start funding ideas", value: 0 },
        { title: "Involved VC-firms", value: 0 },
        { title: "New SME's created", value: 0 }
    ];

    constructor(private route: ActivatedRoute,
                private clcs: ClcService,
                spData: SPDataService,
                globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        // Determine which CLC we're on
       this.route.params.subscribe(params => {
           this.activeClc = this.clcs.getClc(params['clc']);
       });

        this.subscribe(LIST_NAME);

    }

    public onNewData(): void
    {
        
    }
}
