// @ts-ignore
import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, locals }) {
    const body = await request.json()
    const { friendrequestId } = body;
    const user = locals.user;

    if (friendrequestId) {
        const apiResponse = await fetch(`${ApiRoot}/api/friend/acceptrequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                friendrequestId,
                user
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