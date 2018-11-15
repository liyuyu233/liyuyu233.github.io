// update_sidebar_view
var height_window = window.innerHeight;
var css_main = document.getElementById("css_page_framework_posts");

// adjust the height of #content_container
var element_content_container = document.getElementById("content_container");
var height_content_container = element_content_container.clientHeight;
css_main.sheet.insertRule(
	"#content_container {\
		min-height:px;\
	}");
