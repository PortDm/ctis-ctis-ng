import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'confirmPswEnds'
})
export class ConfirmPswEndsPipe implements PipeTransform {
    transform(value: number): string {
        if(value >=5 ) {
            return value + ' символов'
        }

        switch(value) {
            case 0: return value + ' символов';
            case 1: return value + ' символ';
            case 2: return value + ' символа';
            case 3: return value + ' символа';
            case 4: return value + ' символа';
        }

        return ''
    }
}