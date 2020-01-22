import React from 'react';

function Item({ e }){
    return (
        <tr key={e.id}>
		    <td>{e.h} x {e.a}</td>
            <td>{e.hg} x {e.ag}</td>
            <td>{e.status}</td>
            <td>{e.shot_off+", "}</td>
            <td>{e.possess+", "}</td>
            <td>{e.i_odds+ ", "}</td>
        </tr>						
    );
}

export default Item;