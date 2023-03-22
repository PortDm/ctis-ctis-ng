import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { map, Observable } from "rxjs";
import { IVolumeUniqDto } from "./cases.interfaces";
import { CasesService } from "./cases.service"

@Injectable()
export class CasesValidators {
    constructor(
        private casesService: CasesService
    ) { }

    volumeUniq(controls: AbstractControl): Observable<{volumeUniq: string} | null> {
        const volumeUniqDto: IVolumeUniqDto = {
            year: controls.value.year,
            case: controls.value.caseName,
            volume: controls.value.volume
        }
        return this.casesService.volumeUniq(volumeUniqDto)
                .pipe(
                    map(res => {
                        return res ? null : {volumeUniq: 'not uniq'}
                    })
                )
    }
}