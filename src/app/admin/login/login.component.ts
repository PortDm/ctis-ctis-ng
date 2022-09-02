import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";
import { MessageType } from "src/app/shared/shared.interfaces";

import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup
    isSubmit = false
    accessDefined = false
    tokenTimeout = false
    previousUser = ''

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.tokenTimeout = params['tokenTimeout']
                this.previousUser = params['previousUser']
            })

        this.form = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
    }

    submit() {
        if(this.form.invalid) {
            return
        }

        this.isSubmit = true
        this.authService.login(this.form.value.login, this.form.value.password)
            .subscribe({
                next: (loginResponce) => {
                    if(loginResponce) {
                        if(this.form.value.login === this.previousUser) {
                            this.messageService.show(`С возвращением, ${loginResponce.userName}!`, MessageType.success)
                        } else {
                            this.messageService.show(`Здравствуйте, ${loginResponce.userName}!`, MessageType.success)
                        }
                        localStorage.setItem('userLogin', this.form.value.login)
                        localStorage.setItem('userGroups', loginResponce.userGroups.toString())
                        this.router.navigate(['/users', 'list'])
                    }
                    else {
                        this.accessDefined = true
                    }
                },
                error: (error) => {
                    console.log('login error', error)
                    this.isSubmit = false
                },
                complete: () => {
                    this.isSubmit = false
                }
            })


    }
}