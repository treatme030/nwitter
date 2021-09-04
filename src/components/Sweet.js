import React from 'react';
import { dbService } from 'fbase';

const Sweet = ({ id, text, isOwner }) => {
    
    const onDeleteClick = async () => {
        const ok = window.confirm('삭제하시겠습니까?')//boolean 값 반환 
        if(ok){
            const data = await dbService.doc(`sweets/${id}`).delete()
        }
    }

    return (
        <div>
            <h4>{text}</h4>
            {/* 유저와 작성자가 동일한 경우에만 버튼 보이도록 */}
            { isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Sweet</button>
                    <button>Edit Sweet</button>
                </>
            )}
        </div>
    );
};

export default Sweet;