	Date:	2014년 10월 24일 02:00
	Location:	긴고랑로16길 6-4, 광진구, 서울특별시, 대한민국
	Weather:	10° Mist and Fog

# 공찰래리그 일정 생성 앱


##### 이 앱은 ’2015공찰래리그 여주’의 일정을 공정하고 쉽게 짜기위하여 만들어졌습니다.

### 조건

- 총 14라운드
- home & away 방식(1개 구장을 사용하기 때문에 1,2차전의 성격이 더 강함)
- 앞경기(front match, 19:00) 뒷경기(back match, 21:00)을 고려해야함

***

### 결과(조건을 바탕으로)

- 각팀은 앞경기&홈, 앞경기&어웨이, 뒷경기&홈, 뒷경기&어웨이의 경기가 고루 분포되어있어야 함.

예를 들어,
FH : front match & home
FA : front match & away
BH : back match & home
BA : back match & away

	Team A = { FH : 4, FA : 3, BH : 4, BA : 3 }

위의 경우처럼 8개팀의 14경기가 고르게 분포되어 있어야 함.



### 풀어 갈 방법

 - round-robin 알고리즘을 사용

### 개발환경

- nodejs, express, bootstrap(예정)

### 배포

- (예정)

