import { prisma } from "../db/client";

export const fetchDiscordID = async (userID?: string) => {
    if(!userID) return
    const account = await prisma?.account.findFirst({
        where: {
            id: userID
        }
    });
    return account?.providerAccountId;
}