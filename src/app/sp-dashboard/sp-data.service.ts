import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import { timer } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare var UIkit: any;

const USE_MOCK_DATA: boolean = false;
const LIVE_UPDATE_INTERVAL: number = 5000; //milliseconds

//TODO: Ensure always all items are received!
const MAX_RESPONSE_ITEMS: number = 5000;

@Injectable()
export class SPDataService
{

    private url: string = environment.sharePointUrl;
    
    private subscriptions: any[] = [];

    public useMockData: boolean = environment.mockData;

    constructor(
        private http: HttpClient
    )
    {
        if(!this.useMockData)
        {
            this.startLiveUpdate();            
        }
        else
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
    }

    private startLiveUpdate()
    {
        let liveUpdateTimer = timer(0, LIVE_UPDATE_INTERVAL).subscribe((ticks) => {
            this.update();            
        });
    }

    public update()
    {
        for(let subscription in this.subscriptions)
        {
            let sub = this.getList(subscription).subscribe((data) => {
                                
                let spList: SPList = {
                    name: subscription,
                    data: data
                };

                for(let callback of this.subscriptions[subscription])
                {
                    callback(spList);
                }
            });
        }
    }
    
    public addSubscription(listName: string, callback:(any) => void): void
    {
        if(!this.subscriptions[listName])
        {
            this.subscriptions[listName] = [callback];
        }
        else
        {
            this.subscriptions[listName].push(callback);
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
