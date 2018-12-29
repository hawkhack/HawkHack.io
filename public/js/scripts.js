$(function () {                          //run when the DOM is ready
    $('#ContactUsBtn').click(function () {  //use a class, since your ID gets mangled
        $('#contactform').addClass('active');     //add the class to the clicked element
    });

    $('#cancel').click(function () {  //use a class, since your ID gets mangled
        $('#contactform').removeClass('active');     //add the class to the clicked element
    });
});

$(".button1").click(function(){
   if($(".icon1").css("transform") == 'none'){
       $(".icon1").css("transform", "rotate(180deg)")
   }else{
       $(".icon1").css("transform", "");
   }
});

$(".button2").click(function(){
    if($(".icon2").css("transform") == 'none'){
        $(".icon2").css("transform", "rotate(180deg)")
    }else{
        $(".icon2").css("transform", "");
    }
});

$(".button3").click(function(){
    if($(".icon3").css("transform") == 'none'){
        $(".icon3").css("transform", "rotate(180deg)")
    }else{
        $(".icon3").css("transform", "");
    }
});

$(".button4").click(function(){
    if($(".icon4").css("transform") == 'none'){
        $(".icon4").css("transform", "rotate(180deg)")
    }else{
        $(".icon4").css("transform", "");
    }
});

$(".button5").click(function(){
    if($(".icon5").css("transform") == 'none'){
        $(".icon5").css("transform", "rotate(180deg)")
    }else{
        $(".icon5").css("transform", "");
    }
});

$(".button6").click(function(){
    if($(".icon6").css("transform") == 'none'){
        $(".icon6").css("transform", "rotate(180deg)")
    }else{
        $(".icon6").css("transform", "");
    }
});
