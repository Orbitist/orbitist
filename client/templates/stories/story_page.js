Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id});
  }
});
