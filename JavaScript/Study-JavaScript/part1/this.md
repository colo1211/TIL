# Part 1

## this 란?

> 1. window <br/>
: 그냥 쓰거나 일반 함수 안에서 쓰면 window 객체
   * window : 모든 전역변수, 함수, DOM을 보관하고 관리하는 전역객체 (수납 공간)
   
```
  console.log(this); // window
  
  function 함수() {
    console.log(this); // window 
  }
  함수();
```

> 2. 오브젝트 내의 함수(메소드) 안에서 쓰면, 그 함수(메소드)를 가지고 있는 오브젝트를 뜻함
* this : 메소드의 주인님

```
  var obj = {
    data: 'Kim',
    함수: function () {
      console.log(this);
    },
  };
  obj.함수();
```

![image](https://user-images.githubusercontent.com/63600953/190944900-8f48862c-9c52-40d4-af10-7b543620e9cf.png)


* 결과
  
  ![image](https://user-images.githubusercontent.com/63600953/190944616-aa6fc333-f4de-46fa-89dc-8603bbba9224.png)


예제)

```
  var obj2 = {
    data: {
      함수: function () {
        console.log(this);
      },
    },
  };
  obj2.data.함수();
```

* 결과
  
![image](https://user-images.githubusercontent.com/63600953/190945098-02ae9f56-1062-48b3-8d51-36abd2ccac6d.png)


⚠ 주의
```
this 를 사용할 때
- 기존 함수 문법 function을 쓸 때는 메소드를 포함하고 있는 상위 객체를 나타낸다.
- Arrow 함수를 사용하면 this 값은 함수 밖에 있을 때와 동일하게 `window` 를 나타낸다.  
```

#### ⚠ 사실 this의 첫번째, 두번째 의미는 비슷한 맥락, `자신 포함 상위 객체`

함수나 변수를 전역공간에서 만들면 window 객체 (전역 객체)에 보관된다.

아래 두개의 문법은 동일한데
```
함수();
window.함수(); 
```

window 객체 내부에 함수와 변수는 저장되기 때문이다. 
```
window: {
    함수(){
        console.log(this);
    }
}
```

따라서, 메소드를 담고있는 객체인 window 를 출력하는 것

> 3. constructor (생성자) 내에서의 this

새로운 객체를 생성하는 기계, `Contructor` 내부에서 사용되는 this <br/>
: 새로 생성될 객체를 가리킨다. 

```  
// 새로운 객체를 생성하는 기계 (오브젝트 생성 기계, constructor)
  function machine() {
    this.이름 = 'Kim';
  }

var obj3 = new machine();
```


> 4. 이벤트 리스너 내부에서의 `this` = `e.currentTarget`

```
<button id="버튼">클릭</button>

<script>
  document.getElementById('버튼').addEventListener('click', function () {
      console.log(this);
   });
</script>
```

지금 이벤트가 동작하는 곳이 결과값으로 나오게 된다.

![image](https://user-images.githubusercontent.com/63600953/190951717-b7eaa3cb-c54e-4a1c-aca8-7c1b307d8a00.png)


문제 1) <br/>
콜백함수는 그냥 함수 안에 파라미터역할로 들어가는 일반 함수이므로, 어느 객체에도 속하지 않는 일반 함수. <br/>
따라서, window 객체가 출력된다. 

```
document.getElementById('버튼').addEventListener('click', function(e){
  var 어레이 = [1,2,3];
  어레이.forEach(function(){
    console.log(this)
  });
});
```

문제 2) <br/>
객체 내부의 메소드이긴 하지만 콜백함수로 사용되었으므로 일반함수 <br/>
따라서, window 객체가 출력된다. 

```
var 오브젝트 = {
  이름들 : ['김', '이', '박'];
  함수 : function(){
      오브젝트.이름들.forEach(function(){
        console.log(this)
      });
  }
}
```

문제 3) ⭐ Arrow Function 
* Arrow Function은 위에있는 this 값을 그대로 물려받는다. <br/>
  `내부의 this 값을 변화시키지 않아서 외부의 this 값을 그대로 사용 가능`
* 따라서, 오브젝트 객체가 출력된다. 
```
var 오브젝트 = {
  이름들 : ['김', '이', '박'];
  함수 : function(){
      오브젝트.이름들.forEach(()=>{
        console.log(this)
      });
  }
}
```

