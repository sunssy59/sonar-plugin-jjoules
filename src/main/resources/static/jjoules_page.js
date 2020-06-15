window.registerExtension('jjoules/jjoules_page',function(options){
	projectName = options.component.key.substring(options.component.key.indexOf(':')+1);

	options.el.textContent = "";
	console.log("j'entre bien!!");
	//loadAllHTML();
	loadAllCss();
	loadD3JS();
	loadAllJSScript();

	window.SonarRequest.getJSON('api/issues/search',{
		resolved:false,
		componentKeys: options.component.key
	}).then(function(arg){
		divToInsert = options.el;
		divToInsert.setAttribute('class','bootstrap-iso');

		establishDesign();

		mapHeader(jjoulesData);
	});
	return function () {
        options.el.textContent = '';
    };

});

//data for test 
var jjoulesData = {
	scm_url: "test1",
	app_name: "app_name",
	build_name: "build_name",
	branch: "branch",
	commit_name: "commit_name",
	duration: 0,
	energy: 0,
	classes: [],
	build_url: "build_url"
}
const LIST_COMMIT_NAME = "build_name";
var divToInsert;
var divForInsertingTest;
var divForInsertingMenu;
var divForChart;
var all_build_timestamp = [];
var actual_jjoules_data;
//var actual_filter;
var projectName;


/* Constant des autres fichiers */
const URL_LOADED_JS_FILE = [
    "/static/jjoules/dependency/chart/Chart.bundle.min.js",
    "/static/jjoules/dependency/chart/utils/Utils.js",
    "/static/jjoules/view/GlobalView.js",
    //"/static/jjoules/js/CallBdd.js",
    "/static/jjoules/view/MapperHTML.js",
    "/static/jjoules/dependency/d3js/utils/Utils.js"];

var loadAllJSScript = function () {
    URL_LOADED_JS_FILE.forEach(function (URL) {
        var script = document.createElement("script");
        script.src = URL;
        document.head.appendChild(script);
    });
};

var loadD3JS = function () {
    var script = document.createElement("script");
    script.onload = function(){
        var otherScript = document.createElement("script");
        otherScript .src = "/static/jjoules/dependency/d3js/utils/Box.js";
        document.head.appendChild(otherScript );
    };
    script.src ="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js";
    document.head.appendChild(script);
};


/* Constant des autres fichiers */
const URL_LOADED_CSS_FILE = [
    "/static/jjoules/dependency/bootstrap-iso/bootstrap4less.css",
    "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css",
    "/static/jjoules/view/css/myStyle.css",
    "/static/jjoules/view/css/boxPlot.css"];

var loadAllCss = function () {
    URL_LOADED_CSS_FILE.forEach(function (css) {
        var link = document.createElement("link");
        link.setAttribute('href', css);
        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        document.head.appendChild(link);
    });
};

const URL_LOADED_HTML_FILE = [
    //"/static/jjoules/view/html/selectList.html",
    "/static/jjoules/view/html/detailsTests.html",
    "/static/jjoules/view/html/header.html",
    "/static/jjoules/view/html/detailClass.html"
];

/**
 * [selectList]
 * [detailsTests]
 * [header]
 * [detailClass]
 */
var HTML_FILE = [];

var loadAllHTML = function(){
    URL_LOADED_HTML_FILE.forEach(function(htmlFile){
        jQuery.get(htmlFile, undefined, function(data) {
            var name = data.split('\n', 1)[0];
            //name.substring(0, name.length-1) : cause meta charactere
            HTML_FILE[name.substring(0, name.length-1)] = data.substring(name.length+1);
        });
    });
};