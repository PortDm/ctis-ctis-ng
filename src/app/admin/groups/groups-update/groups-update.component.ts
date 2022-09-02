import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, tap } from "rxjs";
import { MessageService } from "src/app/shared/services/message.service";
import { ModalWindowService } from "src/app/shared/services/modal-window.service";
import { MessageType, ModalWindowType } from "src/app/shared/shared.interfaces";
import { iGroups, iGroupsCreate, iGroupsUpdate } from "../../groups.interfaces";
import { AuthService } from "../../services/auth.service";
import { GroupsService } from "../../services/groups.service";
import { GroupsValidators } from "../../services/groups.validators";

@Component({
    selector: 'app-groups-update',
    templateUrl: './groups-update.component.html',
    styleUrls: ['./groups-update.component.scss']
})
export class GroupsUpdateComponent {
    groupId: number
    form: FormGroup
    isSubmit = false

    constructor(
        private groupsService: GroupsService,
        private authService: AuthService,
        private message: MessageService,
        private modalWindow: ModalWindowService,
        private router: Router,
        private route: ActivatedRoute,
        private groupsValidators: GroupsValidators
    ) { }

    ngOnInit() {
        this.route.params
            .pipe(
                switchMap(params => {
                    this.groupId = params['id']
                    this.groupsValidators.groupUpdateId = this.groupId
                    return this.groupsService.getOneById(this.groupId, this.authService.token)
                })
            ).subscribe((group: iGroups) => {
                    this.form = new FormGroup({
                    name: new FormControl(group.name, Validators.required, this.groupsValidators.uniqUpdate.bind(this.groupsValidators))
                  })
                })
    }

    submitUpdateGroups() {
        if(this.form.invalid) {
            return
        }

        this.isSubmit = true

        const groupUpdate: iGroupsUpdate = {
            id: this.groupId,
            name: this.form.value.name
        }

        this.groupsService.update(groupUpdate, this.authService.token)
            .subscribe({
                next: (group) => {
                    this.form.reset()
                    this.isSubmit = false
                    this.message.show(`Group "${group.name}" has been update`, MessageType.success)
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