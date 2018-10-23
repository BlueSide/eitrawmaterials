import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

const LIST_NAME: string = 'Innovation Initiatives';

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
        this.subscribe(LIST_NAME);
    }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'bar',
            data: {
                labels: ['Startup/SME track', 'Upscaling track'],
                datasets: [{
                    data: [0,0],
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
                            stepSize: 1,
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
        // NOTE: SME Track
        let smeTrack = this.lists[LIST_NAME].filter((item) => {
            return item['TRL_x0020_phase_x0020_at_x0020_s']
                && item['Type_x0020_of_x0020_project'] === 'Start-up /SME track';
        });

        let smeCount = smeTrack.length;
        let smeSum = 0;
        smeTrack.forEach((item) => {
            // Determine TRL level by looking at the first character of the Choice
            smeSum += (+item['TRL_x0020_phase_x0020_at_x0020_s'].charAt(0));
        });

        // Prevent divide by zero
        let smeAverage = smeCount !== 0 ? smeSum/smeCount : 0


        // NOTE: Upscaling track
        let upscalingTrack = this.lists[LIST_NAME].filter((item) => {
            return item['TRL_x0020_phase_x0020_at_x0020_s']
                && item['Type_x0020_of_x0020_project'] === 'Upscaling track';
        });
        let upscalingCount = upscalingTrack.length;
        let upscalingSum = 0;
        upscalingTrack.forEach((item) => {
            // Determine TRL level by looking at the first character of the Choice
            upscalingSum += (+item['TRL_x0020_phase_x0020_at_x0020_s'].charAt(0));
        });

        // Prevent divide by zero
        let upscalingAverage = upscalingCount !== 0 ? upscalingSum/upscalingCount : 0

        // NOTE: Update chart
        this.chart.data.datasets[0].data = [smeAverage, upscalingAverage];
        this.chart.update();
}


}
