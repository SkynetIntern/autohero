module.exports = {
    getCharacters: async (ctx, next) => {
        const { username } = ctx.request.body;
        if (username) {

            let profile = await strapi.db.query('api::profile.profile', 'users-permissions').findOne({
                populate: {
                    characters: {
                        select: "*"
                    }
                },
                where: {
                    username,
                }
            });
            return {
                status: 200,
                body: {
                    message: 'All characters',
                    characters: profile.characters
                }
            }
        }
        return {
            status: 400,
            body: {
                message: 'username not provided',
                characters: []
            }
        }
    }
}