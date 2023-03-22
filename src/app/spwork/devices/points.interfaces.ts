import { ILists } from "../conclusions/concls.interfaces"
import { IDevices } from "./devices.interfaces"

export interface IPoints {
    id: number
    point: string
    list: ILists
    device: IDevices
}

export interface IPointsUniqDto {
    point: string
    listId: number
}