Tiles = new Mongo.Collection('tiles');

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
