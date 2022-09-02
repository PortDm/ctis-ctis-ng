import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ModalWindowButtons, ModalWindowType } from "../shared.interfaces";

@Injectable()
export class ModalWindowService {
    isShow = false
    text = 'Text modal-window from ts'
    type: ModalWindowType
    buttons: ModalWindowButtons
    result$ = new Subject()

    show(text: string, type: ModalWindowType, buttons: ModalWindowButtons = ModalWindowButtons.OkAndCancel) {
        this.isShow = true
        this.text = text
        this.type = type
        this.buttons = buttons
        this.result$ = new Subject()
        return this.result$
    }

    accept() {
        this.result$.next(true)
        this.isShow = false
        this.result$.unsubscribe()
    }

    cancel() {
        this.result$.next(false)
        this.isShow = false
    }
}