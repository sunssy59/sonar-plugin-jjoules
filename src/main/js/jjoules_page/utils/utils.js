import { Doughnut,Line } from 'react-chartjs-2';
import { data } from 'jquery';
import { result } from 'underscore';

const ENERGY_UNIT = "μJ";
const DURATION_UNIT = "nS";

/**
 * Create random RGBA string color
 * @return String rgba color
 */
function randomColor(){
	return "rgba(" + Math.floor(Math.random() * Math.floor(256)) + "," +
        "" + Math.floor(Math.random() * Math.floor(256)) + ", " +
        "" + Math.floor(Math.random() * Math.floor(256)) + ",1)";

}

function createDataGraph(energyTests,domaineName){
    var labels = energyTests.map((energyTest) => 
        energyTest.name
    );
    var data;
    if(domaineName == "cpu"){
        data = energyTests.map((energyTest) =>
            energyTest.energycpu
        );
    }else if(domaineName == "dram"){
        data = energyTests.map((energyTest) =>
            energyTest.energydram
        );
    }else if(domaineName == "device"){
        data = energyTests.map((energyTest) =>
            energyTest.energydevice
        );
    }else{
        data = energyTests.map((energyTest) =>
            energyTest.duration
        );
    }

    let colors = labels.map(() => randomColor());
    return {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors,
            }
        ]
    };
}

function options(type,unit){
    return {
        title: {
            display: true,
            text: "Graph for energy consummed in "+type+" ("+unit+")", 
        }
    };
}

function createGraph(energyTests){
    return (
        <div >
            <div className="graph" id="graph-cpu" hidden="true">
                <Doughnut
                    data={createDataGraph(energyTests,"cpu")}
                    options={options("CPU",ENERGY_UNIT)}
                />
            </div>
            <div className="graph" id="graph-dram" hidden="true">
                <Doughnut
                    data={createDataGraph(energyTests,"dram")}
                    options={options("DRAM",ENERGY_UNIT)}
                />
            </div>
            <div className="graph" id="graph-device" hidden="true">
                <Doughnut
                    data={createDataGraph(energyTests,"device")}
                    options={options("DEVICE",ENERGY_UNIT)}
                />
            </div>
            <div className="graph" id="graph-duration" hidden="true">
                <Doughnut
                    data={createDataGraph(energyTests,"duration")}
                    options={options("DURATION",DURATION_UNIT)}
                />
            </div>
        </div>
    )
}

function graphStat(energyTests,testName){
    return parseResultToData(energyTests,testName);
}

function parseResultToData(energyTests,testName){
    var data = {};
    data.labels = energyTests.map(test => new Date(+test.analysed_at).toLocaleString());
    let datas =  energyTests.map((test) => new Date(test.e_device))
    // let datas =  energyTests.map(function(test){
    //     return {t: new Date(+test.analysed_at), y:test.e_device}});
    let color = data.labels.map(label => randomColor());

    data.datasets = [{
        label: "Energy consumed in device in (μJ) ",
        data: datas,
        fill: false,
		lineTension: 0.1,
		backgroundColor: color,
		borderColor: 'rgba(75,192,192,1)',
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: "round",
		pointBorderColor: '#fff',
		pointBackgroundColor: color,
		pointBorderWidth: 5,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: color,
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
        pointHitRadius: 10,
        clip: {left: 5, top: false, right: -2, bottom: 0}
    }]
    return createStatGraph(data,testName);

}

function createStatGraph(data,testName){
    return (
        <div className="graph graph-stats" id = {"stats-"+testName} hidden={true}>
            <Line data={data} 
            />
        </div>
    )
}

function convertToPower(energy,duration) {
    return Math.trunc(energy * 1000000 / duration);
}


export { createGraph, convertToPower, graphStat };