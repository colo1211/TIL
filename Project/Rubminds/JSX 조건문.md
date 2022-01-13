# JSX 조건문 
### 말을 편하게 해서 조건문이지만, 정식 명칭은 `조건부 렌더링`

1. 삼항연산자 
* True 일때와 False 일때 결과값이 다른 경우 사용한다. 
* 단점 : 경우의 수를 2가지로 밖에 한정짓지 못한다. 

```
import React from 'react';

export default function App {
    return (
      <div>
        {
          1 + 1 === 2 
            ? (<div>맞아요!</div>)
            : (<div>틀려요!</div>)
        }
      </div>
    );
}
```


2. AND 연산자 
* 값이 `True/False` 임에 따라서 결과값을 보여주고 싶을 때 사용하는 방법이다. 
* 가장 간단하다는 장점이 있다. 
* 주로, 어떤 state 값이 들어왔을 때, 뒤의 값을 보여주고 싶을 때 사용하는 조건문의 방식이다. 

```
import React from 'react';

export default function App {
    return (
      <div>
        {
          1 + 1 === 2 && (<div>맞아요!</div>)
        }
      </div>
    );
}
```

3. If문 
* JSX에서는 1,2번의 간단한 조건문만을 사용하는 것을 권장하고, 이를 표준으로 삼고있지만
JSX 내부에서 즉시실행 함수를 사용하여 if문을 작성할 수도 있다. 
  
> 즉시실행함수란? 함수를 정의함과 동시에 호출하는 함수
```
import React from 'react';

export default function App {
    return (
      <div>
        {
          (function() {
            if (value === 1) return (<div>하나</div>);
            if (value === 2) return (<div>둘</div>);
            if (value === 3) return (<div>셋</div>);
          })()
        }
      </div>
    );
}
```

