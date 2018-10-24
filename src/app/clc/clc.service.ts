import { Injectable } from '@angular/core';
import { Filter } from '../sp-dashboard/Filter';

const CLC_FIELD = "KIC_x0020_Group_x0020_Entity_x00";

@Injectable({
  providedIn: 'root'
})
export class ClcService
{
    private clcs: CLC[] = [];
    
    constructor()
    {
        //NOTE: Initialize static CLC data
        this.clcs['clc-north'] = {
            title: 'CLC North',
            filter: new Filter((item) => item[CLC_FIELD] === "2. CLC North", false)
        };

        this.clcs['clc-baltic-sea'] = {
            title: 'CLC Baltic Sea',
            filter: new Filter((item) => item[CLC_FIELD] === "3. CLC Baltic Sea", false)
        };
        
        this.clcs['clc-west'] = {
            title: 'CLC West',
            filter: new Filter((item) => item[CLC_FIELD] === "4. CLC West", false)
        };

        this.clcs['clc-central' ] = {
            title: 'CLC Central',
            filter: new Filter((item) => item[CLC_FIELD] === "5. CLC Central", false)
        };

        this.clcs['clc-east'] = {
            title: 'CLC East',
            filter: new Filter((item) => item[CLC_FIELD] === "6. CLC East", false)
        };

        this.clcs['clc-south'] = {
            title: 'CLC South',
            filter: new Filter((item) => item[CLC_FIELD] === "7. CLC South", false)
        };

    }

    public getClc(id: string): CLC
    {
        return this.clcs[id];
    }
}

export interface CLC
{
    title: string,
    filter: Filter
}
