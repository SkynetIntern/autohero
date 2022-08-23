// @ts-ignore
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
// @ts-ignore
export async function post({ request, locals }) {
    const body = await request.json()
    const { receiverUsername } = body;
    const senderUsername = locals.user.username ?? false;
    
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
        const response = await apiResponse.json()
        const message = response.body.message;
        
        if (response.status === 200) {
            return {
                status: 200,
                body: {
                    success: true,
                    message
                }
            }
        } else {
            return {
                status: 400,
                body: {
                    success: false,
                    message
                }
            }
        }
    }
}