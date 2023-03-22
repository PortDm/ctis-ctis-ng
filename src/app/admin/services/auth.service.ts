import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { iLoginResponce } from "../users.interfaces";
import { Router } from "@angular/router";


const DB_SERVER = environment.dbServetUrl

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    get userLogin(): string | null {
        return localStorage.getItem('userLogin')
    }

    get token(): string | null {
        return localStorage.getItem('token')
    }

    setToken(token: iLoginResponce | null) {
        if(token) {
            localStorage.setItem('token', token.tokenHash)
        } else {
            localStorage.clear()
        }
    }

    login(login: string, passStr: string): Observable<iLoginResponce | null> {
        const passwordAES = this.generatePassAES(login, passStr)
        return this.http.post<iLoginResponce>(`${DB_SERVER}/users/login`, { login, passwordAES })
            .pipe(
                tap(this.setToken)
            )
    }
    
    generatePassAES(login: string, passStr: string): string {
        const CriptoJS = require('../../../../node_modules/crypto-js')
        return CriptoJS.AES.encrypt(passStr, login + environment.passkey).toString()
    }

    logout() {
        this.http.get(`${DB_SERVER}/tokens/logout/${this.token}`)
            .subscribe(res => {
                console.log(`logout res: ${res}`)
                this.router.navigate(['/users', 'login'], {queryParams: {previousUser: localStorage.getItem('userLogin')}})
                this.setToken(null)
            })

    }

    isAuth(): Observable<boolean> {
        return this.http.get<iLoginResponce>(`${DB_SERVER}/tokens/isValidToken/${this.token}`)
        .pipe(
            map(isValidToken => {
                if(isValidToken) {
                    return true
                } else {
                    this.router.navigate(['/users', 'login'], {
                        queryParams: {tokenTimeout: true, previousUser: localStorage.getItem('userLogin')}
                    })
                    this.setToken(null)
                    return false
                }
            })
        ) 
    }


}