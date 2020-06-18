import React from "react";
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import { Doughnut, Bar,Bubble } from 'react-chartjs-2';

var data = {
        labels: ["classOne","classTwo","classTree"],
        datasets: [{
            label: "test",
            data: [1,3,10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                // ,
                // 'rgba(25, 92, 132, 0.2)',
                // 'rgba(254, 152, 235, 0.2)',
                // 'rgba(225, 226, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
                // ,
                // 'rgba(25, 92, 132, 1)',
                // 'rgba(254, 152, 235, 1)',
                // 'rgba(225, 226, 86, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.2,
            //barThickness: 6,
            //maxBarThickness: 8,
            //minBarLength: 2
        }]
     }
     //,
 var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },layout: {
            padding: {
                left: 50,
                right: 50,
                top: 0,
                bottom: 0
            }
        }
    }

const datab = {
  labels: ['January'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{x:10,y:20,r:5}]
    }
  ]
};

function Method(props) {
	return (
		<div className="result list-inline-item">
			<h6 className="method">Test: {props.testName}</h6>
			<p>Energy: {props.energy} </p>
			<p>Duration: {props.duration} </p>
		</div>

	);
}

class ClassTest extends
React.Component{

	constructor(props) {
		super(props);
		this.state = {
			methods: props.methods,
			className: props.className,
		}
	}

	renderMethod(i) {
		const method = this.state.methods[i];
		return (
			<Method 
				testName={method.testName}
				energy={method.energy}
				duration={method.duration}
			/>
		);
	}

	render() {

		return (
			<div className="classTest">
				<h4 className="classTestName">
					{this.state.className}
				</h4>
				{this.state.methods.map((method,idx) =>
					//renderMethod(idx)
					<Method 
						testName={method.testName}
						energy={method.energy}
						duration={method.duration}
					/>
				)}
			</div>
		);
	}

}
function Canvas(props){
	// var canvas = document.createElement("canvas");
 //    canvas.setAttribute("class","canvas");
 //    canvas.id = `canvas-${props.className}`;
	// return ({canvas});
	return (
		<canvas className="canvas" id={"class-"+props.className}>
			Test:canvas
		</canvas>
	)
}

export default class AllTests extends React.Component {
	constructor(props){
		super(props);
		// console.log(this.props.data.classesNames);
		// console.log(this.props.data.data);
		this.state = {
			allClassesNames: props.data.classesNames,
			data: props.data.data,
		}
	}

	renderClassTest(methods,className) {
		return (
			<div className="classe">
				<ClassTest 
					methods={methods}
					className={className}
				/>
			</div>
		);
	}
	render() {

		return (
			<div className="allClasses col page page-limited">
				{this.state.data.map((methods,idx) => 
					//console.log(methods)
					// console.log(idx)
					//renderClassTest(methods,this.state.allClassesNames[idx])
					<div className="classe">
						<ClassTest 
							methods={methods}
							className={this.state.allClassesNames[idx]}
						/>
					</div>
				)}
				<Bar data={data} options={options}/>
				<Bubble data={data}/>
			</div>
		)
	}
}


// var canvas = document.createElement("canvas");
//         canvas.setAttribute("class","canvas");
//         canvas.id = `canvas-${classe.className}`;
//         canvas.hidden = true;
//         createGraph(canvas, 'bar', allMethods,allEnergies,classe.className);
//         divForChart.appendChild(canvas);

// /**
//  * Create graph and display it into canvas
//  * @param canvas : display the graph into it
//  * @param type : Line, Bar, Radar, Bubble, Area, Mixed..
//  * @param data : data (saw the chartJS documentation or use "createDataForBubbleGraph" to put true data
//  */
// function createGraph = function (ctx, type, allMethods,allEnergies,className) {
//     new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: allMethods,
//         datasets: [{
//             label: className,
//             data: allEnergies,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(25, 92, 132, 0.2)',
//                 'rgba(254, 152, 235, 0.2)',
//                 'rgba(225, 226, 86, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(25, 92, 132, 1)',
//                 'rgba(254, 152, 235, 1)',
//                 'rgba(225, 226, 86, 1)'
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
//         }
//     }
//  }
// }