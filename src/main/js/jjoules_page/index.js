import React from "react";
import "../style.css";
import "../../resource/bootstrap-4.5.0-dist/css/bootstrap.css";
import AllTests from "./components/DisplayHistroyJjoules";

window.registerExtension("jjoules/jjoules_page",options =>{
	return <AllTests data={data} />;
	//loadAllCss();
});
// allClassesNames: props.data.claasesNames,
// data: props.data.methods,

var data = {
	classesNames: ["classOne","classTwo"],
	data: [
		[{testName:"test1One",energy:10,duration:13},
		  {testName:"test1Two",energy:15,duration:10},
		  {testName:"test1Tree",energy:20,duration:23}
		],
		[{testName:"test2One",energy:12,duration:23},
		  {testName:"test2Two",energy:18,duration:8},
		  {testName:"test2Tree",energy:30,duration:23}
		]
	]
};


