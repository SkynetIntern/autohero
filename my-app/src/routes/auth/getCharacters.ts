// @ts-ignore
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
// @ts-ignore
export async function post({ request, locals }) {
    // const body = await request.json()
    // const { username } = body;
    const username = locals.user.username ?? false;

    if (username) {
        try {
            const apiResponse = await fetch(`${ApiRoot}/api/character/getCharacters`, {
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
            const characters = response.body.characters;

            if (response.status === 200) {
                return {
                    status: 200,
                    body: {
                        success: true,
                        message,
                        characters
                    }
                }
            } else {
                return {
                    status: 400,
                    body: {
                        success: false,
                        message,
                        characters
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        status: 400,
        body: {
            success: false,
            message: "Invalid request",
            characters: []
        }
    }
}