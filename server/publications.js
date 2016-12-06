Meteor.publish('stories', function() {
  return Stories.find();
});

Meteor.publish('tiles', function(storyId) {
  check(storyId, String);
  return Tiles.find({storyId: storyId});
});
