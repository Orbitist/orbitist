Template.tileMenu.events({
  'click #tileTypeText': function() {
    return Session.set('tileType', 'text');
  },
  'click #tileTypeImage': function() {
    return Session.set('tileType', 'image');
  }
});

Template.tileMenu.helpers({
  isTileType: function(n) {
    return Session.equals('tileType', n);
  }
});
