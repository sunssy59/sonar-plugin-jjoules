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
		if (this.props.classesNames.includes(search.target.value)) {
			for(let el of document.getElementsByClassName("classTest"))
				el.hidden = true;
			for(let el of document.getElementsByClassName("canvas"))
				el.hidden = true;
			document.getElementById("class-"+search.target.value).hidden = false;
		}
	}
	render() {
		//const { search } = this.state;
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
		if (statBefore) {
			but.removeAttribute("class");
			but.setAttribute("class","button");
			but.querySelector("strong").textContent = "&uarr;";
		}else{
			but.removeAttribute("class");
			but.setAttribute("class","button button-active");
			but.querySelector("strong").textContent = "&darr;";
		}
		
	}
	render() {

		return (
			<div className="allClasses col page page-limited">
				{/*<div className="search-box">Test
									<input 
										className="search-box-input"
										aria-label="Search"
										autocomplete="off"
										maxlength="50"
										placeholder="Search a test"
										type="search"
										value=""
									/>
								</div>*/}
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

