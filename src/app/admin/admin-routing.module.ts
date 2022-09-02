import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GroupsCreateComponent } from "./groups/groups-create/groups-create.component";
import { GroupsListComponent } from "./groups/groups-list/groups-list.component";
import { GroupsUpdateComponent } from "./groups/groups-update/groups-update.component";
import { LoginComponent } from "./login/login.component";
import { LogsComponent } from "./logs/logs.component";
import { AuthGuard } from "./services/auth.guard";
import { UsersCreateComponent } from "./users/users-create/users-create.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersUpdateComponent } from "./users/users-update/users-update.component";

const ROUTES: Routes = [
    {path: '', redirectTo: '/users/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'create', component: UsersCreateComponent, canActivate: [AuthGuard]},
    {path: 'list', component: UsersListComponent, canActivate: [AuthGuard]},
    {path: 'update/:id', component: UsersUpdateComponent, canActivate: [AuthGuard]},
    {path: 'logs', component: LogsComponent, canActivate: [AuthGuard]},
    {path: 'groups', children: [
        {path: 'create', component: GroupsCreateComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        {path: 'list', component: GroupsListComponent, canActivate: [AuthGuard]},
        {path: 'update/:id', component: GroupsUpdateComponent, canActivate: [AuthGuard]},

    ]}
]

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}