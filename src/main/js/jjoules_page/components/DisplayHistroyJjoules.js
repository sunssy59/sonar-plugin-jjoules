import React from "react";
import ReactDOM from 'react-dom';
// exposes React components exposed by SonarQube.
import { DeferredSpinner } from "sonar-components";

function Method(props) {
	return (
		<div className="result">
			<h6 className="method" 
			>{props.testName}</h6>
			<p> {props.energy} </p>
			<p> {props.duration} </p>
		</div>

	);
}

class ClassTest extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			methods: props.methods,
			className: props.className,
		}
	}

	renderMethod(i) {
		const method = this.state.methods[i];
		return (
			<Method 
				method={method.testName}
				energy={method.energy}
				duration={method.duration}
			/>
		);
	}

	render() {

		return (
			<div className="classTest">
				<h4 className="classTestName">
					{this.state.className}
				</h4>
				{this.state.methods.map(function(method,idx) {
					this.renderMethod(idx)
				}
				)}
			</div>
		);
	}

}

export default class AllTests extends React.Component {
	constructor(props){
		super(props);
		console.log(this.props.data.classesNames);
		console.log(this.props.data.data);
		this.state = {
			allClassesNames: props.data.classesNames,
			data: props.data.data,
		}
	}

	renderClassTest(methods,className) {
		return (
			<div className="classe">
				<ClassTest 
					methods={methods}
					className={className}
				/>
			</div>
		);
	}
	render() {

		return (
			<div className="allClasses">

				{this.state.data.map((methods,idx) => 
					// console.log(methods)
					// console.log(idx)
					//renderClassTest(methods,this.state.allClassesNames[idx])
					<div className="classe">
					<ClassTest 
						methods={methods}
						className={this.state.allClassesNames[idx]}
					/>
			</div>
				)}
			</div>
		)
	}
}
