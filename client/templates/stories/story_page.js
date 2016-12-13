Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id});
  }
});


// Set session variable for which tile form to use
Template.storyPage.created = function() {
  Session.setDefault('tileType', 'text');
};

Template.storyPage.events({
  'click #tileTypeText': function() {
    return Session.set('tileType', 'text');
  },
  'click #tileTypeImage': function() {
    return Session.set('tileType', 'image');
  }
});

Template.storyPage.helpers({
  isTileType: function(n) {
    return Session.equals('tileType', n);
  }
});
