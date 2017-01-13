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

    var $text = $(e.target).find('[name=text]');
    var tile = {
      tileType: 'text',
      text: $text.val(),
      title: '',
      storyId: template.data._id,
      imageUrl: '',
      imageId: '',
      videoUrl: '',
      videoId: '',
      slideshow: [],
      url: '',
      embed: '',
      phone: '',
      email: '',
      hours: '',
      cost: '',
      accessibility: '',
      rank: topRank,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput
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
