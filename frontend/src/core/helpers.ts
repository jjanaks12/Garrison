import moment from 'moment'

export function format(date: string, pattern = 'YYYY-MM-DD hh:mm a'): string {
    return date
        ? moment.utc(date).local().format(pattern)
        : ''
} 