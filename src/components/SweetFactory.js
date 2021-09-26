import React, { useEffect, useRef, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaTimes } from 'react-icons/fa'
import styled from 'styled-components';

const SweetFactoryStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .factoryInput_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        margin-bottom: 2rem;
        width: 100%;
        .factoryInput_input {
            flex-grow: 1;
        }
    }
    .factory_label {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #04aaff;
        cursor: pointer;
        transition: color .4s;
        span {
            padding: 0 1rem;
        }
        &:hover {
            color: tomato;
        }
    }
    .factoryFrom_attachment {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            height: 80px;
            width: 80px;
            border-radius: 40px;
        }
        .factoryForm_clear {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #04aaff;
            cursor: pointer;
            text-align: center;
            margin: 1rem 0;
            transition: color .4s;
            span {
                font-size: 1.4rem;
                padding: 0 1rem;
            }
            &:hover {
                color: tomato;
            }
        }
    }
`;

const SweetFactory = ({ userObj }) => {
    const [sweet, setSweet] = useState('')
    //URL 상태관리
    const [attachment, setAttachment] = useState('')
    const inputValue = useRef(null)

    useEffect(() => {
        inputValue.current.focus()
    },[])
    const onChange = (e) => {
        const { value } = e.target
        setSweet(value)
    }

    //firestore에 데이터 저장하기
    const onSubmit = async (e) => {
        e.preventDefault()

        if(sweet === ''){
            return;
        }
        let attachmentUrl = '';
        if(attachment !== ''){
            //storage는 아이디를 자동으로 생성하지 않음 
            //userObj.uid: 폴더명, uuidv4(): 파일이름 
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL()//파일을 다운로드 할 수 있는 URL 반환
        }
        //컬렉션을 생성하고, 해당 컬렉션에 도큐먼트 추가 
        await dbService.collection("sweets").add({
            text: sweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        })
        setSweet('')
        setAttachment('')
    }

    //웹 브라우저에 사진 출력하기 
    const onFileChange = (e) => {
        const { files } = e.target 
        const theFile = files[0] // files는 배열형태 
        const reader = new FileReader()
        //onloadend: readAsDataURL함수로 전달할 인자(파일)가 함수로 들어간 이후
        //결괏값이 나온 다음 상황 감지하고, 그때 생긴 이벤트값을 사용 가능하게 해줌 
        reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget
            setAttachment(result)
        }
        //readAsDataURL함수: 파일 정보를 인자로 받아서 파일 위치를 URL로 반환
        //웹 브라우저가 파일을 인식하는 시점, 파일 인식이 끝난 시점까지 함께 관리해줘야
        //URL을 얻을 수 있음 
        if(Boolean(theFile)){
            reader.readAsDataURL(theFile)
        }
    }
    //파일 선택 취소하기 
    const onClearAttachment = () => setAttachment('')
    
    return (
        <SweetFactoryStyles onSubmit={onSubmit}>
            <div className="factoryInput_container">
                <input 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120}
                value={sweet}
                ref={inputValue}
                onChange={onChange}
                className="blue_border_input factoryInput_input"
                />
                <input type="submit" value="&rarr;" className="blue_button"/>
            </div>
            <label htmlFor="attach-file" className="factory_label">
                <span>Add photos</span>
                <FaPlus/>
            </label>
            <input 
            id="attach-file" 
            type="file" 
            accept="image/*" 
            onChange={onFileChange}
            style={{ opacity: 0 }}/>
            { attachment && (
                <div className="factoryFrom_attachment">
                    <img 
                    src={attachment} 
                    style={{ backgroundImage: attachment }}
                    alt="배경이미지"
                    />
                    <div className="factoryForm_clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FaTimes/>
                    </div>
                </div>
            )}
        </SweetFactoryStyles>
    );
};

export default SweetFactory;