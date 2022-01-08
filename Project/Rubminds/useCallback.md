# useCallback

* 참고 레퍼런스 : https://velog.io/@kym123123/%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-react%EC%9D%98-setState%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

![image](https://user-images.githubusercontent.com/63600953/148636697-534c971e-9101-4dfc-8589-370ed86a1f3c.png)


* 회원가입 페이지에서 중복체크를 위한 API를 연결하고 있었다. 
하지만, 마지막에 중복체크 버튼을 클릭하였을 때 닉네임이 꼭 한음절정도 빠져서 제출되는 현상을 발견할 수 있었다.
 
* 그때 사용한 onChange 함수이다. 
    * setState 메서드는 비동기로 동작하기 때문이다. setState를 이벤트 핸들러 안에서 호출한다면. 호출되는 setState에 의해서 업데이트가 요청되는 state의 count의 값은 호출 이후 즉각적으로 반영되지 않는다. 
      setState는 이벤트 핸들러 안에서 현재 state의 값에 대한 변화를 요청하기만 하는 것이고, 그 요청사항은 이벤트 핸들러가 종료되고 react에 의해서 효율적으로 상태가 갱신된다.
      

```  
 const onNicknameChange = e => { 
    setNickname(e.target.value)
    console.log(nickname); 
}
```

* 그때 사용한 nicknameCheckHandler 함수이다. 
    * useCallback을 사용함에도 불구하고, 제출버튼을 클릭했을 때 console.log(nickname)에 예를들어 `구글`이라고 입력하면, 
    `구그`이라고 출력되어 제출되는 현상을 발견한다. 
```
  const nicknameCheckHandler = useCallback(async() => {
    console.log('handler',nickname); 
    const result = await axios.get(
        `/user/nickname/check?nickname=${nickname}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
        )
      console.log(result); 
      // .then(res => { 
      //   alert('사용 가능한 닉네임 입니다.');
      //   setnicknameCheck(true);
      // })
      // .catch(e => { 
      //   alert('이미 사용 중인 닉네임 입니다.');
      //   setnicknameCheck(false)
      // })
  }, [])
```

* 이를 해결하기 위해서 
  ```
  useCallback(()=>{},[nickname])
  ```
  을 추가해주니 `nickname` 이 변경됨에 따라서 즉각적으로 반영되어 콘솔에 찍히는 것을 확인할 수 있었다.



`Nickname.js`
```
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import * as S from '../SignUpPageRight/style'
import { useEffect } from 'react'

const Nickname = ({ nickname, setNickname, setnicknameCheck }) => {


  
  const onNicknameChange = useCallback((e)=>{
    setNickname(e.target.value)
  }, [nickname]);
  
  const nicknameCheckHandler = useCallback(async() => {
    console.log('handler',nickname); 
    const result = await axios.get(
        `/user/nickname/check?nickname=${nickname}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
        )
      console.log(result); 
  }, [nickname])

  return (
    <>
      <S.MainTitle marginTop="7.5%" marginBottom="7.5%" fontSize="2rem" aquired>
        닉네임
      </S.MainTitle>
      <S.NickNameWrapper>
        <S.NickNameBox
          name="nickname"
          onChange={onNicknameChange}
          required
        />
        <S.CheckBox
          type="button"
          value="중복체크"
          onClick={nicknameCheckHandler}
        />
      </S.NickNameWrapper>
    </>
  )
}

export default Nickname

```