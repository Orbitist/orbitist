Template.tileSubmitSlideshow.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitSlideshow.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  },
  uploadingSlideshow: function(n) {
    return Session.equals('uploadingSlideshow', n);
  }
});

Template.tileSubmitSlideshow.events({

  "change input[name='image1']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('image1UrlVar', result.secure_url);
      Session.set('image1IdVar', result.public_id);
      $( '.image1UploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');
      Session.set('uploadingSlideshow', 'false');
    });
  },

  "change input[name='image2']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('image2UrlVar', result.secure_url);
      Session.set('image2IdVar', result.public_id);
      $( '.image2UploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');
      Session.set('uploadingSlideshow', 'false');
    });
  },

  "change input[name='image3']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('image3UrlVar', result.secure_url);
      Session.set('image3IdVar', result.public_id);
      $( '.image3UploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');
      Session.set('uploadingSlideshow', 'false');
    });
  },

  "change input[name='image4']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('image4UrlVar', result.secure_url);
      Session.set('image4IdVar', result.public_id);
      $( '.image4UploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');
      Session.set('uploadingSlideshow', 'false');
    });
  },

  "change input[name='image5']": function(e, template) {
    Session.set('uploadingSlideshow', 'true');
    var files;
    files = e.currentTarget.files;
    return Cloudinary.upload(files, {
      // folder: "secret",
      // type: "private"
    }, function(error, result) {
      if (error){
        return throwError(error)
      }
      Session.set('image5UrlVar', result.secure_url);
      Session.set('image5IdVar', result.public_id);
      $( '.image5UploadThumb' ).replaceWith( '<img class="img-responsive" src="https://res.cloudinary.com/orbitist/image/upload/t_1500/' + result.public_id + '"/>');
      Session.set('uploadingSlideshow', 'false');
    });
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var slideshowUrlVar = Session.get('slideshowUrlVar');
    var slideshowIdVar = Session.get('slideshowIdVar');

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
      tileType: 'slideshow',
      text: textInput,
      title: '',
      slideshowUrl: slideshowUrlVar,
      slideshowId: slideshowIdVar,
      videoUrl: '',
      videoId: '',
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
    if (! tile.slideshowUrl) {
      errors.slideshow = "Please select an slideshow.";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        var $slideshowField = $(e.target).find('[name=slideshow]');
        $slideshowField.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
