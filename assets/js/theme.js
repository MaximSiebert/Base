// Create Theme JS

window.Theme = window.Theme || {
  $: {
    container: $(".container"),
    header: $(".header"),
    body: $("body"),
    menuToggle: $(".mobile-menu-toggle-trigger"),
    menuClose: $(".menu-close"),
  },
  init: function() {
    Theme.themeData = _4ORMAT_DATA;
    this.initJSForPageType();
    this.Menu.toggle();
    this.CollectionTitle.hover();
    this.GalleryIndex.click();
    this.Caption.toggle();
    this.Turbolinks.init();
  },
  initJSForPageType: function() {
    var pageType = this.normalizedPageType();
    if (window.Theme.hasOwnProperty(pageType)) {
      window.Theme[pageType].init();
    }
  },
  normalizedPageType: function() {
    var pageType;
    if (Theme.themeData.page.hasOwnProperty("nested")) {
      pageType = Theme.themeData.page.nested.type.charAt(0).toUpperCase() + Theme.themeData.page.nested.type.slice(1);
    } else {
      pageType = Theme.themeData.page.type.charAt(0).toUpperCase() + Theme.themeData.page.type.slice(1);
    }
    return pageType;
  }
};

// Turbolinks events

window.Theme.Turbolinks = window.Theme.Turbolinks || {
  init: function() {
    $(window).on("page:update", this.onUpdate.bind(this));
    $(window).on("page:before-change", this.onBeforeChange.bind(this));
    $(window).on("page:load", this.onPageLoad.bind(this));
    $(window).on("page:restore", this.onRestore.bind(this));
  },
  onBeforeChange: function(e) {
    $("html").addClass("is-changing");
    Turbolinks.visit(e.originalEvent.data.url);
    if ($('body').hasClass('active')) {
      $('body').removeClass('active');
    }
  },
  onUpdate: function(e) {
    window.Theme.init();
  },
  onPageLoad: function(e) {
    setTimeout(function() {
      $("html").removeClass("hide-assets");
      $("html").removeClass("is-changing");
    }, 500);
  },
  onRestore: function(e) {
  }
};

// Initialize menu show/hide toggle behaviour

window.Theme.Menu = window.Theme.Menu || {
  toggle: function() {
    $("html").on("click", ".mobile-menu-toggle-trigger", function () {
      Theme.$.body.toggleClass("active");
    });
    $("html").on("click", ".menu-close", function () {
      Theme.$.body.toggleClass("active");
    });
  }
};

// Initialize collection item hover behaviour

window.Theme.CollectionTitle = window.Theme.CollectionTitle || {
  hover: function () {
    $(".asset").hover(
      function () {
        $(this).siblings().children('.asset-inner').css('opacity', '.3');
        $('.title-element').css('opacity', '.3');
      }, function() {
        $(this).siblings().children('.asset-inner').css('opacity', '1');
        $('.title-element').css('opacity', '1');
      }
    );
    $(".asset.index").hover(
      function () {
        $(this).siblings().css('opacity', '.3');
      }, function() {
        $(this).siblings().css('opacity', '1');
      }
    );
  }
};

// Initialize caption show/hide toggle behaviour

window.Theme.Caption = window.Theme.Caption || {
  toggle: function () {
    $("html").on("click", ".details", function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass("active");
        $(this).children('span').text('+')
        $(this).siblings('.caption').removeClass("active");
      } else {
        $(this).addClass("active");
        $(this).children('span').text('−')
        $(this).siblings('.caption').addClass("active");
      }
    });
  }
};

// Initialize caption show/hide toggle behaviour

window.Theme.GalleryIndex = window.Theme.GalleryIndex || {
  click: function () {
    $("html").on("click", ".asset.index", function () {
      var hash = $(this).data('hash');
      swiper.slideTo(hash)
      $('.gallery-index').removeClass('active');
      $(".index-button").removeClass('active');
    });
    $("html").on("click", ".index-button", function () {
      if ($('.gallery-index').hasClass('active')) {
        $('.gallery-index').removeClass("active");
        $(this).removeClass('active');
      } else {
        $('.gallery-index').addClass("active");
        $(this).addClass('active');
      }
    });
  }
};

// Initialize page type specific behaviour

window.Theme.Gallery = window.Theme.Gallery || {
  init: function() {
    this.respVideo();
    this.overlayVideo();
    this.fancybox();
  },
  overlayVideo: function() {
    // Video overlays
    var video = $(".video"),
        videoOverlay = $(".video-overlay");

    videoOverlay.click(function(e) {
      e.preventDefault();
      $(this)
        .parent(".video")
        .addClass("playing");
      $(this)
        .parent(".video")
        .find("iframe")[0].src +=
        "&autoplay=1";
      $('body').addClass('video-playing');
    });
  },
  respVideo: function() {
    reframe("iframe");
  },
  fancybox: function() {
    $("[data-fancybox]").fancybox({
      baseClass: "boilerplate-slideshow",
      animationDuration: 180,
      transitionDuration: 180,
      toolbar: false
    });
  }
};

// Gallery Swiper

var swiper = new Swiper('.swiper-container', {
  keyboard: true,
  hashNavigation: true,
  effect: 'fade',
  speed: 100,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

swiper.on('slideChange', function () {
  $('.caption').removeClass('active');
  $('.details').children('span').text('+');
  $('.details').removeClass('active');
});

// Initialize object on DOM load

$(document).on("DOMContentLoaded", function() {
  Theme.init();

  // Remove index on page load if # is in url
  
  if(window.location.hash) {
    $('.gallery-index').removeClass('active');
    $(".index-button").removeClass('active');
  }
});
