import { Component } from '@angular/core';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';
import { SPDataService } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { ClcService } from '../clc/clc.service';
import { NumberSuffixPipe } from '../number-suffix.pipe';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
    selector: 'app-hq',
    templateUrl: './hq.component.html',
    styleUrls: ['./hq.component.scss']
})
export class HQComponent extends BSDataComponent
{

    public dataLoaded: boolean = false;
    
    public indicators: any = [
        {title: "Startups supported", value: 0, icon: "far fa-life-ring",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterFields1=Phase_x0020_for_x0020_business_x&FilterValues1=5%2E%20Market%20introduction%3B%234%2E%20Support&FilterTypes1=Choice"},
        {title: "New SMEs created", value: 0, icon: "far fa-building",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=Succesful_x0020_market_x0020_ent&FilterValue1=1&FilterType1=Boolean"},
        {title: "Products/Services launched", value: 0, icon: "fas fa-rocket",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Investment attracted", value: 0, icon: "fa fa-euro-sign",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Success stories", value: 0, icon: "far fa-thumbs-up",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=Success_x0020_story&FilterValue1=1&FilterType1=Boolean"},
        {title: "Student startups RM-labeled", value: 0, icon: "fas fa-graduation-cap",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=Type_x0020_of_x0020_customer&FilterValue1=PhD%20or%20Master%20from%20RM%20labeled%20program&FilterType1=Choice"},
        
        {title: "Participation in match events", value: 0, icon: "far fa-calendar-alt",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Partner in KAVA projects", value: 0, icon: "fas fa-sitemap",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Startups from upscaling projects", value: 0, icon: "fas fa-chart-line",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=Type_x0020_of_x0020_customer&FilterValue1=Emerging%20from%20Upscaling%20or%20other%20KAVA%20activities&FilterType1=Choice&FilterField2=Phase_x0020_for_x0020_business_x&FilterValue2=5%2E%20Market%20introduction&FilterType2=Choice"},
        {title: "Partner /start-up matches", value: 0, icon: "far fa-handshake",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Total people employed", value: 0, icon: "fas fa-users",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Number of women employed", value: 0, icon: "fas fa-female",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        {title: "Involved VC firms", value: 0, icon: "fas fa-building",
         url: "https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx"},
        
    ];
    
    constructor(spData: SPDataService,
                globalFilter: GlobalFilterService,
                private clcs: ClcService)
    {
        super(spData, globalFilter);
        
        this.clcs.activeClc = this.clcs.hq;
        globalFilter.setClc(this.clcs.activeClc);
        
        this.subscribe(LIST_NAME);        
    }
    
    public onNewData(): void
    {
        this.dataLoaded = true;
        /**
         * Upper indicators
         */
        
        // NOTE: Student startups
        // TODO: KPI choice doesn't exist
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
