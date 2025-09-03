import { Elysia, t } from "elysia"
import { prisma } from "./database"
import { betterAuth } from "./auth"
import { ProfilePlain } from "$lib/database/prismabox/Profile"

const errorResponse = t.Object({
    message: t.String()
})

export const route = new Elysia({name: "route", prefix: "/students"})
    .use(prisma)
    .use(betterAuth)
    .get('/:id', async ({ prisma, params, user, status }) => {
    
        if (!user.profileId) {
            return status(404, { message: "Profile not found" })
        }

        if (user.profileId !== params.id) {
            return status(403, { message: "Forbidden" })
        }

        const profile = await prisma.profile.findUnique({
            where: {
                id: user.profileId
            }
        })
        if (!profile) {
            return status(404, { message: "Profile not found" })
        }
        
        return profile
    }, {
        params: t.Object({
            id: t.String()
        }),
        auth: true,
        response: {
            200: ProfilePlain,
            403: errorResponse,
            404: errorResponse
        }
    })
    .post('/', async ({ prisma, body, user, status }) => {
        const existingProfile = await prisma.profile.findUnique({
            where: {
                userId: user.id
            }
        })
        if (existingProfile) {
            return status(409, { message: "Profile already exists" })
        }
        const profile = await prisma.profile.create({
            data: {
                ...body,
                userId: user.id,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        return profile
    }, {
        body: t.Omit(ProfilePlain, ['id', 'userId', 'createdAt', 'updatedAt']),
        auth: true,
        response: {
            200: ProfilePlain,
            403: errorResponse,
            409: errorResponse
        }
    })
    .put('/:id', async ({ prisma, params, body, user, status }) => {
        if (!user.profileId) {
            const profile = await prisma.profile.create({
                data: {
                    ...body,
                    userId: user.id,
                }
            })
            return profile
        }
        const profile = await prisma.profile.findUnique({
            where: {
                id: user.profileId
            }
        })
        if (!profile || user.profileId !== params.id) {
            return status(403, { message: "Forbidden" })
        }
        const updatedProfile = await prisma.profile.update({
            where: {
                id: profile.id
            },
            data: {
                ...body
            }
        })
        return updatedProfile
    }, {
        params: t.Object({
            id: t.String()
        }),
        body: t.Omit(ProfilePlain, ['id', 'userId', 'createdAt', 'updatedAt']),
        auth: true,
        response: {
            200: ProfilePlain,
            403: errorResponse
        }
    })