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

export function ToIndianNumber(num) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'long',
    })
    return formatter.format(num)
}

export function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function dateDiffInDaysTextual(a, b) {
    const days = dateDiffInDays(a, b)
    let years = Math.floor(days / 365)
    let remdays = days - (years * 365)
    return years + " years " + remdays + " days"
}

export function dateFormat(datestr) {
    let date = new Date(datestr);
    return date.toLocaleDateString()
}