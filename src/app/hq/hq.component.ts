import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hq',
    templateUrl: './hq.component.html',
    styleUrls: ['./hq.component.scss']
})
export class HQComponent implements OnInit
{

    public indicators: any = [
        {title: "Student startups - EIT labeled", value: 0},
        {title: "Products/Services launched", value: 0},
        {title: "Startups from innovation projects", value: 0},
        {title: "Startups supported", value: 0},
        {title: "Investment attracted", value: 0},
        {title: "Success stories", value: 0},
        
        {title: "Innovation projects", value: 0},
        {title: "Feasability studies", value: 0},
        {title: "SME project partners", value: 0},
        {title: "Succesful matches", value: 0},
        {title: "Partners in upscaling projects", value: 0},
        {title: "KIC-start funding ideas", value: 0},
        {title: "Involved VC-firms", value: 0},
        {title: "New SME's created", value: 0}
    ];
    
    constructor() { }

    ngOnInit() {
    }

}
