
import { router, protectedProcedure } from "../../trpc";

export const discordRouter = router({
  me: protectedProcedure
    .query(async ({ ctx }) => {
      if(!ctx.session.user) return;
      const userId = ctx.session.user.id;
      const account = await ctx.prisma.account.findFirst({
        where: {
            userId,
            provider: "discord"
        },
      });
      if(account)
      return {
        access_token: account.access_token,
        expires_at: account.expires_at,
        provider: account.provider
      }
    }),
});
