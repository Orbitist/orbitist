Tiles = new Mongo.Collection('tiles');

validateTile = function (tile) {
  var errors = {};

  if (!tile.text)
    errors.text = "Please create some text";

  return errors;
}

Tiles.allow({
  update: function(userId, tile) { return ownsDocument(userId, tile); },
  remove: function(userId, tile) { return ownsDocument(userId, tile); }
});

Tiles.deny({
  update: function(userId, tile, fieldNames) {
    // may only edit the following fields:
    return (_.without(
      fieldNames,
      'text',
      'title',
      'rank',
      'imageUrl',
      'imageId',
      'videoUrl',
      'videoId',
      'url',
      'embed',
      'phone',
      'email',
      'hours',
      'cost',
      'accessibility',
      'latitude',
      'longitude'
    ).length > 0);
  }
});

// Some kind of permission that I should think about
// Tiles.deny({
//   update: function(userId, tile, fieldNames, modifier) {
//     var errors = validateTile(modifier.$set);
//     return errors.text;
//   }
// });

Meteor.methods({
  tileInsert: function(tileAttributes) {
    check(this.userId, String);
    check(tileAttributes, {
      storyId: String,
      tileType: String,
      text: String,
      title: String,
      imageUrl: String,
      imageId: String,
      videoUrl: String,
      videoId: String,
      url: String,
      embed: String,
      phone: String,
      email: String,
      hours: String,
      cost: String,
      accessibility: String,
      rank: Number,
      latitude: Number,
      longitude: Number
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

    return Tiles.insert(tile);
  }
});
