(function ($) {
  var API = 'http://encore-api.herokuapp.com'
  userData = {};

  /**
   * Loads data from the API.
   */
   function loadData() {
    $.ajax({
      url: './data.json',
      method: 'GET',
      dataType: 'json',
      success: function(result){
        onLoadData(result);
      },
      error: function(err) {
        console.log('err', err)
      }
    });
  };

  /**
  * Receives data from the API, creates HTML for images and updates the layout
  */
  function onLoadData(data) {
    console.log(data);
    $.each(data, function(i, value) {
      $('.grid')
      .append($('<div>').attr('class','grid-item').attr('data-artistkey', value.artistKey).attr('data-artist', value.artistName)
                                .append($('<img>').attr('src', 'imgs/' + value.artistKey + '.png'))
        .append($('<div>').attr('class','closeBtn fa fa-times'))
        .append($('<h2>')
          .append($('<span>').text(value.artistName)))
        .append($('<div>').attr('class','artistInfo')
          .append($('<div>').append($('<h3>').text(value.artistName))
          .append($('<p>').text(value.dob +" - "+ value.dod)))
          .append($('<br>'))
          .append($('<br>'))
          .append($('<div>').text(value.bio))
          .append($('<br>'))
        .append($('<input>').attr("type","button").attr("value","Choose Artist").attr("class","chooseBtn"))
       ));
    });

    $('.artistInfo, .closeBtn').hide();

    var $grid = $('.grid').packery({
      itemSelector: '.grid-item',
      gutter: 10
    });

    $('header').hide();
    $('.wrapper').hide();
    $grid.hide();
  };

  $('#stageNameBtn').on('click', function(){
    if($('#stageName').val() != ""){
      userData.username = $('#stageName').val();
      $(".stageName, .stageName>h1").fadeOut('slow').promise().done(function(){
        $("header, .grid").fadeIn(1400);
      });
    }
    else{
      $("#stageName").css("border-color", "#D43131");
    }
  });

  $('.grid').on('click', '.grid-item', function(event) {

    $('.grid-item h2').not($(this).children('h2')).fadeIn(200);
    $($(this).children('h2')).fadeToggle(200);

    $('.artistInfo, .closeBtn').not($(this).children('.artistInfo, .closeBtn')).hide();
    $('.grid-item').not(event.currentTarget).removeClass('grid-item--large');

    if($(event.currentTarget).hasClass('grid-item--large')){
      $($(this).children('.artistInfo, .closeBtn')).fadeOut(200).promise().done(function(){
        $(event.currentTarget).removeClass('grid-item--large');
        $('.grid').packery('layout');
      });
    }
    else {
      $(event.currentTarget).addClass('grid-item--large').promise().done(function(){
        $($(this).children('.artistInfo, .closeBtn')).fadeIn(600);
        $('.grid').packery('layout');
      });
    }

    userData.artistKey = this.dataset.artistkey;
    userData.artist = this.dataset.artist;
  });

  $(document).on('click','.chooseBtn', function(e){
    $('.main').addClass('chooseScreen');
    $('.wrapper')
      .append($('<img>').attr('src', 'imgs/' + userData.artist.replace(/\s+/g, '-').toLowerCase() + '.png'))
      .append($('<div>')
        .append($('<p>').html('You chose<br>' + userData.artist.toUpperCase() + '!'))
        .append($('<input>').attr("type","button").attr("value","Go Back").attr("class","backBtn"))
        .append($('<input>').attr("type","button").attr("value","Continue").attr("class","contBtn")));

      $('.wrapper').show();

      $('.backBtn').on('click',function(){
        $('.main').removeClass('chooseScreen');
        $('.wrapper').fadeOut(600).promise().done(function(){
          $('.wrapper>img').remove();
          $('.wrapper>div').remove();
        });
      });

      $('.contBtn').on('click', function(){
        resetPage();

        $.ajax({
          url: API+"/users",
          method: 'POST',
          contentType : 'application/json',
          data: JSON.stringify(userData),
          success: resetPage,
          error: function(err) {
            console.log('err', err)
          }
        });
      });
  });

  function resetPage(){
    $('.wrapper>div').remove();
    $('.wrapper')
      .append($('<div>')
        .append($('<p>').attr('class','last').html("<section>It's time to shine!</section><br> Enter the booth to take your photo"))
        .append($('<p>').attr('class','restarting').html('Resetting in <span id="time">5</span>')));

      var seconds =5;
      setInterval(function(){ 
        if(seconds>0){
          seconds--;
          $('#time').html(seconds);
        }
      }, 1000);


    setTimeout(function(){
      location.reload();
    }, 5000);
  }

      // Load first data from the API.
  loadData();
})(jQuery);
