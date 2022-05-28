# Infinite Scroll 

### 1. Vanilla JS로 구현

`목표`
1. 높이(height) 가 정해져 있는 `div` 요소를 두 개 만든다.

2. 스크롤을 내릴 때 마다, 만들어 놓은 `div` 와 동일한 `div` 가 생겨나도록 할 것!
`=>` 똑같은 박스들이 반복하여 생겨난다. 
   
####  무한스크롤을 구현하기 위해서 사용할 객체의 속성 3가지 

1. `window.innerHeight` => 보고있는 부분의 총 height

    * 브라우저에서 실제로 표시되고 있는 영역의 높이
    * 사용자가 실제로 보고있는 영역의 높이


2. `window.scrollY` => 0부터 시작해서 얼마나 마우스 내렸는지 px
    * 스크롤이 세로로 얼마나 이동했는지를 px 로 나타낸다. 
    * 0부터 시작해서 스크롤을 내릴수록 증가하는 값
    

3. `document.body.offsetHeight` => 모든 컨텐츠들의 height 총 합
    * offsetHeight : 요소의 실제 높이
    * 요소의 실제 높이 = 보이는 영역 + 가려진 영역
    * 실제 모든 콘텐츠들에게 주어진 height 값을 모두 합친 값

![image](https://user-images.githubusercontent.com/63600953/170812356-ff4e7615-98e5-42a1-a7ea-92bbd4613e47.png)


⭐⭐⭐ 결론 <br />
화면에 표시되는 영역의 높이 (window.innerHeight) + 스크롤 값 (window.scrollY) > 콘텐츠 전체 높이 (document.body.offsetHeight)
이라면, 더 이상 내려갈 곳이 없다는 의미이다. 그때마다 새로운 요소를 추가하면 무한 스크롤을 구현 할 수 있다. <br/>
=> 더 이상 스크롤을 내릴 수 없다면, 요소를 추가하자

```
var count = 2;
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY + 1 >
          document.body.offsetHeight
        ) {
          var toAdd = document.createElement('div');
          toAdd.classList.add('box');
          toAdd.textContent = `${++count} 번째 블록`;
          document.querySelector('section').appendChild(toAdd);
        }
      };
```
