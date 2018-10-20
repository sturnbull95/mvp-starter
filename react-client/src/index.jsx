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
  componentDidMount() {
    if(this.state.types.length === 0){
      $.ajax({
        method:'POST',
        url: '/api/types',
        success: (data) => {
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
      method: 'GET',
      url: '/api/favorites',
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
    if(document.getElementById('pics').style.display === 'none'){
      document.getElementById('pics').style.display = ''
      document.getElementById('types').style.display = 'none'
    } else{
      document.getElementById('pics').style.display = 'none';
      document.getElementById('types').style.display = ''
    }
  }
  onClick(term){
    $.ajax({
      method: "DELETE",
      url: "/api/favorites",
      data:{data:term.img}
    }).done(res => console.log(res))
  }
  search (term) {
    if(term.length > 0 && this.state.types.includes(term)){
      $.ajax({
        method: "POST",
        url: "/api/favorites",
        data: {data: term}
      })
    .done(res => {
      this.componentDidMount()
      document.getElementById('val').value = ''
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
    $.ajax({
      method: "POST",
      url: "/api/favorites",
      data: {data: breed},
      success: (data) => {
        this.componentDidMount()
      },
      error: (err) => {
        console.log('err', err);
      }
    })
    document.getElementById('types').style.display = 'none'
    document.getElementById('pics').style.display = ''
  }


  render () {
    var styles = {
	   color:'blue',
	   fontWeight:'bold',
     fontFamily: "Courier New",
     textAlign: "center",
     textDecoration: 'underline'
   }
   var buttonStyle = {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center'
   }
   var typeStyle = {
     height: 100
   }
    return (<div >
      <h1 style={styles}>My Favorite Dogs</h1>
      <div style={buttonStyle}>
        <button onClick={this.click}>All Breeds</button>
      </div>
      <div style={buttonStyle}>
        <Search repos = {this.state.repos} onSearch={this.search.bind(this)}/>
      </div>
      <div style={typeStyle} id='types'>
        <Type types={this.state.types} click ={this.typeClick.bind(this)}/>
      </div>
      <div style={buttonStyle} id="pics">
        <List items={this.state.items} off={this.off.bind(this)} hover={this.hover.bind(this)} click={this.onClick.bind(this)}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
