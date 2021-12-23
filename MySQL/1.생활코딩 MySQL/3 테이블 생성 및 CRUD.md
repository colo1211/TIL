# 3. 테이블 생성 및 CRUD

- 구글링 할 때, Cheat Sheet를 검색해서 '요약본'을 통해 확인 후 적용한다.

## 테이블 생성 (create)

```sql
CREATE TABLE topic(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR(15) NULL,
    profile VARCHAR(200) NULL,
    PRIMARY KEY(id)
   );
```

→ 이 작업은 표의 맨 위 특성 부분을 작성 한 것이다. (실제 데이터는 아직 없음)

## 테이블 형식 조회 (description)

```sql
DESC topic
```

→다음과 같이 어떤 자료형인지, Field에 대한 제약사항들이 조회된다. 

+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| title       | varchar(100) | NO   |     | NULL    |                |
| description | text         | YES  |     | NULL    |                |
| created     | datetime     | NO   |     | NULL    |                |
| author      | varchar(15)  | YES  |     | NULL    |                |
| profile     | varchar(200) | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

`Record들의 특성을 나타내는 Column들을 생성한 것!
`
- **형식**

**: CREATE TABLE '테이블 명'(**

칼럼 명, 데이터 타입, NULL/NOT NULL, [OPTIONS]

PRIMARY KEY(칼럼명)

); 

- **AUTO_INCREMENT**

: id를 입력할 때 마다 자동으로 1씩 증가 

---

## SQL 데이터 타입

→ 사용할 때 마다 구글링 해서 적정한 것 찾아보기 

### 숫자형 데이터 타입

INTGER

### 문자형 데이터 타입

CHAR(크기) , VACHAR(크기), TEXT(크기) 

### 날짜형 데이터 타입

DATE	날짜(년도, 월, 일) 형태의 기간 표현 데이터

TIME	시간(시, 분, 초) 형태의 기간 표현 데이터

DATETIME	날짜와 시간 형태의 기간 표현 데이터

---

# 테이블에 값을 CRUD

## Create (생성)

: insert into 테이블 명 values('값'); 

```sql
 INSERT INTO topic (title,description,created,author,profile)
 VALUES ('My SQL', 'My SQL is...',NOW(),'egoing','developer');
```

- title은 자동으로 부여되기 때문에 따로 입력 할 필요가 없다.

---

## Read (읽기)

: select (출력 틀) from (테이블) 

- *** (전체)**

```sql
SELECT * FROM TOPIC;
```

**: *은 전체 Column을 나타내는 기호**

+----+------------+------------------+---------------------+--------+--------------------------+
| id | title      | description      | created             | author | profile                  |
+----+------------+------------------+---------------------+--------+--------------------------+
|  1 | My SQL     | My SQL is...     | 2021-02-23 18:56:22 | egoing | developer                |
|  2 | Oracle     | Oracle is...     | 2021-02-23 18:58:55 | egoing | developer                |
|  3 | SQL Server | SQL Server is... | 2021-02-23 19:00:30 | duru   | database administrator   |
|  4 | PostgreSQL | PostgreSQL is... | 2021-02-23 19:01:31 | taeho  | datascientist, developer |
|  5 | MongoDB    | MongoDB is...    | 2021-02-23 19:02:02 | egoing | developer                |
+----+------------+------------------+---------------------+--------+--------------------------+

- **WHERE (SELECT~ FROM~ WHERE ~)**

**: 조건을 붙인다.**  

```sql
SELECT id, title, author
FROM TOPIC
WHERE author='egoing';
```

: author 가 'egoing'인 조건들만 추려서 읽어온다. 

+----+---------+--------+
| id | title   | author |
+----+---------+--------+
|  1 | My SQL  | egoing |
|  2 | Oracle  | egoing |
|  5 | MongoDB | egoing |
+----+---------+--------+

- **정렬 : ORDER BY (정렬 기준 컬럼) [DESC]**

```sql
SELECT id,title,created,author
FROM topic
WHERE author='egoing'
ORDER BY id DESC; // 내림차순으로 출력
```

: id 기준으로 내림차순으로 Read 

+----+---------+---------------------+--------+
| id | title   | created             | author |
+----+---------+---------------------+--------+
|  5 | MongoDB | 2021-02-23 19:02:02 | egoing |
|  2 | Oracle  | 2021-02-23 18:58:55 | egoing |
|  1 | My SQL  | 2021-02-23 18:56:22 | egoing |
+----+---------+---------------------+--------+

- **LIMIT (제한 개수)**

```sql
SELECT id,title,created,author
FROM topic
WHERE author='egoing'
ORDER BY id DESC
LIMIT 2;
```

: 많은 양의 데이터를 출력하기 부담스럽거나 필요에 의해 몇 개만 읽을 때, LIMIT를 사용한다. 

+----+---------+---------------------+--------+
| id | title   | created             | author |
+----+---------+---------------------+--------+
|  5 | MongoDB | 2021-02-23 19:02:02 | egoing |
|  2 | Oracle  | 2021-02-23 18:58:55 | egoing |
+----+---------+---------------------+--------+

---

## UPDATE (업데이트)

UPDATE (테이블 명) SET (변경할 내용) WHERE (변경 할 대상)  

**수정**

```sql
UPDATE TOPIC // 업데이트 할 테이블 
SET description='ORACLE is....', title = 'ORACLE' // 업데이트 할 내용
WHERE id=2; // 수정 할 대상 (조건으로 선택) 
```

- 만약 WHERE 을 빠뜨리게 되면 엄청난 재앙이 몰려올 것..

→ 대상이 없으면 모든 것이 변경됨 

+----+------------+------------------+---------------------+--------+--------------------------+
| id | title      | description      | created             | author | profile                  |
+----+------------+------------------+---------------------+--------+--------------------------+
|  1 | My SQL     | My SQL is...     | 2021-02-23 18:56:22 | egoing | developer                |
|  2 | ORACLE     | ORACLE is....    | 2021-02-23 18:58:55 | egoing | developer                |
|  3 | SQL Server | SQL Server is... | 2021-02-23 19:00:30 | duru   | database administrator   |
|  4 | PostgreSQL | PostgreSQL is... | 2021-02-23 19:01:31 | taeho  | datascientist, developer |
|  5 | MongoDB    | MongoDB is...    | 2021-02-23 19:02:02 | egoing | developer                |
+----+------------+------------------+---------------------+--------+--------------------------+

---

## DELETE (삭제)

: DELETE FROM (테이블 명) WHERE (삭제할 대상) 

```sql
DELETE
FROM TOPIC // 테이블 명 
WHERE id=2; // 삭제할 대상 (id=2, ORACLE) 
```

- **id = 2 삭제**

+----+------------+------------------+---------------------+--------+--------------------------+
| id | title      | description      | created             | author | profile                  |
+----+------------+------------------+---------------------+--------+--------------------------+
|  1 | My SQL     | My SQL is...     | 2021-02-23 18:56:22 | egoing | developer                |
|  3 | SQL Server | SQL Server is... | 2021-02-23 19:00:30 | duru   | database administrator   |
|  4 | PostgreSQL | PostgreSQL is... | 2021-02-23 19:01:31 | taeho  | datascientist, developer |
|  5 | MongoDB    | MongoDB is...    | 2021-02-23 19:02:02 | egoing | developer                |
+----+------------+------------------+---------------------+--------+--------------------------+