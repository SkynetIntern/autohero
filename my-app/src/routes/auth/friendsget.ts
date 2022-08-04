// @ts-ignore
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
// @ts-ignore
export async function post({ request }) {
    const body = await request.json()
    const { username } = body;

    if (username) {
       
        const apiResponse = await fetch(`${ApiRoot}/api/friend/getFriends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                username
            })
        })
        const response = await apiResponse.json()
        const message = response.body.message;
        const friends = response.body.friends;

        if (response.status === 200) {
            return {
                status: 200,
                body: {
                    success: true,
                    message,
                    friends
                }
            }
        } else {
            return {
                status: 400,
                body: {
                    success: false,
                    message,
                    friends
                }
            }
        }
    }

    return {
        status: 400,
        body: {
            success: false,
            message: "Invalid request"
        }
    }
}