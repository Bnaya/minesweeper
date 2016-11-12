import React, { PropTypes } from 'react';
import './Board.css';

import Location from './Location';

import BoardModel from '../Model/Board';

export default function Board ({model, onRevealRequest, onFlagRequest}) {
  return <table className="mines-game-board">
      <tbody>
        {model.locations.map(function (locationsCol, x) {
          return <tr key={x}>
            {locationsCol.map(function (locationModel, y) {
              return <Location 
                        key={y}
                        model={locationModel} 
                        onRevealRequest={onRevealRequest.bind(null, {x, y})} 
                        onFlagRequest={onFlagRequest.bind(null, {x, y})}
                    />
            })}
          </tr>;
        })}
      </tbody>
    </table>;
};

Board.propTypes = {
  model: PropTypes.instanceOf(BoardModel).isRequired,
  onFlagRequest: PropTypes.func.isRequired,
  onRevealRequest: PropTypes.func.isRequired
};