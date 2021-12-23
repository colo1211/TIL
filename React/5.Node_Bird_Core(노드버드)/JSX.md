# JSX

* JSX 에 대해서 몰랐던 내용들
---
### `<input required>`

* input 태그 내에 값을 입력하지 않고 로그인 버튼을 클릭했을 때, 값이 비어있다면
`required` 속성을 부여해주면 된다. 

![image](https://user-images.githubusercontent.com/63600953/137659725-985ca893-7a57-4299-a692-02004d29854a.png)


### `<label htmlFor=''>`
* 라벨을 클릭했을 때, Input 태그에도 Focus를 주는 효과 
* 원래 HTML 에서는 label for로 되었으나, JSX 에서는 for가 JS 문법의 예약어 이므로 `htmlFor`로 사용된다. 
* `<label htmlFor = 'input내의 id'>` + `<input id='id명'>`

```
<label htmlFor='user-id'>아이디</label>
<br />
<Input id='user-id' value={id} onChange={onChangeId} required/>
```


### (Antd) htmlType = 'submit' `->` onFinish (onSubmit대체)

* antd에서는 `<Button>`의 속성으로 htmlType = 'submit' 을 하게 되면, 
버튼을 클릭하면 `<Form>` 태그에서 onFinish 이벤트 함수를 호출하게 된다. 
  

* onFinish 함수는 자동으로 `e.preventDefault();` 가 적용이 되어 있다.<br/>
   따라서, e.preventDefault() 를 굳이 사용하지 않아도 괜찮다. 


### 이미지 파일 업로드 버튼 대체

* 현재 사진을 제출하는 버튼과 이미지 업로드 버튼이 2개
* 근데 파일 선택 버튼은 이쁘지가 않음
* `이미지 업로드 버튼` 에 파일선택 기능을 부여하고 싶음

![image](https://user-images.githubusercontent.com/63600953/138024625-0778486f-60b5-453a-b575-f87bfd208e3c.png)


1. `파일 선택` 회색 버튼을 숨긴다. (hidden)
```
<input type="file" multiple hidden/>
<Button>이미지 업로드</Button>
```

2. useRef 사용

```
import {useCallback, useRef, useState} from "react";

const PostForm = () => {
   const imageInput = useRef();
   const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
   return(
      <input type="file" multiple hidden ref={imageInput}/>
      <Button onClick={onClickImageUpload}>이미지 업로드</Button>
)
}


```

### 배열 안에 JSX 를 넣어주려면 항상 무조건 `key` 를 넣어주어야 한다. 

```
<Card
    cover={post.Images[0] && <PostImages images={post.Images} />}
    actions = {[
        <RetweetOutlined key='retweet'/>,
        <HeartOutlined key='heart'/>,
        <MessageOutlined key='commnet'/>,
        <Popover key='more' content={(
            <Button.Group>
                <Button>수정</Button>
                <Button type='danger'>삭제</Button>
                <Button>신고</Button>
            </Button.Group>
        )}>
            <EllipsisOutlined />
        </Popover>
    ]}
>
```

