module.exports = {
    acceptrequest: async (ctx, next) => {
        const { friendrequestId } = ctx.request.body;

        if (friendrequestId) {
            await strapi.db.query('api::friend.friend', 'users-permissions').update({
                where: {
                    id: friendrequestId,
                },
                data: {
                    status: 'ACCEPTED',
                }
                
            });

            return {
                status: 200,
                body: {
                    message: 'Friend request accepted'
                }
            }
        }
        return {
            status: 400,
            body: {
                message: 'Friend request not found'
            }
        }
    }
}