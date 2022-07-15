module.exports = {
    declinerequest: async (ctx, next) => {
        const { friendrequestId } = ctx.request.body;

        if (friendrequestId) {
            await strapi.db.query('api::friend.friend', 'users-permissions').delete({
                where: {
                    id: friendrequestId,
                },                
            });

            return {
                status: 200,
                body: {
                    message: 'Friend request rejected'
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