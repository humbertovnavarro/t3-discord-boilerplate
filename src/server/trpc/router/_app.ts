import { router } from "../trpc";
import { authRouter } from "./auth";
import { discordRouter } from "./discord";
 
export const appRouter = router({
  discord: discordRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
