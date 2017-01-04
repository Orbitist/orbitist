Template.tileSubmitLink.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitLink.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmitLink.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
    }

    var $lat = $(e.target).find('[name=lat]');
    var latInput = Number($lat.val());
    if (!latInput) {
      latInput = NaN;
    }

    var $lng = $(e.target).find('[name=lng]');
    var lngInput = Number($lng.val());
    if (!lngInput) {
      lngInput = NaN;
    }

    var $link = $(e.target).find('[name=link]');
    var tile = {
      tileType: 'link',
      text: '',
      title: '',
      storyId: template.data._id,
      imageUrl: '',
      imageId: '',
      videoUrl: '',
      videoId: '',
      url: $link.val(),
      embed: '',
      phone: '',
      email: '',
      hours: '',
      cost: '',
      accessibility: '',
      rank: topRank,
      latitude: latInput,
      longitude: lngInput
    };

    var errors = {};
    if (! tile.link) {
      errors.link = "Please write some content";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        $link.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }

});
