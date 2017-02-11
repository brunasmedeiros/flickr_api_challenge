var UrlExists = ((url, cb) => {
  $.ajax({
    url: url,
    dataType: "text",
    type: "GET",
    complete:  function(xhr){
      cb.apply(this, [xhr.status]);
    }
  })
})

$(document).ready(function() {
  $("#flickr_search").click(()=> {
    $("#images").empty();

    var searchText = $("#flickr_query").val();
    var API_KEY = "";
    var url = "https://api.flickr.com/services/rest/?" +
      "method=flickr.photos.search&" +
      "&text=" + searchText +
      "&content_type=1" +
      "&safe_search=1" +
      "&format=json" +
      "&jsoncallback=?" +
      "&api_key=" + API_KEY;

    $("#flickr_query").val("")

    $.ajax({
      url: url,
      type: "GET",
      dataType: 'jsonp',
      success: function(data) {
        console.log(data.photos.photo);
        $.each(data.photos.photo, (i,item) => {
          var src = "https://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_q.jpg";
          var src2 = "https://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +".jpg";
          UrlExists(src, function(status){
            if(status === 200){
              var $div = $("<div></div>").attr('class', "col-lg-2 col-sm-2 col-xs-3").css('margin-bottom', '10px').css('margin-top', '15px');
              var $img = $("<img/>").attr("src", src).attr("class", "img-thumbnail").attr("alt", "Responsive image").attr("url", src2);

              $div.append($img).appendTo('#images');  
            }
            
            $('img').on('click',function(){
              var sr=$(this).attr('url'); 
              $('#modalimg').attr('src',sr);
              $('#myModal').modal('show');
            });
          });
        });
      }
    });
  });
});