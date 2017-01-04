Template.tileEdit.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  ownTile: function() {
    return this.userId === Meteor.userId();
  },
  tileTypeText: function() {
    return this.tileType === 'text';
  },
  tileTypeImage: function() {
    return this.tileType === 'image';
  },
  tileTypeVideo: function() {
    return this.tileType === 'video';
  },
  tileTypeEmbed: function() {
    return this.tileType === 'embed';
  },
  tileTypePointOfInterest: function() {
    return this.tileType === 'pointOfInterest';
  },
  tileTypeLink: function() {
    return this.tileType === 'link';
  }
});
