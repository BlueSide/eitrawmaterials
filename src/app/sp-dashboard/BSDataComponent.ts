import { SPDataService, SPList } from './sp-data.service';
import { BSGlobalFilter } from './BSGlobalFilter';
import { environment } from '../../environments/environment';

export abstract class BSDataComponent
{

    protected unfilteredLists: any = {};
    protected globalFilteredLists: any = {};
    protected lists: any = {};
    
    protected usesLocalFilter: boolean = true;
    protected usesGlobalFilter: boolean = true;

    protected abstract onNewData(): void;
    
    constructor(private spData: SPDataService, public globalFilter: BSGlobalFilter) {}


    protected subscribe(listName: string): void
    {
        this.spData.addSubscription(listName, this.processNewData.bind(this));
    }

    protected filter(data: any[]): any
    {
        return data;
    }
    
    public groupBy(list, keyGetter): Map<any, any[]>
    {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    public sum(array, column: string): number
    {
        let result: number = 0;

        for(let item of array)
        {
            result += Number(item[column]);
        }
        
        return result;
    }
    
    public toggleLocalFilter()
    {
        this.usesLocalFilter = !this.usesLocalFilter;
        this.spData.update();
    }

    public processNewData(list: SPList): void
    {
        this.unfilteredLists[list.name] = list.data.value;

        this.globalFilteredLists[list.name] = this.globalFilter.filter(list.data.value);
        if(this.usesLocalFilter)
        {
            this.lists[list.name] = this.filter(this.globalFilteredLists[list.name]);
        }
        else
        {
            this.lists[list.name] = this.globalFilteredLists[list.name];
        }

        this.onNewData();
    }
}
