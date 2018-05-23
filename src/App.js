import React, { Component } from 'react';
import items from './dump.json';
import Item from './Item';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
  }

  render() {
    return (
      <div className="App bg-dark text-light">
        <nav class="navbar navbar-dark">
          <a href="/" className="navbar-brand">Lexicon Of Legend</a>
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={
              (event) => this.setState({searchString: event.target.value})
            } />
          </form>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-3">
              <div class="description-wrapper">
                <div className="image large"></div>
                <div className="text"></div>
              </div>
            </div>
            <div className="container col items-container">
              <div className="items">
                <div className="row">
                  {
                    Object.values(items).map(item => {
                        if (item.name.toLowerCase().includes(this.state.searchString.toLowerCase()))
                          return <Item data={item} key={item.name}/>
                        return null;
                      }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
