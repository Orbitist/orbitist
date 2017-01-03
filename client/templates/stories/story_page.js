Template.storyPage.helpers({
  tiles: function() {
    return Tiles.find({storyId: this._id}, {sort: {rank: 1}});
  },
  ownStory: function() {
    return this.userId === Meteor.userId();
  }
});

//Once the Template is rendered, run this function which
//  sets up JQuery UI's sortable functionality
Template.storyPage.rendered = function() {
  var fullpageRunning = Session.get('fullPageInit');
  if (fullpageRunning == 'true') {
    $.fn.fullpage.destroy();
  }
  $( "iframe" ).addClass( "embed-responsive-item" );
  $('#fullpage').fullpage({
   //Scrolling
   css3: true,
   scrollingSpeed: 700,
   fitToSection: true,
   fitToSectionDelay: 1000,
   scrollBar: false,
   easing: 'easeInOutCubic',
   easingcss3: 'ease',
   loopBottom: false,
   loopTop: false,
   loopHorizontal: true,
   continuousVertical: false,
   continuousHorizontal: false,
   scrollHorizontally: false,
   interlockedSlides: false,
   dragAndMove: false,
   offsetSections: false,
   resetSliders: false,
   fadingEffect: false,
   scrollOverflow: true,
   scrollOverflowReset: true,
   touchSensitivity: 15,
   normalScrollElementTouchThreshold: 5,
   bigSectionsDestination: null,

   //Accessibility
   keyboardScrolling: true,
   animateAnchor: true,
   recordHistory: true,

   //Design
   controlArrows: true,
   verticalCentered: true,
   responsiveWidth: 0,
   responsiveHeight: 0,
   responsiveSlides: false,

   lazyLoading: true,
  });
  Session.set('fullPageInit', 'true');

  window.setInterval(function(){
    twttr.widgets.load(),
    instgrm.Embeds.process()
  }, 500);
 }
