const currentClassName = "";

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
	currentClassName = label;
	var labels = methods.map((method) =>
		method.testName
	);
	var energies = methods.map((method) =>
		method.energy
	);
	var durations = methods.map((method) =>
		method.duration
	);

	var energyBackgroudColor = randomColor() + " 0.2)";
	var energyBorderColor = randomColor() + " 1)";

	var durationBackgroudColor = randomColor() + " 0.2)";
	var durationBorderColor = randomColor() + " 1)";

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
			borderColor: energyBorderColor,
			data: energies
		},{
			label: "Duration",
			backgroundColor: durationBackgroudColor,
			borderColor:durationBorderColor,
			data: durations
		}] 
	}
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
                left: 100,
                right: 100,
                top: 0,
                bottom: 0
            }
        },title: {
	        display: true,
	        text: 'Graph for class : '+currentClassName+' energy & duration'
      	}
}

export { randomColor, createDataGraph, options };