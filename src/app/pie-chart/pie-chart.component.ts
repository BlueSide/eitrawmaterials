import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends BSDataComponent implements OnInit
{
    public title: string = 'Initiative stages';
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
            type: 'pie',
            data: {
                labels: ['Startup/SME track', 'Upscaling track'],
                datasets: [{
                    data: [2.6, 5.3, 6, 7, 8],
                    backgroundColor: ['#376db2', '#63b43d', '#465c74', '#9d5ab9', '#bfc4c8', '#D8885B']
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
