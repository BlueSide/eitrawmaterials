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
    
    constructor(private clcs: ClcService) { }

}
