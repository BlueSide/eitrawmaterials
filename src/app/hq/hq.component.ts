import { Component, OnInit } from '@angular/core';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';
import { SPDataService } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
    selector: 'app-hq',
    templateUrl: './hq.component.html',
    styleUrls: ['./hq.component.scss']
})
export class HQComponent extends BSDataComponent
{

    public indicators: any = [
        {title: "Student startups", value: 0},
        {title: "Products/Services launched", value: 0},
        {title: "Startups from upscaling projects", value: 0},
        {title: "Startups supported", value: 0},
        {title: "New SMEs created", value: 0},
        {title: "Success stories", value: 0},
        
        {title: "Participation in match events", value: 0},
        {title: "Number of people employed", value: 0},
        {title: "Number of women in the team", value: 0},
        {title: "Involvement in KAVA projects", value: 0},
        {title: "Partner /start-uip matches", value: 0},
        {title: "Involved VC firms", value: 0},
        {title: "Investment attracted", value: 0}
    ];
    
    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);        
    }

    public onNewData(): void
    {
        //TODO: All fields should be internal field names!
        
        
        // NOTE: Student startups
        // TODO: Test, when new field names are in place
        this.indicators[0].value = this.lists[LIST_NAME].filter(
            (item) => item['Origin of innovation initiative'] === 'PhD or Master from RM'
        ).length;

        // NOTE: Products/Services launched
        // TODO: Test, when new field names are in place
        this.indicators[1].value = this.sum(this.lists[LIST_NAME], 'Products and /or services launched');

        // NOTE: Startups from upscaling projects
        // TODO: Test, when new field names are in place
        this.indicators[2].value = this.lists[LIST_NAME].filter((item) => {
            return (item['Origin of innovation initiative'] === 'Emerging from Upscaling or other KAVA activities')
                && (item['Phase in process'] === '5. Market introduction');
        }).length;
        
        // NOTE: Startups supported 
        // TODO: Test, when new field names are in place
        this.indicators[3].value = this.lists[LIST_NAME].filter((item) => {
            return (item['Phase in process'] === '4. Support')
                || (item['Phase in process'] === '5. Market introduction');
        }).length;

        // NOTE: New SMEs created
        // TODO: test if SharePoint Boolean isn't a string somehow
        this.indicators[4].value = this.lists[LIST_NAME].filter((item) => item['Succesful market entry'] ).length;

        // NOTE: Success stories
        this.indicators[5].value = this.lists[LIST_NAME].filter((item) => item['Success story'] ).length;

        
        //======================================================

        
        // NOTE: Participation in match events
        // TODO: Test, when new field names are in place.
        let items = this.lists[LIST_NAME].filter((item) => item['Participation in match events'] );

        this.indicators[6].value = 0;
        for(let item of items)
        {
            this.indicators[6].value += item.length;
        }

        // NOTE: Number of people employed 
        // TODO: Test, when new field names are in place.
        this.indicators[7].value = this.sum(this.lists[LIST_NAME], 'Number of team members');

        // NOTE: Number of women in the team
        // TODO: Test, when new field names are in place.
        this.indicators[8].value = this.sum(this.lists[LIST_NAME], 'Number of women in the team');

        // NOTE: Involvement in KAVA projects
        // TODO: Test, when new field names are in place.
        items = this.lists[LIST_NAME].filter((item) => item['Participation in KAVAs'] );

        this.indicators[9].value = 0;
        for(let item of items)
        {
            this.indicators[6].value += item.length;
        }

        // NOTE: Partner /start-up matches

        // NOTE: Involved VC firms

        // NOTE: Investment attracted
    }
}
