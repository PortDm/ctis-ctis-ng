import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/admin/services/auth.service";
import { environment } from "src/environments/environment";
import { IPoints, IPointsUniqDto } from "./points.interfaces";


const DB_SERVER_POINT = environment.dbServetUrl + '/points'

@Injectable()
export class PointsService {
    constructor (
        private http: HttpClient,
        private auth: AuthService
    ) { }

    // getOneById(id: number) {
    //     return this.http.get<IPoints>(`${DB_SERVER_POINT}/getOneById/${this.auth.token}/${id}`)
    // }

    pointUniq(pointUniqDto: IPointsUniqDto): Observable<boolean> {
        return this.http.post<boolean>(`${DB_SERVER_POINT}/uniq/${this.auth.token}`, pointUniqDto)
    }
}