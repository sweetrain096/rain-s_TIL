# Queue

+ FIFO(First in First out)의 선입 선출 구조. 

+ 먼저 들어간 것이 먼저 나오는 구조이다.

+ 데이터의 처음을 head, 끝을 tail로 두어 index 관리를 할 수 있다.

+ 처리해야 하는 개수가 적은 편이라면 while문을 사용하여 rp, wp로 손쉽게 접근 가능하지만, 처리해야하는 데이터의 수가 많아지면 linked list를 활용하는 편이 좋다.

  ![img](https://i.imgur.com/GXkBmm4.png)

  

+ rp, wp를 잘 사용한다면 시간복잡도를 enqueue와 dequeue 모두 O(1)로 사용할 수 있으나, dequeue를 array로 작성할 때 뒷 배열을 한칸씩 당겨오게되면 O(n)의 시간복잡도를 가지게된다. 상대적으로 array 사용시, dequeue가 O(1)을 갖게되면 그만큼 배열의 메모리 낭비를 갖게 되므로 각각의 장단점이 존재한다.

+ 위와 같은 경우를 방지하기 위해 linked list를 사용할 수 있으나, array 사용에 비해 접근이 비교적 어렵기 때문에 데이터의 크기가 많이 크지 않은 경우 array 사용이 편하다.



## 1. 기본 구조(array)

+ read pointer(rp)와 write pointer(wp)를 사용. 



### 코드

```c
#include <stdio.h>

int input_data;
int rp , wp;
char order[10];
struct st {
	int data;
};
struct st Q[100010];

void push(int inputData) {
	Q[wp].data = inputData;
	wp++;
}
int pop() {
	if(Q[rp].data==NULL) return -1;
	else {
		int tmp = Q[rp].data;
		Q[rp].data = NULL;
		rp++;
		return tmp;
	}
}

int main(void) {
	scanf("%d" , &n);
	rp = wp = 0;
	for(int i = 0; i<n; i++) {
		scanf("%s" , &order);
		if(order[1]=='u') {//push
			scanf("%d" , &input_data);
			push(input_data);
		}
        else if(order[1]=='o') printf("%d\n", pop());//pop
	}
	return 0;
}
```

1. rp와 wp를 main에서 0으로 초기화. 
2. 입력받은 order에 따라서 push와 pop의 함수로 넘어간다.
3. push
   1. push의 경우 inputData를 Q의 wp위치의 data에 넣어준다. => Q[wp].data = inputData;
   2. 이후 wp의 크기를 1 늘려준다.
4. pop
   1. pop의 경우 rp의 위치에 data가 존재하는지를 먼저 확인해야한다. data가 없는데 빼낼수는 없기 때문
   2. data가 존재한다면 리턴해주기 위해 tmp 변수에 잠시 Q[rp].data를 저장.
   3. Q[rp].data를 NULL로 바꿔준 후 rp(head가 되겠다)를 1 증가시킨다.
   4. 이후 tmp를 리턴.





### 관련 문제

#### [큐](<https://www.acmicpc.net/problem/10845>)

```c
#include <stdio.h>
int n , input_data;
char order[10];
int rp , wp;
struct st {
	int data;
};

struct st Q[100010];

void push(int inputData) {
	Q[wp].data = inputData;
	wp++;
}
int pop() {
	if(Q[rp].data==NULL) return -1;
	else {
		int tmp = Q[rp].data;
		Q[rp].data = NULL;
		rp++;
		return tmp;
	}
}
int size() {
	return wp-rp;
}
int empty() {
	if(wp-rp==0) return 1;
	else return 0;
}
int front() {
	if(Q[rp].data==NULL) return -1;
	else return Q[rp].data;
}
int back() {
	if(Q[wp-1].data==NULL) return -1;
	else return Q[wp-1].data;
}


int main(void) {
	freopen("10845_input.txt" , "r" , stdin);
	scanf("%d" , &n);
	rp = wp = 0;
	for(int i = 0; i<n; i++) {
		scanf("%s" , &order);
		if(order[1]=='u') {//push
			scanf("%d" , &input_data);
			push(input_data);
		}
		else if(order[1]=='o') printf("%d\n", pop());//pop
		else if(order[1]=='i') printf("%d\n", size());//size
		else if(order[1]=='m') printf("%d\n", empty());//empty
		else if(order[1]=='r') printf("%d\n", front());//front
		else printf("%d\n", back());//back
	}
	return 0;
}
```



















