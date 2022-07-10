const bcrypt = require('bcryptjs');

module.exports = {
    logout: async(ctx, next) => {
        const { email, sessionid } = ctx.request.body;
        if (email != null && sessionid != null) {
            await strapi.db.query('api::session.session', 'users-permissions').delete({
                where: {
                    email,
                    sessionid,
                }
            });
            return {
                status: 200,
                body: {
                    message: 'logged out'
                }
            }
        }

    }
}