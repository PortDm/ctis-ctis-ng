import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { iGroups, iGroupsCreate, iGroupsUniq, iGroupsUpdate } from "../groups.interfaces";


const DB_SERVER_GROUPS = environment.dbServetUrl + '/groups'

@Injectable()
export class GroupsService {
    constructor(
        private http: HttpClient
    ) { }

    getAll(token: string | null): Observable<iGroups[]> {
        return this.http.get<iGroups[]>(`${DB_SERVER_GROUPS}/${token}`)
    }

    getOneById(id: number, token: string | null): Observable<iGroups> {
        return this.http.get<iGroups>(`${DB_SERVER_GROUPS}/onegroup/${id}/${token}`)
    }

    uniq(group: iGroupsUniq, token: string | null): Observable<iGroups[]> {
        return this.http.post<iGroups[]>(`${DB_SERVER_GROUPS}/uniq/${token}`, group)
    }

    isAccessToCreate(token: string | null): Observable<boolean | HttpErrorResponse> {
        return this.http.get<boolean | HttpErrorResponse>(`${DB_SERVER_GROUPS}/isAccessToCreate/${token}`)
    }

    create(groupCreate: iGroupsCreate, token: string | null): Observable<iGroups | HttpErrorResponse> {
        return this.http.post<iGroups>(`${DB_SERVER_GROUPS}/create/${token}`, groupCreate)
    }

    update(groupUpdate: iGroupsUpdate, token: string | null): Observable<iGroups | HttpErrorResponse> {
        return this.http.put<iGroups>(`${DB_SERVER_GROUPS}/update/${token}`, groupUpdate)
    }

    remove(id: number, token: string | null) {
        return this.http.delete(`${DB_SERVER_GROUPS}/delete/${id}/${token}`)
    }
}