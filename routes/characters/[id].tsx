import { Handlers, PageProps } from "$fresh/server.ts";
import { getFavoritesFromCookie } from "../../utils.ts/cookies.ts";

type Character = {
    name:string;
    image: string;
    house: string;
    actor: string;
};

export const handler:Handlers = {
    async GET(_, ctx){
        const id = ctx.params.id;
        const res= await fetch("https://hp-api.onrender.com/api/characters");
        const characters = await res.json();
        const character = characters.find((c:any) => c.name == id);
        const favorites = getFavoritesFromCookie(ctx.req.headers.get("cookie"));
        return ctx.render({ character, favorites});
    },
};

export default function Detail({data}: PageProps){
    const{character, favorites} = data;
    return(
        <div>
            <a href="/"> Volver</a>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} width="200" />
            <p>Casa: {character.house}</p>
            <p>Actor: {character.actor}</p>

            <form method="POST" action= "/toggle-fav">
            <input type="hidden" name="name" value={character.name} />
            <button type="submit">
                {favorites.includes(character.name)? "Quitar ★": "☆ Favorito"}
            </button>           
            </form>
        </div>
    );
}