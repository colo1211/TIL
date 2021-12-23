# React-Slick

* 이미지 캐러셀(회전목마)를 구현하기 위한 리액트 라이브러리
* 참고 : https://codesandbox.io/s/ppwkk5l6xx?file=/index.js&resolutionWidth=320&resolutionHeight=675

![image](https://user-images.githubusercontent.com/63600953/138258392-7a080408-4c3c-484f-992e-0454b7c09e28.png)



`설치` 
```
> npm install react-slick
```

`폴더 위치`
1. components 폴더 내에 imagesZoom 폴더를 생성
2. imagesZoom 폴더 내에 index.js 파일을 생성

![image](https://user-images.githubusercontent.com/63600953/138258746-3486dfc7-dbd0-4a30-bf5a-ac96261dc25b.png)

##### 폴더로 빼놓은 이유
* index.js (slick 구현 파일)에는 styled Component가 많이 적용 될 예정이다.
  꽤 많은 Styled-Components를 분리하기 위해서 폴더내에 생성

`imagesZoom/styles.js`
```
import styled , {createGlobalStyle} from 'styled-components';
import {Button} from "antd";

export const Overlay = styled.div`
  position : fixed;
  z-index : 5;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0; 
`;

export const Header = styled.header`
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
  
`;

export const CloseBtn = styled(Button)`
  position : absolute;
  right : 0;
  top : 0;
  padding : 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height : calc(100% - 44px); 
  background-color: #090909;
`;

export const ImageWrapper = styled.div`
  padding : 32px; 
  text-align: center;
  
  &img {
    margin : 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
  text-align: center;
  
  & > div {
    width : 75px;
    height : 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: #313131;
    display: inline-block;
    text-align: center;
    color : white;
    font-size : 15px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display : inline-block;
  }
`;
```

* 이미지를 클릭했을 때 캐루셀
`imagesZoom/index.js`


* `initialSlide = {0}` </br> 
: 첫번째 이미지를 무엇으로 할 지? 
  

* `afterChange ={(slide) => setCurrentSlide(slide)}` </br>
: 현재 slide가 몇 번째 slide 인지는 state로 저장을 해두어야 한다.
  slick 라이브러리에서 번호를 준다. 
  
* `infinite` </br> 
: 무한반복
  
* `arrow = {false}`</br> 
: 캐러셀에서 화살표를 제거, 드래그로만 넘기게끔 처리

* `                    slidesToShow = {1}
  slidesToScroll = {1}`
  
    : 한번에 하나씩만 보이고 한번에 하나씩만 넘길수 있게 처리

```
import Slick from 'react-slick';
import {useState} from 'react'; 

const ImagesZoom = ({ images, onClose }) => {

    const [currentSlide, setCurrentSlide]= useState(0); 
    
    return (
        <div>
            <div>
                <Slick 
                    initialSlide = {0}
                    afterChange ={(slide) => setCurrentSlide(slide)}
                    infinite
                    arrows = {false}
                    slidesToShow = {1}
                    slidesToScroll = {1}
                >
                {
                    images.map((v)=>{
                        <div key={v.src}>
                            <img src= {v.src} alt= {v.src}/>
                        </div>
                    })
                }
                {/* 이러면 Slick 에서 자동으로 div들을 캐러셀로 만들어 준다. */}
                <Slick /> 
            </div>
        <div/>
    )
}
```

### 지정된 class들을 변경해야 적용된다. 
![image](https://user-images.githubusercontent.com/63600953/138579843-b9ea9981-b3a7-46f8-9036-a4b91182c124.png)

* slick 에는 이미 정해져 있는 class들이 존재하고 이것들은 미리 스타일링이 되어 있다. 
* 따라서, 미리 정해져 있는 스타일들을 변경해주어야 한다. 

#### styled-components에서 덮어 쓸 수 있도록 지원하는 문법을 사용하면 된다. </br> 
* Global 스타일(전역적인 Styled-Components)을 적용하면 된다. 

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

---

