module.exports = {
    get: async (ctx, next) => {
        const { username } = ctx.request.body;
        let profile = await strapi.db.query('api::profile.profile', 'users-permissions').findOne({
            where: {
                username,
            }
        });
        if (profile != null) {
            return {
                status: 200,
                body: {
                    profile
                }
            }
        } else {
            return {
                status: 404,
                body: {
                    message: 'profile not found'
                }
            }
        }
    }
}