'use strict';

var App,
	Animate,
	$header		=	$('#header'),
	$myName		=	$('#myName'),
	nameHolder	=	document.getElementById('myName'),
	$svg		=	document.getElementById('svgCont'),
	$stickyPos	=	$myName.offset().top,
	$bars 		=	$('.progressBar'),
	$main		=	document.getElementById('mainContent'),
	winHeight	=	window.innerHeight,
	backPos		=	-350,
	trigger		=	false,
	faderOff	=	false,
	burger 		=	document.getElementById('burger'),
	menuOpen 	=	false,
	body		=	document.getElementsByTagName('body'),
	header		=	document.getElementById('headMenu'),
	$input		=	$('.textInput'),
	$form		=	$('#submitBtn');

	

// --- zApp ---

App = {
	init: function() {


		var wScroll 	= window.pageYOffset,
			parallax	= wScroll/2,
			parallaxMax	= Math.min(parallax, $stickyPos-175),
			scrollLim 	= Math.max(Math.min(wScroll/600 + 0.1,0.8),0),
			$headDarker	= document.getElementById('headDarker'),
			$headerJS	= document.getElementById('header');

		if ($headerJS.offsetHeight == 575) {
			backPos = -278;
		}

		$headerJS.style.backgroundPosition = 'center '+ (backPos + -parallaxMax) +'px';
		$headDarker.style.backgroundColor = 'rgba(0,0,0,'+(scrollLim-0.1)+')';
		
		if (wScroll >= $stickyPos) {
			$header.addClass('sticky').css({ top: -$stickyPos });
			$main.style.marginTop = $headerJS.offsetHeight+'px';
		}else {
			$main.style.marginTop = 0+'px';
			$header.removeClass('sticky');
			$headerJS.style.top = 0;
			$svg.style.transform = 'translateY('+ -parallax +'px)';
			nameHolder.style.transform = 'scale('+ (1-parallax/900) +')';
		}
	},

	isMobile: function(agent) {

		if (agent == null) {
			agent = /Mobile|Android|BlackBerry|PlayBook|Nokia|iPhone|iPad|iPod/;
		}

		var uAgent	= navigator.userAgent;

			if(agent.test(uAgent)) {
				return true;
			} else {
				return false;
			}

	},

	progressBar: function() {

		if (!trigger) {
			var bars 	= document.getElementsByClassName('progressBar'),
				qty		= bars.length-1,
				i = 0;

				
			while (i <= qty) {
				var	who		= bars[i],
					value	= who.getAttribute('data-prog');

				who.style.width = value+'%';
				i++;
			}
			trigger = true;
		}
	},

	headScroll: function() {

			var wScroll 	= window.pageYOffset,
				parallax	= wScroll/2,
				scrollLim 	= Math.max(Math.min(wScroll/600 + 0.1,0.9),0),
				$headDarker	= document.getElementById('headDarker'),
				$headerJS	= document.getElementById('header');

			if (wScroll >= $stickyPos) {
				$header.addClass('sticky').css({ top: -$stickyPos });
				$main.style.marginTop = $headerJS.offsetHeight+'px';
			}else {
				$header.removeClass('sticky');
				$main.style.marginTop = 0+'px';
				$headerJS.style.backgroundPosition = 'center '+ (backPos + -parallax) +'px';
				$headerJS.style.top = 0;
				$headDarker.style.backgroundColor = 'rgba(0,0,0,'+scrollLim+')';
				$svg.style.transform = 'translateY('+ -parallax +'px)';
				$svg.style.opacity = 1.1 - scrollLim;
				nameHolder.style.transform = 'scale('+ (1-parallax/900) +')';
				nameHolder.style.bottom = (64 - (parallax/10))+'px';
			}
	},

	yellowBoxSize: function() {
		var yellow 		= document.querySelectorAll('.yellow'),
			neighbor	= document.querySelectorAll('.neighbor');

		for (var i = 0; i < neighbor.length; i++) {
			var neighborH = neighbor[i].offsetHeight;

			yellow[i].style.height = neighborH+'px';
		}
	},

	myWorkYellowSize: function() {
		var half			=	document.getElementById('yellowMyWork'),
			picGrid			=	document.getElementById('picGrid'),
			height			=	picGrid.offsetHeight * 0.75,
			marginHeight	=	(picGrid.offsetHeight * 0.25) / 2;

		half.style.height	= height + 'px';
		half.style.marginTop	=  marginHeight + 'px';
	},

	progressBarReset: function() {
		
		if (trigger) {
			
			TweenLite.set($bars, { width: 0 });
			trigger = false;
		}
	},

	mobileHeader: function() {
		var winHeight 	= window.innerHeight,
			header 		= document.getElementById('header');

			header.style.height = winHeight+'px';
	},

	contactMail: function(formID) {
		
		var formData	=	$(formID).serialize(),
			language	=	$('html').attr('lang'),
			succMess,
			failMess;


		if (language === 'en') {
			succMess = 'Thanks! You\'re message has been sent successfully.';
			failMess = 'An error has occured while sending your message. You can retry or click <a href="mailto:theaftermath87@gmail.com" class="mailLink">here</a> to write me via your regular mail client.';
		} else if (language === 'fr') {
			succMess = 'Merci! Votre message été envoyé avec succès.';
			failMess = 'Une erreur est survenue lors de l\'envoie de votre message. Vous pouvez réessayer ou cliquez <a href="mailto:theaftermath87@gmail.com" class="mailLink">ici</a> pour m\'écrire via votre service courriel habituel.';
		}

		$.ajax({
			url: 'contact.php',
			type: 'POST',
			data: formData,
		})
		.done(function() {
			$('.mailSuccess').html(succMess);
			$('.textInput, #textArea').val('');
			setTimeout(function() {
				$('input').blur();
			},500);
		})
		.fail(function() {
			$('.mailSuccess').html(failMess);
		});
		
	}
};
// --- zApp End ---


// --- Animations ---

Animate = {

	autoScroll: function(who) {

		var	target	=	who.attr('href'),
			minus;


		if (window.matchMedia('(min-width:1200px)').matches) {
			minus = ((window.innerHeight - $(target).height())/2)+65;
		} else {
			minus = 50;
		}

		TweenLite.to($('body,html'), 2,{ ease: Power2.easeInOut, scrollTop:  $(target).offset().top - minus });

	},

	progressBar: function() {

		if (!trigger) {
			var bars 	=	document.getElementsByClassName('progressBar'),
				qty		=	bars.length-1,
				i = 0;

				
			while (i <= qty) {
				var	who		= bars[i],
					value	= who.getAttribute('data-prog'),
					rdm		= Math.random()*(2000-1500+1)+1500;

				TweenLite.to($(who), rdm/1000, { ease: Power2.easeInOut, width: value+'%' });
				i++;
			}
			trigger = true;
		}
	},

	placeholdersBlur: function(who) {
		var placeholder = who.siblings('.placeholder'),
			value		= who.val();

		if (value === '') {
			TweenLite.to(placeholder, 0.2, { ease: Power2.easeInOut, top: 4, fontSize: 18, color: '#FFF' });
		}
	},

	placeholdersFocus: function(who) {
		var placeholder = who.siblings('.placeholder');

		TweenMax.to(placeholder, 0.3, { ease: Power2.easeInOut, top: -15, color: '#F1CA10' });
	},

	mobileMenuOpen: function(who) {

		who.addClass('burgerClosed');
		header.style.left = 0+'px';
		$('#headMenu').addClass('menuOpened');
		TweenLite.set($('body, html'), { overflow: 'hidden' });

	},

	mobileMenuClose: function(who) {

		who.removeClass('burgerClosed');
		$('#headMenu').removeClass('menuOpened');
		setTimeout(function() {
			header.style.left = -100+'%';
		},500);
		TweenLite.set($('body, html'), { overflow: 'scroll' });
	}


}
// --- Animations End ---


// --- Header ---

$(document).ready(function() {
	
	if (window.matchMedia('(min-width:1025px)').matches && !App.isMobile()) {
		App.init();
	} else if (window.matchMedia('(max-width:1024px)').matches) {
		App.mobileHeader();
	}
});

$('.menu li a').on('click', function(event) {
	event.preventDefault();
	Animate.autoScroll($(this));
	if (window.matchMedia('(max-width:1024px)').matches) {
		Animate.mobileMenuClose($('#burger'));
		menuOpen = false;
	}
});

window.onscroll = function() {

	if (window.matchMedia('(min-width:1025px)').matches && !App.isMobile()) {
		App.headScroll();;
	}

};

burger.onclick = function() {
	if (!menuOpen && window.matchMedia('(max-width:1024px)').matches) {
		Animate.mobileMenuOpen($(this));
		menuOpen = true;
	} else if (menuOpen && window.matchMedia('(max-width:1024px)').matches){
		Animate.mobileMenuClose($(this));
		menuOpen = false;
	}
}

$('header').on('swipeleft', function () {

	if (menuOpen && window.matchMedia('(max-width:1024px)').matches){
		Animate.mobileMenuClose($('#burger'));
		menuOpen = false;
	}
});

$('body, html').on('swiperight', function() {
	if (!menuOpen && window.matchMedia('(max-width:1024px)').matches && App.isMobile()) {
		Animate.mobileMenuOpen($('#burger'));
		menuOpen = true;
	}
});


$(window).on('orientationchange', function() {
	if (App.isMobile()) {
		setTimeout(function() {
			App.mobileHeader();
		},250);
	}
});
// --- Header End ---


// --- Main Content ---

window.onload = function() {

	var scrollOffset	= window.pageYOffset,
		positioning		= $('body').offset().top - (window.innerHeight / 2.5),
		positioning2	= ($('#aboutMe').offset().top + $('#aboutMe').height() - (window.innerHeight / 4));

	if (!faderOff) {
		setTimeout(function(){
			$('.fader').fadeOut(1000);
		}, 100);
		faderOff = true;
	}

	if (window.matchMedia('(min-width: 991px)').matches) {

		App.yellowBoxSize();
		App.myWorkYellowSize();

		if (scrollOffset > positioning && scrollOffset < positioning2) {
			Animate.progressBar();
		}
	} else {
		App.progressBar();
	}
};

$(window).on('resize', function(){
	
	if (window.matchMedia('(min-width: 991px)').matches) {
		App.yellowBoxSize();
		App.myWorkYellowSize();
	}
});

$(window).on('scroll', function() {

	var scrollOffset	= window.pageYOffset,
		positioning1	= $('#aboutMe').offset().top - (window.innerHeight / 2.5),
		positioning2	= $('#aboutMe').offset().top - (window.innerHeight),
		positioning3	= ($('#aboutMe').offset().top + $('#aboutMe').height() - (window.innerHeight / 4));

	if (window.matchMedia('(min-width: 1200px)').matches && !App.isMobile()) {
		if (scrollOffset > positioning1 && scrollOffset < positioning3) {
			Animate.progressBar();
		} else if (scrollOffset < positioning2 || scrollOffset > positioning3) {
			App.progressBarReset();
		}
	} else {
		App.progressBar();
	}
});
// --- Main Content End ---


// --- Forms ---

// Fake placeholders

$input.on('focus', function() {
	Animate.placeholdersFocus($(this));
	$('.mailSuccess').html('');
});

$('#textArea').on('keypress', function() {
	var textVal	= $('#textArea').val();

	if (textVal.length > 4) {
		$('.mailSuccess').html('');
	}
});

$input.on('blur', function() {
	Animate.placeholdersBlur($(this));
});



// Form management

$form.on('click', function(event) {
	event.preventDefault();
	var nameVal	= $('#nameInput').val(),
		mailVal	= $('#mailInput').val(),
		cieVal	= $('#cieInput').val,
		textVal	= $('#textArea').val();
	
	if (nameVal.length <= 1) {
		$('.mailSuccess').html('You must at least enter a name!');
	} else if (textVal.length <= 5) {
		event.preventDefault();
		if (textVal.length === 0) {
			$('.mailSuccess').html('Hhmmm... What\s the point of contacting me if there\'s no message?!')
		} else {
			$('.mailSuccess').html('I doubt you can tell me something in 5 letters or less...')
		}
	} else {
		App.contactMail('#emailForm');
	}
});
// --- Forms End ---
