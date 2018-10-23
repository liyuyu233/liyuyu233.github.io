// update_sidebar_view
var height_window = window.innerHeight;
var height_sidebar_character = document.getElementById("sidebar_character").clientHeight;
var css_main = document.getElementById("css_page_framework");
// adjust the height of #sidebar to parent height - padding
var element_sidebar = document.getElementById("sidebar");
css_main.sheet.insertRule(
	"#sidebar {\
		min-height:" + (height_window - 100) + "px;\
	}");

// adjust the height of #content_container
var element_content_container = document.getElementById("content_container");
var height_sidebar = element_sidebar.clientHeight;
var height_content_container = element_content_container.clientHeight;
css_main.sheet.insertRule(
	"#content_container {\
		min-height:" + (height_sidebar + height_sidebar_character - 100) + "px;\
	}");
// insert at rule that hides sidebar_character
css_main.sheet.insertRule(
	"@media screen and (max-height:" + height_sidebar_character + "px) {\
		#sidebar_character {\
			visibility: hidden;\
		}\
	}");