import { Pipe, PipeTransform } from "@angular/core";
import { IConcs } from "./concls.interfaces";

@Pipe({name: 'dateRome'})
export class DateRomePipe implements PipeTransform{
    transform(value: Date) {
        const date = new Date(value)
        let month: string
        switch (date.getMonth()) {
            case 0: month = 'I'; break;
            case 1: month = 'II'; break;
            case 2: month = 'III'; break;
            case 3: month = 'IV'; break;
            case 4: month = 'V'; break;
            case 5: month = 'VI'; break;
            case 6: month = 'VII'; break;
            case 7: month = 'VIII'; break;
            case 8: month = 'IX'; break;
            case 9: month = 'X'; break;
            case 10: month = 'XI'; break;
            case 11: month = 'XII'; break;
            default: month = '0'; break;
        }

        const d = date.getDate().toString()
        const year = date.getFullYear().toString().slice(2)
        return `${d}/${month}-${year}`
    }
}

@Pipe({name: 'concsFilter'})
export class ConcsFilterPipe implements PipeTransform {
    transform(value: IConcs[], reg: string, dateStart: Date, dateEnd: Date) {
        let concs: IConcs[] = value.map(conc => {return {...conc, date: new Date(conc.date)}})
        concs = reg ? concs.filter(conc => conc.reg.includes(reg)) : concs
        dateStart = dateStart ? new Date(dateStart) : new Date(Math.min.apply(Math, concs.map(conc => conc.date.getTime())))
        dateEnd = dateEnd ? new Date(dateEnd) : new Date()
        return concs.filter(conc => (conc.date >= dateStart && conc.date <= dateEnd))
    }

}