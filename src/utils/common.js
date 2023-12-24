import { getCookie } from './cookie.js'

export function isUserAuthenticated() {
    const val = getCookie("investor")
    if (val == "1" || val == "2") {
        return true
    }
    return false
}

export function getInvestor() {
    const id = getCookie("investor")
    if (id == "1") {
        return { "id": id, "name": "Sankalp" }
    }
    if (id == "2") {
        return { "id": id, "name": "Swati" }
    }
    return null
}

export function getInvestorId() {
    return getCookie("investor")
}