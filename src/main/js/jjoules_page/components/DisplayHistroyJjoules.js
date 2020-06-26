import React from "react";
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import { Bar } from 'react-chartjs-2';
import { randomColor, createDataGraph, options } from "../utils/utils";
//import { Search } from "../utils/Search";
//import { SearcheBar } from 'react-native-elements';
/**
 * Create random RGBA string color
 * @return String rgba color
 */

/**
* Create a HTLM representation of one method
* @return a HTML code of this method
*/
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
/**
 * Create HTML representation of class test
 * @return HTML code of one test class containt there method representation
 */
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
			<div className="classTest" id={"class-"+this.state.className}>
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
class Search extends
React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
		}
		this.updateSearch = this.updateSearch.bind(this);
	}

	updateSearch(search){
		this.setState({search: search.target.value});
		//let classesNames = this.props.classesNames.map((className) => className.toLowerCase());
		let value = search.target.value.toLowerCase();
		for(let el of document.getElementsByClassName("classTest")){
			let className = el.id.split('-')[1].toLowerCase();
			if (className.startsWith(value) ) 
				el.hidden = false;
			else
				el.hidden = true;
		}
		for(let el of document.getElementsByClassName("canvas"))
			el.hidden = true;
		for(let el of document.querySelectorAll("button[id^='but-']"))
			el.innerHTML = "graph <strong>&darr;</strong>";
	}
	render() {
		return (
			<div className="search-box">
				<input 
					className="search-box-input"
					aria-label="Search"
					autocomplete="off"
					maxlength="50"
					placeholder="Search a test"
					type="search"
					value={this.state.search}
					onChange={this.updateSearch}
				>
				<svg class="svg-box-magnifier" viewBox="0 0 16 16" height="16" width="16">
					<path 
						d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z">
					</path>
				</svg>

				</input>

			</div>
		);
	}
}
/**
 * Create HTML representation of all test classes 
 * @return HTML code of these test
 */
export default class AllTests extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			allClassesNames: props.data.classesNames,
			data: props.data.data,
			graphData: props.graphData,
			search: '',
		}
	}

	handleClick(className){
		var id = "canvas-" + className;
		let canvas = document.getElementById(id);
		let statBefore = canvas.hidden;
		for(let el of document.getElementsByClassName("canvas"))
			el.hidden = true;
		canvas.hidden = !(statBefore);

		for(let el of document.querySelectorAll(".classTestName>button")){
			el.removeAttribute("class");
			el.setAttribute("class","button");
		}
		var but = document.getElementById("but-"+className);
		for(let el of document.querySelectorAll("button[id^='but-']"))
			el.innerHTML = "graph <strong>&darr;</strong>";

		if (statBefore) {
			but.removeAttribute("class");
			but.setAttribute("class","button button-active");
			but.innerHTML = "graph <strong>&uarr;</strong>";
		}else{
			but.removeAttribute("class");
			but.setAttribute("class","button");
			but.innerHTML = "graph <strong>&darr;</strong>";
		}
		
	}
	render() {

		return (
			<div className="allClasses col page page-limited">
				<Search classesNames={this.state.allClassesNames}/>
				{this.state.data.map((methods,idx) => 
					<ClassTest 
						methods={methods}
						className={this.state.allClassesNames[idx]}
						onClick={(className) => this.handleClick(this.state.allClassesNames[idx])}
					/>
				)}
				{this.state.allClassesNames.map((className,idx) =>
					<div className="canvas" id={"canvas-" + className} hidden={true}>
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

