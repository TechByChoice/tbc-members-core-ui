import { format } from 'date-fns';

export function formatDateUtil(/** @type {string | number | Date} */ dateString) {
    const date = new Date(dateString);
    return format(date, 'MMM d yyyy');
}
