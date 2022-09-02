import { Component } from "@angular/core";
import { AuthService } from "src/app/admin/services/auth.service";
import { MessageService } from "../services/message.service";
import { MessageType } from "../shared.interfaces"

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
    messageType = MessageType

    constructor(
        public auth: AuthService,
        public messageService: MessageService
    ) { }
}