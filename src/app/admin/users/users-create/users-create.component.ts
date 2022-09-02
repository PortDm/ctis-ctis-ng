import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { iUsersCreate } from "../../users.interfaces";
import { UsersService } from "../../services/users.service";
import { AuthService } from "../../services/auth.service";
import { UsersValidators } from "../../services/users.validators";
import { MessageService } from "src/app/shared/services/message.service";
import { MessageType } from "src/app/shared/shared.interfaces";
import { GroupsService } from "../../services/groups.service";
import { iGroups } from "../../groups.interfaces";
import { catchError, Observable, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-users-create',
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

    form: FormGroup
    checkBoxes: FormArray
    isSubmit = false
    confirmPswLenth = 0
    groups: iGroups[]
    errorMessage = ''

    constructor(
        private usersService: UsersService,
        private groupsService: GroupsService,
        private authService: AuthService,
        private router: Router,
        private usersValidators: UsersValidators,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.usersService.isAccessToCreate(this.authService.token)
            
            .pipe(
                catchError(err => {
                    console.log('error access to create users', err)
                    this.messageService.show(err.error.message, MessageType.danger)
                    this.errorMessage = err.error.message
                    return of(false)
                }),
                switchMap(
                    accessRes => {
                        return accessRes ?
                            this.groupsService.getAll(this.authService.token) :
                            of(false)
                })
            )
            .subscribe(groups => {
                if(typeof(groups) !== 'boolean') {
                    this.groups = groups

                    this.checkBoxes = new FormArray([], this.usersValidators.checkBoxesRequired)
                    this.groups.map(g => this.checkBoxes.push(new FormControl(g.checked)))

                    this.form = new FormGroup({
                        lastName: new FormControl('', Validators.required),
                        firstName: new FormControl('', Validators.required),
                        middleName: new FormControl('', Validators.required),
                        dep: new FormControl('', Validators.required),
                        post: new FormControl('', Validators.required),
                        rank: new FormControl('', Validators.required),
                        login: new FormControl('', Validators.required, this.usersValidators.uniqLogin.bind(this.usersValidators)),
                        passwordStr: new FormControl('', Validators.required),
                        confirmPswStr: new FormControl('', [Validators.required, Validators.minLength(this.confirmPswLenth)]),
                        birth: new FormControl(''),
                        checkBoxes: this.checkBoxes
                    }, 
                        this.usersValidators.pswConfirm
                    )   
                }


    
            })
    }

    submitCreateUser() {
        if(this.form.invalid || 
            this.form.value.passwordStr !== this.form.value.confirmPswStr) {
            return
        }

        this.isSubmit = true

        const passwordAES = this.authService.generatePassAES(this.form.value.login, this.form.value.passwordStr)
        const groupsIds: number[] = []
        for(let i=0; i<this.groups.length; i++) {
            if(this.form.value.checkBoxes[i]) {
                groupsIds.push(this.groups[i].id)
            }
        }
        const userCreate: iUsersCreate = {
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


        console.log('create user: ', userCreate)
        this.usersService.create(userCreate)
            .subscribe( {
                next: user => {
                    this.isSubmit = false
                    this.router.navigate(['users', 'list'])
                    this.messageService.show('Create has been successful', MessageType.success)
                },
                error: (err) => {
                    this.isSubmit = false
                    console.error(err)
                    this.messageService.show(err.error.message, MessageType.danger)
                },
                complete: () => {
                    this.isSubmit = false
                }        
            })
    }
}