import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { MessageService } from "src/app/shared/services/message.service";
import { ModalWindowService } from "src/app/shared/services/modal-window.service";
import { MessageType, ModalWindowType } from "src/app/shared/shared.interfaces";
import { iGroups } from "../../groups.interfaces";
import { AuthService } from "../../services/auth.service";
import { GroupsService } from "../../services/groups.service";
import { UsersService } from "../../services/users.service";
import { UsersValidators } from "../../services/users.validators";
import { iUsersCreate, iUsersUpdate } from "../../users.interfaces";

@Component({
    selector: 'app-users-update',
    templateUrl: './users-update.component.html',
    styleUrls: ['./users-update.component.scss']
})
export class UsersUpdateComponent {

    userId: number
    form: FormGroup
    checkBoxes: FormArray
    isSubmit = false
    confirmPswLenth = 0
    groups: iGroups[]
    changePsw = false

    constructor(
        private usersService: UsersService,
        private groupsService: GroupsService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private usersValidators: UsersValidators,
        private messageService: MessageService,
        private modalWindow: ModalWindowService
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(
                switchMap(params => {
                    this.userId = params['id']
                    this.usersService.userUpdateId = this.userId
                    return this.groupsService.getAll(this.authService.token)
                }),
                switchMap(groups => {
                    this.groups = groups
                    return this.usersService.getOneById(this.userId, this.authService.token)
                })
            ).subscribe(user => {
                const userGroupsName: string[] = user.groups.map(g => g.name)
              this.checkBoxes = new FormArray([], this.usersValidators.checkBoxesRequired)
              this.groups.map(g => {
                  const checked = userGroupsName.includes(g.name)
                  this.checkBoxes.push(new FormControl(checked))
              })

              this.form = new FormGroup({
                    lastName: new FormControl(user.lastName, Validators.required),
                    firstName: new FormControl(user.firstName, Validators.required),
                    middleName: new FormControl(user.middleName, Validators.required),
                    dep: new FormControl(user.dep, Validators.required),
                    post: new FormControl(user.post, Validators.required),
                    rank: new FormControl(user.rank, Validators.required),
                    login: new FormControl(user.login, Validators.required, this.usersValidators.uniqLoginUpdate.bind(this.usersValidators)),
                    passwordStr: new FormControl('1234567890', Validators.required),
                    confirmPswStr: new FormControl('1234567890', [Validators.required, Validators.minLength(this.confirmPswLenth)]),
                    birth: new FormControl(user.birth.toString().split('T')[0]),
                    checkBoxes: this.checkBoxes
                }, 
                    this.usersValidators.pswConfirm
                ) 
            })
    }

    submitUpdateUser() {
        if(this.form.invalid || 
            this.form.value.passwordStr !== this.form.value.confirmPswStr) {
            return
        }

        this.isSubmit = true

        let passwordAES = ''
        if(this.changePsw) {
            passwordAES = this.authService.generatePassAES(this.form.value.login, this.form.value.passwordStr)
        }

        const groupsIds: number[] = []
        for(let i=0; i<this.groups.length; i++) {
            if(this.form.value.checkBoxes[i]) {
                groupsIds.push(this.groups[i].id)
            }
        }
        const userUpdate: iUsersUpdate = {
            id: this.userId,
            lastName: this.form.value.lastName,
            firstName: this.form.value.firstName,
            middleName: this.form.value.middleName,
            dep: this.form.value.dep,
            post: this.form.value.post,
            rank: this.form.value.rank,
            login: this.form.value.login,
            passwordAES,
            birth: this.form.value.birth ? this.form.value.birth  : '1970-01-01',
            groupsIds
        }

        this.usersService.update(userUpdate)
            .subscribe( {
                next: user => {
                    this.isSubmit = false
                    this.router.navigate(['users', 'list'])
                    this.messageService.show('Update user has been successful', MessageType.success)
                },
                error: (err) => {
                    this.isSubmit = false
                    console.error('Error update users: ', err)
                    this.messageService.show(err.error.message, MessageType.danger)
                }     
            })
    }

    cancel() {
        this.modalWindow.show('Do you sure cancel? Unsaved data will be lost', ModalWindowType.danger)
            .subscribe(res => {
                if(res) {
                    this.router.navigate(['/users', 'list'])
                }
            })            
    }
}