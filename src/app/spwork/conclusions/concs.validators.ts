import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { IConcSewVolumeDto, IConcsCreateDto } from "./concls.interfaces";
import { ConcsService } from "./concs.service";

@Injectable()
export class ConcsValidators {
    constructor(
        private concsService: ConcsService
    ) { }


    uniqConcs(controls: AbstractControl): Observable<{concsUniq: string} | null> {
        const concUniq: IConcsCreateDto = {
            reg: controls.value.reg,
            date: controls.value.date,
            countOfLists: controls.value.countOfLists
        }
        return this.concsService.uniq(concUniq)
            .pipe(
                map((res: boolean) => {
                    if(res) {
                        return null
                    } else {
                        return {concsUniq: 'not uniq'}
                    }
                }
            ))
    }


    uniqUpdateConcs(controls: AbstractControl): Observable<{concsUniq: string} | null> {
        const concUniq: IConcsCreateDto = {
            reg: controls.value.reg,
            date: controls.value.date,
            countOfLists: controls.value.countOfLists
        }

        if(concUniq.reg === this.concsService.concUpdate.reg 
            && new Date(concUniq.date).toString() === new Date(this.concsService.concUpdate.date).toString()) {
                return of({concsUniq: 'update itself'})
        }

        return this.concsService.uniq(concUniq)
            .pipe(
                map((res: boolean) => {
                    if(res) {
                        return null
                    } else {
                        return {concsUniq: 'not uniq'}
                    }
                }
            ))
    }


    intersectionLists(controls: AbstractControl): Observable<{intersectionLists: string} | null> {
        const concSewVolumeDto: IConcSewVolumeDto = {
            concId: controls.value.concId,
            volumeId: controls.value.volumeId,
            startList: controls.value.startList
        }
        return this.concsService.intersectionLists(concSewVolumeDto)
            .pipe(
                map(res => {
                    if(res) {
                        return {intersectionLists: 'intersection'}
                    } else {
                        return null
                    }
                })
            )
    }
}