Template.apiKey.onCreated(function(){
  this.subscribe( "APIKey" );
});

Template.apiKey.helpers({
  apiKey: function() {
    var apiKey = APIKeys.findOne();

    if ( apiKey ) {
      return apiKey.key;
    }
  }
});

Template.apiKey.events({
  'click .regenerate-api-key': function( ){
     var userId              = Meteor.userId(),
         confirmRegeneration = confirm( "Are you sure? This will invalidate your current key!" );

     if ( confirmRegeneration ) {
       Meteor.call( "regenerateApiKey", userId, function( error, response ) {
         if ( error ) {
           throwError(error.reason);
         } else {
           throwError("All done! You have a new API key.");
         }
       });
     }
  }
});
