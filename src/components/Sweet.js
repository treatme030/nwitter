import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import styled from 'styled-components';
import palette from 'styles/palette';

const SweetStyles = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    margin-bottom: 2.5rem;
    padding: 2rem;
    border-radius: 10px;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.8);
    .container {
        width: 100%;
        max-width: 320px;
        display: flex;
        flex-direction: column;
        .formInput {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 20px;
            border: 1px solid #000;
            text-align: center;
            background-color: #fff;
            color: #000;
        }
        
    }
    .formBtn {
        cursor: pointer;
        width: 100%;
        padding: 0.7rem 2rem;
        text-align: center;
        border-radius: 20px;
        background-color: ${palette.blue[1]};
        color: #fff;
        margin-top: 1rem;
    }
    .cancelBtn {
        background-color: tomato;
    }
    .sweet_name {
        position: absolute;
        top: 3px;
        left: 2rem;
        color: ${palette.blue[1]};
        font-size: 1rem;
    }
    img {
        position: absolute;
        right: -10px;
        top: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 1rem;
    }
    .sweet_actions {
        position: absolute;
        right: 10px;
        top: 10px;
        span {
            cursor: pointer;
            margin-left: 1rem;
        }
    }
`;

const Sweet = ({ id, text, attachmentUrl, createdAt, isOwner, userObj }) => {
    const [editing, setEditing] = useState(false)
    const [newSweet, setNewSweet] = useState(text)

    const onDeleteClick = async () => {
        const ok = window.confirm('삭제하시겠습니까?')//boolean 값 반환 
        if(ok){
            await dbService.doc(`sweets/${id}`).delete()
            if(attachmentUrl !== ''){ //저장된 이미지 삭제 
                await storageService.refFromURL(attachmentUrl).delete()
            }
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
        <SweetStyles>
            { editing ? (
                <>
                    <form onSubmit={onSubmit} className="container sweetEdit">
                        <input 
                        type="text" 
                        required 
                        value={newSweet} 
                        onChange={onChange}
                        placeholder="Edit your sweet"
                        autoFocus
                        className="formInput"
                        />
                        <input type="submit" value="Update Sweet" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
                <>
                    <h4>{text}</h4>
                    { attachmentUrl && (
                        <img src={attachmentUrl} alt="이미지"/>
                    )}
                    {/* 유저와 작성자가 동일한 경우에만 버튼 보이도록 */}
                    { isOwner && (
                        <div className="sweet_actions">
                            <span onClick={onDeleteClick}>
                                <FaTrashAlt/>
                            </span>
                            <span onClick={toggleEditing}>
                                <FaPencilAlt/>
                            </span>
                        </div>
                    )}
                </>
            )}
        </SweetStyles>
    );
};

export default Sweet;