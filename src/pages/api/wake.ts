import type { NextApiResponse, NextApiRequest } from "next"
import { discord } from "../../bot/client";
import { env } from "../../env/server.mjs";
let ready = false;
let started: Date;
export const wake = async (_: NextApiRequest, res: NextApiResponse) => {
    if(ready) {
        res.status(200).json({
            started
        })
        return;
    }
    await discord.login(env.DISCORD_BOT_TOKEN);
    started = new Date(Date.now())
    res.status(200).json({
        started
    })
    ready = true;
}
export default wake;