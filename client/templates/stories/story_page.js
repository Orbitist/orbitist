Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id});
  }
});

// Set session variable for which tile form to use

Template.storyPage.events({
  'click .create-tile': function() {
    return Session.set('tileMenu', 'true');
  }
});

Template.storyPage.helpers({
  showTileMenu: function(n) {
    return Session.equals('tileMenu', n);
  }
});
