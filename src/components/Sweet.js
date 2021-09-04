import React from 'react';

const Sweet = ({ text, isOwner }) => {
    return (
        <div>
            <h4>{text}</h4>
            {/* 유저와 작성자가 동일한 경우에만 버튼 보이도록 */}
            { isOwner && (
                <>
                    <button>Delete Sweet</button>
                    <button>Edit Sweet</button>
                </>
            )}
        </div>
    );
};

export default Sweet;