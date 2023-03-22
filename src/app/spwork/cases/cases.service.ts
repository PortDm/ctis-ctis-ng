import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/admin/services/auth.service";
import { environment } from "src/environments/environment";
import { IAccountCreateDto, IVolumeUniqDto, IVolumns, IYears } from "./cases.interfaces";

const DB_SERVER = environment.dbServetUrl

@Injectable()
export class CasesService {
    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) { }
    
    yearsGetAll(): Observable<IYears[]> {
        return this.http.get<IYears[]>(`${DB_SERVER}/years/getAll/${this.auth.token}`)
    }

    // caseCreate(caseCreateDto: ICasesCreateDto): Observable<IYears> {
    //     return this.http.post<IYears>(`${DB_SERVER}/years/create/${this.auth.token}`, caseCreateDto)
    // }

    // yearsAddCase(yearAddCase: IYearsAddCaseDto): Observable<IYears> {
    //     return this.http.patch<IYears>(`${DB_SERVER}/years/add-case/${this.auth.token}`, yearAddCase)
    // }

    accountCreate(accountCreateDto: IAccountCreateDto): Observable<IVolumns> {
        return this.http.post<IVolumns>(`${DB_SERVER}/deposit/create-account/${this.auth.token}`, accountCreateDto)
    }

    volumeUniq(volumeUniqDto: IVolumeUniqDto): Observable<boolean> {
        return this.http.post<boolean>(`${DB_SERVER}/deposit/volume/uniq/${this.auth.token}`, volumeUniqDto)
    }
}