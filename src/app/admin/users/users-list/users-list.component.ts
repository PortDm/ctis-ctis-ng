import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/app/shared/services/message.service";
import { ModalWindowService } from "src/app/shared/services/modal-window.service";
import { MessageType, ModalWindowButtons, ModalWindowType } from "src/app/shared/shared.interfaces";
import { UsersService } from "../../services/users.service";
import { iUsers } from "../../users.interfaces";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: iUsers[]
    errorMessage = ''
    lastNameFilter = ''
    loginFilter = ''

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private modalWindowService: ModalWindowService
    ) {}

    ngOnInit() {
        this.loadUsers()
    }

    loadUsers() {
        this.usersService.getAll()
            .subscribe({
                next: (users) => this.users = users,
                error: (error) => {
                    console.log(error)
                    this.messageService.show(error.error.message, MessageType.danger)
                    this.errorMessage = error.error.message
                }
            })        
    }

    remove(id: number) {
        this.modalWindowService.show('Do you sure remove user?', ModalWindowType.danger)
            .subscribe(res => {
                if(res) {
                   this.usersService.remove(id)
                    .subscribe( {
                        next: () => {
                            this.loadUsers()
                            this.messageService.show('Users has been remove', MessageType.danger)
                        },
                        error: (err) => {
                            console.log('remove users error', err)
                            this.messageService.show(err.error.message, MessageType.danger)
                        }
                    }) 
                }
            })
        
    }
}