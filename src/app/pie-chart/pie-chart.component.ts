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

    public colors: string[] = ['#376db2', '#63b43d', '#465c74', '#9d5ab9', '#bfc4c8', '#d8885b'];
    
    public chart: Chart = [];
    private labels: any[] = [];
    
    @ViewChild('canvas') canvas: ElementRef;

    @Input() title: string;
    @Input() field: string;

    constructor(spData: SPDataService, globalFilter: GlobalFilterService)
    {
        super(spData, globalFilter);
        this.subscribe(LIST_NAME);
    }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: this.colors
                }]
            },
            options: {
                showAllTooltips: false,
                onClick: this.onChartClick.bind(this),
                animation: {
                    duration: 500
                },
                responsive: true,
				maintainAspectRatio: true,
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

    public toggleItem(itemIndex: number)
    {
        this.chart.getDatasetMeta(0).data[itemIndex].hidden = !this.chart.getDatasetMeta(0).data[itemIndex].hidden;
        this.chart.update();
    }

    private onChartClick(event: any, items: any[])
    {
        window.location.assign(`https://kplusv.sharepoint.com/sites/eitrawmaterials/Lists/Innovation%20Projects/AllItems.aspx?useFiltersInViewXml=1&FilterField1=${this.field}&FilterValue1=${this.labels[items[0]._index].label}&FilterType1=Choice`);
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

        this.labels = [];
        nonNullItems.forEach((item) => {
            let obj = this.getItemByLabel(this.labels, item[this.field]);
            if(obj !== null)
            {
                ++obj.value;
            }
            else
            {
                this.labels.push({ label: item[this.field], value: 1});
            }
        });

        let chartLabels = this.labels.map((item) => item.label);
        // NOTE: These are custom labels
        if(this.field === 'Type_x0020_of_x0020_customer')   
        {
            // NOTE: Yeah, I know... just leave me alone
            for(let i in chartLabels)
            {
                if(chartLabels[i] === 'Spin-off /-out (KIC partner related)')
                    chartLabels[i] = 'Spin-off / -out';
                if(chartLabels[i] === 'PhD or Master from RM labeled program')
                    chartLabels[i] = 'PhD / Master';
                if(chartLabels[i] === 'Emerging from Upscaling or other KAVA activities')
                    chartLabels[i] = 'Upscaling / KAVA';
                if(chartLabels[i] === 'Start-up (non-KIC related)')
                    chartLabels[i] = 'Start-up';
                if(chartLabels[i] === 'SME (non-KIC related)')
                    chartLabels[i] = 'SME';
            }
        }

        this.chart.data.labels = chartLabels;
        this.chart.data.datasets[0].data = this.labels.map((item) => item.value);
        this.chart.update();
    }


}
