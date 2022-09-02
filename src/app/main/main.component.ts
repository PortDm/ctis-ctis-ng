import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../shared/services/message.service";
import { MessageType } from "../shared/shared.interfaces";
import { AuthService } from "../admin/services/auth.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    constructor(
        public authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    goToUsersList() {
        this.router.navigate(['/users', 'list'])
    }

    addMessage() {
        this.messageService.show('Message main component', MessageType.success)
    }
}