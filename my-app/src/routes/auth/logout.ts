// src/routes/api/sign-out.js
import { RemoveSession } from '/src/auth';
import { parse, serialize } from 'cookie';
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const body = await request.json()
    try {


        const email = body.email;
        const sessionid = body.sessionid;

        if (!email || !sessionid) {
            return;
        }
        await fetch(`${ApiRoot}/api/account/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                sessionid,
                email
            })
        })
    } catch {
        return;
    }

    return {
        status: 200,
        headers: {
            'Set-Cookie': serialize('session_id', '', {
                path: '/',
                expires: new Date(0),
            }),
        },
    };
}