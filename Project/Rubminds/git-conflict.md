# error: Pulling is not possible because you have unmerged files.

Rubminds 프로젝트를 진행하는 중, 윤석님은 LP 를 branch feat/2 에서 개발 중이셨다. 이를 develop branch 에 머지하셨고 나에게 PR 요청을 날려주셔서 나도 approve하였다.

나는 이때 feat/6에서 회원가입 페이지를 작성하는 중이라 우선 develop branch 에 올라간 내용들을 모두 pull 받아야 하는 상황이었다.

하지만 그때!

![image](https://user-images.githubusercontent.com/63600953/141889524-0aeef9e1-d8fe-40c1-95dc-94138de13144.png)

`error: Pulling is not possible because you have unmerged files.`

다음과 같은 에러가 떴다.

윤석님과 나의 파일 중에 같이 손을 대어서 이 중에 중복이 발생한 경우인 것 같았다.

이 때 해결 방법

1. git status 로 충돌된 파일에 대해서 빠르게 추려낸다.

- 범인은 `both modified (동시수정) : ` 이다.

![image](https://user-images.githubusercontent.com/63600953/141890113-0ff8797e-efef-41ff-8b41-56b8526118fd.png)

2. 충돌 나는 부분을 파일로 이동해서 삭제한다.

3. 해결 한 이후에 add - commit - push 한다.
