Template.storyMap.events({
  'click .create-tile': function() {
    return Session.set('tileMenu', 'true');
  }
});

Template.storyMap.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id}, {sort: {rank: 1}});
  },
  showTileMenu: function(n) {
    return Session.equals('tileMenu', n);
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});

Template.storyMap.rendered = function () {
    this.autorun(function () {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = 'pk.eyJ1Ijoib3JiaXRpc3QiLCJhIjoiYnpUTnJBdyJ9.uxgaJ0R9ZNsCcEnPNfo2ag';
            var map = L.mapbox.map('map', 'mapbox.streets');
        }
        
    });
};
