import { IConcs, ILists } from "../conclusions/concls.interfaces"
import { IPoints } from "./points.interfaces"

export interface IDevices {
    id: number
    dem: string // denomination
    model: string
    sn: string
    points?: IPoints[]
}

export interface IDevicesCreateDto {
    dem: string // denomination
    model: string
    sn: string
    point?: string
    listId?: number
}

export interface IDevicesUpdateDto {
    dem: string // denomination
    model: string
    sn: string
    point?: string
    listId?: number
}

export interface IDevicesFilters {
    dem: string // denomination
    model: string
    sn: string
}

export interface IDevicesUniqDto {
    sn: string
}

