import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/admin/services/auth.service";
import { environment } from "src/environments/environment";
import { IConcSewVolumeDto, IConcs, IConcsAddDevs, IConcsCreateDto, IConcsUpdateDto } from "./concls.interfaces";

const DB_SERVER_CONCS = environment.dbServetUrl + '/concs'

@Injectable()
export class ConcsService {

    concUpdate: IConcs

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) {}

    getOneById(id: number): Observable<IConcs> {
        return this.http.get<IConcs>(`${DB_SERVER_CONCS}/getOne/${this.auth.token}/${id}`)
    }

    getAll(): Observable<IConcs[]> {
        return this.http.get<IConcs[]>(`${DB_SERVER_CONCS}/getAll/${this.auth.token}`)
    }

    concsByVolume(idVolume: number): Observable<IConcs[]> {
        return this.http.get<IConcs[]>(`${DB_SERVER_CONCS}/getByVolume/${this.auth.token}/${idVolume}`)
    }

    create(concsCreateDto: IConcsCreateDto): Observable<IConcs | HttpErrorResponse> {
        return this.http.post<IConcs>(`${DB_SERVER_CONCS}/create/${this.auth.token}`, concsCreateDto)
    }

    update(id: number, concsUpdateDto: IConcsUpdateDto): Observable<IConcs | HttpErrorResponse> {
        return this.http.post<IConcs>(`${DB_SERVER_CONCS}/update/${this.auth.token}/${id}`, concsUpdateDto)
    }

    sewIntoVolume(concSewIntoVolume: IConcSewVolumeDto) {
        return this.http.put(`${DB_SERVER_CONCS}/sew-into-volume/${this.auth.token}`, concSewIntoVolume)
    }

    uniq(concsCreateDto: IConcsCreateDto): Observable<boolean> {
        return this.http.post<boolean>(`${DB_SERVER_CONCS}/uniq/${this.auth.token}`, concsCreateDto)
    }

    intersectionLists(concSewIntoVolume: IConcSewVolumeDto): Observable<boolean> {
        return this.http.post<boolean>(`${DB_SERVER_CONCS}/intersection-lists/${this.auth.token}`, concSewIntoVolume)
    }

    // addDevs(concsAddDevs: IConcsAddDevs): Observable<IConcs> {
    //     return this.http.patch<IConcs>(`${DB_SERVER_CONCS}/add-devs/${this.auth.token}`, concsAddDevs)
    // }
}