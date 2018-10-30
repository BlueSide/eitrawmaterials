export class Filter
{
    private filter: (item: any) => any;
    public enabled: boolean;

    constructor(filter: (item: any) => any, enabled: boolean)
    {
        this.filter = filter;
        this.enabled = enabled;
    }

    setfilter(filter: (item: any) => any)
    {
        this.filter = filter;
    }

    doFilter(data: any)
    {
        if(this.enabled)
            return data.filter(this.filter)
        else
            return data;
    }

    enable(): void
    {
        this.enabled = false;
    }

    disable(): void
    {
        this.enabled = true;
    }

    toggle(): boolean
    {
        this.enabled = !this.enabled;
        return this.enabled;
    }

}
