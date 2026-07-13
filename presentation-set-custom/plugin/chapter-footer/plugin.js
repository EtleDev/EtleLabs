/*!
 * chapter-footer — rappelle le chapitre courant en bas à gauche de chaque slide.
 *
 * Le chapitre est le <h1> de la colonne horizontale courante (structure en
 * piles verticales : un h1 par chapitre). Si la slide de chapitre porte un
 * sous-titre (h2 ou h3), il est rappelé après un tiret, en italique.
 * Le rappel est masqué sur la slide de chapitre elle-même (le h1 y est déjà
 * en grand) et sur les colonnes sans h1.
 * Style : classes .chapter-footer / .subtitle dans reveal-extended.css.
 */
window.RevealChapterFooter = window.RevealChapterFooter || {
	id: 'chapter-footer',

	init: function ( deck ) {

		var footer = document.createElement( 'div' );
		footer.className = 'chapter-footer';
		footer.setAttribute( 'aria-hidden', 'true' );
		deck.getRevealElement().appendChild( footer );

		function update() {
			var indices = deck.getIndices();
			var columns = deck.getSlidesElement().querySelectorAll( ':scope > section' );
			var column = columns[ indices.h ];
			var chapter = column ? column.querySelector( 'h1' ) : null;
			var currentSlide = deck.getCurrentSlide();
			var onChapterSlide = chapter && currentSlide && currentSlide.contains( chapter );

			footer.textContent = chapter ? chapter.textContent : '';

			// Sous-titre du chapitre (h2 ou h3 sur la slide du h1)
			var chapterSlide = chapter ? chapter.closest( 'section' ) : null;
			var subtitle = chapterSlide ? chapterSlide.querySelector( 'h2, h3' ) : null;
			if ( chapter && subtitle ) {
				footer.appendChild( document.createTextNode( ' – ' ) );
				var sub = document.createElement( 'span' );
				sub.className = 'subtitle';
				sub.textContent = subtitle.textContent;
				footer.appendChild( sub );
			}

			footer.classList.toggle( 'visible', !!chapter && !onChapterSlide );
		}

		deck.on( 'ready', update );
		deck.on( 'slidechanged', update );
	}
};
