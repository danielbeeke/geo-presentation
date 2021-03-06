var functions = {
	init: function () {

		var output = '<div id="vertical-progress"><div id="vertical-progress-bar-wrapper"><div id="vertical-progress-bar"></div></div><ul>'

		var height = 100 / ($('.reveal .slides > section').length - 1)

		// Itereate over each horizontal slide
		$.each($('.reveal .slides > section'),function (index, slide) {
			var title = $('h1:first, h2:first, h3:first', slide).text()

			if (index > 0 && index < $('.reveal .slides > section').length - 1) {
				output += '<li style="height:' + height + '%;" data-id="' + index + '"><a href="#/' + index + '">' + title + '<span class="dot"><span class="inner-dot"></span></span></a></li>'
			}
		})

		output += '</ul></div>'

		$('.reveal').append(output)

		var indices = Reveal.getIndices()

		functions.update(indices.h)
	},
	update: function (index) {
		$('#vertical-progress li.active').removeClass('active').removeClass('past')
		$('#vertical-progress li[data-id="' + index + '"]').addClass('active')

		for (var i = 0; i < index; i++) {
			$('#vertical-progress li[data-id="' + i + '"]').addClass('past')
		};

		var newHeight = 100 / ($('.reveal .slides > section').length - 1) * index + '%'

		$('#vertical-progress-bar').css('height', newHeight)
	}
}

Reveal.addEventListener( 'slidechanged', function( event ) {
	functions.update(event.indexh)
} );

Reveal.addEventListener( 'ready', function( event ) {
	functions.init()
} );
