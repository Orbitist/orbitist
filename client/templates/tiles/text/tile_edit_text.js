Template.tileEditText.onCreated(function() {
  Session.set('tileEditTextErrors', {});
});

Template.tileEditText.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditTextErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditTextErrors')[field] ? 'has-error' : '';
  }
});

Template.tileEditText.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTileId = this._id;

    var tileProperties = {
      text: $(e.target).find('[name=text]').val()
    }

    var errors = validateTile(tileProperties);
    if (errors.text)
      return Session.set('tileEditTextErrors', errors);

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
