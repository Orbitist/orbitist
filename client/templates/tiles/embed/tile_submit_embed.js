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

    var $embed = $(e.target).find('[name=embed]');

    var $text = $(e.target).find('[name=text]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
    }

    var $title = $(e.target).find('[name=title]');
    var titleInput = $title.val();
    if (!titleInput) {
      titleInput = '';
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

    var $tags = $(e.target).find('[name=tags]');
    var tagsInput = $tags.tagsinput('items');

    var $attribution = $(e.target).find('[name=attribution]');
    var attributionInput = $attribution.val();
    if (!attributionInput) {
      attributionInput = '';
    }

    var tile = {
      tileType: 'embed',
      text: textInput,
      title: titleInput,
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
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
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
