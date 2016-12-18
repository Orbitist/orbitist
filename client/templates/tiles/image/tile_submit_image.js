Template.tileSubmitImage.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitImage.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingImage: function(n) {
    return Session.equals('uploadingImage', n);
  },
});

Template.tileSubmitImage.events({
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
      $( '.imageUploadThumb' ).append( '<img class="img-responsive" src="' + result.secure_url + '"/>');

    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var imageUrlVar = Session.get('imageUrlVar');
    var imageIdVar = Session.get('imageIdVar');

    var topTile = Tiles.findOne({storyId: template.data._id}, {sort: {rank: 1}});
    if (topTile) {
      var topRank = topTile.rank - 1;
    } else {
      var topRank = 1;
    }

    var $text = $(e.target).find('[name=text]');
    var textInput = $text.val();
    if (!textInput) {
      textInput = '';
    }

    var $lat = $(e.target).find('[name=lat]');
    var latInput = $lat.val();
    if (!latInput) {
      latInput = '';
    }

    var $lng = $(e.target).find('[name=lng]');
    var lngInput = $lng.val();
    if (!lngInput) {
      lngInput = '';
    }

    var tile = {
      tileType: 'image',
      text: textInput,
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      storyId: template.data._id,
      rank: topRank,
      latitude: latInput,
      longitude: lngInput
    };

    var errors = {};
    if (! tile.imageUrl) {
      errors.image = "Please select an image.";
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
