module.exports = {
    routes: [
    {
        method: 'POST',
        path: '/account/register',
        handler: 'accountregister.register',
    },
    {
        method: 'POST',
        path: '/account/login',
        handler: 'accountlogin.login',
    }
]
}