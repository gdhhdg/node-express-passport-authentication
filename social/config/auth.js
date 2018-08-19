module.exports = {
    'facebookAuth': {
        'clientID':'ID',
        'clientSecret':'SECRET',
        'callbackURL':'http://localhost:3000/auth/facebook/callback',
        'profileURL':'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFileds':['id', 'email', 'name'],
    },

    'twitterAuth': {
        'consumerKey':'KEY',
        'consumerSecret':'SECRET',
        'callbackURL':'http://127.0.0.1::3000/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID':'ID.apps.googleusercontent.com',
        'clientSecret':'SECRET',
        'callbackURL':'http://localhost:3000/auth/google/callback'
    }

};