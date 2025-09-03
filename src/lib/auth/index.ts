import { PrismaClient } from "$lib/database/prisma-client/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { magicLink, openAPI, emailOTP } from "better-auth/plugins"
import { createAuthMiddleware, APIError } from "better-auth/api"

import nodemailer from "nodemailer"

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: true,
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
})
export const auth = betterAuth({

    basePath: 'auth',
    user: {
        additionalFields: {
            profileId: {
                type: "string",
                unique: true,
                required: false,
                references: {
                    model: "Profile",
                    field: "id",
                }
            }
        },
        
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            console.log(ctx.path, ctx.method, ctx.body)
            if (ctx.path.startsWith('sign-in')) {
                if (!ctx.body?.email.endsWith('@mail.nwpu.edu.cn')) {
                    throw new APIError(400, { message: 'Invalid email domain' })
                }
            }
        })
    },
    plugins: [magicLink({
        sendMagicLink: async ({ email, token, url }, request) => {
            const info = await transporter.sendMail({
                from: `"Welcome Freshman" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Your Magic Link",
                text: `Click the link to sign in: ${url}`,
                html: `<p>Click the link to sign in: <a href="${url}">${url}</a></p>`,
            })
        },
    }), openAPI(),
    emailOTP({
        sendVerificationOTP: async ({ email, otp, type }, request) => {
            await transporter.sendMail({
                from: `"Welcome Freshman" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Your Verification Code",
                text: `Your verification code is: ${otp}`,
                html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
            })
        },
    })]
})

