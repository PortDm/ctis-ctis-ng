import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { iUsers, iUsersCreate, iUsersUpdate } from "../users.interfaces";
import { AuthService } from "./auth.service";

const DB_SERVER_USERS = environment.dbServetUrl + '/users'

@Injectable()
export class UsersService {

    userUpdateId: number

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    getAll(): Observable<iUsers[]> {
        return this.http.get<iUsers[]>(`${DB_SERVER_USERS}/${this.auth.token}`)
    }

    getOneById(id: number, token: string | null): Observable<iUsers> {
        return this.http.get<iUsers>(`${DB_SERVER_USERS}/id/${id}/${token}`)
    }

    getOneByLogin(login: string, token: string | null): Observable<iUsers> {
        return this.http.get<iUsers>(`${DB_SERVER_USERS}/login/${login}/${token}`)
    }

    getByLogin(login: string, token: string | null): Observable<iUsers[]> {
        return this.http.get<iUsers[]>(`${DB_SERVER_USERS}/logins/${login}/${token}`)
    }

    isAccessToCreate(token: string | null): Observable<boolean | HttpErrorResponse> {
        console.log('get access to create users')
        return this.http.get<boolean | HttpErrorResponse>(`${DB_SERVER_USERS}/isAccessToCreate/${token}`)
    }
    
    create(userCreate: iUsersCreate): Observable<iUsers> {
        return this.http.post<iUsers>(`${DB_SERVER_USERS}/create/${this.auth.token}`, userCreate)
    }

    update(userUpdate: iUsersUpdate): Observable<iUsers> {
        return this.http.put<iUsers>(`${DB_SERVER_USERS}/update/${this.auth.token}`, userUpdate)
    }

    remove(id: number) {
        return this.http.delete(`${DB_SERVER_USERS}/delete/${id}/${this.auth.token}`)
    }

}