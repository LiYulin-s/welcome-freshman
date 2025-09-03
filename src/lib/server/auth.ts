import { auth } from "$lib/auth";
import Elysia from "elysia";

export const betterAuth = new Elysia({ name: "better-auth" })
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
 
        if (!session) return status(401, { message: "Unauthorized" });
 
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });