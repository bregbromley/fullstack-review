import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount () {
    console.log('find ran');
    this.getTopItem((err, res) =>{
      this.setState({repos: res})
    })
    // console.log(this.state.repos);
  }

  getTopItem (callback) {
    $.ajax({
      method: "GET",
      url: "/repos",
      success: (res) => {
        console.log('I WORKED', res);
        callback(null, res);
        console.log(this.state.repos);
      },
      error: (err) => {
        if (err) {
          console.log('NOPE', err);
        }

      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //use Jquerys ajax method to send a post request to /repos
    var username = {user: term};
    var data = JSON.stringify(username);
    $.ajax({
      method: "POST",
      url: "/repos",
      data: username,
      // content-type: "application/json",
      dataType: 'json',
      success: (data) => {
        console.log('SUCCESS', data);

      },
      error: (err) => {
        if (err) {
          console.log('ERROR', err);
        }
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));