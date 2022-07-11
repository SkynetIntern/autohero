const bcrypt = require('bcryptjs');

module.exports = {
    register: async (ctx, next) => {
        const { email, password, username } = ctx.request.body;

        //check email
        let user = await strapi.db.query('api::account.account', 'users-permissions').findOne({
            where: {
                email,
            }
        });
        if (user != null) {
            return {
                status: 400,
                body: {
                    message: 'email already exists'
                }
            }
        }
        //check username
        user = await strapi.db.query('api::account.account', 'users-permissions').findOne({
            where: {
                username,
            }
        });
        if (user != null) {
            return {
                status: 400,
                body: {
                    message: 'username already exists'
                }
            }
        }

        let hashPassword = '';
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        hashPassword = await bcrypt.hash(password, salt);
        
        //create a account for the user
        await strapi.db.query('api::account.account', 'users-permissions').create({
            data: {
                publishedAt: new Date(),
                email,
                password: hashPassword,
                username,
            }
        });
        //create a profile for the user
        await strapi.db.query('api::profile.profile', 'users-permissions').create({
            data: {
                publishedAt: new Date(),
                username
            }
        });

        return {
            status: 200,
            body: {
                message: 'all good'
            }
        }

    }
}