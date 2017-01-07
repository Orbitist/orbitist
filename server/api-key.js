Meteor.methods({
  initApiKey: function( userId ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );

    var newKey = Random.hexString( 32 );

    try {
       var key = APIKeys.insert({
        "owner": userId,
        "key": newKey
       });
       return key;
    } catch( exception ) {
      return exception;
    }
  }
});

Meteor.methods({
  regenerateApiKey: function( userId ){
    check( userId, Meteor.userId() );

    var newKey = Random.hexString( 32 );

    try {
      var keyId = APIKeys.update( { "owner": userId }, {
        $set: {
          "key": newKey
        }
      });
      return keyId;
    } catch(exception) {
      return exception;
    }
  }
});
