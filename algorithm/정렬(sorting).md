# 정렬

+ 시간복잡도는 맨 아래쪽에서 확인하기



| 알고리즘   | 평균수행시간 | 최악수행시간 | 알고리즘 기법 | 비고                                                 |
| ---------- | ------------ | ------------ | ------------- | ---------------------------------------------------- |
| 버블정렬   | O(n^2)       | O(N^2)       | 비교와 교환   | 코딩이 가장 손쉽다                                   |
| 카운팅정렬 | O(n+k)       | O(n+k)       | 비교환방식    | n이 비교적 작을때만 가능                             |
| 선택정렬   | O(n^2)       | O(n^2)       | 비교와 교환   | 교환의  횟수가 버블, 삽입정렬보다 작다.              |
| 퀵정렬     | O(n log n)   | O(n^2)       | 분할정복      | 최악의 경우 O(n^2)이지만 평균적으로는 가장 빠르다.   |
| 삽입정렬   | O(n^2)       | O(n^2)       | 비교와 교환   | n의 개수가 작을 때 효과적이다. 책 정리하듯 정렬한다. |
| 병합정렬   | O(n log n)   | O(n log n)   | 분할정복      | 연결리스트의 경우 가장 효율적인 방식                 |
| 힙정렬     | O(n log n)   |              |               |                                                      |







## 버블정렬

인접한 두 개의 원소를 비교하여 자리를 계속 교환하는 방식

### 정렬 과정

1. 첫 번째 원소부터 인접한 원시끼리 계속 자리를 교환하면서 맨 마지막 자리까지 이동.
2. 한 단계가 끝나면 가장 큰 원소가 마지막 자리로 정렬.

### 시간복잡도 

: O(n^2) => for 2개가 중첩될 것.



### 구현

```python
def BubbleSort(data) :
    for i in range(len(data) - 1, 0, -1):
        for j in range(0, i):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]

data = [2, 4, 1, 3, 5]

BubbleSort(data)
print(data)
```







### **파라미터를 부르는 방법**

- call by value : 복사 => 변수 하나
- call by reference : 원본 참조 => list : 함수 안에 들어갔다가 오면 바뀔 수 있다.





## 카운팅 정렬(Counting Sort)

항목들의 순서를 결정하기 위해 집합에 각 항목이 몇 개씩 있는지 세는 작업을 하여 선형시간에 정렬하는 효율적인 알고리즘

data에서 각 항목들의 발생 회수를 세고, 정수 항목들로 직접 인덱스 되는 카운트 배열 count에 저장한다.

**제한사항이 많다**

- 정수나, 정수로 표현할 수 있는 자료에 대해서만 적용 가능. : 각 항목의 발생 회수를 기록하기 위해, 정수 항목으로 인덱스 되는 카운트들의 배열을 사용하기 때문.
- 카운트들을 위한 충분한 공간을 할당하려면 집합 내의 가장 큰 정수를 알아야한다.

### 시간복잡도

O(n + k) : n은 리스트 길이, k는 정수의 최대값.



### 구현

```python
def counting_sort(A, B, C):
    for i in range(len(A)):
        C[A[i]] += 1

    for i in range(1, len(C)):
        C[i] += C[i - 1]

    for i in range(len(A)-1, -1, -1):
        B[C[A[i]] - 1] = A[i]
        C[A[i]] -= 1

A = [5, 8, 7, 1, 1, 5, 4, 2]
B = [0] * len(A)
C = [0] * 10    # 10 대신에 최댓값이 들어가야 한다.

counting_sort(A, B, C)
print(B)
```







## 선택 정렬

가장 작은(큰)숫자부터 골라서 차례대로 정리.

- 주어진 자료 중 가장 작은 값의 원소부터 차례대로 선택하여 위치를 교환

### 정렬과정

1. 주어진 리스트 중에서 최소값 찾기
2. 그 값을 맨 앞에 위치한 값과 교환
3. 맨 처음 위치를 제외한 나머지 리스트를 대상으로 위의 과정 반복



### 시간 복잡도 

O(n^2)



### 구현

```python
def selection_sort(a):
    for i in range(0, len(a)-1):
        # 최솟값의 인덱스를 구하기
        min_check = i
        for j in range(i + 1, len(a)):
            if a[min_check] > a[j]:
                min_check = j
        # 최솟값의 인덱스와 현재 체크한 부분을 교환
        a[i], a[min_check] = a[min_check], a[i]

data = [64, 25, 10, 22, 11]
print(data)
selection_sort(data)
print(data)
```













## 병합정렬(merge sort)

=> 병합해놓은 리스트를 원본에 복사하는 과정 등이 필요하기 때문에 시간이 오래 걸리며, 

=> 긴 배열이 뒤에 따라붙으면 복사하는 과정이 오래 걸리기 때문에 linked list로 해야만 효율이 좋다.



### 구현

```python
def merge_sort(m):
    if len(m) <= 1:
        return m

    # 1. divide
    mid = len(m) // 2
    left = m[:mid]
    right = m[mid:]

    # 리스트 길이가 1이 될 때 까지 divide
    left = merge_sort(left)
    right = merge_sort(right)

    # merge 부분
    return merge(left, right)

def merge(left, right):
    result = []
    # 양 쪽 리스트에 원소가 없을 때 까지 반복
    while left and right:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    if left:
        result.extend(left)
    elif right:
        result.extend(right)
    return result


data = [61, 324, 21, 56, 243, 6, 1, 634, 43, 3, 52]
print(data)
print(merge_sort(data))
```

out:

[61, 324, 21, 56, 243, 6, 1, 634, 43, 3, 52]
[1, 3, 6, 21, 43, 52, 56, 61, 243, 324, 634]







## 퀵정렬

+ 주어진 배열을 두 개로 분할하고, 각각을 정렬
  + 합병정렬(merge)와 비슷하다.
  + 다른점 1: 합병정렬은 그쟝 두 부분으로 나눔. 퀵정렬은 분할할 대 기준 아이템(pivot item) 중심으로 작은것을 왼쪽 큰것을 오른쪽에 위치
  + 다른점 2: 각 부분 정렬이 끝난 후, 합병정렬은 '합병'이란 후처리 작업은 필요하나 퀵정렬은 필요하지 않다.
+ 아이디어 
  + P(피봇) 값들보다 큰 값은 오른쪽, 작은 값들은 왼쪽에 위치시켜서 피봇을 두 집합의 가운데에 위치.
  + 피봇을 선택할 때 맨 왼쪽으로 사용하나, 값의 치우침을 방지하기 위해서는 (왼쪽끝/오른쪽끝/임의의 값) 세 개 중 중간값을 사용할 수도 있다.



python 피봇설정

```python
def PrintArray():
    for i in range(len(arr)):
        print("%3d" % arr[i], end=" ")
    print()

def partition(a, l, r):
    pivot = a[l]
    i = l
    j = r

    while i < j:
        while a[i] <= pivot:
            i += 1
            if i == r:
                break
        while a[j] >= pivot:
            j -= 1
            if j == l:
                break
        if i < j:
            a[i], a[j] = a[j], a[i]
    arr[l], arr[j] = arr[j], arr[l]
    return j

def quicksort(a, low, high):
    if low < high:
        pivot = partition(a, low, high)
        quicksort(a, low, pivot - 1)
        quicksort(a, pivot + 1, high)

arr = [11, 45, 22, 81, 23, 34, 99, 22, 17, 8]
# arr = [69, 10, 30, 2, 16, 8, 31, 22]
# arr = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
PrintArray()
quicksort(arr, 0, len(arr) - 1)
PrintArray()
```

out :

 11  45  22  81  23  34  99  22  17   8 
  8  11  17  22  22  23  34  45  81  99 



python 재귀 버전

```python
def Qsort(s, e):
	if s >= e: return
	t, p = s, e
	for l in range(s, e+1):
		if arr[l] < arr[p]:
			arr[l], arr[t] = arr[t], arr[l]
			t += 1
	arr[p], arr[t] = arr[t], arr[p]
	Qsort(s, t-1)
	Qsort(t+1, e)
```



c언어 재귀버전

```c
# include <stdio.h>
int data[80] = { 94, 546, 1, 5, 35, 7, 485, 1, 5, 6, 1, 8, 1, 23, 3 ,4, 9, 55, 34, 25 };
void QuickSort(int s, int e) {
	int tmp;
	if (s >= e) return;
	int t = s;
	int p = e;

	for (int l = s; l <= e; l++) {
		if (data[l] < data[p]) {
			tmp = data[t];
			data[t] = data[l];
			data[l] = tmp;
			t++;
		}
	}
	tmp = data[t];
	data[t] = data[p];
	data[p] = tmp;
	QuickSort(s, t - 1);
	QuickSort(t + 1, e);

}

int main() {
	for (int i = 0; i < 20; i++) {
		printf("%d ", data[i]);
	}
	printf("\n");
	QuickSort(0, 19);
	for (int i = 0; i < 20; i++) {
		printf("%d ", data[i]);
	}
	printf("\n");
	return 0;
}
```









## 시간복잡도(Time Complexity)

실제 걸리는 시간을 측정.

실행되는 명령문의 개수를 계산



### 빅-오(O) 표기법

- (Big-Oh Notation)
- 시간복잡도 함수 중에서 가장 큰 영향력을 주는  n에 대한 항만을 표시
- 계수는 생략하여 표시



​	ex) for 1개 : n

​	for 2개 : 2n == n

​	2개 중첩 for : n^2



- O(1) : 수식 한개. or 수식 몇 줄. 반복문 X

- O(n) : 순차탐색 : 순서대로 모두 체크 for1개

- O(logn) : 이진탐색 : 이분법적으로 반씩 나누고 아닌것은 버리기. 

  ​					ex) 1~100 => 50~100 => 50~75 

- O(n^2) : 선택, 버블, 삽입(하나 잡아서 체크) => for가 중첩으로 2개 

- O(nlogn) : 퀵소트, 병합, heap

- O(n^3) : 프로이드 알고리즘. 모든 최단경로

- O(2^n) : 부분집합. 

- O(n!) : 순열. 숫자를 가지고 나열할 수 있는 모든 경우의 수.



