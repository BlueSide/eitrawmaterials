import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import { timer } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare var UIkit: any;

const LIVE_UPDATE_INTERVAL: number = 10000; //milliseconds

//TODO: Ensure always all items are received!
const MAX_RESPONSE_ITEMS: number = 5000;

@Injectable()
export class SPDataService
{

    private url: string = environment.sharePointUrl;
    
    private subscribedLists: any[] = [];

    public useMockData: boolean = environment.mockData;

    constructor(private http: HttpClient)
    {
        // NOTE: Get SharePoint JWT from token service
        this.http.post<any>(environment.tokenServiceUrl, environment.sharePointCredentials)
            .subscribe(
                (data) => {
                    localStorage.setItem("token", data.token);
                    this.startLiveUpdate();
                },
                (error) => {
                    let warning = UIkit.notification('Access Token service is down!', 'danger');
                    // NOTE: Since the token stored in the local storage still might be valid,
                    //       try to load the data anyway
                    this.startLiveUpdate();        
                }
            )
    }

    private startLiveUpdate(): void
    {
        let liveUpdateTimer = timer(0, LIVE_UPDATE_INTERVAL).subscribe((ticks) => {
            this.update();            
        });
    }

    public filter(): void
    {
        for(let listName in this.subscribedLists)
        {
            for(let subscription of this.subscribedLists[listName])
            {
                subscription.newFilterCallback();
            }
        }
    }

    public update(): void
    {
        for(let listName in this.subscribedLists)
        {
            this.getList(listName).subscribe((data) => {
                let spList: SPList = {
                    name: listName,
                    data: data.value
                };

                for(let subscription of this.subscribedLists[listName])
                {
                    subscription.newDataCallback(spList);
                }
            });
        }
    }

    public addSubscription(subscription: Subscription): void
    {
        if(!this.subscribedLists[subscription.listName])
        {
            this.subscribedLists[subscription.listName] = [subscription];
        }
        else
        {
            this.subscribedLists[subscription.listName].push(subscription);
        }
    }
    
    public getList(listTitle: string): Observable<any> {
        return this.http.get<any>(`${this.url}/_api/lists/getByTitle('${listTitle}')/items?$top=${MAX_RESPONSE_ITEMS}`, this.getOptions());
    }

    public getGroup(groupName: string): Observable<any> {
        return this.http.get<any>(`${this.url}/_api/web/sitegroups/getbyname('${groupName}')/users`, this.getOptions());
        
    }

    public getLists(): Observable<any> {
        return this.http.get<any>(`${this.url}/_api/lists`, this.getOptions());
    }

    public query(query: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${query}`, this.getOptions());
    }

    private getOptions(): any
    {
        
        let headersObj: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;odata=verbose',
        };

        if(this.useMockData)
        {
            headersObj['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        let headers = new HttpHeaders(headersObj);
        return {headers: headers};
    }    

}

export interface Subscription
{
    listName: string,
    newDataCallback: (spList) => void,
    newFilterCallback: (any) => void
}

export interface SPList
{
    name: string;
    data: any;
}

export interface SPField
{
    name: string;
    internalName: string;
}
