import React from "react";
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import { Bar } from 'react-chartjs-2';
import { randomColor, createDataGraph, options } from "../utils/utils";


function Method(props) {
	return (
		<div className="result list-inline-item">
			<h6 className="method overview-panel-title" >
				Test: {props.testName}
			</h6>
			<p>Energy: {props.energy} </p>
			<p>Duration: {props.duration} </p>
		</div>

	);
}

class ClassTest extends
React.Component{

	constructor(props) {
		super(props);
		this.state = {
			methods: props.methods,
			className: props.className,
		}
	}

	render() {

		return (
			<div className="classTest">
				<h3 className="classTestName overview-panel-title">
					{this.state.className}
					<button className="button" 
					id={"but-"+this.state.className}
					onClick={() => this.props.onClick(this.state.className)}
					> graph <strong>&darr;</strong></button>
				</h3>
				{this.state.methods.map((method,idx) =>
					<Method 
						testName={method.testName}
						energy={method.energy}
						duration={method.duration}
					/>
				)}
			</div>
		);
	}

}

export default class AllTests extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			allClassesNames: props.data.classesNames,
			data: props.data.data,
			graphData: props.graphData,
		}
	}

	handleClick(className){
		var id = "canvas-" + className;
		for(let el of document.getElementsByClassName("canvas"))
			el.hidden = true;
		document.getElementById(id).hidden = false;

		for(let el of document.querySelectorAll(".classTestName>button")){
			el.removeAttribute("class");
			el.setAttribute("class","button");
		}
		var but = document.getElementById("but-"+className);
		but.removeAttribute("class");
		but.setAttribute("class","button button-active");
	}
	render() {

		return (
			<div className="allClasses col page page-limited">
				{this.state.data.map((methods,idx) => 
					<div className="classe">
						<ClassTest 
							methods={methods}
							className={this.state.allClassesNames[idx]}
							onClick={(className) => this.handleClick(this.state.allClassesNames[idx])}
						/>
					</div>
				)}
				{this.state.allClassesNames.map((className,idx) =>
					<div class="canvas" id={"canvas-" + className} hidden={true}>
						{/*<h4 className="overview-panel-title">
							{"Graph for "+ className +" test"}
						</h4>*/}
						<Bar 
							data={createDataGraph(className,this.state.data[idx])} 
							options={options(className)}
						/>
					</div>
				)}
			</div>
		)
	}
}

