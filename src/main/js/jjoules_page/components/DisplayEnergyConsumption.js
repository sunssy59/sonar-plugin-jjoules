// exposes React components exposed by SonarQube.
import React from "react";

import { createGraph } from "../utils/utils";

const ENERGY_UNIT = "μJ";
const DURATION_UNIT = "nS";

function EnergyTest(props) {
	return (
		<div className="result list-inline-item">
			<table className="data zebra">
				<thead>
					<tr className="code-components-header">
						<th className="thin nowrap text-center code-components-cell">
							Energy consumed in CPU
						</th>
						<th className="thin nowrap text-center code-components-cell">
							Energy consumed in dram
						</th>
						<th className="thin nowrap text-center code-components-cell">
							Energy consumed in device
						</th>
						<th className="thin nowrap text-center code-components-cell">
							Duration
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="thin nowrap text-center" >{props.energycpu} {ENERGY_UNIT}</td>
						<td className="thin nowrap text-center" >{props.energydram}  {ENERGY_UNIT}</td>
						<td className="thin nowrap text-center" >{props.energydevice}  {ENERGY_UNIT}</td>
						<td className="thin nowrap text-center" >{props.duration} {DURATION_UNIT}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

class EnergyClassTest extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			energyTest: props.energyTest,
		}
	}

	render() {
		return (
			<div className="energyTest">
				<h3 className="energyTestName overview-panel-title">
				<img src="https://img.icons8.com/ios-filled/50/000000/power-over-ethernet.png"/> {this.state.energyTest.name}
				</h3> 
				<EnergyTest energycpu={this.state.energyTest.energycpu}
							energydram={this.state.energyTest.energydram}
							energydevice={this.state.energyTest.energydevice}
							duration={this.state.energyTest.duration}
				/>
			</div>
		)
	}
}

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			search: "",
		}
		this.updateSearch = this.updateSearch.bind(this);
	}

	updateSearch(search){
		this.setState({search: search.target.value});
		let value = search.target.value.toLowerCase();
		for(let el of document.getElementsByClassName("energyTest")){
			let className = el.firstChild.textContent.split(' ')[1].toLowerCase();
			if(className.startsWith(value))
				el.hidden = false;
			else
				el.hidden = true;
		}
		//hide graphs when search input changed
		for(let el of document.getElementsByClassName("graph")){
			el.hidden = true;
		}
		for(let el of document.querySelectorAll("#but-graph>button")){
			el.removeAttribute("class");
			el.setAttribute("class","button");
			el.firstChild.innerHTML = "<strong>&darr;</strong>";
		}
	}

	render() {
		return (
			<div className="search-box ene-search-box">
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


function GraphSVG(props){
	return (
		<svg class="svg-icon svg-box-magnifier" 
			viewBox="0 0 16 16" 
			height="16" 
			width="16">
			<path d="M10.281,1.781C5.75,1.781,2.062,5.469,2.062,10s3.688,8.219,8.219,8.219S18.5,14.531,18.5,10S14.812,1.781,10.281,1.781M10.714,2.659c3.712,0.216,6.691,3.197,6.907,6.908h-6.907V2.659z M10.281,17.354c-4.055,0-7.354-3.298-7.354-7.354c0-3.911,3.067-7.116,6.921-7.341V10c0,0.115,0.045,0.225,0.127,0.305l5.186,5.189C13.863,16.648,12.154,17.354,10.281,17.354M15.775,14.882l-4.449-4.449h6.295C17.522,12.135,16.842,13.684,15.775,14.882"></path>
		</svg>
	);
}

class ButtonGraph extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			type: props.type,
		}
	}

	handleClick(){
		let graph = document.getElementById("graph-"+this.state.type);
		let state = graph.hidden;
		for(let el of document.getElementsByClassName("graph")){
			el.hidden = true;
		}
		

		graph.hidden = !(state);
		let curBut = document.getElementById("but-"+this.state.type);

		for(let el of document.querySelectorAll("#but-graph>button")){
			
			el.removeAttribute("class");
			if (el != curBut){
				el.setAttribute("class","button");
				el.lastChild.firstChild.style.fill="#4691f6";
				el.firstChild.innerHTML = "<strong>&darr;</strong>";
			}
			else{
				if(graph.hidden){
					el.setAttribute("class","button");
					el.firstChild.innerHTML = "<strong>&darr;</strong>";
				}else{
					el.setAttribute("class", "button button-active");
					el.firstChild.innerHTML = "<strong>&uarr;</strong>";
				}
			}
		}
	}

	changePathFillToWhite(e) {
		e.currentTarget.lastChild.firstChild.style.fill="white";
  	}
  	changePathFillToBlue(e){
		let el = e.currentTarget.lastChild.firstChild;
		if (e.currentTarget.classList.contains("button-active"))
			el.style.fill="white";
		else
			el.style.fill="#4691f6";
  	}

	render(){
		return (
			<button className="button" 
					id={"but-"+this.state.type}
					onClick={() => this.handleClick()}
					onMouseEnter={this.changePathFillToWhite}
					onMouseLeave={this.changePathFillToBlue}
			>
				<strong>&darr;</strong> Show {this.state.type} <GraphSVG/>
			</button>
		)

	}
	
}

export default class AllEnergyTests extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			projectKey: props.data.projectKey,
			projectName: props.data.projectName,
			energyTests: props.data.energyTests,
		}

	}

	render() {

		return (
			<div className="allEnergyTests col page page-limited" >

				<h1 className="page-title">Jjoules stats for energy consumption</h1>
				
				<Search />
				
				<div id="but-graph" >
					<ButtonGraph type="cpu"/>
					<ButtonGraph type="dram"/>
					<ButtonGraph type="device"/>
					<ButtonGraph type="duration"/>
				</div>
				{createGraph(this.state.energyTests)}

				{this.state.energyTests.map( (energyTest) =>
					<EnergyClassTest 
						energyTest={energyTest}
					/>
				)}
			</div>
		)
	}
}