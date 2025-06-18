import { Handler, type Handlers, PageProps } from "$fresh/server.ts";
import { getFavoritesFromCookie } from "../utils.ts/cookies.ts";

type Character = {
    name: string;
    image: string;
};

export const handler: Handlers = {
    async GET(_, ctx) {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        const characters = await res.json();
        const favorites = getFavoritesFromCookie(ctx.req.headers.get("cookie"));
        return ctx.render({ characters, favorites });
    },
};

export default function Home({ data }: PageProps) {
    const { characters, favorites } = data;
    return (
        <div>
            <h1>Harry Potter - Personajes</h1>
            <a href="/favorites}">Ver Favoritos</a>
            <ul>
                {characters.map((char: any) => (
                    <li>
                        <a
                            href={`/characters/${
                                encodeURIComponent(characters.name)
                            }`}
                        >
                            <img>
                                src={characters.image} alt={characters.name}
                                {" "}
                                width="100"
                            </img>
                            <p>{characters.name}</p>
                        </a>
                        <form>
                            method="POST" action="/toggle-fav"
                            <input
                                type="hidden"
                                name="name"
                                value={char.name}
                            />
                            <button type="submit">
                                {favorites.includes(char.name) ? "★" : "☆"}
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/*
export const handler: Handlers = {
    async GET(_, ctx) {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        const characters = await res.json();
        const favorites = getFavoritesFromCookie(ctx.req.headers.get("cookie"));
        return ctx.render({ characters, favorites });
    },
};*/

/*const cookie = ctx.request.headers.get("cookie") ?? "";
        const favorites = getFavoritesFromCookie(cookie);
        */
