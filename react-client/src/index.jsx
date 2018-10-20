import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/favorites',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  onClick(term){
    console.log(term)
    $.ajax({
      method: "POST",
      url: "/api/favorites",
      data: {data: term}
    })
  .done(res => {
    console.log(res)
    this.setState({
      items: JSON.parse(res.body).message
    })
    console.log('LSKDJFLSDJFL',res)
  });
  }
  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url: "/favorites",
      data: {data: term}
    })
  .done(res => {
    console.log(JSON.parse(res.body).message)
    this.setState({
      items: JSON.parse(res.body).message
    })
    console.log('LSKDJFLSDJFL',res)
  });

  }

  render () {
    return (<div>
      <p> HELLO </p>
      <h1>Item List</h1>
      <List items={this.state.items} click={this.onClick.bind(this)}/>
      <Search repos = {this.state.repos} onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
