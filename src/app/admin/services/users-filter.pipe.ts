import { Pipe, PipeTransform } from "@angular/core";
import { iUsers } from '../users.interfaces'

@Pipe({
    name: 'userFilter'
})
export class UsersFilterPipe implements PipeTransform {
    transform(users: iUsers[], lastNameFilter: string, loginFilter: string): iUsers[] {
        return users.filter(u => 
            u.lastName.toLowerCase().toString().includes(lastNameFilter.toLowerCase()) &&
            u.login.toLowerCase().toString().includes(loginFilter.toLowerCase())
        )
    }

}