Template.tileSubmitEmbed.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitEmbed.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmitEmbed.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
    }

    var $text = $(e.target).find('[name=text]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
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

    var $embed = $(e.target).find('[name=embed]');
    var tile = {
      tileType: 'embed',
      text: textInput,
      title: '',
      storyId: template.data._id,
      imageUrl: '',
      imageId: '',
      videoUrl: '',
      videoId: '',
      slideshow: [],
      url: '',
      embed: $embed.val(),
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
    if (! tile.embed) {
      errors.embed = "Please write some content";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        $embed.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }

});
