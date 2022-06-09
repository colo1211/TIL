# useState 동기적 처리

useState를 사용한다면, 한 컴포넌트 내에서 리렌더링 될 때마다 state를 변경해준다. 

* smulo 프로젝트를 개발하면서, 무한 스크롤을 개발해야 하는 상황에 놓였고, 유저가 스크롤을 아래로 닿을 때 마다 
새로운 데이터를 요청해서 나는 dispatch를 계속해서 해야 하는 상황에 놓였다. 


API 구조는 이런식이다.   
```
?page='페이지 넘버'&size='한번에 요청할 갯수'&placeId='장소id'&date='날짜'
```

page 정보는 `useState` 로 관리하고 있었고, useState는 비동기적으로 state를 업데이트 한다는 사실을 이전부터 알고 있었지만, 
어떻게 동기적으로 변경할 수 있는지는 알지 못했었다. 

⭐⭐⭐⭐⭐ 답은 `useState의 변경함수내에 return` 이다.

```
setPage((prev) => { return prev + 1 });
```


계속해서 에러났던 코드이다. page State는 업데이트 되지 않았고, 계속해서 `page=1`에서 변경되지 않고 있었다. 
* `setPage(page+1)` 에서는 비동기로 처리되고
* dispatch 로 바로 넘어가기 때문이었다. 
```
const [page, setPage] = useState(1); 
.
.
.
.
.
if (!taxiPartyEnd && !taxiPartyListLoading) {
    setPage(page+1); // 변경하고
    dispatch( // dispatch 하길 원했다. 
        getTaxiPartyList({
            page,
            size: 10,
            placeId,
            date,
        }),
    );
}
```

해결 이후 코드이다. 
* setPage 함수 내에서 변경을 원하는 값을 return 시켜준다. 
* 이후 useEffect 에 page state에 대한 의존성을 주입시켜 즉각적으로 dispatch가 실행되게 변경하니 코드가 잘 작동되었다. 
```
const [page, setPage] = useState(1); 
.
.
.
.
.
useEffect(() => {
    dispatch(
        getTaxiPartyList({
            page,
            size: 10,
            placeId,
            date,
        }),
    ); // 다 내리면 새로운거 로딩
}, [page]);
.
.
.
.
.
if (!taxiPartyEnd && !taxiPartyListLoading) {
    console.log('taxiPartyEnd, taxiPartyListLoading 문제');
    setPage(prev => {
        return prev + 1;
    });
}
```
