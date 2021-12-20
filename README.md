<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=black"><img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">



# 🍬 Switter 
### 프로젝트 설명
* React와 Firebase를 사용한 Twitter (mini)Clone
* 코로나 현황을 위한 외부공공데이터 API 사용
* 최신 인기 동영상 검색을 위한 kakao API를 사용

### 각 부분 구현된 이미지와 구현에 사용한 방식과 라이브러리
1. 로그인 / 메인 / 프로필 / 로그아웃
* 기본 로그인/회원가입 및 소셜 인증을 통한 로그인
* 글 입력과 이미지 첨부
* 해당 유저가 작성한 글에 대해서만 수정/삭제 가능
* 해당 유저의 displayName을 이용하여 프로필명 변경 가능 
* 로그아웃

![로그인](https://user-images.githubusercontent.com/74355328/146699283-13a7381f-49e4-4069-80c2-1ed5046fd8bf.gif)

2. 코로나 

![corona](https://user-images.githubusercontent.com/74355328/146196626-114d1872-d5c5-4060-b6a5-c6e52e6131ec.gif)

* 코로나의 전체적인 감염 정보 표시
* 코로나의 지역별 감염 정보 표시
  * svg 전국 지도를 react에서 사용하기 위해 file-loader 라이브러리를 설치
  ```javascript
  npm install file-loader --save-dev
  ```
   * node_modules/react-scripts/config/webpack.config.js에서 svg를 읽을 수 있는 코드 추가
  ```javascript
  {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[hash]-[name].[ext]',
        },
      },
    ],
  },
  ```
   * 마우스 오버되는 지역의 코로나 감염 정보를 나타내는 툴팁을 getScreenCTM() 함수를 사용해서 구현
  ```javascript
  const mouseOverHandler = (e) => {
        //e.target을 사용할 경우 버블링으로 이벤트가 하위요소에 각각 발생함
        //--> 그룹 요소에 클래스 삭제 추가될 수 있도록 e.currentTarget 사용 
        e.currentTarget.classList.add('city_hover')

        //툴팁의 위치 계산하기
        const CTM = svg.getScreenCTM()
       
        tooltip.setAttributeNS(null, "visibility", "visible")

        //텍스트 변경하기
        const info = sidoCovidInfo.find((item, index) => index === e.currentTarget.tabIndex)
        const { deathCnt, defCnt, gubun } = info
        e.currentTarget.setAttributeNS(null, "data-text", `${gubun}/확진자:${defCnt}명/사망자:${deathCnt}명`)

        //배경 만들기
        //배경 위치는 transform으로 설정 
        const x = (e.clientX - CTM.e + 6) / CTM.a
        const y = (e.clientY - CTM.f + 20) / CTM.d
        tooltip.setAttributeNS(null, "transform", `translate(${x}, ${y})`)

        const tooltipText = tooltip.getElementsByTagName('text')[0]
        tooltipText.firstChild.data = e.currentTarget.getAttributeNS(null, "data-text");
        
        //툴팁 길이 변경 
        const tooltipRects = tooltip.getElementsByTagName('rect')
        const length = tooltipText.getComputedTextLength()//텍스트 요소의 길이 구하기
        for (let i = 0; i < tooltipRects.length; i++) {//텍스트 길이에 맞게 넓이 변경
            tooltipRects[i].setAttributeNS(null, "width", length + 8);
        }    
    }
   ```

3. 동영상 검색

![동영상검색](https://user-images.githubusercontent.com/74355328/146197013-2a2114a7-6d68-43b6-9293-029bf265dccc.gif)

* 입력된 검색어에 따른 인기 동영상을 kaka API를 사용하여 표시

### 구현하면서 어려웠던 점
* 외부공공데이터 API를 사용하려는데 브라우저가 보안을 위해 교차 출처 리소스 공유를 제한
  * 해결: 무료 브리지 클라우드 서비스를 이용
  ```javascript
  const response = await axios.get(`https://cors.bridged.cc/http://openapi.data.go.kr/...`, {
                    headers: {
                        'x-cors-grida-api-key': 'myapikey',
                        'Content-Type': 'application/json'
                    }
                })
  ```
  * 참고( https://github.com/gridaco/base/issues/23)
* svg를 react에 직접 사용하는 부분
  * 해결: webpack.config.js에 코드 추가
  * 그 외에도 svg 파일로 저장하고, 불러와서 img 태그의 속성값에 넣어 사용하는 방법과 불러와서 svg를 컴포넌트처럼 사용는 방법도 알게됨
  * webpack이 어떤 역할을 하는지 공부할 수 있는 좋은 계기가 됨
* 툴팁 구현
  * https://www.petercollingridge.co.uk/tutorials/svg/interactive/tooltip/ 해당 사이트를 참고하여 구현
