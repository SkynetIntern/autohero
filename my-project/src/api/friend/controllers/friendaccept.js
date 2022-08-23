module.exports = {
    acceptrequest: async (ctx, next) => {
        const { friendrequestId, user } = ctx.request.body;

        if (friendrequestId) {
            const response = await strapi.db.query('api::friend.friend', 'users-permissions').update({
                where: {
                    $and: [{
                        id: friendrequestId
                    }, {
                        $or: [{
                            profile: user.profileId,
                        }, {
                            profilefk: user.profileId,
                        }]
                    }]
                },
                data: {
                    status: 'ACCEPTED',
                }
            });

            if (response != null) {
                return {
                    status: 200,
                    body: {
                        message: 'Friend request accepted'
                    }
                }
            } else {
                return {
                    status: 400,
                    body: {
                        message: 'Friend request not found'
                    }
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