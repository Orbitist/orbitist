Template.tileEditLink.onCreated(function() {
  Session.set('tileEditLinkErrors', {});
});

Template.tileEditLink.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditLinkErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditLinkErrors')[field] ? 'has-error' : '';
  }
});

Template.tileEditLink.events({
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

    var $tags = $(e.target).find('[name=tags]');
    var tagsInput = $tags.tagsinput('items');

    var $attribution = $(e.target).find('[name=attribution]');
    var attributionInput = $attribution.val();
    if (!attributionInput) {
      attributionInput = '';
    }

    var tileProperties = {
      url: $(e.target).find('[name=link]').val(),
      text: textInput,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: attributionInput
    }

    var errors = validateTile(tileProperties);
    if (errors.link)
      return Session.set('tileEditLinkErrors', errors);

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
