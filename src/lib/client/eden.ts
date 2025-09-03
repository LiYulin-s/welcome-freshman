import { treaty } from "@elysiajs/eden";

import type { Server } from "$lib/server";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const edenClient = treaty<Server>(PUBLIC_BASE_URL);