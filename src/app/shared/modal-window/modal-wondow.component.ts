import { Component } from "@angular/core";
import { ModalWindowService } from "../services/modal-window.service";
import { ModalWindowButtons, ModalWindowType } from "../shared.interfaces";

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

    type = ModalWindowType
    buttons = ModalWindowButtons

    constructor(
        public modalWindowService: ModalWindowService
    ) { }


}