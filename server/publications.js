Meteor.publish('stories', function() {
  return Stories.find();
});

Meteor.publish('tiles', function() {
  check(storyId, String);
  return Tiles.find({storyId: storyId});
});
