Template.tileEditEmbed.onCreated(function() {
  Session.set('tileEditEmbedErrors', {});
});

Template.tileEditEmbed.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditEmbedErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditEmbedErrors')[field] ? 'has-error' : '';
  }
});

Template.tileEditEmbed.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTileId = this._id;

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
    var tileProperties = {
      embed: $embed.val(),
      text: textInput,
      latitude: latInput,
      longitude: lngInput
    }

    var errors = validateTile(tileProperties);
    if (errors.embed)
      return Session.set('tileEditEmbedErrors', errors);

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
      Router.go('storyPage', {_id: this.storyId});
    }
  }
});
