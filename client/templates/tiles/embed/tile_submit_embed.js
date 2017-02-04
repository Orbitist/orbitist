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

    var tile = {
      tileType: 'embed',
      text: $(e.target).find('[name=text]').val(),
      storyId: template.data._id,
      embed: $(e.target).find('[name=embed]').val(),
      rank: topRank,
      latitude: Number($(e.target).find('[name=lat]').val()),
      longitude: Number($(e.target).find('[name=lng]').val()),
      tags: $(e.target).find('[name=tags]').tagsinput('items'),
      attribution: $(e.target).find('[name=attribution]').val()
    };

    var errors = {};
    if (! tile.embed) {
      errors.embed = "Please enter an embed code!";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        Session.set('tileMenu', 'false');
      }
    });
  }

});
