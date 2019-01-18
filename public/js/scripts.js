$(function() {
  //run when the DOM is ready
  $("#ContactUsBtn").click(function() {
    //use a class, since your ID gets mangled
    $("#contactform").addClass("active"); //add the class to the clicked element
  });

  $("#cancel").click(function() {
    //use a class, since your ID gets mangled
    $("#contactform").removeClass("active"); //add the class to the clicked element
  });
  
  toggleItem(".button");
});

function toggleItem(elem) {
	$(elem).each(function(){
		$(this).on("click", function(){
			var myTarget = $(this).attr("data-target");
			$(elem).each(function(){
				var yourTarget = $(this).attr("data-target");
				if(myTarget !== yourTarget)
					$(this).removeClass("activeBtn", 300, "easeInBack" );
			});
			
			$(this).toggleClass("activeBtn");
		});
	});

}

