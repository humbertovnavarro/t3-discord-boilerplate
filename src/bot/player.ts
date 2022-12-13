import { Player as DiscordPlayer } from "discord-player";
import type { Client } from "discord.js";

export class Player extends DiscordPlayer {
    constructor(client: Client) {
        super(client)
        this.on("trackStart", queue => {
            // cache song in database
        });
    }
}
