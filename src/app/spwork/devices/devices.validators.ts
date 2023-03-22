import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { IDevicesUniqDto } from "./devices.interfaces";
import { DevicesService } from "./devices.service";
import { IPointsUniqDto } from "./points.interfaces";
import { PointsService } from "./points.service";

@Injectable()
export class DevicesValidators {
    constructor(
        private devService: DevicesService,
        private pointsService: PointsService
    ) { }


    devUniq(control: AbstractControl): Observable<{devUniq: string} | null> {
        const devUniqDto: IDevicesUniqDto = {
            sn: control.value
        }
        return this.devService.devUniq(devUniqDto)
            .pipe(
                map(res => res ? null : {devUniq: 'not uniq'})
            )
    }


    devUpdateUniq(control: AbstractControl): Observable<{devUniq: string} | null> {
        const devUniqDto: IDevicesUniqDto = {
            sn: control.value
        }

        if(devUniqDto.sn === 'б/н') {
            return of(null)
        }

        if(this.devService.devUpdate.sn === devUniqDto.sn) {
            // return of({devUniq: 'update itself'})
            return of(null)
        }

        return this.devService.devUniq(devUniqDto)
            .pipe(
                map(res => res ? null : {devUniq: 'not uniq'})
            )
    }


    pointUniq(controls: AbstractControl): Observable<{pointUniq: string} | null> {
        const pointUniqDto: IPointsUniqDto = {
            point: controls.value.point,
            listId: controls.value.listId
        }
        return this.pointsService.pointUniq(pointUniqDto)
                .pipe(
                    map(res => res ? null : {pointUniq: 'not uniq'})
                )
    }

    pointDevUpdateUniq(controls: AbstractControl): Observable<{pointUniq: string} | null> {
        const pointUniqDto: IPointsUniqDto = {
            point: controls.value.point,
            listId: controls.value.listId
        }

        if(this.devService.devUpdate.points 
            && this.devService.devUpdate.points[0].point === pointUniqDto.point
            && this.devService.devUpdate.points[0].list.id === pointUniqDto.listId) {
                return of(null)
        }

        return this.pointsService.pointUniq(pointUniqDto)
                .pipe(
                    map(res => res ? null : {pointUniq: 'not uniq'})
                )
    }
}