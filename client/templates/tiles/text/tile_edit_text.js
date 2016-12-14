Template.tileEditText.onCreated(function() {
  Session.set('tileEditErrors', {});
});

Template.tileEditText.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditErrors')[field] ? 'has-error' : '';
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
      return Session.set('tileEditErrors', errors);

    Tiles.update(currentTileId, {$set: tileProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('storyPage', {_id: this.storyId});
      }
    });
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
