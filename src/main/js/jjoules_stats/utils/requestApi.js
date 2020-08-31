import {displayStats , anyAnalysisToDisplay} from './utils';

function displayPageStats(projectKey,DOMel){
	let url = "http://localhost:3000/times_analysis?limit=3";
	window.SonarRequest.getJSON(url)
		.then((result) => {
			return result;
		}, (err) => {
			console.log(err);
		}).then((result) => {
			if(result.length == 1){
				getTestsForProject(projectKey,null,result[0].time,DOMel);
			}
			if(result.length > 1)
				getTestsForProject(projectKey,result[1].time,result[0].time,DOMel);
			else
				anyAnalysisToDisplay(DOMel);
		},(err) => {
			console.log(err);
		});
}


function getTestsForProject(key,lastTimestamp,actualTimestamp,el){
	
	var lastRes = [];
	var actualRes = [];

	let url =  `http://localhost:3000/tests?project_key=${key}&analysed_at=${actualTimestamp}`;
    window.SonarRequest.getJSON(url)
		.then((result) => {
			actualRes = result;
		}, (err) => {
			console.log(err);
		})
		.then((res) => {
			if(lastTimestamp != null){
				url = `http://localhost:3000/tests?project_key=${key}&analysed_at=${lastTimestamp}`;
				window.SonarRequest.getJSON(url)
				.then((result) => {
					lastRes = result;
				}, (err) => {
					console.log(err);
				})
			}	
		}, (err) => {
			console.log(err);
		})
		.then(() => {
			let url2 = "http://localhost:3000/callgraph";
			window.SonarRequest.getJSON(url2)
				.then(function(result){
					getTestHistory(el,lastRes,actualRes,result);
				}, (err) => {
					console.log(err);
			})
		}, (err) => {
			console.log(err);
		})
		
}

function getTestHistory(el,lastTests,actualTests,callgraph){
	var cpt = 0;
	if(lastTests.length == 0)
		displayStats(el,lastTests,actualTests,callgraph);
		
	else{
		for(let test of lastTests){
			let url = `http://localhost:3000/test?test=${test.test}`;
			window.SonarRequest.getJSON(url)
				.then((result) => {
					test.history = result;
					cpt++;
					if(cpt == lastTests.length)
						displayStats(el,lastTests,actualTests,callgraph);
				}, (err) => {
					error(err);
				})
		}
	}
	
}

export {displayPageStats}