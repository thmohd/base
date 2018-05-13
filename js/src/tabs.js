(function ($) {
    $(document).ready(function () {

    
    
    $('ul.map-tabs li.contact').attr('onclick','showContact();');
    $('ul.map-tabs li.schedule').attr('onclick','showSchedule();');
    $('ul.map-tabs li.school').attr('onclick','showSchools();');
    

    });
}(jQuery));



function showContact(){
            jQuery('ul.map-tabs li').removeClass('current');
            jQuery('.tab-content').removeClass('current');
    
            jQuery('ul.map-tabs li.contact').addClass('current');
            jQuery('.tab-content.contact').addClass('current');
}

function showSchedule(){
            jQuery('ul.map-tabs li').removeClass('current');
            jQuery('.tab-content').removeClass('current');
    
            jQuery('ul.map-tabs li.schedule').addClass('current');
            jQuery('.tab-content.schedule').addClass('current');
}

function showSchools(){
            jQuery('ul.map-tabs li').removeClass('current');
            jQuery('.tab-content').removeClass('current');
    
            jQuery('ul.map-tabs li.school').addClass('current');
            jQuery('.tab-content.school').addClass('current');
}