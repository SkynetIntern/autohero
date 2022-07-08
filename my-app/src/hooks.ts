import * as cookie from "cookie"

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || "");

    if (cookies?.session_id) {
        event.locals.user = {}
        event.locals.sessionid = cookies.session_id
        event.locals.user.authenticated = true;
    } else {
        event.locals.user = {}
        event.locals.user.authenticated = false;
    }

    const response = await resolve(event);
    return response;
}

export const getSession = (request) => {
    console.log(request.locals);
    
    const user = request.locals.user;
    if (user?.authenticated) {
        return {
            status: 200,
            body: {
                user
            }
        }
    } else {
        return {
            status: 401,
            body: {
                message: 'Unauthorized'
            }
        }
    }
}