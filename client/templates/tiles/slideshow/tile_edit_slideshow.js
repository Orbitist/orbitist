Template.tileEditSlideshow.onCreated(function() {
  Session.set('tileEditSlideshowErrors', {});
});

Template.tileEditSlideshow.helpers({
  errorMessage: function(field) {
    return Session.get('tileEditSlideshowErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileEditSlideshowErrors')[field] ? 'has-error' : '';
  },
  uploadingSlideshow: function(n) {
    return Session.equals('uploadingSlideshow', n);
  },
  hasSlide: function() {
    return this.url.length > 1;
  }
});


Template.tileEditSlideshow.events({
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

    var image1Url = Session.get('image1UrlVar');
    var image2Url = Session.get('image2UrlVar');
    var image3Url = Session.get('image3UrlVar');
    var image4Url = Session.get('image4UrlVar');
    var image5Url = Session.get('image5UrlVar');

    var image1Id = Session.get('image1IdVar');
    var image2Id = Session.get('image2IdVar');
    var image3Id = Session.get('image3IdVar');
    var image4Id = Session.get('image4IdVar');
    var image5Id = Session.get('image5IdVar');

    var image1Caption = $(e.target).find('[name=image1Caption]').val();
    var image2Caption = $(e.target).find('[name=image2Caption]').val();
    var image3Caption = $(e.target).find('[name=image3Caption]').val();
    var image4Caption = $(e.target).find('[name=image4Caption]').val();
    var image5Caption = $(e.target).find('[name=image5Caption]').val();

    var image1Input = $(e.target).find('[name=image1]').val();
    if (image1Input.length < 1) {
      image1Url = this.slideshow[0].url;
      image1Id = this.slideshow[0].id;
    }
    var image2Input = $(e.target).find('[name=image2]').val();
    if (image1Input.length < 1) {
      image2Url = this.slideshow[1].url;
      image2Id = this.slideshow[1].id;
    }
    var image3Input = $(e.target).find('[name=image3]').val();
    if (image1Input.length < 1) {
      image3Url = this.slideshow[2].url;
      image3Id = this.slideshow[2].id;
    }
    var image4Input = $(e.target).find('[name=image4]').val();
    if (image1Input.length < 1) {
      image4Url = this.slideshow[3].url;
      image4Id = this.slideshow[3].id;
    }
    var image5Input = $(e.target).find('[name=image5]').val();
    if (image1Input.length < 1) {
      image5Url = this.slideshow[4].url;
      image5Id = this.slideshow[4].id;
    }

    var slides = [
      {
        'url': image1Url,
        'id': image1Id,
        'caption': image1Caption
      },
      {
        'url': image2Url,
        'id': image2Id,
        'caption': image2Caption
      },
      {
        'url': image3Url,
        'id': image3Id,
        'caption': image3Caption
      },
      {
        'url': image4Url,
        'id': image4Id,
        'caption': image4Caption
      },
      {
        'url': image5Url,
        'id': image5Id,
        'caption': image5Caption
      }
    ];

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

    var currentTileId = this._id;
    var tileProperties = {
      slideshow: slides,
      latitude: latInput,
      longitude: lngInput,
      tags: tagsInput
    }

    var errors = {};
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
