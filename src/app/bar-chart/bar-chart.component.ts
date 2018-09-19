import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends BSDataComponent implements OnInit
{
    public title: string = 'Average TRL at start';
    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        //this.subscribe('Lists/Innovation%20ProjectsInnovation Initiatives');
    }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'bar',
            data: {
                labels: ['Startup/SME track', 'Upscaling track'],
                datasets: [{
                    data: [2.6, 5.3],
                    backgroundColor: ['#376db2','#376db2'],
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
                scales: {
		    xAxes: [{
			stacked: true,
		    }],
		    yAxes: [{
			stacked: true,
                        ticks: {
                            suggestedMax: 9,
                            beginAtZero: true
                        }
		    }]
		}
            }
        };
        this.chart = new BSChart(this.canvas, chartObject);

    }

    public onChartClick(event: any)
    {
        let activeElement = this.chart.getElementAtEvent(event);
        if(activeElement[0])
        {
            window.location.assign(``);
        }
    }

        
    protected onNewData(): void
    {
        this.chart.update();
    }


}
