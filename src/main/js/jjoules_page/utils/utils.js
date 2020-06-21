
/**
 * Create random RGBA string color
 * @return String rgba color
 */
function randomColor(){
	return "rgba(" + Math.floor(Math.random() * Math.floor(256)) + "," +
        "" + Math.floor(Math.random() * Math.floor(256)) + ", " +
        "" + Math.floor(Math.random() * Math.floor(256)) + ",";

}
function createDataGraph(label,methods){
	var labels = methods.map((method) =>
		method.testName
	);
	var energies = methods.map((method) =>
		method.energy
	);
	var durations = methods.map((method) =>
		method.duration
	);

	var energyColor = randomColor();
	var energyBackgroudColor = energyColor + " 0.2)";
	var hoverBackgroundColorEN = energyColor + " 0.5";
	var energyBorderColor = energyColor + " 1)";

	var durationColor = randomColor();
	var durationBackgroudColor = durationColor + " 0.2)";
	var hoverBackgroundColorDU = durationColor + " 0.5)";
	var durationBorderColor = durationColor + " 1)";

	// var colors = labels.map(randomColor)
	// var borderColor = colors.map((color) => 
	// 	color+" 1)"
	// );
	// var backgroundColor = colors.map((color) => 
	// 	color+" 0.2)"
	// );
	// return {
	// 	labels: labels,
	// 	datasets: [{
	// 		label:label,
	// 		data: energies,
	// 		borderColor: borderColor,
	// 		backgroundColor: backgroundColor,
	// 		borderWidth: 1,
 //            barPercentage: 0.2,
	// 	}]

	// }

	return {
		labels: labels,
		datasets: [
		{
			label: "Energy",
			backgroundColor: energyBackgroudColor,
			hoverBackgroundColor: hoverBackgroundColorEN,
			borderColor: energyBorderColor,
			borderWidth: 1,
			hoverBorderColor: energyBorderColor,
			data: energies
		},{
			label: "Duration",
			backgroundColor: durationBackgroudColor,
			hoverBackgroundColor: hoverBackgroundColorDU,
			borderColor:durationBorderColor,
			borderWidth: 1,
			hoverBorderColor: energyBorderColor,
			data: durations
		}] 
	}
}

function options(className){
	return {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },scaleLabel: {
		            display: true,
		            labelString: "Energy (Joules) & Duration (ms)"
		        }
            }]
        },layout: {
            padding: {
                left: 100,
                right: 100,
                top: 0,
                bottom: 0
            }
        },title: {
	        display: true,
	        text: 'Graph for class : '+className+' energy & duration'
      	}
	};	
}
// var options = {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 },scaleLabel: {
// 		            display: true,
// 		            labelString: "Energy (Joules) & Duration (ms)"
// 		        }
//             }]
//         },layout: {
//             padding: {
//                 left: 100,
//                 right: 100,
//                 top: 0,
//                 bottom: 0
//             }
//         },title: {
// 	        display: true,
// 	        text: 'Graph for class : '+currentClassName+' energy & duration'
//       	}
// }

export { randomColor, createDataGraph, options };