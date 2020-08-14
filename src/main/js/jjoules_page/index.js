import React from "react";
import "../style.css";

import AllEnergyTests from "./components/DisplayEnergyConsumption";
import { keys } from "underscore";


window.registerExtension("jjoules/jjoules_page",options =>{

	window.SonarRequest.getJSON('/api/measures/component_tree',{
		additionalField:"metrics",
		component: options.component.key,
		qualifiers:"UTS", //For getting only tests
		metricKeys:"duration,energy_consumption_cpu,energy_consumption_dram,energy_consumption_device"
	}).then(function (result){
		return transformResult(result);
	}).then(function (data){
		
		ReactDOM.render(
			<AllEnergyTests data={data}/>,
			options.el
		);
	});
	
	//Trying to get energie measures history but it gives only global analyses
	window.SonarRequest.getJSON("/api/measures/search_history",{
		component: options.component.key,
		metrics:"duration,energy_consumption_cpu,energy_consumption_dram,energy_consumption_device",
	}).then((result) => {
		console.log(result);
	})
	
	return function() {
		options.el.textContente = "";
	};
});


function transformResult(result){
	var data = {};
	data.projectName = result.baseComponent.name;
	data.projectKey = result.baseComponent.key;
	data.energyTests = result.components.map(function (component) {
		let energyTest = {};
		if(component.name.endsWith("EnergyTest.java")){
			energyTest.name = component.name.split(".")[0];
			let i;
			let measure;
			for(i = 0 ;i< component.measures.length ;i++){
				measure = component.measures[i];
				if (measure.metric == "duration")
					energyTest.duration = measure.value;
				else if(measure.metric == "energy_consumption_cpu")
					energyTest.energycpu = measure.value;
				else if(measure.metric == "energy_consumption_dram")
					energyTest.energydram = measure.value;
				else
					energyTest.energydevice = measure.value;
			}
		}
		return energyTest;
	});
	data.energyTests = data.energyTests.filter(energyTest => keys(energyTest).length > 0);
	return data;
}