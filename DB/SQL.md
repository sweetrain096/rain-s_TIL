# SQL

## DB

데이터베이스 : 체계화된 데이터의 모임 (체계화 된 자료)

RDBMS : 관계형 데이터 베이스 관리 시스템. ex)MySQL, SQLite, ,...



### SQLite

내가 사용할 데이터베이스

시작하려면

sqlite3 tutorial.sqlite3

끄려면 ctrl + d





### 스키마

데이터베이스에서 자료의 구조, 표현방법, 관계 등을 정리한 구조. => 테이블 형식

데이터베이스의 제약 조건(공백 없음, 글자수 제한)에 관련한 전반적인 명세 기술.



하나의 데이터 베이스 안에 여러개의 테이블이 존재한다.



like cvs(엑셀파일)

ex) id는 숫자, 제목, 작성자 내용은 문자, 작성 시간은 datetime 등을 미리 설정.



+ 열(column) : 열에는 고유한 데이터 형식 지정
+ 행(row)==레코드 : 테이블의 데이터는행에 저장. 즉 user가 늘어날 때 마다 행이 증가.
+ PK(primary key)(기본키) : 특정 값을 찾기 위한 열쇠. 중복된 값이 절대 불가. 행의 고유값.





## SQL 

SQL(Structured Query Language) : 구조화 된 쿼리 언어

관계형 데이터베이스 관리시스템(RDBMS)의 데이터를 관리하기 위해 설계된 프로그래밍언어.

>DDL-데이터 정의언어 : 테이블 구조 정의 언어.

> DML- 데이터 조작 언어 : 저장, 수정, 삭제, 조회 등.

> DCL





### table과 datebase와의 관계

database 하나 안에 여러개의 table이 존재.



## CRUD

C : create | INSERT

R : read 	|SELECT

u : update	|UPDATE

d : delete	|DELETE



## 사용하기

1. c9의 새로운 터미널을 열어서 

   ```
   sqlite3
   ```

   입력

2. 사용할 파일을 File-> upload files를 올리기.

3. ```
   .mode csv
   .import 사용할csv이름 examples
   SELECT * FROM examples;
   ```

   out

   1,"길동","홍",600,"충청도",010-2424-123

4. 보기 편하게 사용

   ```
   --컬럼명 표기
   .headers on
   -- 표처럼 표기
   .mode column
   SELECT * FROM examples;
   ```

   out

   id          first_name  last_name   age         country     phone        
   ----------  ----------  ----------  ----------  ----------  -------------
   1           길동      홍         600         충청도   010-2424-1232



키워드(SELECT문)    *(내용)         키워드(테이블 이름) 우리는 examples로 테이블 이름 생성

​                  SELECT     * FROM        table;





### 새로 만들기 (터미널)

```
sqlite3 tutorial.sqlite3

.databases
```



+ classmate라는 테이블 생성

```
sqlite> CREATE TABLE classmate (
   ...> id INT PRIMARY KEY,
   ...> name VARCHAR(30)
   ...> );
```



+ 테이블 목록 출력

```
.tables
```

out

classmate



+ 테이블 삭제(안에 있는 모든 내용 삭제)

```
DROP TABLE classmate;
```







### 파일에서 만들기 (.sql)

```sql
CREATE TABLE classmates (
    id INT PRIMARY KEY, 
    name TEXT,
    age INT,
    address TEXT
);
```



+ 파일 읽기

```
.read create_table.sql
```



+ 파일 열기

```
.table
```





### data 추가(insert)



INSERT INTO table명(col1, co2...)

VALUES(val1, val2, ...);

**띄어쓰기 하면 안돼요!!**

```sql
INSERT INTO classmates(name, age)
VALUES("홍길동", 23);
```



모든 데이터를 넣을 때에는 column을 명시할 필요가 없다. 대신 순서를 꼭 지켜야 한다!







### 자동 증가 및 빈 값 받지 않기(AUTOINCREMENT , NOT NULL)

```sql
-- create_table.sql
CREATE TABLE classmates (
    -- 오토카운팅
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    -- 빈 값 안받기
    name TEXT NOT NULL,
    age INT NOT NULL,
    address TEXT NOT NULL
);
```



```sql
-- insert.sql

INSERT INTO classmates(id, name, age, address)
VALUES(5, "홍길동", 23, "서울");
INSERT INTO classmates(name, age, address)
VALUES("한단비", 24, "서울");

INSERT INTO classmates
VALUES(2, "홍길동", 30, "서울");
```

out

```
sqlite> SELECT * FROM classmates;
id          name        age         address   
----------  ----------  ----------  ----------
2           홍길동   30          서울    
5           홍길동   23          서울    
6           한단비   24          서울    
```



이어서 다시 



```sql
INSERT INTO classmates(name, age, address)
VALUES("12홍길동", 23, "서울");
INSERT INTO classmates(name, age, address)
VALUES("한단비", 24, "서울");

```

를 하면, 번호가 가장 큰 것부터 이어서 진행된다.

out

```
sqlite> SELECT * FROM classmates;
id          name        age         address   
----------  ----------  ----------  ----------
2           홍길동   30          서울    
5           홍길동   23          서울    
6           한단비   24          서울    
7           12홍길 23          서울    
8           한단비   24          서울    
```



### 값 가져오기



```sql
-- select.sql

-- 테이블 값 모두 가져오기
SELECT * FROM classmates;

-- 특정 column만 가져오기
SELECT id, name FROM classmates;

--가져오는 row(레코드)의 갯수 지정
SELECT * FROM classmate LIMIT 3;

--가져오는 row(레코드)의 시작점을 지정하기
SELECT * FROM classmates LIMIT 5 OFFSET 2;

--특정한 값을 가진 row(레코드)만 가져오기
SELECT * FROM classmates WHERE age==24;

-- 특정한 값을 가진 row(레코드)의 이름만 가져오기
SELECT name FROM classmates WHERE age==24;
```







### 값 삭제

보통 값을 지울때는 unique한 id를 기준으로 한다.

```sql
DELETE FROM classmates WHERE id=7;
```

이름이나 나이 등 중복이 될 수 있는 값으로 값을 제거한다면 모든 값이 삭제될 것.





### 값 수정

값을 수정할 id를 where로 사용하고 수정할 부분만 체크한다.

```sql
UPDATE classmates SET name="단부", age=27, address="제주도" WHERE id=9;
```

id가 9인 row의 이름과 age, address가 수정된다.





### WHERE

users에서 나이가 30 이상이고 성이 김인사람의 성과 나이만 프린트

```
SELECT last_name, age FROM users WHERE age>=30 and last_name="김";
```



users에서 나이가 30 이상이고 성이 김인사람의 명수를 출력

```
SELECT count(last_name) FROM users WHERE age>=30 and last_name="김"; 
```

out

count(last_name)

112



### 최댓값 최솟값, 평균

```sql
-- 평균
SELECT AVG(age) FROM users WHERE age>=30;  
--최대
SELECT MAX(age) FROM users;
--최소
SELECT MIN(age) FROM users;

```



최대 계좌잔액인 사람의 이름과 잔액

```sql
SELECT first_name, MAX(balance) FROM users;
```





### csv 읽기

```
.mode csv
.import users.csv users
.schema users

```

out

CREATE TABLE users(
  "id" TEXT,
  "first_name" TEXT,
  "last_name" TEXT,
  "age" TEXT,
  "country" TEXT,
  "phone" TEXT,
  "balance" TEXT
);

=> 여기서 문제 : primary key 없음. balance 나 id, age 등이 숫자가 아님. 때문에 비교 못함

때문에 스키마 형식을 새로 만들어야한다.



```
.mode csv
.read create_users.sql		// 스키마 형식 만들기
.import users.csv users		// 스키마 형식에 맞춰 csv 파일 읽기
.schema users

```

최대 잔액인 사람들 모두 출력

``` 
SELECT first_name, balance FROM users WHERE balance=(SELECT MAX(balance) FROM users);
```



20대 모두출력

```
SELECT * FROM users WHERE age>=20 and age<30;       
```

==

**%는 값이없어도 되지만 _는 값이 꼭 있어야한다.**

```
SELECT * FROM users WHERE age LIKE '2%';
```



지역번호가 02인사람

```
SELECT * FROM users WHERE phone LIKE '02%';
```



이름이 ?준인 사람

```
SELECT * FROM users WHERE first_name LIKE '%준';
```



가운데 핸드폰번호가 5114인사람

```
SELECT * FROM users WHERE phone LIKE '%5114%';
```



두번째 글자가 5인 값

```
SELECT * FROM users WHERE phone LIKE '_5%';
```



5로 시작하고 적어도 3자리인 값

```
SELECT * FROM users WHERE phone LIKE '5_%_%';
```

==

```
SELECT * FROM users WHERE phone LIKE '5__%';
```

그러나 

`5_3_%`과

`5_%_%`는 다르다.





### 정렬

디폴트는 오름차순

오름차순

```
SELECT * FROM users ORDER BY age ASC;
```

내림차순

```
 SELECT * FROM users ORDER BY age DESC;
```



두개 같이

``` 
SELECT * FROM users ORDER BY age, last_name;
```



계좌잔액 내림차순으로 10명만 이름, 밸런스

```
SELECT first_name, balance FROM users ORDER BY balance DESC LIMIT 10;   
```



