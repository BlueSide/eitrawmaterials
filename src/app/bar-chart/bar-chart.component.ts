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

    private items: any = [
        {title: 'BIC', internalName: 'Business idea competition', value: 0},
        {title: 'Accelerator', internalName: 'Accelerator program', value: 0},
        {title: 'Booster', internalName: 'Booster funding', value: 0},
        {title: 'Investment', internalName: 'Investment instrument', value: 0},
        {title: 'Other support', internalName: 'Complementary support', value: 0}
    ];
    
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
                    backgroundColor: '#376db2',
                }]
            },
            options: {
                animation: {
                    duration: 500
                },
                responsive: true,
                onClick: this.onChartClick.bind(this),
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
		    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
		}
            }
        };
        this.chart = new BSChart(this.canvas, chartObject);

    }

    private onChartClick(event: any, items: any[])
    {
        window.location.assign(`https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=Type_x0020_of_x0020_support_x0020&FilterValue1=${this.items[items[0]._index].internalName}&FilterType1=Choice`);
    }

    private getItemByLabel(labels: any[], label: string)
    {
        for(let item of labels)
        {
            if(item.label === label) return item;    
        }
        
        return null;
    }

    private incrementItemByInternalName(internalName: string)
    {
        for(let item of this.items)
        {
            if(item.internalName === internalName)
            {
                ++item.value;
                return;
            }
        }
    }
    
    protected onNewData(): void
    {
        // NOTE: Reset items to zero values
        for(let item of this.items)
        {
            item.value = 0;
        }
        
        this.lists[LIST_NAME].filter( (item) => item['Type_x0020_of_x0020_support_x0020'] )
            .map((item) => item['Type_x0020_of_x0020_support_x0020']
                 .forEach((internalName) => {
                     this.incrementItemByInternalName(internalName);
                 }))

        // NOTE: Update chart
        this.chart.data.labels = this.items.map((item) => item.title);
        this.chart.data.datasets[0].data = this.items.map((item) => item.value)
        this.chart.update();
    }


}
