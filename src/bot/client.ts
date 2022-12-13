import type { Message } from "discord.js";
import { Client, IntentsBitField } from "discord.js"
import { env } from "../env/server.mjs";
import { Player } from "./player";
import "discord-player/smoothVolume";
import { prisma } from "../server/db/client";
const { DISCORD_BOT_PREFIX } = env;

export const discord = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.AutoModerationConfiguration,
        IntentsBitField.Flags.AutoModerationExecution
    ]
});

export const player = new Player(discord);

discord.once("ready", () => {
    console.log(`discord bot connected as ${discord.user?.username}`);
});

type MessageHandler = (message: Message) => unknown;

const commands: Map<string, MessageHandler> = new Map();

discord.on("messageCreate", message => {
    console.log("recieved message");
    const result = isCommand(message);
    prisma.discordMessage.create({
        data: {
            id: message.id,
            content: message.content,
            guildID: message.guildId || "na",
            channelID: message.channelId
        }
    });
    console.log(result);
    if(!result) return;
});

const isCommand = (message: Message) => {
    let partialContent = "";
    let prefixIndex;
    let firstSpaceIndex;
    let word = "";
    const words: string[] = [];
    for(let i = 0; i < message.content.length; i++) {

        if(!prefixIndex) {
            partialContent += message.content[i];
            if(partialContent === DISCORD_BOT_PREFIX) {
                prefixIndex == i;
            }
        }

        if(!firstSpaceIndex) {
            if(message.content[i] === " ") {
                firstSpaceIndex == i;
            }
        }

        if(message.content[i] === " ") {
            if(word) {
                words.push(word);
            }
            word = "";
        }

        word += message.content[i];
    }
    const command = words[0];
    if(!command) return;
    if(!commands.has(command)) return;
    return {
        args: words.slice(1),
        command: command
    }
}