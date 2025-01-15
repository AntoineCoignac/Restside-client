import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const displayTimeAgo = (time: string) => {
    const parsedDate = parseISO(time);
    return `il y a ${formatDistanceToNow(parsedDate, { locale: fr })}`;
}