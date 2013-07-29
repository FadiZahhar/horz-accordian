/* ===================
	Amplifi NS
===================*/
	var QV = QV || {};

	QV = {

		vars:	{

			//vars to config selectors,
			//place re-occuring selectors/elems here and assign them to variables
			detailElem	:	".prodDetails", 			//parent QV container
			openElem	:	"a[title=\"QUICK VIEW\"]",	//QV open button
			closeElem	:	"a[title=\"CLOSE\"]", 		//QV close button/icon
			openClass	:	"open", 					//the class that facilitates the animation open state
			closeClass	:	"close"						//the class that facilitates the animation close state

		},
		qvIsOpenFlag	:	false,	//set if a QV is currently open
		qvCurrOpen		:	null,	//get's index value of currently open QV
		init			:	function(){

			//disabled default <a> onclick behavior
			$(QV.vars.openElem).on("click", function(e){e.preventDefault()});
			$(QV.vars.closeElem).on("click", function(e){e.preventDefault()}); 

			//binds click event to QV open button and handles CSS3 animation if supported in browser.
			//The .cssanimations is a class that get's assigned to the opening <html> element by Modernizr
			$(".cssanimations " + QV.vars.openElem).on("click",
				function(e){

					//gets a handle to the parent QV container and assigns it to $thisDetail variable
					var $thisDetail = $(this).parent().parent().parent(QV.vars.detailElem);

					//adds and removes the necessary classes from the parent QV container as needed
					$thisDetail.removeClass(QV.vars.closeClass);
					$thisDetail.addClass(QV.vars.openClass);

					//if qvIsOpenFlag is true then a QV has been previously opened and will need to be closed
					//passes a reference to the closePrev method to handle closing previously opened QV
					if(QV.qvIsOpenFlag == true){
						QV.altClose(null, this);
					};

					//Gets a handle to the currently opened QV and prevents bubbling of click event.
					//This is so that clicking outside the current QV will close the currently opened 
					//QV, but only of you click outside the current QV 
					QV.qvCurrOpen = $(QV.vars.detailElem).index($thisDetail);
					QV.stopBubble(QV.qvCurrOpen);
					QV.qvIsOpenFlag = true;

				}
			);

			//binds click event to QV close button/icon and handles CSS3 animation if supported in browser.
			//The .cssanimations is a class that get's assigned to the opening <html> element by Modernizr
			$(".cssanimations " + QV.vars.closeElem).on("click",
				function(e){

					$(this).parent().parent().parent(QV.vars.detailElem).removeClass(QV.vars.openClass);
					$(this).parent().parent().parent(QV.vars.detailElem).addClass(QV.vars.closeClass);

					QV.qvCurrOpen = null;
					QV.qvIsOpenFlag = false;

				}
			);

			//binds click event to QV open button and handles animation for non CSS3 supported browsers.
			//The .no-cssanimations is a class that get's assigned to the opening <html> element by Modernizr
			$(".no-cssanimations " + QV.vars.openElem).on("click",
				function(e){

					//gets a handle to the parent QV container and assigns it to $thisDetail variable
					var $thisDetail = $(this).parent().parent().parent(QV.vars.detailElem);

					$thisDetail.animate(
						{
							left: -300,
							width: "600px"
						}
					);

					//if qvIsOpenFlag is true then a QV has been previously opened and will need to be closed
					//passes a reference to the closePrev method to handle closing previously opened QV
					if(QV.qvIsOpenFlag == true){
						QV.altClose(null, this);
					};

					//Gets a handle to the currently opened QV and prevents bubbling of click event.
					//This is so that clicking outside the current QV will close the currently opened 
					//QV, but only of you click outside the current QV 
					QV.qvCurrOpen = $(QV.vars.detailElem).index($thisDetail);
					QV.stopBubble(QV.qvCurrOpen);
					QV.qvIsOpenFlag = true;

				}
			);

			//binds click event to QV closen button/icon and handles animation for non CSS3 supported browsers.
			//The .no-cssanimations is a class that get's assigned to the opening <html> element by Modernizr
			$(".no-cssanimations " + QV.vars.closeElem).on("click",
				function(e){
					var $this = $(this);
					$(this).parent().parent().parent(QV.vars.detailElem).animate(
						{
							left: 0,
							width: "300px"
						}
					);
				}
			);
			//Bind click event to document and close any open QV when a click is encountered outside the currently opened QV
			$(document).on("click",
				function() {
					if(QV.qvCurrOpen != null){
						QV.altClose(QV.qvCurrOpen, null);
						QV.qvCurrOpen = null;
					}
				}
			);
			//Bind keyup event and close any open QV
			$(document).keyup(
				function(e){

					if(e.keyCode === 27){

						QV.altClose();

					}

				}

			);

		},
		//stops the event form bubbling up the DOM tree, allows us to capture the clicking outside the QV
		stopBubble: function(indx){

			$(QV.vars.detailElem).eq(indx).on("click",function(e){e.stopPropagation()})

		},
		//Method for handling QV closing when not invoked via the close button/icon 
		altClose:	function(openIndx, prevClose){

			if(openIndx != null){
				if($(QV.vars.detailElem).eq(openIndx).hasClass(QV.vars.openClass)){
					$(QV.vars.detailElem).eq(openIndx).removeClass(QV.vars.openClass).addClass(QV.vars.closeClass);
				}else{
					$(QV.vars.detailElem).eq(openIndx).animate(
						{
							left: "0",
							width: "300px"
						}
					)
				}
			}else if(prevClose != null){

				$(QV.vars.openElem).not(prevClose).parent().parent().parent(QV.vars.detailElem).each(
					function(indx){

						if($(this).hasClass(QV.vars.openClass)){
							$(this).addClass(QV.vars.closeClass);
							$(this).removeClass(QV.vars.openClass);
						} else {
							$(this).animate(
								{
									left: "0",
									width: "300px"
								}
							);
						}
					}
				)
			}else{
				$(QV.vars.detailElem).each(
					function(indx){
						if($(this).hasClass(QV.vars.openClass)){
							$(this).removeClass(QV.vars.openClass).addClass(QV.vars.closeClass);
						} else {

							$(this).animate(
								{
									left: "0",
									width: "300px"
								}
							);

						}
					}
				);
			}

		},

	}

	$(document).ready(

		function(){

			QV.init();

		}

	)
