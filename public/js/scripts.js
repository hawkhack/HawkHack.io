var navbarCollapse = function () {
	if ($("#mainNav").offset().top > 100) {
		$("#mainNav").addClass("navbar-shrink");
	} else {
		$("#mainNav").removeClass("navbar-shrink");
	}
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);

$('body').scrollspy({
	target: '#mainNav'
})
$('#mainNav ul li a[href^="#"]').on('click', function (e) {
	e.preventDefault();
	var t = this.hash;
	$('html, body').animate({
		scrollTop: $(this.hash).offset().top
	}, 650, function () {
		window.location.hash = t;
	});
})

$(document).ready(function () {
	$(".navbar-nav li a").click(function (event) {
		$(".navbar-collapse").collapse('hide');
	});
})

