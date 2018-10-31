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

    @Input() field: string;

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
                labels: [],
                datasets: [{
                    data: [],
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
        let nonNullItems: any[] = this.lists[LIST_NAME].filter((item) => item[this.field]);

        let labels: any[] = [];
        nonNullItems.forEach((item) => {
            let obj = this.getItemByLabel(labels, item[this.field]);
            if(obj !== null)
            {
                ++obj.value;
            }
            else
            {
                labels.push({ label: item[this.field], value: 1});
            }
        });

        
        this.chart.data.labels = labels.map((item) => item.label);
        this.chart.data.datasets[0].data = labels.map((item) => item.value);
        this.chart.update();
    }


}
