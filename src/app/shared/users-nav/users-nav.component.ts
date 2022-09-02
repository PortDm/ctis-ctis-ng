import { Component } from "@angular/core";
import { AuthService } from "src/app/admin/services/auth.service";

@Component({
    selector: 'app-users-nav',
    templateUrl: './users-nav.component.html',
    styleUrls: ['./users-nav.component.scss']
})
export class UsersNavComponent {
    constructor(
        public authService: AuthService
    ) { }
}