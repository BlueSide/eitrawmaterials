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
    public dataLoaded: boolean = false;

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
            this.clcs.activeClc = this.clcs.getClc(params['clc']);
            globalFilter.setClc(this.clcs.activeClc);
        });

        this.subscribe(LIST_NAME);
        
    }

    public onNewData(): void
    {
        this.dataLoaded = true;
        /**
         * Upper indicators
         */
        
        // NOTE: Student startups
        this.indicators[0].value = this.lists[LIST_NAME].filter(
            (item) => item['Type_x0020_of_x0020_customer'] === 'PhD or Master from RM labeled program'
        ).length;

        // NOTE: Products/Services launched
        this.indicators[1].value = this.sum(this.lists[LIST_NAME], 'Products_x0020_and_x0020__x002f_');

        // NOTE: Startups from upscaling projects
        this.indicators[2].value = this.lists[LIST_NAME].filter((item) => {
            return (item['Type_x0020_of_x0020_customer'] === 'Emerging from Upscaling or other KAVA activities')
                && (item['Phase_x0020_for_x0020_business_x'] === '5. Market introduction');
        }).length;
        
        // NOTE: Startups supported 
        this.indicators[3].value = this.lists[LIST_NAME].filter((item) => {
            return (item['Phase_x0020_for_x0020_business_x'] === '4. Support')
                || (item['Phase_x0020_for_x0020_business_x'] === '5. Market introduction');
        }).length;

        // NOTE: New SMEs created
        this.indicators[4].value = this.lists[LIST_NAME].filter((item) => item['Succesful_x0020_market_x0020_ent'] ).length;

        // NOTE: Success stories
        this.indicators[5].value = this.lists[LIST_NAME].filter((item) => item['Success_x0020_story'] ).length;

        
        /**
         * Lower indicators
         */

        
        // NOTE: Participation in match events
        this.indicators[6].value = this.lists[LIST_NAME].map(
            (item) => item['Successful_x0020_integration_x000Id'].length
        ).reduce((a,b) => a+b, 0);


        // NOTE: Number of people employed 
        this.indicators[7].value = this.sum(this.lists[LIST_NAME], 'Number_x0020_of_x0020_team_x0020');

        // NOTE: Number of women in the team
        this.indicators[8].value = this.sum(this.lists[LIST_NAME], 'Number_x0020_of_x0020_women_x002');

        // NOTE: Involvement in KAVA projects
        this.indicators[9].value = this.lists[LIST_NAME].map(
            (item) => item['Participation_x0020_in_x0020_KAVId'].length
        ).reduce((a,b) => a+b, 0);
        
        // NOTE: Partner /start-up matches
        this.indicators[10].value = this.lists[LIST_NAME].map(
            (item) => item['MatchesId'].length
        ).reduce((a,b) => a+b, 0);
        
        // NOTE: Involved VC firms
        this.indicators[11].value = this.lists[LIST_NAME].map(
            (item) => item['Involved_x0020_venture_x0020_capId'].length
        ).reduce((a,b) => a+b, 0);

        // NOTE: Investment attracted
        this.indicators[12].value = this.sum(this.lists[LIST_NAME], 'Total_x0020_amount_x0020_of_x002');        
    }
}
