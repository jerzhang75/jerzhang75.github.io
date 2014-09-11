// hello.js
// Author: @Jerry Jiaxuan Zhang
// Purpose: Handles tab switching for single page website

var tabSwitchers = new Array(); // array of nodes to store the tab switching elements
var showDivs = new Array(); // array of nodes to store tabs' content

$(document).ready(function () {

	// storing children of ul in a NodeList
	var tabSwitchersList = document.getElementById("navigation").childNodes;

	// filling tabSwitchers & showDivs array
	for (var i=0; i<tabSwitchersList.length; i++) {
		if (tabSwitchersList[i].nodeName == "LI") {
			var navLink = getFirstChildWithTagName(tabSwitchersList[i], 'A'); // returns the 'a' Node
			var id = getHash(navLink.getAttribute("href"));
			tabSwitchers[id] = navLink;
			showDivs[id] = document.getElementById(id);
		}
	}

	// assigns onclick event handler called 'display()' to each tab
	for (var id in tabSwitchers) {
		tabSwitchers[id].onclick = display;
	}

	// Show "About" tab by default
	tabSwitchers["about"].className = "selected";
	showDivs["about"].className = "show";

	// Animation effect on landing page
	$(".navbar-brand").fadeIn(350, function() {
//		$("#navigation").fadeIn(350, function() {
			$("#a").animate({opacity:1}, 350, function() {
				$("#p").animate({opacity:1}, 350, function() {
					$("#c").animate({opacity:1}, 350, function() {
						$(".show").animate({opacity:1}, 350);					
					});
				});
			});
//		});
	});

	// Scrolling effect
	$(function() { $.scrollIt(); });

});

// Helper function: -> Boolean
// Displays the tab's content
function display() {

	var selectedId = getHash(this.getAttribute("href"));

	// Highlight this tab; show this tab's content and hide all other content
	for (var id in showDivs) {
		if (id == selectedId) {
			showDivs[id].className = "show";
			tabSwitchers[id].className = "selected";
		}
		else {
			showDivs[id].className = "hide";
			tabSwitchers[id].className = "";
		}
	}
	
	// For fade in effect
	$(".hide").animate({opacity:0}, 200, function() {
		$(".show").animate({opacity:1}, 200);
		$(".show > table").animate({opacity:1}, 200);	
	});

	// Don't follow link
 	return false;
}

// Helper function: String -> String
// returns portion of URL after hash symbol ('#')
function getHash(url) {
	var hashPos = url.lastIndexOf('#');
	return url.substring(hashPos + 1);
}

function getFirstChildWithTagName( element, tagName ) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
      if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
}