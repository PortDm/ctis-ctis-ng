import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";
import { ModalWindowService } from "src/app/shared/services/modal-window.service";
import { MessageType, ModalWindowType } from "src/app/shared/shared.interfaces";
import { iGroupsCreate } from "../../groups.interfaces";
import { AuthService } from "../../services/auth.service";
import { GroupsService } from "../../services/groups.service";
import { GroupsValidators } from "../../services/groups.validators";

@Component({
    selector: 'app-groups-create',
    templateUrl: './groups-create.component.html',
    styleUrls: ['./groups-create.component.scss']
})
export class GroupsCreateComponent implements OnInit {
    form: FormGroup
    isSubmit = false
    errorMessage = ''

    constructor(
        private groupsService: GroupsService,
        private authService: AuthService,
        private message: MessageService,
        private modalWindow: ModalWindowService,
        private router: Router,
        private groupsValidators: GroupsValidators
    ) { }

    ngOnInit() {
        this.groupsService.isAccessToCreate(this.authService.token)
            .subscribe({
                next: accessRes => {
                    if(accessRes) {
                        this.form = new FormGroup({
                            name: new FormControl('', Validators.required, this.groupsValidators.uniqCreate.bind(this.groupsValidators))
                        })
                    }
                },
                error: err => {
                    console.log('error access to create group', err)
                    this.message.show(err.error.message, MessageType.danger)
                    this.errorMessage = err.error.message
                }
            })
    }

    submitCreateGroups() {
        if(this.form.invalid) {
            return
        }

        this.isSubmit = true

        const groupCreate: iGroupsCreate = {
            name: this.form.value.name
        }

        this.groupsService.create(groupCreate, this.authService.token)
            .subscribe({
                next: (group) => {
                    this.form.reset()
                    this.isSubmit = false
                    this.message.show(`Group "${group.name}" has been created`, MessageType.success)
                    this.router.navigate(['/users', 'groups', 'list'])
                },
                error: (err) => {
                    console.log('create groups error: ', err.error)
                    this.isSubmit = false
                }
            })
    }

    cancel() {
        if(this.form.value.name !== ''){
            this.modalWindow.show('Do you sure cancel. Unsaved data will be lost', ModalWindowType.danger)
                .subscribe(res => {
                    if(res) {
                        this.router.navigate(['/users', 'groups', 'list'])
                    }
                })            
        } else {
            this.router.navigate(['/users', 'groups', 'list'])
        }

    }
}