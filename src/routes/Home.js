import Sweet from 'components/Sweet';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [sweet, setSweet] = useState('')
    //firestore에서 받은 데이터 상태관리
    const [sweets, setSweets] = useState([])
    //URL 상태관리
    const [attachment, setAttachment] = useState('')
    
    //실시간 데이터베이스 
    useEffect(() => {
        dbService.collection("sweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setSweets(newArray)
        })
    },[])

    const onChange = (e) => {
        const { value } = e.target
        setSweet(value)
    }

    //firestore에 데이터 저장하기
    const onSubmit = async (e) => {
        e.preventDefault()
        //컬렉션을 생성하고, 해당 컬렉션에 도큐먼트 추가 
        /*await dbService.collection("sweets").add({
            text: sweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setSweet('')*/
        //storage는 아이디를 자동으로 생성하지 않음 
        //userObj.uid: 폴더명, uuidv4(): 파일이름 
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
        const response = await attachmentRef.putString(attachment, "data_url")
        console.log(response)
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
        reader.readAsDataURL(theFile)
    }
    //파일 선택 취소하기 
    const onClearAttachment = () => setAttachment('')

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120}
                value={sweet}
                onChange={onChange}
                />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Sweet"/>
                { attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                { sweets.map((sweet) => (
                    <Sweet 
                    key={sweet.id} 
                    {...sweet}
                    isOwner={sweet.creatorId === userObj.uid}
                    //작성한 유저만에 삭제, 수정 가능하도록
                    />
                ))}
            </div>
        </>
    );
};

export default Home;