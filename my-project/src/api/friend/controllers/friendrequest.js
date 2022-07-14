module.exports = {
    sendrequest: async (ctx, next) => {
        const { senderUsername, receiverUsername } = ctx.request.body;

        const sender = await strapi.db.query('api::profile.profile', 'users-permissions').findOne({
            where: {
                username: senderUsername,
            }
        });
        const receive = await strapi.db.query('api::profile.profile', 'users-permissions').findOne({
            where: {
                username: receiverUsername,
            }
        });

        //check if sender and receiver exist
        if (sender == null || receive == null) {
            return {
                status: 404,
                body: {
                    message: 'sender or receiver not found'
                }
            }
        }

        //get id of sender and receiver
        const senderId = sender.id;
        const receiveId = receive.id;

        //check if sender and receiver are already friends
        const friend = await strapi.db.query('api::friend.friend', 'users-permissions').findOne({
            where: {
                $or: [{
                    profile: senderId,
                    profilefk: receiveId,
                }, {
                    profile: receiveId,
                    profilefk: senderId,
                }]
            }
        });
        if (friend == null) {
            //send request
            await strapi.db.query('api::friend.friend', 'users-permissions').create({
                data: {
                    profile: senderId,
                    profilefk: receiveId,
                    status: 'PENDING',
                }
            });
            return {
                status: 200,
                body: {
                    message: 'Friend request sent'
                }
            }
        } else {
            return {
                status: 400,
                body: {
                    message: 'already friends'
                }
            }
        }

    }
}