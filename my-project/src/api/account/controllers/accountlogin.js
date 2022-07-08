const bcrypt = require('bcryptjs');

module.exports = {
    login: async(ctx, next) => {
        const { email, password } = ctx.request.body;

        const saltRounds = 10;
        let hashPassword = '';
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                hashPassword = hash;
            });
        });

        const user = await strapi.db.query('api::account.account', 'users-permissions').findOne({
            where: {
                email,
            }
        });
        try {
            if (user || user.password != null) {
                const isValid = await bcrypt.compare(password, user.password)
                if (isValid) {
                    return {
                        status: 200,
                        body: {
                            message: 'all good'
                        }
                    }
                }
            }
        } catch {
            return {
                status: 401,
                body: {
                    message: 'bad credentials'
                }
            }
        }
        return {
            status: 401,
            body: {
                message: 'bad credentials'
            }
        }
    }
}