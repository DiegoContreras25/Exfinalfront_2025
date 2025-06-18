export function getFavoritesFromCookie(cookie:string | null): string[]{
    if(!cookie) return[];
    const match = cookie.match(/favorites=([^;]*)/);
    if(!match) return[];
    try{
        return JSON.parse(decodeURIComponent(match[1]));
    }catch{
        return[];
    }
}
export function setFavoritesCookie(favs: string[]): string {
    return `favorites=${encodeURIComponent(JSON.stringify(favs))}; Path=/ HttpOnly`;
}