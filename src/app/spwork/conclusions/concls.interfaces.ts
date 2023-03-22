import { IVolumns } from "../cases/cases.interfaces"
import { IPoints } from "../devices/points.interfaces"

export interface IConcs {
    id: number
    reg: string
    date: Date
    countOfLists: number
    lists: ILists[]
    volume?: IVolumns
}

export interface IConcsCreateDto {
    reg: string
    date: Date
    countOfLists: number
}

export interface IConcsUpdateDto {
    id: number
    reg: string
    date: Date
}

export interface IConcsAddDevs {
    concId: number
    devIds: number[]
}

export interface ILists {
    id: number
    list: number
    points: IPoints[]
    conc: IConcs
}

export class IConcSewVolumeDto {
    concId: number
    volumeId: number
    startList: number
}

export class IConcAndList {
    reg: string
    date: Date
    list: number
    listId: number
}