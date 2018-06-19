// Create Theme JS

window.Theme = window.Theme || {
  $: {},
  init: function() {
    this.Menu.init();
    this.Turbolinks.init();
    this.GalleryIndex.init();
    this.Caption.init();
    this.reload();
  },
  reload: function() {
    Theme.$ = {
      body: $("body"),
      hideSib: "hide-siblings",
      swiper: {}
    };
    Theme.themeData = _4ORMAT_DATA;
    this.initJSForPageType();
    this.CollectionTitle.hover();
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
    if (Theme.$.body.hasClass("active")) {
      Theme.$.body.removeClass("active");
    }
  },
  onUpdate: function(e) {
    window.Theme.reload();
  },
  onPageLoad: function(e) {
    setTimeout(function() {
      $("html").removeClass("hide-assets");
      $("html").removeClass("is-changing");
    }, 500);
  },
  onRestore: function(e) {}
};

// Initialize menu show/hide toggle behaviour

window.Theme.Menu = window.Theme.Menu || {
  init: function() {
    this.toggle();
  },
  toggle: function() {
    $("html").on("click", ".mobile-menu-toggle-trigger", function() {
      if (Theme.$.body.hasClass("active")) {
        Theme.$.body.removeClass("active");
      } else {
        Theme.$.body.addClass("active");
      }
    });
    $("html").on("click", ".menu-close", function() {
      Theme.$.body.removeClass("active");
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        if (Theme.$.body.hasClass("active")) {
          Theme.$.body.removeClass("active");
        }
      }
    });
  }
};

// Initialize collection item hover behaviour

window.Theme.CollectionTitle = window.Theme.CollectionTitle || {
  hover: function() {
    $(".listing .asset").hover(
      function() {
        $(this)
          .siblings()
          .children(".asset-inner")
          .css("opacity", ".3");
        $(".title-element").css("opacity", ".3");
      },
      function() {
        $(this)
          .siblings()
          .children(".asset-inner")
          .css("opacity", "1");
        $(".title-element").css("opacity", "1");
      }
    );
    $(".asset.index").hover(
      function() {
        $(this)
          .siblings()
          .css("opacity", ".3");
      },
      function() {
        $(this)
          .siblings()
          .css("opacity", "1");
      }
    );
  }
};

// Initialize caption show/hide toggle behaviour

window.Theme.Caption = window.Theme.Caption || {
  init: function() {
    this.toggle();
  },
  toggle: function() {
    $("html").on("click", ".details", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .children("span")
          .text("Read more");
        $(this)
          .siblings(".caption")
          .removeClass("active");
      } else {
        $(this).addClass("active");
        $(this)
          .children("span")
          .text("Close");
        $(this)
          .siblings(".caption")
          .addClass("active");
      }
    });
  }
};

// Initialize caption show/hide toggle behaviour

window.Theme.GalleryIndex = window.Theme.GalleryIndex || {
  init: function() {
    this.click();
  },
  click: function() {
    $("html").on("click", ".asset.index", function() {
      var hash = $(this).data("hash");
      if ($(".title-element").length) {
        Theme.$.swiper.slideTo(hash);
      } else {
        Theme.$.swiper.slideTo(hash - 1);
      }
      $(".swiper-slide-active")
        .siblings()
        .addClass(Theme.$.hideSib);
      $(".swiper-slide-active").removeClass(Theme.$.hideSib);
      $(".swiper-slide-active")
        .next()
        .removeClass(Theme.$.hideSib);
      $(".swiper-slide-active")
        .prev()
        .removeClass(Theme.$.hideSib);
      $(".gallery-index").removeClass("active");
      $(".index-button").removeClass("active");
    });
    $("html").on("click", ".index-button", function() {
      if ($(".gallery-index").hasClass("active")) {
        $(".gallery-index").removeClass("active");
        $(this).removeClass("active");
      } else {
        $(".gallery-index").addClass("active");
        $(this).addClass("active");
      }
    });
    $("html").on("click", ".gallery-overlay", function() {
      if ($(".gallery-index").hasClass("active")) {
        $(".gallery-index").removeClass("active");
        $(".index-button").removeClass("active");
      }
    });
    $("html").on("click", ".go-back", function() {
      Theme.$.swiper.slideTo(0);
      $(".swiper-slide-active")
        .siblings()
        .addClass(Theme.$.hideSib);
      $(".swiper-slide-active").removeClass(Theme.$.hideSib);
      $(".swiper-slide-active")
        .next()
        .removeClass(Theme.$.hideSib);
      $(".swiper-slide-active")
        .prev()
        .removeClass(Theme.$.hideSib);
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        if ($(".gallery-index").hasClass("active")) {
          $(".gallery-index").removeClass("active");
          $(".index-button").removeClass("active");
        }
      }
    });
  }
};

// Initialize page type specific behaviour

window.Theme.Gallery = window.Theme.Gallery || {
  init: function() {
    this.fancybox();
    this.swiper();
  },
  fancybox: function() {
    $(".video-overlay").on("click", "a", function() {
      $(this)
        .next()
        .addClass("active");
      $(this)
        .next()
        .find("iframe")
        .each(function() {
          var iframeContent = $(this)[0];
          iframeContent.contentWindow.postMessage('{"method":"play","value":""}', "*");
          iframeContent.contentWindow.postMessage('{"event":"command","func":"' + "playVideo" + '","args":""}', "*");
        });
    });
  },
  swiper: function() {
    // Gallery Swiper

    Theme.$.swiper = new Swiper(".swiper-container", {
      keyboard: true,
      hashNavigation: true,
      effect: "fade",
      speed: 100,
      simulateTouch: false,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        slideChangeTransitionEnd: function() {
          var backgroundColor = $(".swiper-slide-active").data("color");
          if ($(".dominant-background.global").length) {
            if (backgroundColor === "") {
              $(".dominant-background.global")
                .css("background", "transparent")
                .addClass("active");
            } else {
              $(".dominant-background.global")
                .css("background", backgroundColor)
                .removeClass("active");
            }
          }
        },
        slideChangeTransitionStart: function() {
          $(".swiper-slide-active")
            .siblings()
            .addClass(Theme.$.hideSib);
          $(".swiper-slide-active")
            .next()
            .removeClass(Theme.$.hideSib);
          $(".swiper-slide-active")
            .prev()
            .removeClass(Theme.$.hideSib);
          if ($(".video-overlay-embed iframe")) {
            $(".video-overlay-embed").removeClass("active");
            $(".video-overlay-embed")
              .find("iframe")
              .each(function() {
                var iframeContent = $(this)[0];
                iframeContent.contentWindow.postMessage('{"method":"pause","value":""}', "*");
                iframeContent.contentWindow.postMessage('{"method":"setCurrentTime","value":"1"}', "*");
                iframeContent.contentWindow.postMessage(
                  '{"event":"command","func":"' + "stopVideo" + '","args":""}',
                  "*"
                );
              });
          }
        }
      }
    });

    $(".swiper-slide-active")
      .siblings()
      .addClass(Theme.$.hideSib);
    $(".swiper-slide-active")
      .next()
      .removeClass(Theme.$.hideSib);
    $(".swiper-slide-active")
      .prev()
      .removeClass(Theme.$.hideSib);

    Theme.$.swiper.on("slideChangeTransitionStart", function() {
      var backgroundColor = $(".swiper-slide-active").data("color");
      if ($(".dominant-background.global").length) {
        if (backgroundColor === "") {
          $(".dominant-background.global")
            .css("background", "transparent")
            .addClass("active");
        } else {
          $(".dominant-background.global")
            .css("background", backgroundColor)
            .removeClass("active");
        }
      }
      $(".caption").removeClass("active");
      $(".details")
        .children("span")
        .text("Read more");
      $(".details").removeClass("active");
    });
  }
};

// Initialize object on DOM load

$(document).on("DOMContentLoaded", function() {
  Theme.init();

  // Remove index on page load if # is in url

  if (window.location.hash) {
    $(".gallery-index").removeClass("active");
    $(".index-button").removeClass("active");
  }
});
