Meteor.publish('stories', function() {
  return Stories.find();
});

Meteor.publish('tiles', function() {
  return Tiles.find();
});
