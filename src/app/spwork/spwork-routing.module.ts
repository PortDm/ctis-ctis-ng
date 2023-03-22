import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CasesCreateComponent } from "./cases/cases-create/cases-create.component";
import { CasesListComponent } from "./cases/cases-list/cases-list.component";
import { ConcDetailsComponent } from "./conclusions/conc-details/conc-details.component";
import { ConcsCreateComponent } from "./conclusions/concs-create/concs-create.component";
import { ConcsListComponent } from "./conclusions/concs-list/concs-list.component";
import { DevicesCartComponent } from "./devices/devices-cart/devices-cart.component";
import { DevicesCreateComponent } from "./devices/devices-create/devices-create.component";
import { DevicesListComponent } from "./devices/devices-list/devices-list.component";
import { AuthGuard } from "../admin/services/auth.guard";
import { ConcsSewIntoVolumeComponent } from "./conclusions/concs-sew-into-volume/concs-sew-into-volume.component";
import { ConcsUpdateComponent } from "./conclusions/concs-update/concs-update.component";
import { DevicesUpdateComponent } from "./devices/devices-update/devices-update.component";

const ROUTERS: Routes = [
    {path: '', redirectTo: 'devices/list', pathMatch: 'full'},
    {path: 'devices', children: [
        {path: 'list', component: DevicesListComponent, canActivate: [AuthGuard]},
        {path: 'create', component: DevicesCreateComponent, canActivate: [AuthGuard]},
        {path: 'update/:id', component: DevicesUpdateComponent, canActivate: [AuthGuard]},
        {path: 'cart', component: DevicesCartComponent}
    ]},
    {path: 'concs', children: [
        {path: 'list', component: ConcsListComponent},
        {path: 'create', component: ConcsCreateComponent},
        {path: 'update/:id', component: ConcsUpdateComponent},
        {path: 'details/:id', component: ConcDetailsComponent},
        {path: 'sew', component: ConcsSewIntoVolumeComponent}
    ]},
    {path: 'cases', children: [
        {path: 'list', component: CasesListComponent},
        {path: 'create', component: CasesCreateComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(ROUTERS)],
    exports: [RouterModule]
})
export class SpWorkRouter { }