import { Prisma } from "@prisma/client";

export const softConflictError = (error: unknown) => {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === "P2002") {
            console.error("skipping existing guild")
        } else {
            console.error(error);
        }
    } else {
        console.error(error);
    }
}