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
					value=""
				/>
				<svg 
					className="search-box-magnifier"
					style="fill-rule: evenodd; clip-rule: evenodd; strocke-linejoin: round; stroke-miterlimit:1.41421;"
					version="1.1"
					viewBox="0 0 16 16"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xml:space="preserve">
					<path d="M10.308 7.077c0-.89-.316-1.65-.949-2.283a3.111 3.111 0 0 0-2... 4.938 0 0 1-.894 2.877l2.473 2.474a.883.883 0 0 1 .267.649z"
							style="fill:currencolor;"></path>
				</svg>
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
				<Search />
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

