import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "../services/message.service";
import { MessageType } from "../shared.interfaces";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    @Input() id: number
    @Input() mes: string
    @Input() type: MessageType
    messageType = MessageType

    constructor(
        private messageService: MessageService
    ) { }

    close() {
        this.messageService.remove(this.id)
    }
}