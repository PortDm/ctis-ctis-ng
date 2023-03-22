import { Injectable } from "@angular/core";
import { iMessage, MessageType } from "../shared.interfaces";

const SHOW_TIME = 7000

@Injectable()
export class MessageService {
    id = 0
    messageStore: iMessage[] = []
    
    show(message: string, type: MessageType) {
        this.id++
        this.messageStore.push({id: this.id, text: message, type })
        setTimeout(() => {
            this.messageStore.shift()
        }, SHOW_TIME)
    }

    remove(id: number) {
        this.messageStore = this.messageStore.filter(m => m.id !== id)
    }
}
