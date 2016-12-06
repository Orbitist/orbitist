Template.storyItem.helpers({
  ownStory: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  tilesCount: function() {
    return Tiles.find({storyId: this._id}).count();
  }
});
