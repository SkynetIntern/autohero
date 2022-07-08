import { Authorization, ApiRoot } from '/src/auth'

export async function post({ request }) {
    const body = await request.json()

    const email = body.email;
    const username = body.username;
    const password = body.password;

    if (!email || !password || email.length < 3 || password.length < 3 || !username || username.length < 3) {
        return {
            status: 400,
            body: {
                message: 'Missing email, password or username'
            }
        }
    }

    const apiResponse = await fetch(`${ApiRoot}/api/account/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
        body: JSON.stringify({
            email,
            password,
            username
        })
    })
    const apiResponseBody = await apiResponse.json()
    console.log(apiResponseBody);
    
    if (apiResponseBody.status === 200) {
        return {
            status: 200,
            body: {
                message: 'Registration successful'
            }
        }
    }

    return {
        status: 401,
        body: {
            message: apiResponseBody.message
        }
    }
}