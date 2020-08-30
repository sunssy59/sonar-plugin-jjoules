import React from "react";

import Search from "../../jjoules_page/utils/Search";

import { graphStat } from "../../jjoules_page/utils/utils";

const ENERGY_UNIT = "μJ";
// const DURATION_UNIT = "nS";
// const POWER_UNIT = "mW";

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
                            {props.status == "new" 
                                ?  <img src="https://img.icons8.com/cute-clipart/100/000000/new.png"/>
                                : <SVGStatus stat={props.status == "old"?props.actual.e_deviceTendency[0]:null} status={props.status}/>
                            }
                            
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="thin nowrap text-left" >
                            {props.status == "new" 
                                ? <DisplayLastAnalysis status={props.status}/> 
                                : <DisplayLastAnalysis status={props.status} last={props.last}/>
                            }
						</td>
						<td className="thin nowrap text-center" >
                            { props.status == "deleted"
                                ? <DisplayActualAnalysis  status={props.status} />
                                : <DisplayActualAnalysis status={props.status} 
                                                         actual={props.actual}
                                                         reviews={props.reviews}/>

                            }
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

function DisplayLastAnalysis(props){
    let className = "last-test " + props.status;
    return props.status == "new" 
        ? <div className={className}> 
            This test is new you must make two analyzes to have the history
        </div> 
        : <div className={className}>
            <div><strong>Energy_cpu: </strong> {props.last.e_cpu} {ENERGY_UNIT} </div>
            <div><strong>Energy_dram: </strong> {props.last.e_dram} {ENERGY_UNIT}</div>
            <div><strong>Energy_device: </strong> {props.last.e_device} {ENERGY_UNIT}</div>
        </div> 
        ;
}

function DisplayActualAnalysis(props){
    
    let className = "last-test " + props.status;
    return props.status == "deleted"
        ? <div className={className}>This test was deleted</div>
        : (props.status == "new" 
            ? 
                <div className={className}>
                    <div><strong>Energy_cpu: </strong> {props.actual.e_cpu} {ENERGY_UNIT} </div>
                    <div><strong>Energy_dram: </strong> {props.actual.e_dram} {ENERGY_UNIT}</div>
                    <div><strong>Energy_device: </strong> {props.actual.e_device} {ENERGY_UNIT}</div>
                </div>
            :
                <div className={className}>
                    <div className="stats-rating">
                        <div><strong>Energy_cpu: </strong>{props.actual.e_cpu} {ENERGY_UNIT} </div>
                        <div>
                            <strong>Tendency: </strong>
                            <span className="spacer-right">{props.actual.e_cpuTendency[2] ? "+" : "-"} {Math.trunc(props.actual.e_cpuTendency[1]) + " %"}</span>
                            <span className={'rating rating-'+props.actual.e_cpuTendency[0]} aria-label={'metric.has_rating_X.'+props.actual.e_cpuTendency[0]}>{props.actual.e_cpuTendency[0]}</span>
                        </div>
                    </div>
                    <div className="stats-rating">
                        <div>
                            <strong>Energy_dram: </strong> {props.actual.e_dram} {ENERGY_UNIT}  
                        </div>
                        <div>
                            <strong>Tendency: </strong>
                            <span className="spacer-right">{props.actual.e_dramTendency[2] ? "+" : "-"} {Math.trunc(props.actual.e_dramTendency[1]) + " %"}</span>
                            <span className={'rating rating-'+props.actual.e_dramTendency[0]} aria-label={'metric.has_rating_X.'+props.actual.e_dramTendency[0]}>{props.actual.e_dramTendency[0]}</span>
                        </div>
                    </div>
                    <div className="stats-rating">
                        <div>
                            <strong>Energy_device: </strong> {props.actual.e_device} {ENERGY_UNIT}
                        </div> 
                        <div>
                            <strong>Tendency: </strong>
                            <span className="spacer-right">{props.actual.e_deviceTendency[2] ? "+" : "-"} {Math.trunc(props.actual.e_deviceTendency[1]) + " %"}</span>
                            <span className={'rating rating-'+props.actual.e_deviceTendency[0]} aria-label={'metric.has_rating_X.'+props.actual.e_deviceTendency[0]}>{props.actual.e_deviceTendency[0]}</span>
                        </div> 
                    </div>
                    {(props.actual.e_deviceTendency[0] != "A" )? <Reviews reviews={props.reviews}/> : null}
                </div>)
}

function Reviews(props){
    if(props.reviews.length == 0)
        return;
    else if(props.reviews.length == 1){
        return (
            <div className="stats-rating reviews">
                The increase in energy consumption can come from this method: 
                <p>{props.reviews[0]}</p>
            </div>
        )
    }
    return (
        <div className="stats-rating reviews">
            The increase in energy consumption can come from these methods
            <ul>
                {props.reviews.map(review => <li>{review}</li>)}
            </ul>
        </div>
    )

}

function SVGStatus(props){
    let stat = "good";
    switch (props.stat) {
        case "A":
            stat = "good";
            break;
        case "B":
            stat = "minor";
            break;
        case "C":
            stat = "major";
            break;
        case "D":
            stat = "critical";
            break;
        case "E":
            stat = "blocked";
            break;
    
        default:
            break;
    }
    return (
        <svg 
            viewBox="0 0 18 18"
            height="18" 
            width="18">
            {props.status == "old"
                ? <path className={stat + " " + "icon-"+props.status} d="M9.917,0.875c-5.086,0-9.208,4.123-9.208,9.208c0,5.086,4.123,9.208,9.208,9.208s9.208-4.122,9.208-9.208
                    C19.125,4.998,15.003,0.875,9.917,0.875z M9.917,18.141c-4.451,0-8.058-3.607-8.058-8.058s3.607-8.057,8.058-8.057
                    c4.449,0,8.057,3.607,8.057,8.057S14.366,18.141,9.917,18.141z M13.851,6.794l-5.373,5.372L5.984,9.672
                    c-0.219-0.219-0.575-0.219-0.795,0c-0.219,0.22-0.219,0.575,0,0.794l2.823,2.823c0.02,0.028,0.031,0.059,0.055,0.083
                    c0.113,0.113,0.263,0.166,0.411,0.162c0.148,0.004,0.298-0.049,0.411-0.162c0.024-0.024,0.036-0.055,0.055-0.083l5.701-5.7
                    c0.219-0.219,0.219-0.575,0-0.794C14.425,6.575,14.069,6.575,13.851,6.794z">
                    </path>
                : <path className={"icon-"+props.status} fill="none" d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
                        c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
                        c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
                        C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
                        c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
                        z"></path>
            }
            
        </svg>
    )
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
                    { (this.state.energyTest.status == "old" || this.state.energyTest.status == "deleted") ? <ButtonStat test={this.state.energyTest.name}/> : null}
                </h3>
                { (this.state.energyTest.status == "old" || this.state.energyTest.status == "deleted") ? graphStat(this.state.energyTest.history,this.state.energyTest.name) : null}
                
                <EnergyTest
                    status={this.state.energyTest.status}
                    last={this.state.energyTest.last}
                    actual={this.state.energyTest.actual}
                    reviews={this.state.energyTest.reviews}              
                />
            </div>

        )
    }
}

class ButtonStat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            test: props.test,
        }
    }

    handleClick(){
        let graph = document.getElementById("stats-"+this.state.test);
        let state = graph.hidden;
        for(let el of document.getElementsByClassName("graph-stats"))
            el.hidden = true;
        graph.hidden = !(state);
    }

    render(){
        return (
            <button className="button"
                    id={"but-"+this.state.test}
                    onClick={() => this.handleClick()}
            >
                Show graph
            </button>
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
                    <h1 className="page-title">Jjoules stats for energy consumption betwen the two last analyzes</h1>
                </div>
                <Search/>
                {this.state.energyTests.map( (energyTest) =>
                    <EnergyClassTest 
                        energyTest={energyTest}
                    />
                )}
            </div>

        )
    }
}