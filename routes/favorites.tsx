import { Handlers, PageProps } from "$fresh/server.ts";
import { getFavoritesFromCookie } from "../utils.ts/cookies.ts";

export const handler: Handlers = {
    async GET(_, ctx) {
        const all = await fetch("https://hp-api.onrender.com/api/characters")
            .then((r) => r.json());
        const favorites = getFavoritesFromCookie(ctx.req.headers.get("cookie"));
        const favChars = all.filter((c: any) => favorites.includes(c.name));
        return ctx.render({ characters: favChars, favorites });
    },
};

export default function Favorites({ data }: PageProps) {
    const { characters, favorites } = data;
    return (
        <div>
            <a href="/">Volver al inicio</a>
            <h1>Favoritos ★</h1>
            <ul>
                {characters.map((char: any) => (
                    <li>
                        <a
                            href={`/characters/${
                                encodeURIComponent(char.name)
                            }`}
                        >
                            <img src={char.image} alt={char.name} width="100" />
                            <p>{char.name}</p>
                        </a>
                        <form method="POST" action="/toggle-fav">
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
