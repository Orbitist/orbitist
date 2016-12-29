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
  tileTypeVideo: function() {
    return this.tileType === 'video';
  },
  tileTypeIframe: function() {
    return this.tileType === 'iframe';
  },
  tileTypePointOfInterest: function() {
    return this.tileType === 'pointOfInterest';
  },
  iframeHtml: function() {
    return this.iframe;
  }
});
