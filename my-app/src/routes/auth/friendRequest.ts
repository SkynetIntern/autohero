import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const body = await request.json()
    const { senderUsername, receiverUsername } = body;

    if (senderUsername || receiverUsername) {
        const apiResponse = await fetch(`${ApiRoot}/api/friend/sendrequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                senderUsername,
                receiverUsername
            })
        })
    }
}