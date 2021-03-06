import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

export class BSChart extends Chart
{
    public urls: Map<string, string>;
    public shouldUpdate: boolean;
    
    constructor(canvas: ElementRef, chartObject: ChartObject)
    {
        let context = canvas.nativeElement.getContext('2d');
        super(context, chartObject);

        this.shouldUpdate = true;
        chartObject.options.hover.onHover = this.onHover;
        this.urls = new Map();
    }

    public onHover(event)
    {
        if(event.type === 'mousemove')
        {
            this.shouldUpdate = false;
        }
        else if(event.type === 'mouseout')
        {
            this.shouldUpdate = true; 
        }
    }


    public addUrl(key: string, url: string)
    {
        this.urls.set(key, url);
    }
}

export interface ChartObject
{
    type: ChartType;
    data: any;
    options: any;
}

export enum ChartType
{
    BAR = 'bar',
    PIE = 'pie',
    LINE = 'line'
}
