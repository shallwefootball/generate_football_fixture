
# 공찰래리그 일정 생성 앱

##### 이 앱은 ’2015공찰래리그 여주’의 일정을 공정하고 다양하게 짜기위해 만들어졌습니다.

***

### 결과
경기하는데 무리없이 잘 만들어 졌으나 불 완전한 앱입니다.

### 배경
- 공찰래리그의 독특한 리그방식때문에 공정한 리그 일정이 필요했다.
- (http://www.fixturelist.com/)[http://www.fixturelist.com/] 사이트가 있지만 공평하지 못한 일정이 나오게된다.
- 위의 사이트의 example

```
	Round 1 ......................
	......... b vs (a) .........
	......... c vs d .........
	Round 2 ......................
	......... d vs b .........
	......... c vs (a) .........
	Round 3 ......................
	......... b vs c .........
	......... d vs (a) .........

	Round 4 ......................
	......... (a) vs b .........
	......... d vs c .........
	Round 5 ......................
	......... b vs d .........
	......... (a) vs c .........
	Round 6 ......................
	......... c vs b .........
	......... (a) vs d .........
```

- a팀의 경기가 한쪽으로 치우치는것을 볼 수 있습니다.
- a뿐만 아니라 모든팀의 경기가 한쪽으로 치우쳐짐
- 이러한 이유는 공찰래리그가 경기 순서의 따라 시간대와 심판업무가 나뉘어지기 때문입니다.(아래 방식에 대한설명이 있습니다.)

##### 공찰래리그의 경기, 리그일정의 방식
- 하루에 2경기(19:00~, 21:00~)
- a, b, c, d (4개팀)

```
	앞경기 : a vs b
	뒷경기 : c vs d

	a : 앞경기&홈 (주심, 대기심)
	b : 앞경기&어웨이 (부심)
	c : 뒷경기&홈 (주심, 대기심)
	d : 뒷경기&어웨이 (부심)
```

### 조건
- 골고루 분포

	앞경기 & 홈, 앞경기 & 어웨이, 뒷경기 & 홈, 뒷경기 & 어웨이

	팀 = 분포값
	4 = 2,2,1,1 -> 6경기
	5 = 2,2,2,2
	6 = 3,3,2,2
	7 = 3,3,3,3
	8 = 4,4,3,3
	9 = 4,4,4,4
	10 = 5,5,4,4
	11 = 5,5,5,5
	20 = 10,10,9,9
	.
	.
	.

###방법
참조 : 라운드 로빈 스케쥴링.
1. 항상랜덤
	- 장점 : 다양하게 경기를 할수있다.
	- 단점 : 결과를 뽑아내는데 시간이 걸림. 똑같은 경우를 또 찾을수 있음(경우의수 모두저장으로 해결해야 함.)
2. 랜덤으로 뽑아논 값을 그 자리에 랜덤으로 들어감.
	- 장점 : 결과값이 빠름. 단순.
	- 단점 : 만약에 같은 자리에 같은팀이 나왔을 경우 일정이 지난시즌과 같아짐.

###과정 (풀어 갈 방법):
1. 램덤은 어떻게??
```
	- 1단계 : 홈 vs 어웨이
		[ a vs b ] --> [ b vs a ] ...
	- 2단계 : 한 라운드 안에서 경기들
		[ d vs b ] --> [ c vs a ]
		[ c vs a ] 	   [ d vs b ]
	- 3단계 : 1차전 각 라운드
		round 1 -> round 3 ...
	- 4단계(랜덤은 아님) : 1차전의 값 모두를 홈어웨이를 바꿔줌
	- 5단계 : 2차전 한 라운드 안에서 경기들
	- 6단계 : 2차전 각 라운드
		round 4 -> round 6 ...
```

2. 일정 중복 체크
	- 6팀이 참가했을때
	- 한라운드 3경기,
	- 1라운드 3경기와 2라운드 1경기를 묶어서 경기를 해야합니다.

```
	[ e vs c ]
	[ a vs d ]

	[ b vs f ]    <-- 중복발생
	[ b vs a ]

	[ e vs d ]
	[ f vs c ]

	빠꾸~ 빠꾸~
```

3. 최종 분포값 체크
	- 위의 분포값을 바탕으로 분포조건에 맞지않으면 처음부터 다시 일정발생
	- 분포조건에 맞을때까지 나올때까지 반복

### 느낀점
다 만들고 나니 분포조건이 맞지 않을 때 다시 일정을 생성하는 부분이 오류가 있음. 왜냐하면, 다시생성 되었을 때 그 값이 이전에 생성했던 일정일 수 있기 때문에 같은 일정을 체크하고 있는 셈이다. 그러므로 경우의 수를 모두 뽑아내어 그중에 분포조건이 맞는 경기일정을 저장한 뒤에 뽑아서 사용하게 만들어야 한다.


