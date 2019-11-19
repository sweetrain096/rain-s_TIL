> 하루하루 공부하는 것을 올립니다. 
>





# [Linked list](<https://dojang.io/mod/page/view.php?id=645>)

## 1. 연결 리스트(Linked List) ?

+ 일반적인 Array List와는 다르게 각 요소간의 연결(link)를 이용해서 리스트를 구현하는 것. 
+ 단방향 연결 리스트 / 양방향 연결 리스트 / 환형 연결 리스트 세가지 종류가 존재한다.

![img](.\algorithm\img\2939.png)





### [Array List vs Linked List](<https://opentutorials.org/module/1335/8821>)

+ Array List

  : 일반적으로 사용하는 list or Array.

  : 여러개의 순서가 있는 메모리가 통으로 되어있는 메모리이다.

  : 일반적으로 동적할당을 시키지 않는 이상 크기가 정해져있어 만약 그 이상 정보를 담고 싶을 때에는 정보를 담지 못한다.

  + python의 경우 동적 메모리 할당이 잘 되어있어 내가 신경 쓸 부분이 없었지만, C에서는 내가 모두 신경써야한다.

  : 하나로 연결된 메모리이기 때문에 특정 순서로 찾아가기 쉽다. 앞에서부터 3번째로 가고싶다면 array에서 [2]번 자리로 가면 된다. 

  if) int data[10] = {1, 3, 2, 5, 4, 6, 3, 4, 5}; 에서 3번째에 위치한 2를 찾고싶다면, 

  ​	printf("%d", data[2]); 를 해야한다.

  때문에 찾아가는 속도가 빠르다.

  : 단점으로는 메모리 관리가 힘들다. 여러개의 테스트케이스를 동작시킬 때에도 가장 큰 경우를 생각해서 메모리를 할당해주어야 하기 때문이다.

  

+ Linked List

  : 연결 리스트. 조각조각 나있는 리스트이다. 

  : 각각 다른 주소에 흩어져 있는 리스트들이며, 각각은 다음으로 연결 될 수 있는 다음 연결 리스트의 주소와, 현재 리스트의 정보(data)를 갖고있다.

  : 리스트를 늘려 연결시키면 되기 때문에 큰 정보를 담고 싶을때에 용이하다.

  : 흩어져 있는 메모리이기 때문에 특정 순서로 찾아가려면 힘들다. 앞에서부터 3번째로 가고싶다면 head 리스트에서 node1로 가는 주소를 받아 node1에 있는 정보를 확인한 후 node2의 주소를 받아 node2로 이동하고, node2의 정보를 확인한 후 node3의 주소를 받아 node3의 데이터를 확인해야한다. 

  n 번째의 정보를 알고싶다면 n개만큼의 for를 돌아 정보를 찾아낼 수 있다.

  

## 2. 단일 linked list 

### 1. 구조체 만들고 사용하기

1. 구조체 만들기

   ```c
   struct node {	// 연결 리스트 구조체
   	struct node *next;	// 다음 노드 주소 저장 포인터
   	int data;			// 데이터 저장할 멤버
   };
   ```

   + linked list의 핵심은 `struct node *next;` 부분이다.
   + 자기 자신으로 만든 구조체를 저장 포인터로 두어 다음 주소를 저장한다.

   

2. main() 노드 생성해보기

   ```c
   	struct node *head = malloc(sizeof(struct node));	//머리 노드 생성
   
   	struct node *node1 = malloc(sizeof(struct node));
   	head->next = node1;
   	node1->data = 10;
   
   	struct node *node2 = malloc(sizeof(struct node));
   	node1->next = node2;
   	node2->data = 20;
   
   	node2->next = NULL;
   ```

   + head 노드를 먼저 생성한 후 malloc으로 동적할당. 

   + head 노드에는 데이터가 없기 때문에 데이터 넣는 과정은 생략

   + node1을 생성 한 후, head 노드의 next(다음 주소 포인터)로 node1을 받는다.

   + 이후 node1의 data를 넣어준다.

   + 같은 방법으로 node2를 생성한 후 node1의 주소로 node2를 받는다.

   + 이후 node2의 data를 넣어준다.

   + 마지막으로 node2로 리스트를 끝낼것이기에 node2의 next에 NULL을 넣어준다.

     

3. 만들어진 linked list 순회하기

   ```c
   	struct node *curr = head->next;	//순회용 포인터
   	while (curr != NULL) {
   		printf("%d ", curr->data);
   		curr = curr->next;
   	}
   ```

   + curr 이름의 순회용 포인터를 생성한 후 curr의 head를 next로 바로 받아 첫번째 노드의 주소를 넣어준다.

   + while문으로 curr이 node2의 next인 NULL을 만나기 전까지 반복하게 했다.

   + curr의 데이터를 출력한 후, curr에 다음 주소를 넣어준다.

     

4. 사용한 노드 메모리 해제

   ```c
   	free(node2);
   	free(node1);
   	free(head);
   ```

   + 데이터 사용이 많아지면 메모리를 free 함수로 해제해준다. 리스트가 만들어진 역순으로 해제한다.

     

5. 총 코드

   ```c
   # include <stdio.h>
   # include "malloc.h"
   
   struct node {	// 연결 리스트 구조체
   	struct node *next;	// 다음 노드 주소 저장 포인터
   	int data;			// 데이터 저장할 멤버
   };
   
   int main() {
   	struct node *head = malloc(sizeof(struct node));	//머리 노드 생성
   
   	struct node *node1 = malloc(sizeof(struct node));
   	head->next = node1;
   	node1->data = 10;
   
   	struct node *node2 = malloc(sizeof(struct node));
   	node1->next = node2;
   	node2->data = 20;
   
   	node2->next = NULL;
   
   	struct node *curr = head->next;	//순회용 포인터
   	while (curr != NULL) {
   		printf("%d ", curr->data);
   		curr = curr->next;
   	}
   	free(node2);
   	free(node1);
   	free(head);
   	return 0;
   }
   ```

   out:

   ```
   10 20 
   ```

   





### 2. 노드 추가 함수 만들기

1. 추가 함수 만들기

   ```c
   void add_node(struct node *target, int data) {
   	if (target == NULL) return; // 기준 노드가 NULL이면 함수 종료
   
   	struct node *new_node = malloc(sizeof(struct node));
   	if (new_node == NULL) return;	//메모리 할당에 실패하면 함수 종료
   	new_node->next = target->next;
   	new_node->data = data;
   	target->next = new_node;
   }
   ```

   + add_node라는 이름의 노드 추가 함수 생성
   + node 구조체를 가져오기 때문에 매개변수로 node 구조체의 요소들을 가져온다.
   + 새롭게 노드를 만들기 때문에 new_node를 생성해준 후
   + 새롭게 만든 노드는 target이 원래 연결되어있던 next와 같은 노드에 연결되어야 하기 때문에 `new_node->next = target->next;` 이렇게 연결된다.
   + new_node의 데이터를 추가해준 후, target의 next를 현재 만든 node로 연결해준다.

2. 추가할 경우 특정 위치의 포인터와 데이터를 싣은 함수를 사용하여 추가한다.

3. 추가하는 함수를 만들 때 노드의 포인터를 저장하지 않아서 메모리를 비울 때 역시 while문을 돌아 메모리를 비워준다.

   ```c
   	curr = head->next;
   	while (curr != NULL) {
   		struct node *next = curr->next;
   		free(curr);
   		curr = curr->next;
   	}
   ```

   

4. 완성 코드

   ```c
   # include <stdio.h>
   # include "malloc.h"
   
   struct node {	// 연결 리스트 구조체
   	struct node *next;	// 다음 노드 주소 저장 포인터
   	int data;			// 데이터 저장할 멤버
   };
   
   void add_node(struct node *target, int data) {
   	if (target == NULL) return; // 기준 노드가 NULL이면 함수 종료
   
   	struct node *new_node = malloc(sizeof(struct node));
   	if (new_node == NULL) return;	//메모리 할당에 실패하면 함수 종료
   	new_node->next = target->next;
   	new_node->data = data;
   	target->next = new_node;
   }
   
   int main() {
   	struct node *head = malloc(sizeof(struct node));	//머리 노드 생성
   
   	head->next = NULL;
   
   	add_node(head, 10);
   	add_node(head, 20);
   	add_node(head, 30);
   
   
   	struct node *curr = head->next;	//순회용 포인터
   	while (curr != NULL) {
   		printf("%d ", curr->data);
   		curr = curr->next;
   	}
   
   	//데이터 해제
   	//추가할 때 따로 노드의 포인터를 저장하지 않아서 while로 순회하여 해제한다.
   	curr = head->next;
   	while (curr != NULL) {
   		struct node *next = curr->next;
   		free(curr);
   		curr = curr->next;
   	}
   
   	free(head);
   	return 0;
   }
   ```

   



### 3. 삭제 함수 만들기



1. 연결 노드 삭제 함수 만들기

   ```c
   void remove_node(struct node *target) {
   	struct node *del_node = target->next;
   	target->next = del_node->next;
   
   	free(del_node);
   }
   
   ```

   + del_node 구조체를 새로 생성. del_node를 target의 다음에 위치한 포인터를 통해 target 다음 리스트를 저장한다.
   + target의 next를 del_node의 next로 바꾼다. (del_node는 이미 target의 다음 리스트의 주소를 갖는다.)
   + 이후 사용이 끝난 del_node는 메모리 해제해준다.

   

2. 최종 코드

   ```c
   # include <stdio.h>
   # include "malloc.h"
   
   struct node {	// 연결 리스트 구조체
   	struct node *next;	// 다음 노드 주소 저장 포인터
   	int data;			// 데이터 저장할 멤버
   };
   
   void add_node(struct node *target, int data) {
   	if (target == NULL) return; // 기준 노드가 NULL이면 함수 종료
   
   	struct node *new_node = malloc(sizeof(struct node));
   	if (new_node == NULL) return;	//메모리 할당에 실패하면 함수 종료
   	new_node->next = target->next;
   	new_node->data = data;
   	target->next = new_node;
   }
   
   void remove_node(struct node *target) {
   	struct node *del_node = target->next;
   	target->next = del_node->next;
   
   	free(del_node);
   }
   
   int main() {
   	struct node *head = malloc(sizeof(struct node));	//머리 노드 생성
   
   	head->next = NULL;
   
   	add_node(head, 10);
   	add_node(head, 20);
   	add_node(head, 30);
   
   	remove_node(head);
   
   
   	struct node *curr = head->next;	//순회용 포인터
   	while (curr != NULL) {
   		printf("%d ", curr->data);
   		curr = curr->next;
   	}
   
   	//데이터 해제
   	//추가할 때 따로 노드의 포인터를 저장하지 않아서 while로 순회하여 해제한다.
   	curr = head->next;
   	while (curr != NULL) {
   		struct node *next = curr->next;
   		free(curr);
   		curr = curr->next;
   	}
   
   	free(head);
   	return 0;
   }
   ```

   





## 3. 양방향 linked list

+ 양방향 연결 리스트의 특징은 node에 next와 prev를 같이 넣어주는것이다.
+ next를 먼저 만든 후, next의 prev를 현재의 노드로 설정. 이후 현재의 노드(주소)에 next를 받아서 for루프를 돌린다.



```c
# include <stdio.h>
# include "malloc.h"

typedef struct node {
	char data;
	struct node *pre;
	struct node *next;
}node;

// 양방향 연결리스트를 사용할 때에는 pre와 next를 모두 만들어주어야만 사용 가능하다.


void init() {
	char tmp_data = data[0];
	int i = 0;
	node *t = (node *) malloc(sizeof(node));
	t->pre = NULL;
	t->data = '\0';
	head = t;
	while(tmp_data!='\0') {
		t->data = tmp_data;
		tmp_data = data[++i];
		t->next = (node *) malloc(sizeof(node));
		t->next->pre = t;
		t = t->next;
	}
	t->data = '0';
	t->next = NULL;
	cursor = t;
	tail = t;
}

// 사용할 때에는 next를 만들어서 먼저 pre를 연결한 후, 현재 다룰 노드로 next를 가진다.

```



### [백준 1406 에디터](<https://www.acmicpc.net/problem/1406>) 문제



```c
#include <stdio.h>
#include <malloc.h>

char data[100010];
int n;
char order , plus_data;
typedef struct node {
	char data;
	struct node *pre;
	struct node *next;
}node;
node *head;
node *tail;
node *cursor;

void init() {
	char tmp_data = data[0];
	int i = 0;
	node *t = (node *) malloc(sizeof(node));
	t->pre = NULL;
	t->data = '\0';
	head = t;
	while(tmp_data!='\0') {
		t->data = tmp_data;
		tmp_data = data[++i];
		t->next = (node *) malloc(sizeof(node));
		t->next->pre = t;
		t = t->next;
	}
	t->data = '0';
	t->next = NULL;
	cursor = t;
	tail = t;
}
void print() {
	node *tmp;
	tmp = head;
	while(tmp->data!='0') {
		printf("%c" , tmp->data);
		//if(tmp==cursor) printf("!");
		tmp = tmp->next;
	}
}

void move_left() {
	if(cursor==head) return;
	cursor = cursor->pre;
}

void move_right() {
	if(cursor==tail) return;
	cursor = cursor->next;
}

void delete() {
	if(cursor==head) return;
	if(cursor->pre==head) {
		cursor->pre = NULL;
		head = cursor;
		free(cursor->pre);
	}
	else {
		node *tmp;
		tmp = cursor->pre;
		cursor->pre = tmp->pre;
		tmp->pre->next = cursor;
		free(tmp);
	}
}

void insert(char add) {
	node *add_node = (node*) malloc(sizeof(node));
	add_node->data = add;
	if(head==cursor) {
		add_node->pre = NULL;
		add_node->next = cursor;
		cursor->pre = add_node;
		head = add_node;
	}
	else {
		add_node->pre = cursor->pre;
		add_node->next = cursor;
		add_node->pre->next = add_node;
		cursor->pre = add_node;

	}
}

int main(void) {
	freopen("1406_input.txt" , "r" , stdin);
	scanf("%s" , &data);
	init();
	//print();

	scanf("%d" , &n);
	for(int i = 0; i<n; i++) {
		scanf(" %c" , &order);
		if(order=='L') move_left();
		else if(order=='D') move_right();
		else if(order=='B') delete();
		else {
			scanf(" %c" , &plus_data);
			insert(plus_data);
		}
	}
	print();

	return 0;
}

```







## 4. 환형 linked list

+ 환형 연결리스트의 특징은 가장 끝. 즉 tail 위치가 head와 같은것이다.
+ tail이 되는 부분을 head에 연결해준다.



+ 관련문제
  + [조세퍼스문제](<https://www.acmicpc.net/problem/1158>)





### 1. 조세퍼스문제

```c
#include <stdio.h>
#include "malloc.h"
int n, k;
int wp, rp;

typedef struct node {
	int data;
	struct node *next;
}node;
node *head;
node *tail;

void init_node(node *t) {
	t->data = NULL;
	t->next = NULL;
}
void insert_node() {
	int i;
	node *t = (node*)malloc(sizeof(node));
	t->data = 1;
	head = t;
	for (i = 2; i <= n; i++) {
		t->next = (node*)malloc(sizeof(node));
		t = t->next;
		t->data = i;
	}
	tail = t;
	t->next = head;
}

void delete_next(node *t) {
	node *d;
	d = t->next;
	if (d == NULL) {
		return 0;
	}
	t->next = t->next->next;
	free(d);
}

void start() {
	insert_node();
	node *t;
	t = tail;
	printf("<");
	while (t != t->next) {
		for (int i = 0; i < k - 1; i++) {
			t = t->next;
		}
		printf("%d, ", t->next->data);
		//if (t != t->next)printf(", ");
		delete_next(t);
	}
	printf("%d>", t->data);
}

int main() {
	freopen("1158_input.txt", "r", stdin);
	scanf("%d %d", &n, &k);
	//printf("%d %d", n, k);
	start();
	return 0;
}
```





