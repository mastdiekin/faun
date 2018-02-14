import hello from './lib/hello.js';
import $ from 'jquery';
import '../libs/bootstrap/dist/js/bootstrap.bundle.js';
import svg4everybody from '../libs/svg4everybody/dist/svg4everybody.legacy.js';
import '../libs/slick-carousel/slick/slick.js';
import Waypoint from '../libs/waypoints/lib/jquery.waypoints.js';

hello();
svg4everybody({
  polyfill: true 
});

$(window).on('load', function() {

  $.when($('.loader').delay(500).fadeOut('slow').queue(function(hideloader) { 
    $(this).css({
      display: 'none'
    });
    hideloader(); 
  })).done(function() {

    $('.about__text').waypoint(function() {
      $('.about__text').addClass('animated fadeInLeftDownSlow');
    }, { offset: '100%'});

    $('.about__image').waypoint(function() {
      $('.about__image').addClass('animated fadeInRightSlow');
    }, { offset: '100%'});

  });
});

$('.about__text, .about__image').css('opacity', 0);

$(document).ready(function() {

  $('.hero__slider').slick({
    dots: true,
    appendDots: '.hero__buttons',
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    fade: true,
    cssEase: 'linear',
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 500,
    speed: 900,
    pauseOnHover: false,
    draggable: false
  });

  $('.hero__menu-btn, .hero__close').click(function() {
    $('.hero__menu-btn').toggleClass('is-active');
    $('.hero__menu').toggleClass('is-active');
  });

  $('.search__close, .hero__search').click(function(e) {
    e.preventDefault();
    $('.hero__search').toggleClass('is-active');
    $('.search__pop').toggleClass('is-active');
  });

  var time = 10;
  var $bar,
    $videoslick,
    $videoslicknav,
    isPause,
    tick,
    percentTime;

  $videoslick = $('.video__slider');
  $videoslicknav = $('.video__nav');

  $videoslick.slick({
    dots: true,
    appendDots: '.video__buttons',
    arrows: false,
    infinite: true,
    fade: true,
    cssEase: 'linear',
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 500,
    speed: 900,
    pauseOnHover: false,
    asNavFor: '.video__nav',
    draggable: false
  });

  $videoslicknav.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.video__slider',
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true
  });

  $('.video__nav, .video__buttons button').click(function() {
    resetProgressbar();
    startProgressbar();
  });

  $bar = $('.video__progress .progress');
  
  $('.video__nav, .video__slider').on({
    mouseenter: function() {
      isPause = true;
    },
    mouseleave: function() {
      isPause = false;
    }
  });
  
  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }
  
  function interval() {
    if(isPause === false) {
      percentTime += 1 / (time+0.1);
      $bar.css({
        width: percentTime+'%'
      });
      if(percentTime >= 100)
      {
        $videoslick.slick('slickNext');
        $videoslicknav.slick('slickNext');
        startProgressbar();
      }
    }
  }
  
  
  function resetProgressbar() {
    $bar.css({
      width: 0+'%' 
    });
    clearTimeout(tick);
  }
  
  startProgressbar();


});
