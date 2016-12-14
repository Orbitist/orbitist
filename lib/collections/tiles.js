Tiles = new Mongo.Collection('tiles');

validateTiles = function (tile) {
  var errors = {};

  if (!tile.text)
    errors.title = "Please create some text";

  return errors;
}

Tiles.allow({
  update: function(userId, tile) { return ownsDocument(userId, tile); },
  remove: function(userId, tile) { return ownsDocument(userId, tile); }
});

Tiles.deny({
  update: function(userId, tile, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'text').length > 0);
  }
});

Tiles.deny({
  update: function(userId, story, fieldNames, modifier) {
    var errors = validateStory(modifier.$set);
    return errors.text;
  }
});

Meteor.methods({
  tileInsert: function(tileAttributes) {
    check(this.userId, String);
    check(tileAttributes, {
      storyId: String,
      tileType: String,
      text: String
    });

    var user = Meteor.user();
    var story = Stories.findOne(tileAttributes.storyId);

    if (!story)
      throw new Meteor.Error('invalid-tile', 'You must create a tile on a story.');

    if (story.userId !== user._id)
      throw new Meteor.Error('invalid-tile', 'You do not own this story!');

    tile = _.extend(tileAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // update the post with the number of tiles
    Stories.update(tile.storyId, {$inc: {tilesCount: 1}});

    return Tiles.insert(tile);
  }
});
