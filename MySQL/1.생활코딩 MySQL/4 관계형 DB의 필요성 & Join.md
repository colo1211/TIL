# 4. 관계형 DB의 필요성 & Join

## 관계형 데이터베이스의 필요성

- **Topic 테이블**

![Untitled](https://user-images.githubusercontent.com/63600953/108945664-5b16d500-76a0-11eb-9b08-3c2241657493.png)

: 기존에 만들었던 Topic 테이블, author과 profile의 내용이 중복되어 있음을 확인 할 수 있다. 

만약, 저기 있는 테이블의 record가 1억개라고 가정, author 가 egoing인 이름들을 모두 egoing2라고 변경하라고 하면 엄청난 노가다 작업이 필요 할 것 이다. 

→ author 과 profile 이 겹치는 내용들을 따로 분리하여 작성하면 중복을 줄일 수 있다. 

- **author 테이블**

![Untitled 1](https://user-images.githubusercontent.com/63600953/108945712-741f8600-76a0-11eb-9edb-a32c015e6744.png)

: 중복되는 내용들을 모두 빼서 다른 테이블에 관리 

- **topic 테이블(author 테이블 해당 내용 제거)**
  ![Untitled 2](https://user-images.githubusercontent.com/63600953/108945735-800b4800-76a0-11eb-9aad-d3a6eb23f79c.png)

: author_id를 두어서 중복되는 내용들을 일괄적으로 관리 

분리된 두 테이블을 가지고 하나의 합쳐진 내용(TOPIC) 으로 보여지게 할 수 있을까? 

→ JOIN을 활용한다. 

```sql
SELECT * 
FROM author LEFT JOIN topic 
ON author.id = topic.author_id; // 조건
```

> **중복된 데이터를 효율적으로 관리할 수 있고, 필요할 때 두 테이블을 합쳐서 읽을 수 있으므로 관계형 DB가 필요하다.**

## JOIN

: 중복되는 데이터를 또 하나의 테이블을 생성하여 중복을 제거하고, 필요 시에 합치는 기술 

```sql
SELECT * 
FROM author LEFT JOIN topic 
ON author.id = topic.author_id; 
```

**: [author](http://author.id) 테이블의 id와 topic 테이블의 author_id 가 같은 것을 합쳐서 보여줘!**
![Untitled 3](https://user-images.githubusercontent.com/63600953/108945779-91eceb00-76a0-11eb-8da4-0a1d45466791.png)

⇒ [author.id](http://author.id) 와 그 오른쪽의 id는 JOIN을 위한 조건이므로, 안보이게 설정

```sql
select topic.id AS topic_id, title, description, created, name, profile 
from author left join topic 
on topic.author_id = author.id;
```

### LEFT JOIN

LEFT JOIN은 첫 번째 테이블을 기준으로, 두 번째 테이블을 조합하는 JOIN입니다.

이때 ON 절의 조건을 만족하지 않는 경우에는 첫 번째 테이블의 필드 값은 그대로 가져옵니다.

하지만 해당 레코드의 두 번째 테이블의 필드 값은 모두 NULL로 표시됩니다.

### 문법

```sql
첫번째테이블이름 LEFT JOIN 두번째테이블이름
ON 조건
```

→ ON 절에서는 WHERE 절에서 사용할 수 있는 모든 조건을 사용할 수 있다

다음 예제는 Reservation 테이블의 Name 필드를 기준으로 Customer 테이블의 Name 필드와 일치하는 레코드만을 LEFT JOIN으로 가져온 후, 그 중에서 ReserveDate 필드의 값이 2016년 02월 01일 이후인 레코드만을 선택하는 예제입니다.

### 예제

```sql
SELECT *
FROM Reservation
LEFT JOIN Customer
ON Reservation.Name = Customer.Name
WHERE ReserveDate > '2016-02-01';
```
![Untitled 4](https://user-images.githubusercontent.com/63600953/108945805-9fa27080-76a0-11eb-9be6-448c6656bf1f.png)

## AS

: 테이블 상에 띄우고 싶은 이름을 AS 옆에 작성하면 된다. 

topic.id AS topic_id 

 AS **'띄우고 싶은 이름'**
 ![Untitled 5](https://user-images.githubusercontent.com/63600953/108945830-ad57f600-76a0-11eb-8be9-30b1c65f98e3.png)

---

## Internet & Database

**Database Client ↔ Database Server**
![Untitled 6](https://user-images.githubusercontent.com/63600953/108945866-bd6fd580-76a0-11eb-8c3c-0c04ebad0bad.png)

### Database Client

- **MySQL Monitor (CLI)**

→ 명령을 이용하여 제어 GUI X 

- **MySQL Work Bench (GUI)**

→ 명령어, GUI O, 마우스로 조작 가능