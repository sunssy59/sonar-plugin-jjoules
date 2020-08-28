import AllEnergyTests from "../components/DisplayEnergyStats";


function displayStats(el,lastTests,actualTests,callgraph){
	let energyTests = [];
	
	let deletedTests = [];
	if(lastTests.length > actualTests){
		deletedTests = lastTests.filter(test => !(actualTests.includes(test)));
	}

	//deletedTests.push(lastTests[0]);
	for(let test of deletedTests){
		energyTests.push({
			status: "deleted",
			name: test.test,
			last: {
				e_cpu: test.e_cpu,
				e_dram: test.e_dram,
				e_device: test.e_device,
			},
			history: test.history,
		})
	}

	let newTests = [];
	if(lastTests.length < actualTests){
		newTests = actualTests.filter(test => !(lastTests.includes(test)));
	}

	//newTests.push(actualTests[2]);
	for(let test of newTests){
		energyTests.push({
			status: "new",
			name: test.test,
			actual: {
				e_cpu: test.e_cpu,
				e_dram: test.e_dram,
				e_device: test.e_device,
			}
		})
	}

	for(let test of actualTests){
		if((! testIsIn(test,deletedTests)) && (! testIsIn(test,newTests))) {
			let lastTest = getTestByName(test.test,lastTests);
			let energyTest = {};
			energyTest.name = test.test;
			if(lastTest != null){
				energyTest.status = "old"
				energyTest.actual = {
					e_deviceTendency: computeTandency(test.e_device,lastTest.e_device),
					e_device:test.e_device,
					e_cpuTendency: computeTandency(test.e_cpu,lastTest.e_cpu),
					e_cpu:test.e_cpu,
					e_dramTendency: computeTandency(test.e_dram,lastTest.e_dram),
					e_dram:test.e_dram,
				}
				energyTest.last = {
					e_cpu: lastTest.e_cpu,
					e_dram: lastTest.e_dram,
					e_device: lastTest.e_device
				}
				energyTest.history = lastTest.history
			}else{
				energyTest.status = "new"
				energyTest.actual = {
					e_device:test.e_device,
					e_cpu:test.e_cpu,
					e_dram:test.e_dram,
				}
			}
			
			energyTests.push(energyTest);
		}
		
	}
	
	let retEnergyTests = computeReviews(energyTests,callgraph);

	ReactDOM.render(
		<div>
			<AllEnergyTests energyTests={retEnergyTests}/>
		</div>,
		el
	);
	
}


function testIsIn(test,tabTest){
	for(let t of tabTest){
		if( t.test == test.test)
			return true;
	}return false;
}

function computeReviews(energyTests,callgraph){
	let tab_copie = energyTests.slice();
	for(let energyTest of tab_copie){
		let methodsCalled = getMethodsCalledInTest(energyTest.name,callgraph);
        let reviews = [];
		if(energyTest.status == "old" && energyTest.actual.e_deviceTendency[0] != "A"){
			if (methodCalledInTest(energyTest.name,callgraph)){
				for(let method of methodsCalled){
					let testMethodCalls = getTestCallingMethod(method,callgraph);
					for(let test of testMethodCalls){
						let e_test = getEnergyTestByName(test,energyTests);
						if (e_test.status == "old" && e_test.actual.e_deviceTendency[0] != "A"){
							reviews.push(method);
							//reviews.push("org.powerapi.jjoules.Fibonacci.test(String)");
						}
					}
				}	
            }
            getEnergyTestByName(energyTest.name,energyTests).reviews = reviews.length == 0 ? methodsCalled : [...new Set(reviews)];
		}
	}
	return energyTests;
	
}

function getEnergyTestByName(name,energyTests){
	return energyTests.filter(energyTest => energyTest.name == name)[0];
}

function getTestCallingMethod(name,callgraph){
	let filtredCallgraph = callgraph.filter(call => call.target.includes(name));
	return filtredCallgraph.map(function(call){
		let tab = call.source.split(":")[0].split(".");
		return tab[tab.length - 1];
	})
}

function getMethodsCalledInTest(name,callgraph){
	let filtredCallgraph = callgraph.filter(call => call.source.includes(name));
	return filtredCallgraph.map(call => call.target)
}

function methodCalledInTest(name,callgraph){
	for(let call of callgraph){
		if (call.source.includes(name))
			return true;
	}
	return false;
}

function computeTandency(actualValue,lastValue){
	let res = actualValue * 100 / lastValue;
	let ret = 0;
	let status = "A";
	let great = false
	if(res > 100){
		ret = res - 100;
		great = true;
	}
	else
		ret = 100 - res;
	if (great){
		if(ret > 5 && ret <= 10)
		status = "B";
		else if(ret > 10 && ret <= 20)
			status = "C";
		else if (ret > 20 && ret <= 50)
			status = "D";
		else if (ret > 50)
			status = "E"	
	}
	
	return [status,ret,great]
}
function getTestByName(name, tests){
	return tests.filter(test => test.test == name)[0];
}


export { displayStats }