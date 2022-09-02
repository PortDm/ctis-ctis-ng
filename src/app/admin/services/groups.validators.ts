import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { map, Observable } from "rxjs";
import { iGroupsUniq } from "../groups.interfaces";
import { AuthService } from "./auth.service";
import { GroupsService } from "./groups.service";

@Injectable()
export class GroupsValidators {

    groupUpdateId: number

    constructor(
        private groupsService: GroupsService,
        private auth: AuthService
    ) { }

    uniqCreate(control: AbstractControl): Observable<{groupsUniq: true} | null> {
        const group: iGroupsUniq = {
            name: control.value
        }
        return this.groupsService.uniq(group, this.auth.token)
            .pipe(
                map(groupsUniq => {
                    if(groupsUniq.length) {
                        return {groupsUniq: true}
                    } else {
                        return null
                    }
                })
            )
    }

    uniqUpdate(control: AbstractControl): Observable<{groupsUniq: true} | null> {
        const group: iGroupsUniq = {
            name: control.value
        }
        return this.groupsService.uniq(group, this.auth.token)
            .pipe(
                map(groupsUniq => {
                    const filterGroups = groupsUniq.filter(g => g.id !== +this.groupUpdateId)
                    if(filterGroups.length) {
                        return {groupsUniq: true}
                    } else {
                        return null
                    }
                })
            )
    }
    
}