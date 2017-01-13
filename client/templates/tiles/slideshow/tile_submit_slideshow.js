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

    var image1Caption = $(e.target).find('[name=image1Caption]').val();
    var image2Caption = $(e.target).find('[name=image2Caption]').val();
    var image3Caption = $(e.target).find('[name=image3Caption]').val();
    var image4Caption = $(e.target).find('[name=image4Caption]').val();
    var image5Caption = $(e.target).find('[name=image5Caption]').val();

    var slides = [
      {
        'url': Session.get('image1UrlVar'),
        'id': Session.get('image1IdVar'),
        'caption': image1Caption
      },
      {
        'url': Session.get('image2UrlVar'),
        'id': Session.get('image2IdVar'),
        'caption': image2Caption
      },
      {
        'url': Session.get('image3UrlVar'),
        'id': Session.get('image3IdVar'),
        'caption': image3Caption
      },
      {
        'url': Session.get('image4UrlVar'),
        'id': Session.get('image4IdVar'),
        'caption': image4Caption
      },
      {
        'url': Session.get('image5UrlVar'),
        'id': Session.get('image5IdVar'),
        'caption': image5Caption
      }
    ];

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
      tileType: 'slideshow',
      text: '',
      title: '',
      imageUrl: '',
      imageId: '',
      slideshow: slides,
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
      longitude: lngInput,
      tags: tagsInput
    };

    var errors = {};

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        Session.set('tileMenu', 'false');
        Session.set('image1UrlVar', '');
        Session.set('image1IdVar', '');
        Session.set('caption1Var', '');
        Session.set('image2UrlVar', '');
        Session.set('image2IdVar', '');
        Session.set('caption2Var', '');
        Session.set('image3UrlVar', '');
        Session.set('image3IdVar', '');
        Session.set('caption3Var', '');
        Session.set('image4UrlVar', '');
        Session.set('image4IdVar', '');
        Session.set('caption4Var', '');
        Session.set('image5UrlVar', '');
        Session.set('image5IdVar', '');
        Session.set('caption5Var', '');
      }
    });
  }
});
