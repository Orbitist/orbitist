Meteor.publish('stories', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Stories.find({}, options);
});

Meteor.publish('singleStory', function(id) {
  check(id, String)
  return Stories.find(id);
});

Meteor.publish('tiles', function(storyId) {
  check(storyId, String);
  return Tiles.find({storyId: storyId});
});
