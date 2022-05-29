# Infinite Scroll 


### 1. Vanilla JS로 구현

`목표`
1. 높이(height) 가 정해져 있는 `div` 요소를 두 개 만든다.

2. 스크롤을 내릴 때 마다, 만들어 놓은 `div` 와 동일한 `div` 가 생겨나도록 할 것!
`=>` 똑같은 박스들이 반복하여 생겨난다. 
   
####  무한스크롤을 구현하기 위해서 사용할 객체의 속성 3가지 

1. `window.innerHeight` => 보고있는 부분의 총 height (고정된 값)

    * 브라우저에서 실제로 표시되고 있는 영역의 높이
    * 사용자가 실제로 보고있는 영역의 높이


2. `window.scrollY` => 0부터 시작해서 얼마나 마우스 내렸는지 px (변경되는 값)
    * 스크롤이 세로로 얼마나 이동했는지를 px 로 나타낸다. 
    * 0부터 시작해서 스크롤을 내릴수록 증가하는 값
    

3. `document.body.offsetHeight` => 모든 컨텐츠들의 height 총 합 (고정된 값)
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

### 2. Infinite Scroll - 리액트로 구현 
* redux-saga 를 통한 무한 스크롤 하는 방법

`loadPostRequests()` 액션 생성 함수를 호출하면 게시물을 가져오는 로직


1. Home Page에서 컴포넌트가 마운트 되면 우선 정보를 한번 가져온다. 
   * 무한 스크롤 하지 않아도 기존에 있어야 하는 정보가 필요하기 때문
   * 처음에는 데이터가 비어있다. 
   
* Home.jsx
```
useEffect(()=>{
   dispatch(loadPostRequest()); 
},[]);

// 처음에는 게시글이 비어있을 것임
const {mainPosts} = useSelector((state)=> state.post);
return(
   <>
      {mainPosts.map((post)=> <PostCard key={post.id} post={post} />)}
   </>
) 
```


2. 데이터를 불러와서 전역적으로 관리하는 역할
* reducer/post.js

```
initialState = {
   mainPosts = [];
   hasMorePosts : true;  // hasMorePost 가 false 면 가져오려는 시도 X, 초기에는 true
   loadPostsLoading = false; 
   loadPostsSuccess = false; 
   loadPostsFailure = null; 
}

switch (action.type) {
   case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null; 
      break;  
   case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = action.data.concat(draft.mainPosts); // 응답 이후, 기존에 있던 것과 합치기
      draft.hasMorePosts = draft.mainPosts.length < 50; // 50개 보다 적으면 true, 많으면 false(더이상 안가져오겠다. 50개까지만 로딩)
      break; 
   case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break; 
}
```

* saga/posts.js
```
하던 대로 그대로
```

3. 스크롤이 아래로 내려질 때마다, 데이터 가져오기 

* 주의 할 것! 
   * useEffect에서 window.addEventListener 할 때 주의해야 할 점 : 
   `return () => window.removeEventListener` 해줘야 한다. <br/> 
     안하면 메모리에 쌓여있는다. 
     
    
* 얼마나 위에서 부터 내렸는지 px 값: `window.ScrollY`
      
* 현재 유저가 보고있는 윈도우 창의 Height: `document.document.clientHeight` 

* 현재 있는 모든 요소들의 총 Height : `document.document.scrollHeight`

* Home.jsx
```


// 처음에는 게시글이 비어있을 것임
const {mainPosts} = useSelector((state)=> state.post);
const {hasMorePosts} = useSelector((state)=> state.post);


// 처음 데이터를 불러오는 로직
useEffect(()=>{
   dispatch(loadPostRequest()); 
},[]);

// 스크롤이 내려갈 때마다 데이터를 불러오는 로직
useEffect(()=>{
   function onScroll(){
      console.log(
      '얼마나 위에서 부터 내렸는지 px 값', window.ScrollY, 
      '현재 유저가 보고있는 윈도우 창의 Height: ', document.document.clientHeight, 
      '현재 있는 모든 요소들의 총 Height', document.document.scrollHeight
      ); 
      if (window.scrollY + document.document.clientHeight === document.document.scrollHeight){
        if(hasMorePosts) { 
            dispatch(loadPostRequest()); // 다 내리면 새로운거 로딩
        }
      }
   }
   window.addEventListener('scroll', onScroll);
   return ()=>{
      window.removeEventListener('scroll',onScroll); 
   } 
},[hasMorePosts]);


return(
   <>
      {mainPosts.map((post)=> <PostCard key={post.id} post={post} />)}
   </>
) 
```

⭐ 실무에서는 완전히 아래까지 내리기 이전에 로딩을 해주는 로직을 추구한다. 

1. 조건문을 바꾼다. 전체 콘텐츠 화면의 300px 위에까지 왔을 때, 데이터를 로딩

```
if (window.scrollY + document.document.clientHeight > document.document.scrollHeight - 300){
        if(hasMorePosts) { 
            dispatch(loadPostRequest()); // 다 내리면 새로운거 로딩
        }
      }
```

* 문제점 : `document.document.scrollHeight - 300` 보다 값이 클 때, 여러번 dispatch 하게 된다. 

2. saga에서 해결해준다. 

* 1. throttle 을 사용
    * 5초 동안은 다른 request들을 모두 무시하도록 설정
    ```
    function* watchLoadPosts(){
        yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    }
  ```
  
[문제점] : 5초는 지키지만, 앞에 요청들을 취소해 주지는 않는다.
=> 응답을 차단하는 것이지, 요청을 차단시켜주지는 못한다. 

* 2. loadPostsLoading 을 통해 조작하여 한번의 요청만 보낸다. 

    * loading이 아닐때만 실행한다. 
    * loading이 true이면 이미 한번 요청이 가고 있는 상태니까, loading 을 활용하여 한번의 요청만 보낸다. 
    
```
if (window.scrollY + document.document.clientHeight > document.document.scrollHeight - 300){
        if(hasMorePosts && !loadPostsLoading) { 
            dispatch(loadPostRequest()); // 다 내리면 새로운거 로딩
        }
      }
```
### 3. Reverse Infinite Scroll 
* 채팅 무한 스크롤을 구현하기 위한 리버스 인피니트 스크롤링

참고) [리버스 인피니트 스크롤링](https://velog.io/@heyoon/%EC%97%AD%EB%B0%A9%ED%96%A5-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84)


* 의사코드 
1. scrollTop = 0 이 되면, 현재의 scrollHeight 를 저장
2. 새로운 데이터를 불러온다.  `Redux-Saga` 
3. 새로운 데이터를 불러온 이후 <br/>
   ```
   (새로운 데이터를 불러온 후의 scrollHeight) - (데이터를 불러오기 이전에 저장했던 scrollHeight)
   ```
   의 값을 scrollTop에 넣어서 보고있던 스크롤 위치를 유지시킨다. 

![Whiteboard (4)](https://user-images.githubusercontent.com/63600953/170866288-e678d6cd-955f-4469-ad9a-6d3d7fd31dae.png)
