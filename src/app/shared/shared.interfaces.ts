export enum MessageType {
    success,
    danger
}

export interface iMessage {
    id: number
    text: string
    type: MessageType
}

export enum ModalWindowType {
    success,
    danger
}

export enum ModalWindowButtons {
    OkAndCancel,
    OkOnly,
    CancelOnly
}