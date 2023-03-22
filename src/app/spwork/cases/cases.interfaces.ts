import { IConcs } from "../conclusions/concls.interfaces"

export interface IVolumns {
    id: number
    volume: string
    concs: IConcs[]
}

export interface ICases {
    id: number
    case: string
    volumns: IVolumns[]
}

export interface IYears {
    id: number
    year: string
    cases?: ICases[]
}

export interface IAccountCreateDto {
    year: string
    case: string
    volume: string
}

export interface IVolumeUniqDto {
    year: string
    case: string
    volume: string
}

