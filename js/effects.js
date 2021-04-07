if (typeof NProgress != 'undefined') {
	NProgress.start();
	// Barra de progreso de carga del sitio
	window.onload = function() {
        NProgress.done();
    };
}

$(window).on('load', function() {
	
	// Detecta el usuario agente para minimizar el menu lateral
	if(viewport().width <= 748) {
		$(".page-wrapper").removeClass("toggled");
	}
	// Detecta el usuario agente para poder minimizar el menu lateral
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$(".page-wrapper").removeClass("toggled");
	}
});

$(window).on('resize', function() {
	if(260 <= viewport().width && viewport().width <= 748 ) {
		$(".page-wrapper").removeClass("toggled");
	}
	else {
		$(".page-wrapper").addClass("toggled");
	}
});


jQuery(function ($) {

	$.fn.selectpicker.Constructor.BootstrapVersion = '4';

	$(".sidebar-dropdown > a").click(function() {
		$(".sidebar-submenu").slideUp(200);
		if ($(this).parent().hasClass("active")) {
			$(".sidebar-dropdown").removeClass("active");
			$(this).parent().removeClass("active");
		} else {
			$(".sidebar-dropdown").removeClass("active");
			$(this).next(".sidebar-submenu").slideDown(200);
			$(this).parent().addClass("active");
		}
	});

	$("#close-sidebar").click(function() {
		$(".page-wrapper").removeClass("toggled");
	});

	$("#show-sidebar").click(function() {
		$(".page-wrapper").addClass("toggled");
	});

	var ps = new PerfectScrollbar('.sidebar-content');

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('.selectpicker').selectpicker('mobile');
	}
	else {
		$('.selectpicker').selectpicker();
	}
});

/**
 * Retorna el ancho y alto en pixeles de la ventana del cliente donde se visualiza 
 * la plataforma.
 */
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
