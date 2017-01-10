Template.tileMenu.events({
  'click #tileTypeText': function() {
    return Session.set('tileType', 'text');
  },
  'click #tileTypeImage': function() {
    return Session.set('tileType', 'image');
  },
  'click #tileTypeVideo': function() {
    return Session.set('tileType', 'video');
  },
  'click #tileTypeEmbed': function() {
    return Session.set('tileType', 'embed');
  },
  'click #tileTypePointOfInterest': function() {
    return Session.set('tileType', 'pointOfInterest');
  },
  'click #tileTypeLink': function() {
    return Session.set('tileType', 'link');
  },
  'click #tileTypeSlideshow': function() {
    return Session.set('tileType', 'slideshow');
  },
  'click .popup-screen': function(e) {
    var container = $('.popup-menu');
    if (!container.is(e.target)&& container.has(e.target).length === 0) {
      return Session.set('tileMenu', 'false');
    }
  }
});

Template.tileMenu.helpers({
  isTileType: function(n) {
    return Session.equals('tileType', n);
  }
});
