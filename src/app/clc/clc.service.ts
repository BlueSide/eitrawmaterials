import { Injectable } from '@angular/core';
import { Filter } from '../sp-dashboard/Filter';

const CLC_FIELD = "KIC_x0020_Group_x0020_Entity_x00";

@Injectable({
  providedIn: 'root'
})
export class ClcService
{
    private clcs: CLC[] = [
        {
        id: 'clc-north',
        title: 'CLC North',
        filter: new Filter((item) => item[CLC_FIELD] === "2. CLC North", false)
    },
        {
        id: 'clc-baltic-sea',
        title: 'CLC Baltic Sea',
        filter: new Filter((item) => item[CLC_FIELD] === "3. CLC Baltic Sea", false)
    },
        {
        id: 'clc-west',
        title: 'CLC West',
        filter: new Filter((item) => item[CLC_FIELD] === "4. CLC West", false)
    },
        {
        id: 'clc-central',
        title: 'CLC Central',
        filter: new Filter((item) => item[CLC_FIELD] === "5. CLC Central", false)
    },

        {
        id: 'clc-east',
        title: 'CLC East',
        filter: new Filter((item) => item[CLC_FIELD] === "6. CLC East", false)
    },

        {
        id: 'clc-south',
        title: 'CLC South',
        filter: new Filter((item) => item[CLC_FIELD] === "7. CLC South", false)
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
}

export interface CLC
{
    id: string,
    title: string,
    filter: Filter
}
