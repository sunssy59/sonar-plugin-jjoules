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
	var colors = labels.map(randomColor)
	var borderColor = colors.map((color) => 
		color+" 1)"
	);
	var backgroundColor = colors.map((color) => 
		color+" 0.2)"
	);
	return {
		labels: labels,
		datasets: [{
			label:label,
			data: energies,
			borderColor: borderColor,
			backgroundColor: backgroundColor,
			borderWidth: 1,
            barPercentage: 0.2,
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
        }
}

export { randomColor, createDataGraph, options };