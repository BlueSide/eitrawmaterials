export class BSGlobalFilter
{
    protected filterChain: (data: any[]) => any[] = (data) => { return data; };
    
    constructor() {}

    public filter(data: any[]): any[]
    {
        return this.filterChain(data);
    }

    //IMPORTANT: This function is dependent on the GUID property of a SharePoint item.
    public and(a: any[], b: any[])
    {
        let result: any[] = [];
        a.forEach(
            (itemA) => {
                result.push( b.find( (itemB) => itemB['GUID'] === itemA['GUID'] ));          
            }
        );
        
        return result.filter((item) => item);
    }

    //IMPORTANT: This function is dependent on the GUID property of a SharePoint item.
    public or(a: any[], b: any[])
    {
        return a.concat(b).filter(
            (obj, pos, arr) => {
                return arr.map(mapObj => mapObj['GUID']).indexOf(obj['GUID']) === pos;
            }
        );
    }

}
