import { Component } from "@angular/core";
import { AuthService } from "src/app/admin/services/auth.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashbaard.component.scss']
})
export class DashboardComponent {

    isShowUsers = localStorage.getItem('userGroups')?.includes('Administrators')
    isShowGroups = true // localStorage.getItem('userGroups')?.includes('Administrators')
    isShowLogs = localStorage.getItem('userGroups')?.includes('Administrators')
    isShowSpwork = true

    isExpandUsers = false
    isExpandGroups = false
    isExpandSpwork = true
    isExpandDevices = true
    isExpandConcs = true
    isExpandCases = true
    // isExpandLogs = false


    constructor(
        public auth: AuthService
    ) { }


}