import * as cookie from "cookie"
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || "");

    event.locals.user = {}
    event.locals.user.authenticated = false;

    if (cookies?.session_id) {
        const apiResponse = await fetch(`${ApiRoot}/api/sessions/?filters[sessionid]=${cookies.session_id}&populate=*`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        });
        const requestBody = await apiResponse.json();

        if (requestBody?.data?.length > 0) {
            const email = requestBody.data[0].attributes.email;
            const username = requestBody.data[0].attributes.username;
            const profileId = requestBody.data[0].attributes.profile.data.id;

            event.locals.user = {}
            event.locals.user.profileId = profileId 
            event.locals.user.email = email
            event.locals.user.username = username
            event.locals.user.sessionid = cookies.session_id
            event.locals.user.authenticated = true;
        }
    }

    const response = await resolve(event);
    return response;
}

export const getSession = (request) => {


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
                user
            }
        }
    }
}