(function ($) {
  var chosenArtist,
  userData={};

  /**
   * Loads data from the API.
   */
   function loadData() {
    $.ajax({
      url: "data.json",
      // url: "http://localhost:1339/artists",
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
    $.each(data, function(i, value) {
      $('.grid').append($('<div>').attr('class','grid-item').attr('data-artist',value.name).append($('<img>').attr('src',value.photoUrl)).append($('<div>').attr('class','closeBtn fa fa-times')).append($('<h2>').append($('<span>').text(value.name))).append($('<div>').attr('class','artistInfo').append($('<div>').append($('<h3>').text(value.name)).append($('<p>').text(value.dob +" - "+ value.dod))).append($('<img>').attr("src", value.sigUrl)).append($('<br>')).append($('<br>')).append($('<div>').text(value.bio)).append($('<div>').attr('class','artifacts').attr('id',value.name.replace(/\s/g, '')))));
      
      $.each(value.artifacts, function(i, v) {
        $('#'+value.name.replace(/\s/g, '')+".artifacts").append($('<br>')).append($('<h4>').text("Rock Hall Artifacts:")).append($('<ul>').append($('<li>').text("Name: " + v.name)).append($('<li>').text("Description: " + v.description)).append($('<li>').text("Location: " + v.location))).append($('<input>').attr("type","button").attr("value","Choose Artist").attr("class","chooseBtn"));
      });
    });

    $('.artistInfo, .closeBtn').hide();

    var $grid = $('.grid').packery({
      itemSelector: '.grid-item',
      gutter: 10
    });

    $('header').hide();
    $('.bubble').hide();
    $grid.hide();
  };

  $('#stageNameBtn').on('click', function(){
    if($('#stageName').val() != ""){
      userData.name = $('#stageName').val();
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
    else{
      $(event.currentTarget).addClass('grid-item--large').promise().done(function(){
        $($(this).children('.artistInfo, .closeBtn')).fadeIn(600);
        $('.grid').packery('layout');
      });

    }

    chosenArtist = this.dataset.artist;  

  });

  $(document).on('click','.chooseBtn',function(e){
    $('.main').addClass('chooseScreen');
      $('.bubble').append($('<span>').append($('<p>').html('You chose<br>' + chosenArtist + '!')).append($('<input>').attr("type","button").attr("value","Go Back").attr("class","backBtn")).append($('<input>').attr("type","button").attr("value","Continue").attr("class","contBtn")));
      
      $('.bubble').show();

      $('.backBtn').on('click',function(){
        $('.main').removeClass('chooseScreen');
        $('.bubble').fadeOut(600).promise().done(function(){
          $('.bubble>span').remove();
        });
      });

      $('.contBtn').on('click', function(){
        userData.artistId = chosenArtist;
        resetPage();

        $.ajax({
          url: "http://localhost:1339/users",
          method: 'POST',
          dataType: 'json',
          data: userData,
          success: resetPage,
          error: function(err) {
            console.log('err', err)
          }
        });
      });
  });

  function resetPage(){
    $('.bubble>span').remove();
    $('.bubble').append($('<span>').append($('<p>').html('Head into the <br><i>recording studio</i><br> to take your photo')));
    setTimeout(function(){ 
      location.reload();
    }, 5000);
  }

      // Load first data from the API.
  loadData();
})(jQuery);