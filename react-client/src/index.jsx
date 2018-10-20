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
  click(){
    console.log('hello')
    if(document.getElementById('pics').style.display === 'none'){
      document.getElementById('pics').style.display = ''
    } else{
      document.getElementById('pics').style.display = 'none';
    }
  }
  onClick(term){
    console.log(term)
    $.ajax({
      method: "DELETE",
      url: "/api/favorites",
      data:{data:term.img}
    }).done(res => console.log(res))
  }
  search (term) {
    console.log(`${term} was searched`);
    if(term.length > 0){
      $.ajax({
        method: "POST",
        url: "/favorites",
        data: {data: term}
      })
    .done(res => {
      //res.send(JSON.parse(res.body).message)
      console.log(JSON.parse(res.body).message)
      this.setState({
        items: JSON.parse(res.body).message
      })
      console.log('LSKDJFLSDJFL',res)
    });
    }
  }

  render () {
    return (<div>
      <h1>My Favorite Dogs</h1><button onClick={this.click}>All Breeds</button>
      <div id="pics">
      <List items={this.state.items} click={this.onClick.bind(this)}/>
      </div>
      <Search repos = {this.state.repos} onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
