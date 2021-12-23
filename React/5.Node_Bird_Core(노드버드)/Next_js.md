# Next.js

* 서버 사이드 렌더링 ( SSR ) 에 최적화 된 리액트를 사용한 프레임워크
* 갖춰진 것은 많지만 코딩의 자유도는 줄어든다. 

### 전통적인 서버사이드렌더링 ( SSR ) 방식
* 크게 한번 순환하며 도는 방식
* 일자순서 로 진행
* 장점 : 전체 화면이 한번에 그려진다. 
* 단점 : 과정이 길기 때문에 로딩 속도가 매우 길어진다. 

![image](https://user-images.githubusercontent.com/63600953/137443225-430bbc8c-87f2-471d-89a4-e212aad11cd0.png)


### ⭐ CSR (Client Side Rendering) 방식 
* SPA (싱글페이지 어플리케이션)
* `컴포넌트만 바꿔치기` : 페이지가 실제로 넘어가는 것 처럼 눈속임을 해주는 방식 

![image](https://user-images.githubusercontent.com/63600953/137444337-dea022be-e130-425e-9f96-33d967aa75bb.png)

1. 브라우저가 요청을 보내면 프론트 서버는 그에 해당하는 HTML, JS 정도를 브라우저에게 내어준다. 


2. 브라우저에서는 데이터가 없으므로 프론트에서 `로딩창`을 띄워준다.
   
    * 사용자는 로딩창이 하나 있는 것만으로도 안정감을 가진다. 만약, 로딩창이 없으면 그냥 나가버릴것임. 
    * 사용자와 빠른 인터랙션
    * 단점 
      * `검색엔진이 방문했을 때 보여지는 것이 로딩창 밖에 없으면 검색엔진에서 순위가 확 떨어질 수 있다.` 
      * 구글 검색엔진은 로딩창이 SPA임을 알아채고 기다리는데 네이버는 로딩창 밖에 없는 줄 알고, 사이트가 미완성인 줄 알고 페이지를 떠나버림
    


3. 브라우저가 백엔드 서버에게 데이터를 요청한다. 


4. 백엔드 서버가 브라우저에게 데이터를 내어주고 데이터를 포함한 화면을 그린다. 

단점 해결법 
1. 검색엔진을 위해서 `server side rendering` </br> 
   : 첫 방문만 전통적인 방법(SSR)으로 진행하고 그 다음 페이지 전환은 SPA (Single Page Application) 방식, React방식을 채택
   

2. 방문한 페이지에 대한 컴포넌트만 내어주는 `코드 스플릿팅`, 원래는 하나를 요청하면 요청하지도 않은 페이지에 대해서도 가져온다. `코드 스플릿팅` 을 하면 이를 해결 </br>

```
⭐⭐⭐⭐⭐ Server Side Rendering 과 코드 스플릿팅은 무조건 적용이 되어야 한다. 
```
---

## Next.js 

### 특징
#####  1. 첫 방문만 전통적인 방법(SSR)으로 진행
* 처음 로딩(새로고침, URL 입력해서 들어왔을 때)때는 로딩창 없이 바로 데이터가 띄워진다. 
  
##### 2. 사이트 내의 링크를 통해 다음 페이지 전환은 SPA (Single Page Application) 방식, React방식을 채택
* 사이트 내 링크 같은 것을 누르면 잠깐 로딩창이 뜬 이후에 데이터가 띄워진다.

### next.js 설치

1. pakage.json 생성
```
> npm init 
```

2. next.js version 9 설치 
```
> npm i next@9
```

### 파일 구성 및 주의사항

1. next는 JSX를 사용하기 위해서 맨 상단에 `import React from 'react'`를 하지 않아도 된다.
   
![image](https://user-images.githubusercontent.com/63600953/137450311-18b9d650-87e8-4fb9-a603-f53d1422a6fe.png)


2. ⭐⭐⭐⭐⭐ next는 `pages` 폴더를 인식해서 내부에 있는 파일들을 자동으로 인식해서 개별적인 page 컴포넌트로 만들어준다(코드 스플릿팅).

![image](https://user-images.githubusercontent.com/63600953/137450165-e365ef39-8336-4b03-a7fa-25c487cce9eb.png)

### next 실행
1. package.json 에서 scripts를 설정한다.
![image](https://user-images.githubusercontent.com/63600953/137451343-8ff23f52-9660-43be-87e3-881ce837ce44.png)



2. 명령어 창에서 `npm run dev`해준다. 
```
> npm run dev
```

### server 를 실행 한 이후에 컴포넌트를 생성 
: 새로 만들어진 component를 인식하지 못한다. </br> 
따라서, 서버를 껐다가 다시 실행해준다. 

---

## Next.js Routing
* `create-react-app` 을 했을 때는 `react-router` , `react-router-dom`을 설치해야 했지만 
Next.js 에서는 Routing 방법이 간편하다. 


#### pages 폴더에서 자동 라우팅
* ⭐⭐⭐⭐⭐무조건 이름을 pages 로 해야 적용된다.⭐⭐⭐⭐⭐⭐

![image](https://user-images.githubusercontent.com/63600953/137459113-dd82c293-c486-4a64-adc8-e2deae0a5a6a.png)

* 다음과 같은 방법으로 `pages` 폴더 내에 컴포넌트를 생성하면 자동으로 라우팅이 된다. 
* index.js 는 메인 Component, 각각의 Component는 `/profile`, `/signup`, `/about/kyungwon` 으로 URL에서 처리된다. 

참고) 페이지들이 아닌데 컴포넌트인 요소들을 관리하기 위해서 `components 폴더`를 만든다.

![image](https://user-images.githubusercontent.com/63600953/137459770-f2b21cb6-ed77-4380-92cf-677aeb10cda6.png)

#### ⭐⭐⭐⭐⭐ _app.js
* 레이아웃을 위한 `파일을 Next 가 지정해 놓았다.` pages 폴더 안에 _app.js 라고 파일을 생성한다. 모든 js 파일이 _app.js를 부모 컴포넌트로 인식한다.

![image](https://user-images.githubusercontent.com/63600953/137573498-3621c826-04c1-462f-822a-f5fee9e8047c.png)

* _app.js 는 pages/components의 공통 부분
* _app.js를 사용하게 되면 자연스럽게 pages 내부에 있는 컴포넌트들이 `부모 컴포넌트`라고 인식하게 된다.
* antd는 원래 모든 컴포넌트에 하드코딩하여서 모두 적용해야 한다. 하지만, 이를 적용하기 위해서 부모 컴포넌트인 `_app.js`에 넣어준다.

```
import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import 'antd/dist/antd.css';

const NodeBird = ({ Component }) => {
    return (
        <>
            <AppLayout>
                <Component />
            </AppLayout>
        </>
    );
}

export default NodeBird;
```

#### import Link from 'next/link'
* next.js 에서는 react-router를 사용하지 않고 자체적인 라우터를 사용한다.
* 공통 메뉴로 사용하고 있는 `AppLayout.js`에서 Routing 을 진행하면 된다. 
```
import Link from 'next/link'

<Link href='/'><a>노드버드</a></Link>
<Link href='/profile'><a>프로필</a></Link>
<Link href='/signup'><a>회원가입</a></Link>
```
⚠ 주의 할 점 : `href` 를 `<a>` 태그의 속성으로 사용하면 안되고 `<Link>`태그의 속성으로 사용하여야 한다.

---

## PropTypes

* 폴더 구조 </br> 
: 현재 모든 컴포넌트에 공통적으로 적용시키기 위한 `components/AppLayout.js` 에 부모 컴포넌트를 생성하였다.

![image](https://user-images.githubusercontent.com/63600953/137463117-6709cd2a-705d-4eb0-96e2-37e662484d94.png)

`AppLayout.js`
* pages 폴더 내에 있는 모든 컴포넌트를 `children(컴포넌트) props` 로 받아서 띄워주는 역할을 진행한다. 

![image](https://user-images.githubusercontent.com/63600953/137463502-80420ea8-fdd2-4651-8a28-f97bbbd1050d.png)

이 때, props의 Type을 검사해줄 수 있는 도구를 사용한다.
(TypeScript를 사용하면 이를 사용할 필요가 없음)

#### PropTypes 적용 과정
1. 설치 
```
> npm i prop-types
```

2. import
```
import PropTypes from 'prop-types'; 
```

3. 타입 정의

```
AppLayout.propType = {
    children : PropTypes.node.isRequired, 
    // node는 화면에 그릴수 있는 모든것을 의미
    // required는 필수적으로 있어야 한다는 의미
};
```

4. AppLayout.js (부모 컴포넌트) index.js (자식 컴포넌트) 적용
   
![image](https://user-images.githubusercontent.com/63600953/137464554-95e747ee-f69c-414f-ab9b-cddcc9a31d90.png)

--

## 컴포넌트 내에 <Head> 를 사용하고 싶을 때

1. 
````
import Head from 'next/Head' 
````

2. 컴포넌트에 `<Head> </Head>` 를 사용하면 된다. 

--
## href 새창에서 띄우기 
* target = '_blank'
* rel = 'noreferer noopener' `=> ` 보안의 위협을 막아 줄 수 있다. 

```
<a href ='#' target='_blank' rel='noreferer noopener'> 링크 </a> 
```