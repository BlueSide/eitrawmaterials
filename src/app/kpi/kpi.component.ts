import { Component, Input } from '@angular/core';

@Component({
  selector: 'kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent
{

    @Input() value: string;
    @Input() title: string;
    @Input() icon: string;
    @Input() href: string;
    
    constructor() { }
}
