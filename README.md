# 🍬 Switter 
### 프로젝트 설명
* React와 Firebase를 사용한 Twitter (mini)Clone
* 코로나 현황을 위한 외부공공데이터 API 사용
* 최신 인기 동영상 검색을 위한 kakao API를 사용

### 각 부분 구현된 이미지와 구현에 사용한 방식과 라이브러리
1. 로그인

![Screenshot from 2021-11-06 17-10-21](https://user-images.githubusercontent.com/74355328/140602911-c095bbe8-a3f1-48fb-b3cc-0ae6ea067996.png)

* 기본 로그인/회원가입 및 소셜 인증을 통한 로그인


2. 메인

* 글 입력과 이미지 첨부
* 해당 유저가 작성한 글에 대해서만 수정/삭제 가능


3. 프로필

* 해당 유저의 displayName을 이용하여 프로필명 변경 가능 
* 로그아웃


4. 코로나 

![Screenshot from 2021-11-06 17-09-47](https://user-images.githubusercontent.com/74355328/140602904-6fda6fba-85dd-4144-891f-051bc47b0054.png)

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

5. 동영상 검색

![Screenshot from 2021-11-06 17-10-06](https://user-images.githubusercontent.com/74355328/140602914-7a9f1ac9-c90f-46da-8719-42bf85a338c5.png)

* 입력된 검색어에 따른 인기 동영상을 kaka API를 사용하여 표시
