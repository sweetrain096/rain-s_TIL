---
title: "데이터 처리 패키지"
date: "2019-06-20T12:08:00.169Z"
template: "post"
draft: false
slug: "/tech/AI/data-processing-packages/"
category: "tech"
tags:
  - "Pandas"
  - "numpy"
  - "matplotlib"
description: "데이터 처리 패키지 3대장을 공부해보자"

---

- [pandas](#pandas)
- [numpy](#numpy)
- [matplotlib](#matplotlib)







## [pandas](<http://pandas.pydata.org/pandas-docs/stable/getting_started/overview.html#data-structures>)

### pandas란?

Pandas는 빠르고, 유연하며 풍부한 데이터 구조의 파이썬 패키지이다. 서로 관계있거나, 라벨링 된 데이터를 쉽고 직관적으로 사용할 수 있도록 도와준다.(고 홈페이지에 써있다.)

조금 더 쉽게 설명해보면, pandas는 <u>행과 열로 이루어진 데이터 오브젝트(=관계 or 라벨링)를 만들어 다루며, 데이터를 처리하는데 편리한 파이썬 라이브러리</u>이다.

### pandas를 왜 쓸까?

- 부동 소수점 데이터 뿐만 아니라, 누락된 데이터(NaN으로 처리)를 손쉽게 처리
- 크기 변경 : DataFrame 및 상위 차원 개체에서 **열을 삽입하고 삭제** 가능
- 데이터 정렬
- 다른 데이터 구조(python 및 numpy 등)의 비정형 데이터를 DataFrame 객체로 쉽게 변환 가능
- 직관적인 데이터 병합 및 결합
- csv file, excel file 등 여러 파일을 로드/저장 하기에 용이. => 원하는 데이터 형식으로 변환해준다.



### data 구조?

| 차수 | 이름      | 기술                     |
| ---- | --------- | ------------------------ |
| 1    | Series    | 1차원 배열               |
| 2    | DataFrame | 2차원 배열. (일반적으로) |



#### 1. Series

- pd.Series는 1차원 데이터를 다룰 때 사용. 변수를 출력해보면 인덱스 번호와 이름, 자료형도 함께 출력된다.

#### 2. DataFrame

- DataFrame은 Series와 달리 여러개의 column을 가질 수 있다.
- DataFrame을 정의할 때는 2차원 리스트를 매개 변수로 전달하며 여러개의 Series 데이터를 합쳐 DataFrame을 만들 수도 있다.

------

**Series/ DataFrame 생성 함수**

- Series(data, name): data를 name 이라는 이름의 Series형태로 만들어 줍니다.
- DataFrame(data): data를 DataFrame 구조로 만들어 줍니다.

```python
import pandas as pd

def main():
    # Series()를 사용하여 1차원 데이터를 만들어보세요.
    # 5개의 age 데이터와 이름을 age로 선언해보세요.
    data = [19, 18, 27, 22, 33]
    age = pd.Series(data)
    age.name="age"
    age.index.name = "age"
    print(age)
    
    # Python Dictionary 형태의 데이터가 있습니다.
    # class_name 데이터를 Series로 만들어보세요.
    class_name = {'국어' : 90,'영어' : 70,'수학' : 100,'과학' : 80}
    class_name = pd.Series(class_name)
    print(class_name,'\n')
    
    
    # DataFrame 만들기
    # DataFrame()을 사용하여 2차원 데이터를 생성해보세요.
    # index와 columns 값을 설정해보세요.
    data=[['name', 'age'],['철수',15],['영희',23],['민수',20],['다희', 18],['지수',20]]
    data = pd.DataFrame(data)
    print(data,'\n')
    
    
if __name__ == "__main__":
    main()

```







## Pandas 데이터 추출 및 추가

DataFrame에서 원하는 데이터를 추출하기 위해 loc(), iloc() 기능을 사용할 수 있습니다.

- `loc()`: 명시적인 인덱스를 참조하는 인덱싱/슬라이싱
- `iloc()` : 정수 인덱스 인덱싱/슬라이싱. 단 iloc의 경우 리스트와 같이 마지막 인덱스는 포함되지 않습니다.

`loc`, `iloc` 함수에 Index 값을 입력하여 원하는 데이터 인덱스를 추출/ 추가할 수 있습니다.

## Pandas 데이터 삭제

`drop()` 기능을 이용하여 DataFrame의 Index 및 Column을 삭제할 수도 있습니다.

- `drop()` : index, column 삭제

`drop()`함수에 Index 값을 입력하여 원하는 데이터 인덱스를 삭제할 수 있습니다.





```python
from elice_utils import EliceUtils
elice_utils = EliceUtils()
import pandas as pd

a = pd.Series([20, 15, 30, 25, 35], name='age')
b = pd.Series([68.5, 60.3, 53.4, 74.1, 80.7], name='weight')
c = pd.Series([180, 165, 155, 178, 185], name ='height')
human = pd.DataFrame([a, b, c])

def main():
    print(human)
    # loc(), iloc() 함수를 이용하여 특정 행, 열 추출 
    print(human.loc['age'],'\n')
    print(human.iloc[0],'\n')
    
    # loc(), iloc() 함수를 이용하여 데이터의 특정 범위 추출
    print(human.loc['weight' : 'height'],'\n')
    print(human.iloc[1:3],'\n')
     
    sex = ['F','M','F','M','F']
    # 새로운 데이터 추가하기
    human.loc['sex'] = sex
    print(human,'\n')
    
    #원하는 행/열 데이터 삭제하기
    tmp = human.drop(['height'])
    print(tmp,'\n')


if __name__ == "__main__":
    main()

```

- [drop](<https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop.html>)
- 







## numpy

### Numpy란?

- 넘파이(Numpy)는 파이썬 기반의 고성능의 수치 계산을 위한 라이브러리.
- 넘파이는 계산의 기반이 되는 배열(array)을 간편하게 생성할 수 있는 여러 가지 함수들을 제공하고 있다.



- 초기화, 데이터 타입, 슬라이싱 등 주의하기



### Numpy 배열 생성 함수

- **np.array(list):** list를 넘파이 배열로 생성
- **np.zeros(shape):** 0 이 들어있는 배열 생성
- **np.ones(shape):** 1 이 들어있는 배열 생성
- **np.empty(shape):** 초기화가 없는 값으로 배열을 반환
- **np.arange(n ,m):** arange 함수를 이용하여 배열을 생성
- **np.linspace(start ,end, num-points):**linspace 함수를 이용하여 시작점과 끝 사이에 균일한 값을 주는 배열을 생성
- **np.random.randint(start end, array-size):**radom.randit함수를 이용하여 랜덤값으로 배열을 생성

```python
import numpy as np

	print("Array1: 파이썬 리스트로 만들어진 정수형 array")
    array1 = np.array([1, 2, 3, 4, 5])
    print("데이터:", array1)
    print("array의 자료형:", type(array1))
    print("dtype:", array1.dtype, "\n")

    print("Array2: 파이썬 리스트로 만들어진 실수형 array")
    array2 = np.array([0.1, 0.2, 0.3, 0.4, 0.5])
    print("데이터:", array2)
    print("dtype:", array2.dtype, "\n")

    print("Array3: 0으로 10개 채워진 정수형 array")
    array3 = np.zeros(10, dtype=int)
    print("데이터:", array3)
    print("dtype:", array3.dtype, "\n")

    print("Array4: 1으로 채워진 3x5형태 실수형 array")
    array4 = np.ones((3, 5), dtype=float)
    print("데이터:", array4)
    print("dtype:", array4.dtype, "\n")

    print("Array5: 0부터 9까지 담긴 정수형 array")
    array5 = np.arange(10)
    print("데이터:", array5, "\n")

    print("Array6: 0부터 1사이에 균등하게 나눠진 5개의 값이 담긴 array")
    array6 = np.linspace(0, 1, 5)
    print("데이터:", array6, "\n")

    print("Array7: 0부터 10사이 랜덤한 값이 담긴 2x2 array")
    array7 = np.random.randint(0, 11, (2, 2))
    print("데이터:", array7, "\n")
```



## Numpy 배열의 특정요소 추출하기

넘파이 배열을 사용할 때, 행렬 전체가 아닌 특정 성분 또는 구간 만을 사용할 때가 있습니다.

이에 대하여 넘파이는 특정 성분 또는 구간을 추출하는 편리한 기능을 제공하고 있습니다.

이번 실습에서는 이러한 배열의 특정 성분들을 출력하는 것을 실습을 통해서 익혀봅시다.

**배열을 인덱싱/슬라이싱 하는 함수들**

- **ndarray[n, m]:** n 행 m 열의 원소를 추출.
- **ndarray[n, :]:** n 행을 추출.
- **ndarray[:, m]:** m 열을 추출.

```python
import numpy as np

array_1 = np.array([[4,2,5],[5,3,2],[9,1,2]])

#1. 배열 array_1에 대하여 2행 3열의 원소를 추출하세요. 
element_1 = array_1[1, 2]
print("2행 3열의 원소는 ", element_1, " 입니다.")

#2. 배열 array_1에 대하여 3행을 추출하세요. 
row_1 = array_1[2, :]
print("3행은 배열 ", row_1, " 입니다.")

#3. 배열 array_1에 대하여 2열을 추출하세요. 
col_1 = array_1[:, 1]
print("2열은 배열 ", col_1, " 입니다.")

#4. x의 1행과 3행을 바꾼 행렬을 만들어보세요. 
y = array_1[::-1, :]
print(y)
```

엑시스? : (세로, 가로)?(0, 1, 2 , ...) 순서대로 접근

만약 3차원이면 2차원 배열을 각각 0번 엑시스

2차원 배열의 각 열을 1번 엑시스

2차원 배열의 행을 2번 엑시스







## Numpy 배열의 통계적 정보 나타내기

Numpy는 배열의 원소에 대하여 최솟값, 최댓값, 평균, 분산 등의 통계적인 정보를 간단하게 계산하는 함수들을 제공하고 있습니다.

이번 시간에는 Numpy 에서 제공하는 함수들을 이용하여 배열 원소들의 여러 통계적 정보들을 출력해 봅시다.

------

**배열의 통계적 정보를 나타내주는 함수들**

- **np.min(x):** 배열 x 의 최솟값을 나타냅니다.
- **np.max(x):** 배열 x 의 최댓값을 나타냅니다.
- **np.mean(x):** 배열 x 의 평균값을 구합니다.
- **np.median(x):** 배열 x 의 중앙값을 구합니다.
- **np.var(x):** 배열 x 의 분산을 구합니다.
- **np.std(x):** 배열 x 의 표준편차를 구합니다.





```python
import numpy as np


def main():
    print(matrix_nom_var())
    print(matrix_uni_std())

def matrix_nom_var():
    
    # [[5,2,3,0], [3,4,5,1], [3,2,7,9]] 값을 갖는 A 메트릭스를 선언합니다.
    A = np.array([[5,2,3,0], [3,4,5,1], [3,2,7,9]])
    # A의 shape = (3, 4)
    
    # if, 세로방향으로 누적한 sum을 하고싶다면
    # np.sum(A, axis=0)
    # [11, 8, 15, 10]
    # 세로방향으로 생각하지 말고, 차원으로 생각을 해야한다.
    
    # if, 가로방향으로 누적한 sum을 하고 싶다면
    # np.sum(A, axis=1)
    # [10, 13, 21]
    

    # 주어진 A 메트릭스의 원소의 합이 1이 되도록 표준화 (Normalization) 합니다.
    A = (A - A.min())/(A.max() - A.min())
    # A = A / np.sum(A)
    print(A)

    # 표준화 된 A 메트릭스의 분산을 구하여 리턴합니다.
    return np.var(A)

def matrix_uni_std():
    
    # 모든 값이 1인 4 by 4 A 메트릭스를 생성합니다.
    A = np.ones((4, 4))
    print(A)
    

    # 표준화 된 A 메트릭스의 분산을 구하여 리턴합니다.
    return np.var(A)

main()
```

```
[[0.55555556 0.22222222 0.33333333 0.        ]
 [0.33333333 0.44444444 0.55555556 0.11111111]
 [0.33333333 0.22222222 0.77777778 1.        ]]
0.07270233196159122
[[1. 1. 1. 1.]
 [1. 1. 1. 1.]
 [1. 1. 1. 1.]
 [1. 1. 1. 1.]]
0.0
```



```python
A = np.ones((2, 3, 4, 5, 6))
B = np.sum(A, axis=3)
=> 결과가 (2, 3, 4, 6) 사이즈로 나오게 된다.
```









## Numpy 함수로 행렬연산 다루기

Numpy는 행렬과 관련된 여러 편리한 연산과 기능들을 제공하고 있습니다. 행렬의 곱, 전치 행렬, 역행렬 등을 간편하게 구할 수 있게끔 합니다.

이번 시간에는 Numpy의 함수를 이용해서 행렬의 여러 연산들을 적용하여 봅시다.

------

**행렬의 연산과 관련된 함수들**

- np.transpose(x) / (ndarray)x.T: 배열 x의 전치 행렬을 나타낸다.
- np.dot(x, y): 배열 x와 y의 행렬곱을 나타낸다.
- (ndarray)x * (ndarray)y : 행렬x와 y의 요소별 곱을 나타낸다.
- np.linalg.inv(x): 행렬 x의 역행렬을 배열로 나타낸다.



```python
import numpy as np

array1 = np.array([[1,2,3], [4,5,6], [7,8,9]])

#array1의 전치 행렬을 구해보자.
# transposed = array1.T
transposed = np.transpose(array1)
print(transposed, '는 array1을 전치한 행렬입니다.')  
# 

#array1과 array1의 전치 행렬의 행렬곱을 구해보자.
power = np.dot(array1, transposed)
print(power,'는 array1과 array1의 전치 행렬을 행렬곱한 것입니다.')

#array1과 array1의 전치 행렬의 요소별 곱을 구해보자.
elementwise_prod = array1 * transposed
print(elementwise_prod, '는 array1과 array1의 전치행렬을 요소별로 곱한 행렬입니다.')


array2 = np.array([[2,3],[1,7]])
# array2 * 2 + 1 => 한번에 전체 2 곱하고 1더함

# array2의 역행렬을 만들어보자.
inverse_array2 = np.linalg.inv(array2)
print(inverse_array2,'는 array2의 역행렬입니다.')

# array2와 array2의 역행렬을 곱한 행렬을 만들어보자.
producted = np.dot(array2, inverse_array2)
print(producted,'는 array2와 array2의 역행렬을 곱한 행렬입니다.')
```









## matplotlib













### Ref

[딥 러닝을 이용한 자연어 처리 입문](<https://wikidocs.net/32829>)

