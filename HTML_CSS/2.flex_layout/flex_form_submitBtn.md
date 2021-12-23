# display : flex; 

* CSS 레이아웃을 쉽게 해주고 반응형에 매우 적합한 레이아웃 방법
* 이전까지는 `float : left` 방법을 사용하였으나, 해당 방법을 알고 난 이후 이것만을 사용할 예정


### 폼 양식 오른쪽 밑에 버튼 추가하기 (레이아웃)

* 참고 레퍼런스
  : https://velog.io/@suld2495/display-flex-%EC%86%8D%EC%84%B1-%EC%9E%90%EC%8B%9D%EC%9A%94%EC%86%8C-%EC%9A%B0%EC%B8%A1-%EC%A0%95%EB%A0%AC

![image](https://user-images.githubusercontent.com/63600953/145363435-3fee2fb9-3617-4dcc-979b-d27dfe762cdf.png)

* 이를 구현하기 위해서는 Wrapper로 레이아웃을 차지하게 해주고 Wrapper에 `display:flex` 를 준다. 
* 이후, 왼쪽 취소 버튼에 `margin : auto 0 0 auto;` 를 주게 되면 요소들이 부모요소에 붙어서 반응형으로 하게 되어도 깨지지 않는다.  

`JSX`
```
        <S.BtnWrapper>
          <S.BtnLeft>취소</S.BtnLeft>
          <S.BtnRight onClick = {onSubmitHandler}>등록하기</S.BtnRight>
        </S.BtnWrapper>
```

`Styled-Components`

```
export const BtnWrapper = styled.div`
  margin-top : 8rem;  
  padding : 10px;
  display : flex; 
`;

export const BtnLeft = styled.button`
  width : 14rem; 
  height : 7rem; 
  font-size : 3rem;  
  border-radius: 2rem; 
  border : none;  
  margin : auto 0 0 auto;
`; 

export const BtnRight = styled.button`
  width : 26rem; 
  height : 7rem; 
  border : none;
  font-size : 3rem;  
  border-radius: 2rem; 
  background : #CDF6E8;
  margin-left : 3rem; 
`; 
```
