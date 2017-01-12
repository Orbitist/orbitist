Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id}, {sort: {rank: 1}});
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  },
  isStoryMap: function(n) {
    return Session.equals('storyMap', n);
  }
});

//Once the Template is rendered, run this function which
//  sets up JQuery UI's sortable functionality
Template.storyPage.rendered = function() {
  Session.set('storyMap', 'false');

  var fullpageRunning = Session.get('fullPageInit');
  if (fullpageRunning == 'true') {
    $.fn.fullpage.destroy();
  }
  $( "iframe" ).addClass( "embed-responsive-item" );
  $('#fullpage').fullpage({
   //Scrolling
   css3: true,
   easing: 'easeInOutCubic',
   easingcss3: 'ease',

   //Accessibility
   keyboardScrolling: true,

   //Design
   controlArrows: true,

   scrollOverflow: true,
   scrollOverflowReset: true,

   lazyLoading: true
  });
  Session.set('fullPageInit', 'true');

  window.setInterval(function(){
    twttr.widgets.load(),
    instgrm.Embeds.process()
  }, 500);


 }
