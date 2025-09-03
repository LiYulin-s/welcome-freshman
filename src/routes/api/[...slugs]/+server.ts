import { server } from "$lib/server"

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>
export const fallback: RequestHandler = ({ request }) => server.handle(request)