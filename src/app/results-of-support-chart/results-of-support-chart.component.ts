import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
  selector: 'results-of-support-chart',
  templateUrl: './results-of-support-chart.component.html',
  styleUrls: ['./results-of-support-chart.component.scss']
})
export class ResultsOfSupportChartComponent extends BSDataComponent implements OnInit
{
    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);
    }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'radar',
            data: {
                labels: ['TRL', 'CRL', 'IRL'],
                datasets: [{
                    data: [0,0,0],
                    backgroundColor: '#63b43d88',
                    pointHitRadius: 50
                },
                           {
                    data: [0,0,0],
                    backgroundColor: '#376db288',
                    pointHitRadius: 50
                }]
            },
            options: {
                animation: false,
                responsive: true,
                onClick: this.onChartClick, 
                legend: {
                    display: false
                },
                tooltips: {
		    mode: 'point',
		    intersect: false
		},
                scale: {
                    ticks: {
                        min: 0,
                        max: 9,
                        stepSize: 1
                    }
                }
                
            }
        };
        this.chart = new BSChart(this.canvas, chartObject);
    }

    public onChartClick(event: any)
    {
        //
    }

    
    private average(items: any[], field: string): number
    {
        // Filter non-numerical items
        let nonNullItems: any[] = items.filter(
            // NOTE: '-' is an actual choice, so we need to filter it out as well
            (item) => item[field] && item[field][0] !== '-'
        );

        // Get the first character, container the actual level and iterpret it as a number
        let valueArray: number[] = nonNullItems.map((item) => +item[field][0]);

        // Sum the array
        let total = valueArray.reduce( (a: number,b: number) => a + b, 0);

        // Prevent divide by zero
        if(items.length === 0 || total === 0) return 0;
        
        return total / valueArray.length;
    }
    
    protected onNewData(): void
    {
        this.chart.data.datasets[0].data = [
            this.average(this.lists[LIST_NAME], 'TRL_x0020_phase_x0020_at_x0020_s'),
            this.average(this.lists[LIST_NAME], 'CRL_x0020_phase_x0020_at_x0020_s'),
            this.average(this.lists[LIST_NAME], 'IRL_x0020_level_x0020_at_x0020_s')
        ];

        this.chart.data.datasets[1].data = [
            this.average(this.lists[LIST_NAME], 'TRL_x0020_current_x0020_during_x'),
            this.average(this.lists[LIST_NAME], 'CRL_x0020_current_x0020_during_x'),
            this.average(this.lists[LIST_NAME], 'IRL_x0020_current_x0020_level_x0')
        ];
        
        this.chart.update();
    }


}
