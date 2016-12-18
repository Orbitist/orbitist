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

    var $lat = $(e.target).find('[name=lat]');
    var latInput = $lat.val();
    if (!latInput) {
      latInput = '';
    }

    var $lng = $(e.target).find('[name=lng]');
    var lngInput = $lng.val();
    if (!lngInput) {
      lngInput = '';
    }

    var $text = $(e.target).find('[name=text]');
    var tile = {
      tileType: 'text',
      text: $text.val(),
      storyId: template.data._id,
      imageUrl: '',
      imageId: '',
      rank: topRank,
      latitude: latInput,
      longitude: lngInput
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
