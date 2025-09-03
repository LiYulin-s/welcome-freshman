import  { type Static, t } from "elysia";
import { ProfilePlainInputCreate } from "$lib/database/prismabox/Profile";

export type Profile = Static<typeof ProfilePlainInputCreate>;