# Antd

* 디자인 라이브러리
* 시맨틱 UI, Bootstrap 등 비슷한 것 다수 존재 

### 설치 
```
> npm install antd 
> npm install @ant-design/icons
```
* 아이콘은 따로 설치, 아이콘은 용량을 엄청 많이 차지

### 사용
```
import 'antd/dist/antd.css';
import 'antd/dist/antd.css';
import { Menu } from 'antd'; 
```

`import 'antd/dist/antd.css';`를 import 해야 하는데, 이를 각각의 컴포넌트에 import 해도 되지만 효율성이 떨어진다. 
따라서, 공통적으로 컴포넌트에 적용할 수 있는 Next.js 에서 지정한 `_app.js`를 `pages` 폴더 내에 만들어서 `_app.js`에서 import 한다.


### 반응형 (Row, Col)
* 반응형을 할 때는 무조건 `모바일` 을 먼저 디자인 해야 한다. 
* 점점 늘려서 `태블릿 / PC View` 순서대로 디자인 한다. 

```
1. xs : 모바일
2. sm : 태블릿
3. md : 작은 데스크탑
```

* Bootstrap : Row 하나당 화면 100%가 `12칸`을 차지
* antd : Row 하나당 화면 100%가 `24칸`을 차지


```
<Row>
    <Col xs={24} sm={6}>1</Col>
    <Col xs={24} sm={12}>2</Col>
    <Col xs={24} sm={6}>3</Col>
</Row> 
```

* Break Point

![image](https://user-images.githubusercontent.com/63600953/137579957-5cde63b4-1794-4067-bd8e-f10137bb085a.png)


* 모바일에서는 각각 1줄씩(100%) 모두 차지 (xs = 24)
* pc에서는 합쳐서 100% 차지 (1:2:1 비율로) (sm = 6, 12, 6) 


##⭐ gutter
* Row에 적용하는 속성, Col에 적용되는 Col 사이의 간격
* Grid를 사용하게 되면 Col 끼리 따닥따닥 붙어있지 않도록 `Gutter`를 사용한다. 

```
<Row gutter={8}>
    <Col xs={24} sm={6}>1</Col>
    <Col xs={24} sm={12}>2</Col>
    <Col xs={24} sm={6}>3</Col>
</Row>
```

![image](https://user-images.githubusercontent.com/63600953/137580125-282c3733-fd8a-42af-b2de-aa0d69c60988.png)


---
# Styled Component
* Emotion : `SSR`을 할 때 조금 더 유리 (Styled Component와 비슷)

### 설치
```
> npm install styled-components
```

#### Rerendering 문제 

![image](https://user-images.githubusercontent.com/63600953/137662233-5ebb2e2a-37c5-4c65-8ff8-761ef5c39407.png)

* 속성 style 의 값으로 객체를 넣으면 안된다.


* 리렌더링 될때마다 함수가 통째로 실행되는데, 객체가 새로 생성된것임


* 객체는 새로 생성 될 때 마다 값이 같더라도 서로 다른 것으로 친다.
  ![image](https://user-images.githubusercontent.com/63600953/137662374-5eae7de0-4c44-4d3f-8064-5184fbcc6cbf.png)

###따라서, 이때는 `Styled-Components`를 사용한다. 


### 사용법 (일반)

1. `import styled from 'styled-components';` 
2. const 컴포넌트명 = styled.div``;
   * 만약에 p태그를 넣고 싶다면 styled.p`` 를 적용하면 된다.
3. 백틱 연산자 사이에 CSS 를 넣어주면 끝
4. <컴포넌트명> JSX 요소 </컴포넌트명>

```
import styled from styled-components; 

const ButtonWrapper = styled.div`
    margin-top : 10px; 
`;

const LoginForm = ( ) => {
    <ButtonWrapper>
        <Button type='primary' htmlType='Submit' loding={false}> 로그인 </Button>
        <Link href='/signup'><a>회원가입</a></Link> 
    </ButtonWrapper>
}

```


### 사용법(antd 커스터마이징)

* 상단 Nav bar에 적용되어 있는 Antd를 Styled-Component를 활용하여 어떻게 커스터마이징 할까? 
1. `import styled from 'styled-components';`
2. `const 컴포넌트명 = styled(Input.Search)``;`
3. <컴포넌트명> </컴포넌트명>

`이전`
```
<Menu.Item>
    <Input.Search enterButton style={{ verticalAlign : 'middle'}}/>
</Menu.Item>
```


`적용 후`

```
import styled from styled-components;

const SearchInput = styled(Input.Search)`
    vertical-align : middle; 
`;

```

### styled-component 선택자
* Header 내부에 존재하는 요소들을 `& 선택자` 를 활용하여 스타일링을 구현한다. 

```
const Header = styled.header`
  height: 44px;
  background-color: white;
  position: relative;
  padding : 0;
  text-align: center;
  
  // styled-Component 선택자
  & h1 {
    margin : 0 ;
    font-size : 12px; 
    color: #333; 
    line-height : 44px;
  }
  
  & button {
    position : absolute;
    right : 0;
    top : 0;
    padding : 15px; 
    line-height: 14px;
    cursor: pointer;
  }  
`;
```

### createGlobalStyle 
* slick 에는 이미 정해져 있는 class들이 존재하고 이것들은 미리 스타일링이 되어 있다.
* 따라서, 미리 정해져 있는 스타일들을 변경해주어야 한다. (덮어쓰기)


```
import {createGlobalStyle} from 'styled-components';

const Global = createGlobalStyle`
  .slick-slide{
    display : inline-block; 
  }
`;
```

* `<Global>`은 아무데나 넣어주면 된다.

⭐따라서, `Global(전역 스코프)`이랑 `개별적인 Styled-Component(블록 스코프)` 랑 적절히 섞어서 사용하면 된다.


### ⭐ Styled-Components는 페이지를 렌더링 할 때 적용이 안될 때가 많다? 
- Styled-Component는 현재 SSR(서버사이드 렌더링)을 설정을 안해주었기 때문에
적용이 안되고 있는 것