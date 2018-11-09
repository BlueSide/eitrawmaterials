import { Component } from '@angular/core';
import { ClcService, CLC } from '../clc/clc.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent
{
    //NOTE: We inject it as public so we can use it in the template
    constructor(public clcs: ClcService) { }

}
