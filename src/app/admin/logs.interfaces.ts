export interface iLogs {
    id: number
    date: Date
    master: string
    action: string
    type: LogsTypes
    data: string
}

export enum LogsTypes {
    error = 'error',
    access_denied = 'access_denied',
    warning = 'warning',
    success = 'success'
}

export interface iFilters {
    startDate?: string
    endDate?: string
    master?: string
    action?: string
    type?: string
    datas?: string
}