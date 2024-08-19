import { format } from 'date-fns';

export function formatDateUtil(dateString) {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
}
