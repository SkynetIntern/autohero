import { Authorization, ApiRoot } from '/src/auth'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const body = await request.json()
    const { friendrequestId } = body;

    if (friendrequestId) {
        const apiResponse = await fetch(`${ApiRoot}/api/friend/declinerequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                friendrequestId
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