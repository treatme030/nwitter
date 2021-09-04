import React from 'react';

const Sweet = ({ id, text }) => {
    return (
        <div>
            <h4>{text}</h4>
            <button>Delete Sweet</button>
            <button>Edit Sweet</button>
        </div>
    );
};

export default Sweet;