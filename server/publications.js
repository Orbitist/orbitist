Meteor.publish('stories', function(options) {
  var user = this.userId;
  check(options, {
    sort: Object,
    limit: Number
  });
  return Stories.find({userId: user}, options);
});

Meteor.publish('singleStory', function(id) {
  check(id, String)
  return Stories.find(id);
});

Meteor.publish('tiles', function(storyId) {
  check(storyId, String);
  return Tiles.find({storyId: storyId});
});

Meteor.publish('singleTile', function(id) {
  check(id, String)
  return Tiles.find(id);
});

Meteor.publish( 'APIKey', function(){
  var user = this.userId;
  var data = APIKeys.find( { "owner": user }, {fields: { "key": 1 } } );

  if ( data ) {
    return data;
  }

  return this.ready();
});
