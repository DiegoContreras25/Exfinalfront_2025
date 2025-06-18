import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import {
    getFavoritesFromCookie,
    setFavoritesCookie,
} from "../utils.ts/cookies.ts";

export const handler: Handlers = {
    async POST(req) {
        const form = await req.formData();
        const name = form.get("name")?.toString();
        const cookie = req.headers.get("cookie");
        let favs = getFavoritesFromCookie(cookie);
        if (!name) return new Response("Nombre no valido", { status: 400 });
        if (favs.includes(name)) {
            favs = favs.filter((n) => n !== name);
        } else {
            favs.push(name);
        }

        const headers = new Headers();
        headers.set("Set-Cookie", setFavoritesCookie(favs));
        headers.set("Location", req.headers.get("referer") || "/");
        return new Response(null, {
            status: 303,
            headers,
        });
    },
};
