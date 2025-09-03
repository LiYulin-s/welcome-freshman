import { emailOTPClient, inferAdditionalFields, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";
import type { auth } from "$lib/auth"

import { PUBLIC_BASE_URL } from "$env/static/public";

export const authClient = createAuthClient({
    baseURL: PUBLIC_BASE_URL + '/api/auth',
    plugins: [emailOTPClient(), magicLinkClient(), inferAdditionalFields<typeof auth>()]
})
