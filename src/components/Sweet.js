import React, { useState } from 'react';
import { dbService } from 'fbase';

const Sweet = ({ id, text, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newSweet, setNewSweet] = useState(text)

    const onDeleteClick = async () => {
        const ok = window.confirm('삭제하시겠습니까?')//boolean 값 반환 
        if(ok){
            const data = await dbService.doc(`sweets/${id}`).delete()
        }
    }

    const toggleEditing = () => setEditing(!editing)

    const onChange = (e) => {
        const { value } = e.target 
        setNewSweet(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await dbService.doc(`sweets/${id}`).update({text: newSweet})
        setEditing(false)
    }
    return (
        <div>
            { editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input 
                        type="text" 
                        required 
                        value={newSweet} 
                        onChange={onChange}
                        />
                        <input type="submit" value="Update Sweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{text}</h4>
                    {/* 유저와 작성자가 동일한 경우에만 버튼 보이도록 */}
                    { isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Sweet</button>
                            <button onClick={toggleEditing}>Edit Sweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Sweet;