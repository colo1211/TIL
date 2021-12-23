# 2. MySQL 서론 및 기본

## MySQL의 구조

- **표 (table)**

→ 표(파일)들이 많아지면 관련 있는 것들 끼리 묶을 필요가 있다. 이를 데이터베이스(폴더)로 관리

- **데이터 베이스 (Database) = 스키마**

→ 연관된 테이블 끼리 묶는 폴더를 데이터베이스 or 스키마라고 부른다. 


- **데이터 베이스 서버 (Database Server)**

→ DB들을 통틀어서 관리하는 것 서버 체제 

---

## MySQL 테이블(스키마)의 생성 및 사용

- **테이블 생성 (CREATE)**

```sql
CREATE DATABASE opentutorials;
```

- **테이블 삭제 (DROP)**

```sql
DROP DATABASE opentutorials;
```

- **데이터베이스 조회 (SHOW)**

```sql
SHOW DATABASES; 
```

- **데이터베이스 사용 (USE)**

```sql
USE opentutorials
```

---

## SQL 과 테이블 구조

1. **Table (표)** 
2. **Row , Record (행, x축, 수평) :  데이터 자체, 개수** 
3. **Column (열, y축, 수직) : 데이터의 타입**