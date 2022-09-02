import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { iFilters, iLogs } from "../logs.interfaces";

const DB_SERVER_LOGS = environment.dbServetUrl + '/logs'

@Injectable()
export class LogsService {
    constructor(
        private http: HttpClient
    ) { }

    getAll(token: string | null): Observable<iLogs[]> {
        return this.http.get<iLogs[]>(`${DB_SERVER_LOGS}/all/${token}`)
    }

    filters(token: string | null, filters: iFilters): Observable<iLogs[]> {
        return this.http.post<iLogs[]>(`${DB_SERVER_LOGS}/filters/${token}`, filters)
    }

    count(): Observable<number> {
        return this.http.get<number>(`${DB_SERVER_LOGS}/count`)
    }
}