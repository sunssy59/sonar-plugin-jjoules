import React from "react";
import "../style.css";
import ReactDOM from 'react-dom';

import AllTests from "./components/DisplayHistroyJjoules";

window.registerExtension("jjoules/jjoules_page",options =>{

	return <AllTests data={data} />;

});

var data = {
	classesNames: ["classOne","classTwo","classTree"],
	data: [
		[{testName:"test1One",energy:10,duration:13},
		  {testName:"test1Two",energy:15,duration:10},
		  {testName:"test1Tree",energy:20,duration:23},
		  {testName:"test1Four",energy:30,duration:23},
		  {testName:"test1Five",energy:20,duration:23}
		],
		[{testName:"test2One",energy:12,duration:23},
		  {testName:"test2Two",energy:18,duration:8},
		  {testName:"test2Four",energy:30,duration:23},
		  {testName:"test2Five",energy:20,duration:23}
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
