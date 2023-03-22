import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/admin/services/auth.service";
import { environment } from "src/environments/environment";
import { IDevices, IDevicesCreateDto, IDevicesFilters, IDevicesUniqDto, IDevicesUpdateDto } from "./devices.interfaces";

const DB_SERVER_DEVICES = environment.dbServetUrl + '/devices'

@Injectable()
export class DevicesService {

    // devsInCart: IDevices[] = []
    devUpdate: IDevices

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        // private message: MessageService
    ) { }

    getAll(): Observable<IDevices[]> {
        return this.http.get<IDevices[]>(`${DB_SERVER_DEVICES}/getAll/${this.auth.token}`)
    }

    getOne(id: number): Observable<IDevices> {
        return this.http.get<IDevices>(`${DB_SERVER_DEVICES}/getOne/${this.auth.token}/${id}`)
    }

    create(devCreateDto: IDevicesCreateDto): Observable<IDevices> {
        return this.http.post<IDevices>(`${DB_SERVER_DEVICES}/create/${this.auth.token}`, devCreateDto)
    }

    update(id: number, devUpdateDto: IDevicesUpdateDto): Observable<IDevices> {
        return this.http.post<IDevices>(`${DB_SERVER_DEVICES}/update/${this.auth.token}/${id}`, devUpdateDto)
    }

    remove(id: number): Observable<IDevices> {
        return this.http.get<IDevices>(`${DB_SERVER_DEVICES}/remove/${this.auth.token}/${id}`)
    }

    filters(filters: IDevicesFilters): Observable<IDevices[]> {
        return this.http.post<IDevices[]>(`${DB_SERVER_DEVICES}/filters/${this.auth.token}`, filters)
    }

    // addDevInCart(dev: IDevices) {
    //     if(this.devsInCart.filter(d => d.id === dev.id).length > 0) {
    //         this.message.show('Device already in cart', MessageType.danger)
    //         return 
    //     }

    //     this.devsInCart.push(dev)
    //     this.message.show('Device has add to cart', MessageType.success)   
    // }


    devUniq(devUniqDto: IDevicesUniqDto): Observable<boolean> {
        return this.http.post<boolean>(`${DB_SERVER_DEVICES}/uniq/${this.auth.token}`, devUniqDto)
    }






    // clearCart() {
    //     this.devsInCart = []
    // }

}