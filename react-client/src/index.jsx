import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Type from './components/Type.jsx';
import styles from"../dist/app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      types: [],
      types1: []
    }
    this.click = this.click.bind(this)
  }
  styling(){
    return {
      display: 'inline-block'
    }
  }
  componentDidMount() {
    if(this.state.types.length === 0){
      $.ajax({
        method:'POST',
        url: '/types',
        success: (data) => {
          console.log('HERE',data)
          var arr = []
          for(var i in data){
            arr.push(i)
          }
          this.setState({
            types: arr,
          })
          document.getElementById('types').style.display = 'none'
        },
        error: (err) => {
          console.log('err', err);
        }
      });
    }
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
      document.getElementById('types').style.display = 'none'
    } else{
      document.getElementById('pics').style.display = 'none';
      document.getElementById('types').style.display = ''
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
    .then(res => {
      //res.send(JSON.parse(res.body).message)
      console.log(JSON.parse(res.body).message)
      this.setState({
        items: JSON.parse(res.body).message
      })
      console.log('LSKDJFLSDJFL',res)
    });
    }
  }
  hover(e){
    e.currentTarget.height += 600;
    e.currentTarget.width += 600;
  }
  off(e){
    e.currentTarget.height -= 600;
    e.currentTarget.width -= 600;
  }
  typeClick(breed){
    console.log('BREDD',breed)
    console.log(this.state.types.slice(0,10))
    $.ajax({
      method: "POST",
      url: "/favorites",
      data: {data: breed},
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    })
    document.getElementById('types').style.display = 'none'
    document.getElementById('pics').style.display = ''
  }
  

  render () {

    return (<div >
      <h1 color="red">My Favorite Dogs</h1><button onClick={this.click}>All Breeds</button>
      <div id='types'>
        <Type types={this.state.types} click ={this.typeClick.bind(this)}/>
      </div>
      <div id="pics">
        <List items={this.state.items} off={this.off.bind(this)} hover={this.hover.bind(this)} click={this.onClick.bind(this)}/>
      </div>
      <Search repos = {this.state.repos} onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
