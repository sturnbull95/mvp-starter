import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.items.map(item => <ListItem item={item} click={props.click}/>)}
  </div>
)

export default List;
