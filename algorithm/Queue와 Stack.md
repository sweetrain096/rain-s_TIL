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





## 2. Linked List

큐의 노드 하나하나를 sturct로 생성. 다음 노드에 연결한다.



### 관련문제

#### [프린터큐](<https://www.acmicpc.net/problem/1966>)

```c
#include <stdio.h>
#include <malloc.h>

int list[10];

int tc , n , index;
int max_data;
int cnt;

typedef struct node {
	int data;
	struct node *next;
}node;
node *head;
node *tail;
node *pp;//print point

void init(int n) {
	int tmp_input;
	node *t = (node *) malloc(sizeof(node));
	head = t;
	for(int i = 0; i<n; i++) {
		scanf("%d" , &tmp_input);
		list[tmp_input] += 1;
		t->data = tmp_input;
		if(i==index) {
			pp = t;
		}
		if(i==n-1) break;
		t->next = (node *) malloc(sizeof(node));
		t = t->next;
	}
	tail = t;
	t->next = head;
	
	for(int i = 9; i>=0; i--) {
		if(list[i]!=0) {
			max_data = i;
			break;
		}
	}
}
int print() {
	node *tmp = head;
	node *prev = tail;
	node *check = head;
	node *delete_node;
	while(1) {
		if(max_data==-1) {
			for(int i = 9; i>=0; i--) {
				if(list[i]!=0) {
					max_data = i;
					break;
				}
			}
		}
		if(tmp==pp && max_data==pp->data) break;
		if(tmp->data==max_data) {
			delete_node = tmp;
			if(tmp==tmp->next) break;
			prev->next = tmp->next;
			tmp = tmp->next;
			if(delete_node==tail) tail = prev;
			if(delete_node==head) head = tmp;
			free(delete_node);
			list[max_data] -= 1;
			cnt++;
		}
		else {
			prev = tmp;
			tmp = tmp->next;
		}
		if(list[max_data]==0) max_data = -1;
		

	}
	return ++cnt;
}

void free_data() {
	node *tmp = head;
	node *delete_node;
	while(tmp!=NULL) {
		delete_node = tmp;
		if(tmp->next==tmp || tmp == tail) {
			break;
		}
		tmp = tmp->next;
		free(delete_node);
		//printf("check\n");
	}
	free(tmp);
	//printf("ok\n");
}

int main(void) {
	freopen("1966_input.txt" , "r" , stdin);
	scanf("%d" , &tc);
	for(int i = 0; i<tc; i++) {
		for(int j = 0; j<10; j++) list[j] = 0;
		max_data = 0;
		cnt = 0;
		scanf("%d %d" , &n , &index);
		init(n);
		printf("%d\n" , print());
		free_data();
	}

	return 0;
}
```









# Stack

+ 배열의 끝에서만 넣고 뺄 수 있는 후입선출(Last in First out)의 구조.
+ 자료를 밀어 넣는다고 하여 push, 자료를 꺼내는 것을 pop이라 한다.
+ 나중에 넣은 값이 먼저 나오는 것 : LIFO 구조.

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/300px-Data_stack.svg.png)



- S.top(): 스택의 가장 윗 데이터를 넘겨준다.만약에 비었다면 이 연산은 정의불가 상태다.
- S.pop(): 스택의 가장 윗 데이터의 값을 넘겨주고 해당 데이터를 삭제한다. 스택이 비었다면 연산 정의불가 상태.
- S.push(): 스택의 가장 윗 데이터로 top이 가리키는 자리 위에(top = top + 1) 메모리를 생성, x데이터를 넣는다.
- S.empty(): 스택이 비었다면 참을 주고,그렇지 않다면 거짓이 된다.







기본 예제 : [위키백과](<https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%83%9D>)

```c
다음은 윈도우 기준의 C언어로 제작된 스택의 예제이다.

/* Stack Example */

#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

int Stack[10];
int top=-1;

int push(int dat);
int pop(void);
int printstack(void);

int main(void) {
	int inval, innum;
	printf(" - Algorithm Stack - \n");
	printf("Made by POM(lovebeen04@gmail.com)\n");
	printf("=================================\n");
	printf("1. Push Value\n");
	printf("2. Pop Value\n");
	printf("3. Print Stack\n");
	printf("4. Exit\n");
	printf("=================================\n");
	printf("> Enter Number: ");
	scanf("%d", &inval);

	switch(inval) {
		case 1:
			system("cls");
			printf("> Enter Number: ");
			scanf("%d", &innum);
			push(innum);
			break;
		case 2:
			pop();
			break;
		case 3:
			printstack();
			break;
		case 4:
			system("pause");
			break;
		default:
			system("cls");
			printf(" Error\n");
			break;
	}

	return 0;
}

int push(int dat) {
	if(top >= 9) {
		system("cls");
		printf("Stack Overflow\n");
		getch();
		system("cls");
		main();
	} else {
		top++;
		Stack[top] = dat;
		system("cls");
		printf("Push %d\n", dat);
		getch();
		system("cls");
		main();
	}
}

int pop(void) {
	system("cls");
	if(top <= -1) {
		system("cls");
		printf("Stack Downflow\n");
		getch();
		system("cls");
		main();
	} else {
		Stack[top] = 0;
		top--;
		main();
	}
}
int printstack(void) {
	int a;
	system("cls");
	printf("=================================\n");
	for(a=9; a>=0; a--) printf("%d\n", Stack[a]);
	printf("=================================\n");
	getch();
	system("cls");
	main();
}
```







+ 스택도 큐와 같이 기본 배열과 linked list로 풀 수 있다.



## 1. 배열

### 관련문제

#### [스택](<https://www.acmicpc.net/problem/10828>)

```c
#include <stdio.h>
int n, plus;
char order[10];

int wp;
struct st {
	int data;
};
struct st Q[10010];

void push(int data) {
	Q[wp].data = data;
	wp++;
	return;
}

int pop() {
	if(wp==0) return -1;
	int now = Q[wp - 1].data;
	Q[wp-1].data = 0;
	wp--;
	return now;
}
int size() {
	return wp;
}
int empty() {
	if(wp==0) return 1;
	else return 0;
}
int top() {
	if(wp==0) return -1;
	else return Q[wp-1].data;
}
int main(void) {
	scanf("%d" , &n);
	wp = 0;
	for(int i = 0; i<n; i++) {
		scanf("%s" , &order);
		if(order[0]=='p') {
			if(order[1]=='u') {//push
				scanf("%d" , &plus);
				push(plus);
			}
			else printf("%d\n", pop());//pop
		}
		else if(order[0]=='s') printf("%d\n", size());//size
		else if(order[0]=='e') printf("%d\n", empty());//empty
		else if(order[0]=='t') printf("%d\n", top());//top
	}

	return 0;
}
```





## 2. linked list

+ 스택의 경우에는 꼭 linked list로 풀지 않아도 되는 문제가 많다. 배열의 크기가 아주 크지 않다면 그냥 배열로 풀어도 무방할 것 같다.



### 관련문제

#### [괄호](<https://www.acmicpc.net/problem/9012>)

```c
#include <stdio.h>
#include <malloc.h>
int tc;
char data[60];
int rc;//오른쪽 괄호 카운트

typedef struct st {
	char data;
	struct st *prev;
	struct st *next;
}node;

node *head;
node *tail;

void init() {
	char tmp_input;
	int i = 0;
	tmp_input = data[0];
	node* t = (node*) malloc(sizeof(node));
	t->prev = NULL;
	head = t;
	while(tmp_input!='\0') {
		t->data = tmp_input;
		tmp_input = data[i++];
		if(tmp_input=='\0') break;
		t->next = (node*) malloc(sizeof(node));
		t->next->prev = t;
		t = t->next;
	}
	t->next = NULL;
	tail = t;

}

int pop() {
	node *now;
	node *delete_node;
	now = tail;
	if(now->data=='(') return 0;
	while(now->prev!=NULL) {
		delete_node = now;
		if(now->data==')') rc++;
		else rc--;

		if(rc<0) return 0;

		now->prev->next = NULL;
		now = now->prev;
		free(delete_node);
	}
	if(rc==0) return 1;
	else return 0;
}


int main(void) {
	freopen("9012_input.txt" , "r" , stdin);
	scanf("%d" , &tc);
	for(int i = 0; i<tc; i++) {
		data[0] = '\0';
		scanf("%s" , &data);
		rc = 0;
		init();
		if(pop()==1) printf("YES\n");
		else printf("NO\n");
	}

	return 0;
}
```



