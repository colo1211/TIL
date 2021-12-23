# 커스텀 Hook 

* 회원가입, 로그인 폼을 개발할 때 `onChangeId`, `onChangePassword` 등의 코드는 매우 많이 중복된다. 


* 이러한 중복을 해결하기 위해서는 `Custom Hook` 을 사용하면 된다. 


![image](https://user-images.githubusercontent.com/63600953/137702018-8b06240e-2531-4f80-bcc1-3afe49609de2.png)

코드가 매우 반복이 많이 된다. 
이럴 때 Custom Hook을 제작하여 사용한다. 

### Hook 을 쓸 수 있는 조건
```
1. 반복문, 조건문, 함수 내부에서는 사용 불가능
2. 무조건 컴포넌트 내부(Depth 1단계)에서만 가능
```
But! 유일하게 컴포넌트 외부에서도 사용 가능한 것이 `Custom Hooks`


`hooks/useInput()`

```
import {useCallback, useState} from "react";


// 커스텀 Hook
export default () => {
    const [value, setValue] = useState(null);

    const handler = useCallback((e)=>{
        setValue(e.target.value);
    },[]);

    return [value, handler];
}
```

`사용`
* 코드의 양이 많이 줄어드는 것을 확인 할 수 있다.
```
const [id, onChangeId] = useInput('');
```