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
      'slideshow',
      'url',
      'embed',
      'phone',
      'email',
      'website',
      'hours',
      'cost',
      'accessibility',
      'figure',
      'icon',
      'latitude',
      'longitude',
      'tags',
      'attribution'
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
      storyId: Match.Optional( String ),
      tileType: Match.Optional( String ),
      text: Match.Optional( String ),
      title: Match.Optional( String ),
      imageUrl: Match.Optional( String ),
      imageId: Match.Optional( String ),
      slideshow: Match.Optional( String ),
      videoUrl: Match.Optional( String ),
      videoId: Match.Optional( String ),
      url: Match.Optional( String ),
      embed: Match.Optional( String ),
      phone: Match.Optional( String ),
      email: Match.Optional( String ),
      website: Match.Optional( String ),
      hours: Match.Optional( String ),
      cost: Match.Optional( String ),
      accessibility: Match.Optional( String ),
      figure: Match.Optional( String ),
      icon: Match.Optional( String ),
      rank: Match.Optional( Number ),
      latitude: Match.Optional( Number ),
      longitude: Match.Optional( Number ),
      tags: Match.Optional( Array ),
      attribution: Match.Optional( String )
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
