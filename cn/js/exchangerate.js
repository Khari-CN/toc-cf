(function($) {
	$(".btn-ist-unselect").click(function() {
		$(".btn-cfd-select").removeClass("selected");
		$(this).addClass('selected');
		if ($(".cfd-tab").hasClass("show")) {
			$(".cfd-tab").removeClass("show").addClass("hide");
		}
		if ($(".ist").hasClass("hide")) {
			$(".ist").removeClass("hide").addClass("show");
		}
	});

	$(".btn-cfd-select").click(function() {
		$(".btn-ist-unselect").removeClass("selected");
		$(this).addClass('selected');
		if ($(".ist").hasClass("show")) {
			$(".ist").removeClass("show").addClass("hide");
		}
		if ($(".cfd-tab").hasClass("hide")) {
			$(".cfd-tab").removeClass("hide").addClass("show");
		}
	});

	function getExchangeRate() {
		jQuery.ajax({
			type : "GET",
			url : apiDomain + '/public/cfd/backoffice/usd-to-cny-exchange-rate.json',
			success : function(data) {
				$('#img-circle-blue2 p').html(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + errorThrown);
			}
		});
	}

	$(document).ready(function() {
		$(".btn-cfd-select").click();
		getExchangeRate();
	});
})(jQuery);