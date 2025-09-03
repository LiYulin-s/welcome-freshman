import { PrismaClient } from "$lib/database/prisma-client/client"
import { Elysia, t } from "elysia"

export const prisma = new Elysia({name: "prisma"})
    .decorate("prisma", new PrismaClient())