import React from "react";
import "../style.css";
import { SearchInput,createFilter } from 'react-search-input'

import AllTests from "./components/DisplayHistroyJjoules";

window.registerExtension("jjoules/jjoules_page",options =>{
	/*window.SonarRequest.getJSON('/api/issues/search', {
 		resolved: false,
 		componentKeys: options.component.key
 	}).then(function (arg) {
 		console.log(arg);
 	});*/
	// console.log(options);
	// console.log(options.currentUser);
	// console.log(options.component);
	// console.log(options.branchLike);
	return (
				<AllTests data={transformData(data1)} />
			);

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
	},
	{
	className: "JjoulesClass",
	methods: [{testName:"test4One",energy:12,duration:23},
		  {testName:"test4Two",energy:18,duration:8},
		  {testName:"test4Tree",energy:10,duration:25},
		  {testName:"test4Four",energy:24,duration:32},
		  {testName:"test4Five",energy:30,duration:23},
		  {testName:"test4Six",energy:43,duration:27}
		]
	}
]
