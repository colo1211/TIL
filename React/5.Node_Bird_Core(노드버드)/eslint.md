# eslint

: 코드를 깔끔하게 하기 위한 일종의 규칙

장점 

: 여러 사람이 코딩하더라도 한 사람이 코딩한 것 처럼 적용된다. (규칙이 생긴다) </br></br>
ex) 세미콜론을 붙이는 개발자, 안붙이는 개발자 

### 설치 
1. 
* -D 는 개발용 모드, 코드 깔끔하게 적용하는 것은 사용자와는 관계가 없기 때문에 `개발자 모드`로 설치한다. 
```
> npm install eslint -D
```

2. 
```
> npm install eslint-plugin-import -D
```

3. 
```
> npm install eslint-plugin-react -D
```

4. 
```
> npm install eslint-plugin-react-hooks -D
```

![image](https://user-images.githubusercontent.com/63600953/137474567-c99b9f2a-a49a-4f9f-9563-9bf30e661fff.png)


---

### 적용

front 폴더에 `.eslintrc` 파일을 생성한다. (확장자 X)
* 파일명 앞에 .을 붙이면 숨김 파일이라는 의미
* .json 파일이기 때문에 json 형식에 맞추어서 규칙을 입력


```
{
    "parserOptions" : {
        "ecmaVersion" : 2020, 
        "sourceType" : "module", 
        "ecmaFeatures" : {
            "jsx" : true
        }
    },
    "env" : {
        "browser" : true, 
        "node" : true,
        "es6" : true
    },
    "extends" : [
        "eslint : recommended", 
        "plugin : react/recommended"
    ],
    "plugins" : [
        "import", 
        "react-hooks"
    ],
    "rules" : {
        
    }
}
```

### VSCode에 ESlint 적용

https://whitekiwi.medium.com/vscode-eslint-%EC%9E%90%EB%8F%99-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-fe1fd7e11928