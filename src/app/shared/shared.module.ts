import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthService } from "../admin/services/auth.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { MessageComponent } from "./message/message.component";
import { ModalWindowComponent } from "./modal-window/modal-wondow.component";
import { UsersNavComponent } from "./users-nav/users-nav.component";

@NgModule({
    declarations: [
        MainLayoutComponent,
        MessageComponent,
        ModalWindowComponent,
        UsersNavComponent,
        DashboardComponent
    ],
    providers: [
        AuthService
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainLayoutComponent
    ]
})
export class SharedModule {

}