$(function () {                          //run when the DOM is ready
    $('#ContactUsBtn').click(function () {  //use a class, since your ID gets mangled
        $('#contactform').addClass('active');     //add the class to the clicked element
    });

    $('#cancel').click(function () {  //use a class, since your ID gets mangled
        $('#contactform').removeClass('active');     //add the class to the clicked element
    });
});