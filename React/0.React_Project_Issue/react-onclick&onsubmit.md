# React - onClick & onSubmit

## 참고 레퍼런스

* https://study-ymj.tistory.com/entry/%EC%97%90%EB%9F%AC%EB%85%B8%ED%8A%B8-button-onclick%EC%8B%9C-form%EC%9D%98-onsubmit%EC%9D%B4-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%ED%98%84%EC%83%81

* https://rrecoder.tistory.com/122

* https://enfanthoon.tistory.com/133


## 문제
: 회원가입 페이지에서 직업 선택 button 및 닉네임 중복체크 버튼을 클릭하였을때, 자동으로 폼이 제출되어 버리는 굉장히 난해한 상황이 발생해버림
* 급한대로 `e.preventDefault()` 로 해결했었지만, 중복체크 버튼을 API를 연결하려고 하니 다른 부작용이 발생

![image](https://user-images.githubusercontent.com/63600953/148162915-9d55964d-4034-4205-a796-69e1bb3eb7fe.png)



## 해결

* onsubmit의 제일 밑에 기본이 되는 함수가 onClick 이라고 StackOverflow에 적혀있음 <br>
  `->` 이 말은 즉, `button` + `onClick` 버튼의 조합은 제출하기 위한 곳에서만 사용하라는 의미인것인지는 모르겠지만 해결은 됨  

* 나 또한 저기에 있는 3가지 버튼들을 모두 button 태그로 구현하였고, onClick으로 하였다. <br>
  `->` 따라서, 해당 3가지 버튼들을 모두 `<input type='button'/>` 태그로 변경하였더니 자동으로 제출되는 현상이 사라졌다. 
  

## `onClick` vs `onSubmit`

* 예제를 통해서 살펴보자

`onClick`

```
import React, {useState} from 'react'; 

const CompareSubmitClick = (props) => { 
    const [number, setNumber] = useState(0); 
    const onClick = () => { setNumber(number + 1); } 
    return ( 
        <div> 
            <p>{number}</p> 
            <button onClick={onClick}>클릭!</button> 
        </div> 
      ); 
    }; 
    export default CompareSubmitClick;
```

: 숫자를 클릭하면 정상적으로 올라가는 것을 볼 수 있다. 

`onSubmit`

```
import React, {useState, useCallback} from 'react'; 

const CompareSubmitClick = (props) => { 
    const [number, setNumber] = useState(0); 
    const onSubmit = useCallback( e => { setNumber(number + 1); }, [number] ) 
    return ( 
        <div> 
            <form onSubmit={onSubmit}> 
                <input /> 
                <p>{number}</p> 
                <button type="submit">클릭!</button> 
             </form> 
        </div> 
            ); 
        }; 
    export default CompareSubmitClick;
```

* 버튼을 눌렀을 때 숫자가 올라가는 것 처럼 보이지만, 새로고침에 의해서 사라지게 된다. <br>
  ⭐⭐⭐⭐⭐ onSubmit 은 기본적으로 호출될 때 페이지를 새로고침하는 효과가 있기 때문이다. 
  
그럼 왜 onSubmit 을 사용하는 것일까?

```
const onSubmit = useCallback( e => { 
    setNumber(number + 1); 
    e.preventDefault(); 
    // 추가 }, [number] ); 
    export default CompareSubmitClick;
```

위의 코드를 onSubmit에 추가하게 되면 onSubmit이 호출되어도 새로고침이 되지 않게 된다. 
또, input위에 커서를 올려주고 `Enter` 를 입력하게 되면 숫자가 올라간다. 

결론적으로, onSubmit은
onSubmit은 form에 묶어놓고 사용 시, form 내부의 컴포넌트에 focus를 주었을 때, 엔터를 눌러도 onSubmit을 호출하게 됩니다.
onClick으로 구현시에는 onKeyPress같은 이벤트를 따로 추가해서 키 입력을 받아야하는 불편함이 있겠죠.
이처럼 onSubmit과 onClick은 비슷한 듯 다른 점이 있습니다.


정리 => onSubmit = `Enter` + `onClick` + `새로고침`