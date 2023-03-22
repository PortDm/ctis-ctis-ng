import { NgModule } from "@angular/core";

import { UsersCreateComponent } from "./users/users-create/users-create.component";
import { UsersRoutingModule } from "./admin-routing.module";
import { UsersService } from "./services/users.service";
import { UsersValidators } from "./services/users.validators";
import { ConfirmPswEndsPipe } from "./services/confirm-psw-ends.pipe";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { AuthGuard } from "./services/auth.guard";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { GroupsService } from "./services/groups.service";
import { GroupsCreateComponent } from "./groups/groups-create/groups-create.component";
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupsUpdateComponent } from "./groups/groups-update/groups-update.component";
import { GroupsValidators } from "./services/groups.validators";
import { UsersUpdateComponent } from "./users/users-update/users-update.component";
import { UsersFilterPipe } from "./services/users-filter.pipe";
import { LogsComponent } from "./logs/logs.component";
import { LogsService } from "./services/logs.service";

@NgModule({
    declarations: [
        LoginComponent,
        UsersListComponent,
        UsersCreateComponent,
        UsersUpdateComponent,
        GroupsCreateComponent,
        GroupsListComponent,
        GroupsUpdateComponent,
        ConfirmPswEndsPipe,
        UsersFilterPipe,
        LogsComponent
    ],
    providers: [
        UsersService,
        GroupsService,
        AuthGuard,
        UsersValidators,
        GroupsValidators,
        LogsService
    ],
    imports: [
        SharedModule,
        UsersRoutingModule
    ]
})
export class UsersModule {

}