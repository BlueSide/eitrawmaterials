import { Injectable } from '@angular/core';
import { Filter } from '../sp-dashboard/Filter';

const CLC_FIELD = "KIC_x0020_Group_x0020_Entity_x00";

@Injectable({
  providedIn: 'root'
})
export class ClcService
{
    public activeClc: CLC;

    public hq: CLC = {
        id: 'hq',
        title: 'HQ',
        field: '1. KIC HQ',
        filter: new Filter((item) => item, true)
    };
    
    private clcs: CLC[] = [
        {
        id: 'clc-north',
        title: 'CLC North',
        field: '2. CLC North',
        filter: new Filter((item) => item[CLC_FIELD] === "2. CLC North", true)
    },
        {
        id: 'clc-baltic-sea',
        title: 'CLC Baltic Sea',
        field: '3. CLC Baltic Sea',
        filter: new Filter((item) => item[CLC_FIELD] === "3. CLC Baltic Sea", true)
    },
        {
        id: 'clc-west',
        title: 'CLC West',
        field: '4. CLC West',
        filter: new Filter((item) => item[CLC_FIELD] === "4. CLC West", true)
    },
        {
        id: 'clc-central',
        title: 'CLC Central',
        field: '5. CLC Central',
        filter: new Filter((item) => item[CLC_FIELD] === "5. CLC Central", true)
    },

        {
        id: 'clc-east',
        title: 'CLC East',
        field: '6. CLC East',
        filter: new Filter((item) => item[CLC_FIELD] === "6. CLC East", true)
    },

        {
        id: 'clc-south',
        title: 'CLC South',
        field: '7. CLC South',
        filter: new Filter((item) => item[CLC_FIELD] === "7. CLC South", true)
    }
    ];
    
    constructor() {}

    public getClc(id: string): CLC
    {
        return this.clcs.find((item) => item.id === id);
    }
    
    public getClcs(): CLC[]
    {
        return this.clcs;
    }

    public isActive(id: string): boolean
    {
        if(!this.activeClc) return false;

        return this.activeClc.id === id;
    }
}

export interface CLC
{
    id: string,
    title: string,
    field: string,
    filter: Filter
}
