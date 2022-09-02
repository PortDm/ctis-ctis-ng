import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, Validators } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { iUsers } from "../users.interfaces";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

@Injectable()
export class UsersValidators {

    constructor(
        private usersService: UsersService,
        private auth: AuthService
        ) { }

    pswConfirm(controls: AbstractControl): {pswConfirm: boolean} |  null {
        const password: string = controls.value.passwordStr
        const confirmPsw: string = controls.value.confirmPswStr
        
        if(confirmPsw.length > password.length) {
            return {pswConfirm: true}
        }

        if( (confirmPsw.length === password.length) && (password !== confirmPsw)) {
            return {pswConfirm: true}
        }

        return null
    }

    uniqLogin(controls: AbstractControl): Observable<{uniqLogin: true} | null> {
        return this.usersService.getOneByLogin(controls.value, this.auth.token)
            .pipe(
                map(users => {
                    if(users) {
                        return {uniqLogin: true}
                    } else {return null}
                })
            )
    }

    uniqLoginUpdate(controls: AbstractControl): Observable<{uniqLoginUpdate: true} | null> {
        return this.usersService.getByLogin(controls.value, this.auth.token)
            .pipe(
                map((users: iUsers[]) => {
                    if(users) {
                        const usersFilter = users.filter(u => u.id !== +this.usersService.userUpdateId)
                        if(usersFilter.length) {
                            return {uniqLoginUpdate: true}
                        }
                    }
                    
                    return null
                })
            )
    }

    checkBoxesRequired(control: AbstractControl): {checkBoxesRequired: boolean} | null {
        
        const formArray = control as FormArray
        const checkBoxes = formArray.controls
        const res = checkBoxes.filter(checkBox => checkBox.value === true)
        if(res.length === 0) {
            return {checkBoxesRequired: true}
        }

        return null
    }
}