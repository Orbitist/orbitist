Tiles = new Mongo.Collection('tiles');

Meteor.methods({
  tileInsert: function(tileAttributes) {
    check(this.userId, String);
    check(tileAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(tileAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-tile', 'You must create a tile on a story.');

    tile = _.extend(tileAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    return Tiles.insert(tile);
  }
});
