import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
    @Input() title: string;

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
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#376db2','#376db2','#376db2','#376db2','#376db2'],
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
		    yAxes: [{
			ticks: {
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

    private getItemByLabel(labels: any[], label: string)
    {
        for(let item of labels)
        {
            if(item.label === label) return item;    
        }
        
        return null;
    }

    
    protected onNewData(): void
    {
        let data = [];
        
        this.lists[LIST_NAME].filter( (item) => item['Type_x0020_of_x0020_support_x0020'] )
            .map((item) => item['Type_x0020_of_x0020_support_x0020']
                 .forEach((item) => {
                     if(!data[item]) data[item] = 0;
                     ++data[item];
                 }))

        // NOTE: Reset chart
        this.chart.data.labels = [];
        this.chart.data.datasets[0].data = [];
        
        // NOTE: Update chart
        for(let item in data)
        {
            this.chart.data.labels.push(item);
            this.chart.data.datasets[0].data.push(data[item]);
        }
        this.chart.update();
    }


}
