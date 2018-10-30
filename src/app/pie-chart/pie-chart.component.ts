import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { BSChart } from '../sp-dashboard/BSChart';
import { SPDataService, SPList } from '../sp-dashboard/sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { BSDataComponent } from '../sp-dashboard/BSDataComponent';

const LIST_NAME: string = 'Innovation Initiatives';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends BSDataComponent implements OnInit
{
    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;

    @Input() test: string;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);
    }

    ngOnInit()
    {
        
        let chartObject: any = {
            type: 'pie',
            data: {
                labels: ['Startup/SME track', 'Upscaling track'],
                datasets: [{
                    data: [8, 5.3, 6, 7, 2.6],
                    backgroundColor: ['#376db2', '#63b43d', '#465c74', '#9d5ab9', '#bfc4c8', '#d8885b']
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
        console.log(this.lists[LIST_NAME]);

        // TODO: Count items in 'field'

        this.chart.update();
    }


}
