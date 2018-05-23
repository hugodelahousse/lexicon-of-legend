import React from 'react';

export default class Item extends React.Component {

  onHover() {
    document.querySelector(".description-wrapper>.image").style.backgroundImage = `url(${this.props.data.image})`;
    document.querySelector(".description-wrapper>.text").innerHTML = this.props.data.description;
  }

  render() {
    return (
      <div class="col item" onMouseEnter={() => this.onHover()}>
        <div className="image" style={{backgroundImage: `url(${this.props.data.image})`}}></div>
        <p>{this.props.data.name}</p>
      </div>
    )
  }
}