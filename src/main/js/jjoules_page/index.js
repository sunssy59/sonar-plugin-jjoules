import React from "react";
import "../style.css";
import ReactDOM from 'react-dom';


//import "../lib/css/bootstrap.css";
import AllTests from "./components/DisplayHistroyJjoules";

window.registerExtension("jjoules/jjoules_page",options =>{
	var canvas = document.createElement("canvas");
	var div = document.createElement("div");
    canvas.setAttribute("class","canvas");
    canvas.id = `canvas-test`;
    createGraph(canvas);
    div.appendChild(canvas);
    console.log(div);
 //    options.el.appendChild(canvas);
 //    console.log(options.el);
    
	// ReactDOM.render(canvas,options.el);

	return <AllTests data={data}  canvas={div}/>;

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

// var createGraph = function (ctx /*,type, allMethods,allEnergies,className*/) {
//     var c = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["classOne","classTwo","classTree"],
//         datasets: [{
//             label: "test",
//             data: [1,3,10],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)'
//                 // ,
//                 // 'rgba(25, 92, 132, 0.2)',
//                 // 'rgba(254, 152, 235, 0.2)',
//                 // 'rgba(225, 226, 86, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)'
//                 // ,
//                 // 'rgba(25, 92, 132, 1)',
//                 // 'rgba(254, 152, 235, 1)',
//                 // 'rgba(225, 226, 86, 1)'
//             ],
//             borderWidth: 1,
//             barPercentage: 0.2,
//             //barThickness: 6,
//             //maxBarThickness: 8,
//             //minBarLength: 2
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },layout: {
//             padding: {
//                 left: 50,
//                 right: 0,
//                 top: 0,
//                 bottom: 0
//             }
//         }
//     }
// });
// };
