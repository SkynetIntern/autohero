import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid'
import { Authorization, ApiRoot, CreateSession } from '/src/auth'


export async function post({ request }) {
    const body = await request.json()
    
    const email = body.email;
    const password = body.password;

    if (!email || !password || email.length < 3 || password.length < 3) {
        return {
            status: 400,
            body: {
                message: 'Missing email or password'
            }
        }
    }
    const { id } = await CreateSession(email);
    const apiResponse = await fetch(`${ApiRoot}/api/account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
        body: JSON.stringify({
            email,
            password,
            sessionid: id
        })
    })
    const apiResponseBody = await apiResponse.json()
    
    if (apiResponseBody?.status === 200) {
        
        const headers = {
            'Set-Cookie': serialize('session_id', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // one week
            }),
        }
        return {
            status: 200,
            headers,
            body: {
                message: 'Login successful'
            }
        }
    }

    return {
        status: 401,
        body: {
            message: 'bad login'
        }
    }
}