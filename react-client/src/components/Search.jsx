import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    document.querySelector('#val').value = ''
  }

  render() {
    return (<div>
      <h4>Add more dogs to your collection!</h4>
      Enter a breed: <input id="val" value={this.state.term} onChange={this.onChange}/>
      <button onClick={this.search}> Add Dogs </button>
    </div>)
  }
}

export default Search;
