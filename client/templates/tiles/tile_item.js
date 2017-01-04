Template.tileItem.helpers({
  isStoryEditPage: function() {
    return Router.current().route.getName() == 'storyEdit'
  },
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
  hasImage: function() {
    return this.imageUrl != '';
  },
  hasPhone: function() {
    return this.phone != '';
  },
  hasEmail: function() {
    return this.email != '';
  },
  hasHours: function() {
    return this.hours != '';
  },
  hasCost: function() {
    return this.cost != '';
  },
  hasAccessibility: function() {
    return this.accessibility != '';
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
