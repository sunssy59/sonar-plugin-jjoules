import React from "react";
import "../style.css";

import AllTests from "./components/DisplayHistroyJjoules";
import App from "./App";
window.registerExtension("jjoules/jjoules_page",options =>{
	// window.SonarRequest.getJSON('/api/issues/search', {
 //        resolved: false,
 //        componentKeys: options.component.key
 //    }).then(function (arg) {
 //    	console.log(arg);
 //    });
	//console.log(options);
	return (<div>
				<AllTests data={transformData(data1)} />
				<App />
			</div>);

});

var data = {
	classesNames: ["ClassOne","ClassTwo","ClassTree"],
	data: [
		[{testName:"test1One",energy:10,duration:13},
		  {testName:"test1Two",energy:15,duration:10},
		  {testName:"test1Tree",energy:20,duration:23},
		  {testName:"test1Four",energy:30,duration:23},
		  {testName:"test1Five",energy:20,duration:23}
		],
		[{testName:"test2One",energy:12,duration:23},
		  {testName:"test2Two",energy:18,duration:8},
		  {testName:"test2Tree",energy:30,duration:23},
		  {testName:"test2Four",energy:20,duration:23}
		],
		[{testName:"test3One",energy:12,duration:23},
		  {testName:"test3Two",energy:18,duration:8},
		  {testName:"test3Tree",energy:30,duration:23},
		  {testName:"test3Four",energy:20,duration:23},
		  {testName:"test3Five",energy:20,duration:23},
		  {testName:"test3Six",energy:30,duration:23}
		]
	]
};

function transformData(data){
	var returnData = {};
	returnData.classesNames = data.map((clazz) => clazz.className);
	returnData.data = data.map((clazz) => clazz.methods);
	return returnData;
}
var data1 = [
	{
	className: "ClassOne",
	methods: [{testName:"test1OneTest",energy:10,duration:13},
		  {testName:"test1Two",energy:15,duration:10},
		  {testName:"test1Tree",energy:20,duration:23},
		  {testName:"test1Four",energy:30,duration:23},
		  {testName:"test1Five",energy:20,duration:23}
		]

	},
	{
	className: "ClassTwo",
	methods: [{testName:"test2One",energy:12,duration:23},
		  {testName:"test2Two",energy:18,duration:8},
		  {testName:"test2Four",energy:30,duration:23},
		  {testName:"test2Five",energy:20,duration:23}
		]
	},
	{
	className: "ClassTree",
	methods: [{testName:"test3One",energy:12,duration:23},
		  {testName:"test3Two",energy:18,duration:8},
		  {testName:"test3Tree",energy:30,duration:23},
		  {testName:"test3Four",energy:20,duration:23},
		  {testName:"test3Five",energy:20,duration:23},
		  {testName:"test3Six",energy:30,duration:23}
		]
	}
]
