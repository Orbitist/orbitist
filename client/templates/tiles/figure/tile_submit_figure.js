Template.tileSubmitFigure.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitFigure.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmitFigure.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
    }

    var $figure = $(e.target).find('[name=figure]');

    var $text = $(e.target).find('[name=description]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
    }

    var $icon = $(e.target).find('[name=icon]');
    var iconInput = $icon.val();
    if (!iconInput) {
      iconInput = '';
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
      tileType: 'figure',
      text: textInput,
      storyId: template.data._id,
      figure: $figure.val(),
      icon: iconInput,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput,
    };

    var errors = {};
    if (! tile.figure) {
      errors.figure = "Please enter a figure";
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
