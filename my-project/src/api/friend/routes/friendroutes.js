module.exports = {
    routes: [{
            method: 'POST',
            path: '/friend/sendrequest',
            handler: 'friendrequest.sendrequest',
        },
        {
            method: 'POST',
            path: '/friend/acceptrequest',
            handler: 'friendaccept.acceptrequest',
        },
        {
            method: 'POST',
            path: '/friend/getfriends',
            handler: 'friendsget.get',
        },
        {
            method: 'POST',
            path: '/friend/declinerequest',
            handler: 'frienddecline.declinerequest',
        }
    ]
}