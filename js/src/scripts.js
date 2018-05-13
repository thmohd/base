! function($) {
  $(document).ready(function() {
    
    //-- Tabs
      $(".nav-tabs").tab();
    //-- Flexslider
      $('.flexslider').flexslider({
        direction: "vertical",
        controlNav: false,
        directionNav: false
      });    
      
     //-- Search 
      $(".open-form").click(function(){
        $(".open-form").hide();
        $(".close-form").css("display","block");
        $(".search-block-form").fadeIn();
        $(".search-block-form input").focus();
        return false;
      });
      $(".close-form").click(function(){
        $(".close-form").hide();
        $(".open-form").css("display","block");
        $(".search-block-form").fadeOut();
        return false;
      });
      
      

      
    });
}(jQuery); 