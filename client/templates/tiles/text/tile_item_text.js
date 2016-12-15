Template.tileItemText.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  ownTile: function() {
    return this.userId === Meteor.userId();
  }
});
