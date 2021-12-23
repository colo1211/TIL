# Rubminds WEB-Project Git Flow Rule 

* 참고 Ref </br> 
: https://github.com/minibeit/minibeit/wiki/Git-Flow

### 1. 개발하고 싶으면 우선 issue를 만들기

* issue 를 만드는 이유 : branch를 질서있게 만들기 위함. 내가 특정 기능을 개발하고 싶을 때 이슈에서 자동으로 생성되는 issue #number로 브랜치를 생성하여
그 branch 내부에서 기능을 구현한다. 
  
1. 
![image](https://user-images.githubusercontent.com/63600953/141136341-89d1ad42-0c4b-40d5-b3aa-ecdb658b045c.png)

2. 
![image](https://user-images.githubusercontent.com/63600953/141141912-88d09082-4a73-417f-bb55-bb9f85a5c840.png)

* 자동으로 생성되는 #16 번호를 활용하여 `feature/14`로 브랜치를 새로 파서 그 브랜치 내부에서 기능 개발을 수행한다. 
* label 에서는 현재 이슈에서 어떤 일을 하고있는지 알려주는 상태 메세지 정도로만 일단 이해하자. 

### 2. issue를 통해 만들어진 #Number 를 통해서 새로운 branch를 생성한다. 

* 우리 프로젝트 브랜치 만드는 방식 
: `feature/#이슈 번호`

참고) 현재 존재하는 branch 명 확인해보기
```
> git branch
```

* new branch 생성
```
> git branch feature/14
```

* new branch 생성 후, 그 브랜치로 전환

```
> git checkout feature/14
```

* Local 에 존재하는 폴더내에서 기능 개발을 한 후,

### 3. git add .

### 4. git commit -m "`feat: ~~~기능을 구현 해 보았음(#issue Num)`"

* 여기서 Commit Message를 feat: ~~~ 하는 이유 </br> 
: 최초에 생성하였던 이슈를 확인할 수 있는 링크가 주어진다.

![image](https://user-images.githubusercontent.com/63600953/141147256-f50a7e17-34d7-43e9-8f56-c543c5d6a4e1.png)


### 5. git push origin feature/브랜치명

```
git push origin feature/14
```

### 6. PR & Merge
![image](https://user-images.githubusercontent.com/63600953/141147498-9b474e04-03dd-4ab4-95bc-b1c51a1c5f7f.png)

