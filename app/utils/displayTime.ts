export const displayTime = (time: string) => {
    return new Date(time).toISOString().substring(11, 16);
}