import { Doughnut } from 'react-chartjs-2';

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

export { createGraph };