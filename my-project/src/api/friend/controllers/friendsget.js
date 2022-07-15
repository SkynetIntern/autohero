module.exports = {
    get: async (ctx, next) => {
        const { username } = ctx.request.body;

        if (username == null) {
            return {
                status: 400,
                body: {
                    message: 'username not provided',
                    friends: []
                }
            }
        }

        const user = await strapi.db.query('api::profile.profile', 'users-permissions').findOne({
            where: {
                username
            }
        });

        if (user != null) {
            const friends = await strapi.db.query('api::friend.friend', 'users-permissions').findMany({
                populate: {
                    profile: {
                        select: "*"
                    },
                    profilefk: {
                        select: "*"
                    }
                },
                where: {
                    $or: [{
                        profile: user.id,
                    }, {
                        profilefk: user.id,
                    }]
                }
            });

            //loop through friends and get profile
            const friendsWithProfile = [];
            for (let i = 0; i < friends.length; i++) {
                const friend = friends[i];
                const friendProfile = friend.profile.id == user.id ? friend.profilefk : friend.profile;
                friend.friendProfile = friendProfile;
            }
            
            return {
                status: 200,
                body: {
                    success: true,
                    message: "Friendlist",
                    friends
                }
            }

        }

        return {
            status: 400,
            body: {
                success: false,
                message: 'Error',
                friends: []
            }
        }
    }
}