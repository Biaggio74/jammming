import React from 'react';
import './Track.css';

class Track extends Component {
  render() {
    renderAction(){
      if (isRemoval){
        return '-'
      } else {
        return '+'
      }
    };

    return (
      <div className="Track">
  <div className="Track-information">
    <h3>Dolce vitaaaa</h3>
    <p>James Blunt | In the Army</p>
  </div>
  <a className="Track-action"> + or - </a>
</div>
<div className="Track">
<div className="Track-information">
<h3>Dolce vitaaaa</h3>
<p>James Blunt | In the Army</p>
</div>
<a className="Track-action"> + or - </a>
</div>
<div className="Track">
<div className="Track-information">
<h3>Dolce vitaaaa</h3>
<p>James Blunt | In the Army</p>
</div>
<a className="Track-action"> + or - </a>
</div>

    )
  }
};

export default Track;
