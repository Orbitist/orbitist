Template.tileSubmitQuote.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitQuote.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingImage: function(n) {
    return Session.equals('uploadingImage', n);
  }
});

Template.tileSubmitQuote.events({
  "change input[type='file']": function(e, template) {
    Session.set('uploadingImage', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('imageUrlVar', result.secure_url);
      Session.set('imageIdVar', result.public_id);
      Session.set('uploadingImage', 'false');
      $( '.imageUploadThumb' ).html( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/><a href="#" class="btn btn-danger btn-xs delete-image"><span class="fa fa-close"></span> Delete Image</a>');

    });
  },

  'click .delete-image': function() {
    Session.set('imageUrlVar', '');
    Session.set('imageIdVar', '');
    $( '.imageUploadThumb' ).html('');
  },

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

    var tile = {
      tileType: 'quote',
      text: $(e.target).find('[name=quote]').val(),
      dictator: $(e.target).find('[name=dictator]').val(),
      imageUrl: Session.get('imageUrlVar'),
      imageId: Session.get('imageIdVar'),
      storyId: template.data._id,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput,
      attribution: $(e.target).find('[name=attribution]').val()
    };

    var errors = {};
    if (! tile.text) {
      errors.quote = "Please enter a quote!";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        var $imageField = $(e.target).find('[name=image]');
        $imageField.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
