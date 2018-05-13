(function ($) {
    $(document).ready(function () {

        if ($(window).width() > 767) {
            $("#navigation ul.menu li.expanded").hover(
                function () {
                    $("#navigation ul.menu li.expanded > ul ").hide();
                    $(this).find("> ul.menu").fadeIn();
                    $(this).find("> ul.menu").addClass("open");
                    $(this).addClass("open");
                },
                function () {
                    $(this).find("> ul.menu").hide();
                    $(this).find("> ul.menu").removeClass("open");
                    $(this).removeClass("open");
                }
            )
        }
        else {

            $("#navigation ul.menu li.expanded").on("click", function () {

                $("#navigation ul.menu li.expanded > ul").hide();


                if ($(this).hasClass("open")) {

                    $(this).find("> ul.menu").hide();
                    $(this).find("> ul.menu").removeClass("open");
                    $(this).removeClass("open");

                }
                else {
                    $("#navigation ul.menu li.expanded").removeClass("open");
                    $(this).find("> ul.menu").show();
                    $(this).find("> ul.menu").addClass("open");
                    $(this).addClass("open");
                }


            });

        }


    });
}(jQuery));