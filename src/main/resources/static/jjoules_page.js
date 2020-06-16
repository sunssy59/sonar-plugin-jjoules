window.registerExtension('jjoules/jjoules_page',function(options){
	projectName = options.component.key.substring(options.component.key.indexOf(':')+1);

	options.el.textContent = "";
	loadAllCss();
	loadD3JS();
	loadAllJSScript();

	console.log(projectName);
	console.log(options);
	divToInsert = options.el;
	divToInsert.setAttribute('class','col-5 bootstrap-iso margin-left');
	//establishDesign();
	printResult(jjoulesData);





	// let div = document.createElement("div");
	// document.setAttribute("class","test");
	// div.innerHTML = '<div class="card-body"><h5 class="card-title">Energie Moyenne</h5><p class="card-text takeEnergy">test :0 Joules</p></div>';

	// options.el.appendChild(div);
// 	option.el.innerHTML = `
// 	<div class="margin-top col-6 text-center"><h3 class="testName thicker text-center">test</h3>
// 	<button type="button" class="btn btn-secondary float-right margin-right15" onclick="changeVisibility(this)">
// 		<span class="oi oi-menu"></span>
// 	</button>
// 	<div class="hide margin-top" role="hidden" >
// 		<div class="row">
// 			<div class="col">
// 				<div class="card text-center card-width">
// 					<div class="card-body">
// 						<h5 class="card-title">Energie Moyenne</h5>
//                         <p class="card-text takeEnergy">test :0 Joules</p>
// 					</div>
// 				</div>
// 				<div class="card text-center card-width">
// 				    <div class="card-body">
// 	                    <h5 class="card-title">Durée moyenne</h5>
// 	                    <p class="card-text">durationTest:10 ms</p>
// 	                </div>
// 	            </div>
// 			</div>
// 			<div class="col-5">
//                 <div class="card text-center card-width">
//                     <div class="card-body">
//                         <div class="canvas_boxplot"></div>
//                     </div>
//                 </div>
//             </div>
// 		</div>
// 	</div>
// </div>`







// 	//loadAllHTML();
// 	// loadAllCss();
// 	// loadD3JS();
// 	// loadAllJSScript();

// 	window.SonarRequest.getJSON('api/issues/search',{
// 		resolved:false,
// 		componentKeys: options.component.key
// 	}).then(function(arg){
// 	// 	divToInsert = options.el;
// 	// 	divToInsert.setAttribute('class','bootstrap-iso');

// 	// 	establishDesign();

// 	// 	mapHeader(jjoulesData);
// 	// });
// 	// return function () {
//  //        options.el.textContent = '';
//  //    };
//  		console.log(arg);
// });
});

//data for test 
var branchData = {
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
var jjoulesData = [{
	className: "classOne",
	methods:[
		{testName:"testOne",
		energy:20,
		duration: 30},
		{testName:"testTwo",
		energy:50,
		duration: 130},
		{testName:"testTree",
		energy:50,
		duration: 130}
	]},
	{
	className: "classTwo",
	methods:[
		{testName:"testOne",
		energy:10,
		duration: 40},
		{testName:"testTwo",
		energy:90,
		duration: 160},
		{testName:"testTree",
		energy:80,
		duration: 230}
	]}
];

var printResult = function(data){
	var globalDiv = document.createElement('div');
    globalDiv.setAttribute('class', 'row' );
    //var id_classes =0;
	data.forEach(function(classe){
		var divClass = document.createElement("div");
		divClass.setAttribute('class', 'col-3');
		divClass.innerHTML = `<h5> Class : ${classe.className} </h5>`;
		divAllMethods = document.createElement("div");
		//divAllMethods.setAttribute("id",`class-${id_classes}`);
		//divAllMethods.setAttribute('class', 'collapse');
		classe.methods.forEach(function(method){
			divMethod = document.createElement("div");
			divMethod.setAttribute('class','col-2');
			divMethod.innerHTML = `<h6> Method : ${method.testName}</h6>
									<ul> <li> energy : ${method.energy}</li>
									<li> duration : ${method.duration}</li></ul>`;
			divAllMethods.appendChild(divMethod);
		});

		divClass.appendChild(divAllMethods);
		globalDiv.appendChild(divClass);
	});

	divToInsert.appendChild(globalDiv);

	divForChart = document.createElement("div");
    divForChart.setAttribute('class', 'margin-top');

	var canvas2 = document.createElement("canvas");
    createGraph(canvas2, "bubble", fillDataForTestSuiteGraph(data));
    divForChart.appendChild(canvas2);

    divToInsert.appendChild(divForChart);
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

/**
 * Add the principal div to the  HTML
 * the divForInsertingMenu
 * the divForInsertingTest
 * the divForChart
 */
var establishDesign = function(){
    var globalDiv = document.createElement('div');
    globalDiv.setAttribute('class', 'row');

    divForInsertingMenu = document.createElement("div");
    divForInsertingMenu.setAttribute('class', 'menu-fixed col-3 margin-left');

    var rightDiv = document.createElement("div");
    rightDiv.setAttribute('class', 'col-9');

    divForInsertingTest = document.createElement("div");
    divForInsertingTest.setAttribute('class', 'margin-top padding-left');

    divForChart = document.createElement("div");
    divForChart.setAttribute('class', 'margin-top');

    rightDiv.appendChild(divForInsertingTest);
    rightDiv.appendChild(divForChart);

    var divUseless = document.createElement("div");
    divUseless.setAttribute('class', 'col-3');

    globalDiv.appendChild(divUseless);
    globalDiv.appendChild(divForInsertingMenu);
    globalDiv.appendChild(rightDiv);

    divToInsert.appendChild(globalDiv);
};


//FOR TESTS

/**
 * Create random RGBA string color
 * @return String rgba color
 */
var randomColor = function () {
    return "rgba(" + Math.floor(Math.random() * Math.floor(256)) + "," +
        "" + Math.floor(Math.random() * Math.floor(256)) + ", " +
        "" + Math.floor(Math.random() * Math.floor(256)) + ", 1)";
};

/**
 * Create data for feed bubble chart
 * @param labels: table with label of data
 * @param data: table with many data
 * @return {{}} data to create chartJS chart
 */
var createDataForBubbleGraph = function (labels, data) {
    var dataReturn = {};
    dataReturn.datasets = [];
    for (var i = 0; i < labels.length; i++) {
        dataReturn.datasets.push({label: labels[i], data: data[i], backgroundColor: randomColor()});
    }
    return dataReturn;
};

/**
 * Create data for specific chart
 * @param classes: all the data to put inside chart
 * @return {{}} data to create chartJS chart
 */
var fillDataForTestSuiteGraph = function (classes) {
    labels = [];
    var data = [];

    classes.forEach(function(classe){
        var bubble = [];
        labels.push(classe.className);
        classe.methods.forEach(function(method){
            var obj = {testName:method.testName,energy:method.energy,duration:method.duration};
            bubble.push({x:obj.duration, y:obj.energy, r: 10});
        });
        data.push(bubble);
    });
    return createDataForBubbleGraph(labels, data);
};
/**
 * Create graph and display it into canvas
 * @param canvas : display the graph into it
 * @param type : Line, Bar, Radar, Bubble, Area, Mixed..
 * @param data : data (saw the chartJS documentation or use "createDataForBubbleGraph" to put true data
 */
var createGraph = function (canvas, type, data) {
    new Chart(canvas, {
        type: type,
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};