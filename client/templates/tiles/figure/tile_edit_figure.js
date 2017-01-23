Template.tileEditFigure.onCreated(function() {
  Session.set('tileEditFigureErrors', {});
});

Template.tileEditFigure.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditFigureErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditFigureErrors')[field] ? 'has-error' : '';
  }
});

Template.tileEditFigure.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTileId = this._id;

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

    var tileProperties = {
      figure: $figure.val(),
      text: textInput,
      icon: iconInput,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
    }

    var errors = {};
    if (!$figure.val()) {
      errors.figure = "Please enter a figure";
      return Session.set('tileEditFigureErrors', errors);
    }

    var errors = validateTile(tileProperties);
    if (errors.figure)
      return Session.set('tileEditFigureErrors', errors);

    Tiles.update(currentTileId, {$set: tileProperties}, function(error) {
      if (error) {
        return throwError(error.reason);
      }
    });
    Router.go('storyEdit', {_id: this.storyId});
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this tile?")) {
      var currentTileId = this._id;
      Tiles.remove(currentTileId);
      Router.go('storyEdit', {_id: this.storyId});
    }
  }
});
