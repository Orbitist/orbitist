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
  }
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
      $( '.imageUploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');

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
    var latInput = Number($lat.val());
    if (!latInput) {
      latInput = NaN;
    }

    var $lng = $(e.target).find('[name=lng]');
    var lngInput = Number($lng.val());
    if (!lngInput) {
      lngInput = NaN;
    }

    var tile = {
      tileType: 'image',
      text: textInput,
      title: '',
      imageUrl: imageUrlVar,
      imageId: imageIdVar,
      videoUrl: '',
      videoId: '',
      slideshow: [],
      url: '',
      embed: '',
      phone: '',
      email: '',
      hours: '',
      cost: '',
      accessibility: '',
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
