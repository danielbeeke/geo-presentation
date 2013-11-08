var functions = {
	init: function () {

		var output = '<div id="vertical-progress"><ul>'

		// Itereate over each horizontal slide
		$.each($('.reveal .slides > section'),function (index, slide) {
			var title = $('h1, h2, h3', slide).text()

			output += '<li data-id="' + index + '"><a href="#/' + index + '">' + title + '</a></li>'
		})

		output += '</ul></div>'

		$('.reveal').append(output)

		var indices = Reveal.getIndices()

		functions.update(indices.h)
	},
	update: function (index) {
		$('#vertical-progress li.active').removeClass('active').removeClass('past')
		$('#vertical-progress li[data-id="' + index + '"]').addClass('active').prevAll().addClass('past')
	}
}

Reveal.addEventListener( 'slidechanged', function( event ) {
	functions.update(event.indexh)
} );

Reveal.addEventListener( 'ready', function( event ) {
	functions.init()
} );
