import React from "react";
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";
import { Bar } from 'react-chartjs-2';
import { randomColor, createDataGraph, options } from "../utils/utils";

const LIMIT_ENERGY = 20;

/**
* Create a HTLM representation of one method
* @return a HTML code of this method
*/
function Method(props) {
	return (
		<div className="result list-inline-item">
			<h6 className="method overview-panel-title" >
				Test: {props.testName}
				<svg 
					viewBox="0 0 16 16"
					height="16" 
					width="16">
					{props.energy < LIMIT_ENERGY ?
					<path className="goodTest" d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
								C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
								c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
								c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
								c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
								c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z"></path>
					:
					<path className="badTest" d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
								c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
								l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
								C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
								s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
								c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
					}
				</svg>
			</h6>
			<p>Energy: {props.energy} </p>
			<p>Duration: {props.duration} </p>
		</div>

	);
}

function GraphSVG(props){
	return (
		<svg class="svg-icon svg-box-magnifier" 
			viewBox="0 0 16 16" 
			height="16" 
			width="16">
			<path 
				d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z">
			</path>
		</svg>
	);
}
/**
 * Create HTML representation of class test in React component
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

	changePathFillToWhite(e) {
		e.currentTarget.firstChild.firstChild.style.fill="white";
  	}
  	changePathFillToBlue(e){
  		let el = e.currentTarget.firstChild.firstChild;
  		// if(el.className.includes("button-active"))
  		// 	el.style.fill = "white";
  		// else
  		el.style.fill="#4691f6";
  	}
	render() {

		return (
			<div className="classTest" id={"class-"+this.state.className}>
				<h3 className="classTestName overview-panel-title">
					{this.state.className}
					<button className="button" 
						id={"but-"+this.state.className}
						onClick={() => this.props.onClick(this.state.className)}
						onMouseEnter={this.changePathFillToWhite}
						onMouseLeave={this.changePathFillToBlue}
						>  
						<GraphSVG />

						<strong>&darr;</strong>
					</button>
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
		for(let el of document.querySelectorAll("button[id^='but-']")){
			el.lastChild.innerHTML = "<strong>&darr;</strong>";
			el.firstChild.firstChild.style.fill = "#4691f6";
			el.removeAttribute("class");
			el.setAttribute("class","button");
		}
	}
	render() {
		return (
			<div className="search-box">
				<svg class="svg-box-magnifier svg-icon" 
					viewBox="0 0 16 16" 
					height="16" 
					width="16"
					>
					<path 
						d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
						>
					</path>
				</svg>
				<input 
					className="search-box-input"
					aria-label="Search"
					autocomplete="off"
					maxlength="50"
					placeholder="Search a test"
					type="search"
					value={this.state.search}
					onChange={this.updateSearch}
				/>
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
		for(let el of document.querySelectorAll("button[id^='but-']")){
			el.lastChild.innerHTML = "<strong>&darr;</strong>";
			el.firstChild.firstChild.style.fill = "#4691f6";
		}

		if (statBefore) {
			but.removeAttribute("class");
			but.setAttribute("class","button button-active");
			but.lastChild.innerHTML = "<strong>&uarr;</strong>";
			but.firstChild.firstChild.style.fill = "white";
		}else{
			but.removeAttribute("class");
			but.setAttribute("class","button");
			but.lastChild.innerHTML = "<strong>&darr;</strong>";
			but.firstChild.firstChild.style.fill = "#4691f6";
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

