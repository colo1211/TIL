# Git Branch 없이 협업하기

### 브랜치를 몰라도 협업할 수 있을까? 
* Yes! But, 힘들고 섹시하지 않다. 

### 브랜치를 모르고 협업을 하는 경우는 노트북과 데스크톱 두개를 번갈아 가면서 쓰고있는 상황과 완전히 동일

A : 노트북 (컴퓨터 1) </br>
B : 데스크톱 (컴퓨터 2) 
* B는 github에 올려놓은 것을 최초에 1회 clone
* B는 A에게 push를 할 수 있는 권한을 받아야 한다. A의 github에서 `Manage Access > Invite Collabolator`에 들어가서 설정

상황 1. </br> 
A와 B가 협업을 하고 있고, A는 현재 a,c를 커밋한 상태이고 이를 깃허브에 올림. 
B는 최초 1회에 한하여 A가 github에 올린 것을 clone 하였음. 

![image](https://user-images.githubusercontent.com/63600953/135194443-50eb3012-b597-48b1-b4c6-0d07283971d0.png)


상황 2. </br>
A가 d커밋 후 push를 완료한 상황, B가 q커밋 후, push하려는 상황. 
이 때, github에서는 B 컴퓨터가 `push한 내용을 거절한다.`
새로운 커밋 d와 q가 동시에 커밋되면서 발생하는 일

![image](https://user-images.githubusercontent.com/63600953/135194744-6d3f2d23-6d3a-472f-a2bd-5a5f69001fa6.png)

상황 2 해결. </br>

영리한 git 이 이를 해결해준다. B는 A에서 업데이트 한 내용이 있는지 커밋을 하기 전에, 항상 github으로 부터 pull을 받아온다면,
d와 q를 순서대로 정리해서 커밋해준다.

`즉, 항상 commit 을 하기 이전에 github으로부터 항상 pull을 받아온다면 git이 알아서 자동으로 차례대로 commit 순서를 배정해줌`
![image](https://user-images.githubusercontent.com/63600953/135195171-e8f0ae8e-ffae-43a1-9609-96814f754d57.png)

상황 3. </br> 
서로 다른 파일에서 작업을 했다면 커밋의 순서가 뒤죽박죽이어도 pull을 받아온다면 아무런 문제가 없지만
`만약` 서로 같은 파일의 같은 라인을 건들였다면, `conflict(충돌)` 라는 문제가 발생한다. 

#### Conflict가 발생했다면 A와 B가 서로 같은 줄에 같이 겹쳤기 때문에 Editor 상에 어떤 내용으로 할지 둘중에 하나만 선택하라고 뜬다. 가서 하나의 내용만 선택해주면 Conflict가 해결된다. 이후 다시 `git add .` `git commit -m`한다.

이 방법이 불편하기 때문에 `Branch` 라는 개념이 탄생하게 된 것이다. 
