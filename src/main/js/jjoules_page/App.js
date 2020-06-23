import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
 
const emails = [
  {"className":"test1"},{"className":"test2"},{"className":"test3"}
] 
const KEYS_TO_FILTERS = ['className']
 
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
 
  render () {
    const filteredClassNames = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
 
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
          {filteredClassNames.map(className => {
            return (
              <div className="test">
                test => {className}
              </div>
            )
        })}
      </div>
    )
  }
 
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}