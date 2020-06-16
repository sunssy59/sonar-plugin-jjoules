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
            var obj = {testName:method.testName,method.energy:energy,duration:method.duration};
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