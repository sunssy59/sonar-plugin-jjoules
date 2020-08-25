import "../style.css";

import AllEnergyTests from "./components/DisplayEnergyStats";

var callgraph;

window.registerExtension("jjoules/jjoules_stats",options =>{

	let key = options.component.key;
	var sanpshots;
	
	
	let url = "http://localhost:3000/snapshots_ids?limit=3";
	
    window.SonarRequest.getJSON(url)
		.then((result) => {
			//console.log(result);
			sanpshots = result;
		}, (err) => {
			console.log(err);
		}).then((result) => {
			getCallgraph();
		}).then(() => {
			getTestsForProject(key,sanpshots[2].id,sanpshots[1].id,options.el);
		},(err) => {
			console.log(err);
		});

    return function() {
		options.el.textContente = "";
	};
});

function getTestsForProject(key,lastTimestamp,actualTimestamp,el){

	let lastRes = [];
	let actualRes = [];

	let url =  `http://localhost:3000/tests?project_key=${key}&analysed_at=${lastTimestamp}`;
    window.SonarRequest.getJSON(url)
		.then((result) => {
			//console.log(result);
			lastRes = result;
		}, (err) => {
			console.log(err);
		})
		.then(() => {
			url = `http://localhost:3000/tests?project_key=${key}&analysed_at=${actualTimestamp}`;
			window.SonarRequest.getJSON(url)
				.then((result) => {
					//console.log(result);
					actualRes = result;
					displayStats(el,lastRes,actualRes);
				}, (err) => {
					console.log(err);
			})
		}, (err) => {
			console.log(err);
		})
}

function getCallgraph(){
	let url2 = "http://localhost:3000/callgraph";
    window.SonarRequest.getJSON(url2)
		.then((result) => {
			//console.log(result);
			callgraph = result
			//return result;
		}, (err) => {
			console.log(err);
	})
	
}

function displayStats(el,lastTests,actualTests){
	let energyTests = [];

	console.log(actualTests);
	console.log(lastTests);

	for(let test of actualTests){
		let lastTest = getTestByName(test.test,lastTests);
		//TODO if there is no test
		let energyTest = {};
		energyTest.name = test.test;
		let tendency = computeTandency(test.e_device,lastTest.e_device);
		energyTest.actual = {
			status: tendency[1] ? "Bad" : "Good",
			tendency: tendency,
		}
		energyTest.last = "anyData"
		energyTests.push(energyTest);
	}

	ReactDOM.render(
		<AllEnergyTests energyTests={energyTests}/>,
		el
	);
	
}

function computeTandency(actualValue,lastValue){
	let res = actualValue * 100 / lastValue;
	let ret = 0;
	let great = false;
	if(res > 100){
		ret = res - 100;
		great = true;
	}
	else
		ret = 100 - res;
	return [ret,great]
}
function getTestByName(name, tests){
	return tests.filter(test => test.test == name);
}