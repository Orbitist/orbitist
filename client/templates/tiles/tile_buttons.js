Template.tileButtons.helpers({
  ownTile: function() {
    return this.userId === Meteor.userId();
  }
});
