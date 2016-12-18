Template.tileSubmitText.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitText.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmitText.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
    }

    var $text = $(e.target).find('[name=text]');
    var tile = {
      tileType: 'text',
      text: $text.val(),
      storyId: template.data._id,
      imageUrl: '',
      imageId: '',
      rank: topRank
    };

    var errors = {};
    if (! tile.text) {
      errors.text = "Please write some content";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        $text.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }

});

Template.tileSubmitText.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#locationSearch").geocomplete({map:'#map', mapOptions:{draggable:false, zoom:1, zoomControl:false, streetViewControl:false, mapTypeControl:false, center:{lat: 20, lng: 0}}, details:'.form-group'});
    }
  });
});
