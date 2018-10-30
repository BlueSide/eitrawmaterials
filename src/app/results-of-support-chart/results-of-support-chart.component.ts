import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

@Component({
  selector: 'results-of-support-chart',
  templateUrl: './results-of-support-chart.component.html',
  styleUrls: ['./results-of-support-chart.component.scss']
})
export class ResultsOfSupportChartComponent implements OnInit
{
    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;

    constructor() { }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'radar',
            data: {
                labels: ['TRL', 'CRL', 'IRL'],
                datasets: [{
                    data: [6, 4.3, 2],
                    backgroundColor: '#63b43d88',
                    pointHitRadius: 50
                },
                           {
                    data: [9, 6.3, 7],
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

    protected onNewData(): void
    {
        this.chart.update();
    }


}
