Template.tileEditImage.onCreated(function() {
  Session.set('tileEditImageErrors', {});
});

Template.tileEditImage.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditImageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditImageErrors')[field] ? 'has-error' : '';
  }
});

Template.tileEditImage.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTileId = this._id;

    var tileProperties = {
      image: $(e.target).find('[name=image]').val()
    }

    var errors = validateTile(tileProperties);
    if (errors.image)
      return Session.set('tileEditImageErrors', errors);

    Tiles.update(currentTileId, {$set: tileProperties}, function(error) {
      if (error) {
        return throwError(error.reason);
      }
    });
    Router.go('storyPage', {_id: this.storyId});
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
