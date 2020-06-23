import React from "react";

export default class Search extends
React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
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
			</div>
		);
	}



}