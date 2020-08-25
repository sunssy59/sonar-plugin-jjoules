import React from "react";

const ENERGY_UNIT = "μJ";
const DURATION_UNIT = "nS";
const POWER_UNIT = "mW";

function EnergyTest(props) {
	return (
		<div className="result list-inline-item result-stats">
			<table className="data zebra tab-stats">
				<thead>
					<tr className="code-components-header">
						<th className="thin nowrap text-center code-components-cell">
							Last analysis
						</th>
						<th className="thin nowrap text-center code-components-cell">
							Actual analysis
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="thin nowrap text-center" >
                            <div>{props.last}</div>
							{/* <div>Status: {props.last.status} </div>
                            <div>Tendency: {props.last.tendency} </div> */}
						</td>
						<td className="thin nowrap text-center" >
                            <div>Status: {props.actual.status} </div>
                            <div>Tendency: {props.actual.tendency[1] ? "+" : "-"} {props.actual.tendency[0]} </div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

class EnergyClassTest extends React.Component{

    constructor(props){
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
                <EnergyTest
                    last={this.state.energyTest.last}
                    actual={this.state.energyTest.actual}                
                />
            </div>

        )
    }
}

export default class AllEnergyTests extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            energyTests: props.energyTests,
        }
    }

    render() {

        return (
            <div className="allEnergyTests col page page-limited stats">
                <div>
                    <h1 className="page-title">Jjoules stats for energy consumption</h1>
                </div>
                {this.state.energyTests.map( (energyTest) =>
                    <EnergyClassTest 
                        energyTest={energyTest}
                    />
                )}
            </div>

        )
    }
}