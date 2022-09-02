import { iGroups } from "./groups.interfaces"

export interface iUsers {
    id: number
    lastName: string
    firstName: string
    middleName: string
    dep: string
    post: string
    rank: string
    login: string
    passwordHash: string
    birth: Date
    groups: iGroups[]
}

export interface iUsersCreate {
    lastName: string
    firstName: string
    middleName: string
    dep: string
    post: string
    rank: string
    login: string
    passwordAES: string
    birth: Date
    groupsIds: number[]
}

export interface iUsersUpdate {
    id: number
    lastName: string
    firstName: string
    middleName: string
    dep: string
    post: string
    rank: string
    login: string
    passwordAES: string
    birth: Date
    groupsIds: number[]
}

export interface iLoginResponce {
    id?: number
    tokenHash: string
    expiresIn: Date
    userName: string
    userGroups: string[]
}

// export interface iGroups {
//     id: number
//     name: string
//     cheched: boolean
// }