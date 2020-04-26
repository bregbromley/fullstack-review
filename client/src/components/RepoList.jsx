import React from 'react';


class RepoListItem extends React.Component{
  constructor(props) {
    super (props);
  }
  render () {
    var link = this.props.repo.url;
    return (
      <div>
        <li><a href={`${this.props.repo.url}`}>{this.props.repo.name}</a></li>
        <span>owned by: {this.props.repo.owner}</span>
        <p>{this.props.repo.description}</p>
      </div>
      // <li >, Owner: {this.props.repo.owner}</li>
      )
  }
}



const RepoList = (props) => {

    props.repos.forEach((repo) => {
      console.log(repo.name);
  })


  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <ul>
        {props.repos.map(repo =>
        <RepoListItem repo={repo}/>
      )}
      </ul>
    </div>
  )
}

export default RepoList;