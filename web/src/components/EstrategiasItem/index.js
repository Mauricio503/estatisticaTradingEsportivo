import React from 'react';

function Item({ e }){
    return (
        <li key={e.id} className="dev-item">
            <header>
                <div>
                    <strong>{e.start}</strong>
                </div>
            </header>
        </li>
    );
}

export default Item;