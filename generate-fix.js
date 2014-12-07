/*
- shallwefootball robin module
- roundrobin 모듈을 커스터마이징했습니다. https://github.com/clux/roundrobin.git
- returns an array of round representations (array of player pairs).
- http://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
*/

const DUMMY = -1;

var sRobin = function (number, clubs) {

	var match = {},
		firstRounds = [],
		secondRounds = [],
		horizonMatch = [];

	/*----------------------------------------------
	init clubs */
	if (!clubs) {
		var clubs = [];
		for (var k = 1; k <= number; k++) {
			clubs.push(k);
		}
	} else {
		clubs = clubs.slice();
	}

	if (number % 2 === 1) {
		clubs.push(DUMMY);		// so we can match algorithm for even numbers
		number++;
	}

	/*----------------------------------------------
	robin & shuffle */
	for (var j = 0; j < number -1; j++) {
		firstRounds[j] = [];		 // create inner match array for round j
		for (var i = 0; i < number / 2; i++) {
			if (clubs[i] !== DUMMY && clubs[number - 1 - i] !== DUMMY) {
				firstRounds[j].push([clubs[i], clubs[number - 1 - i]]); 	// insert pair as a match
				if (!(typeof firstRounds[j][i] == 'undefined')) {
					shuffle(firstRounds[j][i]);
				}
			}
		}
		shuffle(firstRounds[j]);
		clubs.splice(1, 0, clubs.pop());	// permutate for next round
	}
	shuffle(firstRounds);

	/*----------------------------------------------
	generate secondRound */
	secondRounds.length = firstRounds.length;			//1차전 라운드와 같게함

	for (var p = 0; p < firstRounds.length; p+=1) {
		secondRounds[p] = [];
		for (var r = 0; r < firstRounds[p].length; r++) {
			secondRounds[p].push(new Array(firstRounds[p][r][1], firstRounds[p][r][0]));	//홈어웨이 순서 바꿔줌
		};
		shuffle(secondRounds[p]);
	};
	shuffle(secondRounds);

	/*----------------------------------------------
	range match horizontally for calcurate
	FH(front home), FA(front away), BH(back home) and BA(back away) */
	for (var i = 0; i < firstRounds.length; i+=1) {
		for (var k = 0; k < firstRounds[i].length; k+=1) {
			horizonMatch.push(firstRounds[i][k]);
		}
	}

	for (var i = 0; i < secondRounds.length; i+=1) {
		for (var k = 0; k < secondRounds[i].length; k+=1) {
			horizonMatch.push(secondRounds[i][k]);
		}
	}

	match.clubs = clubs
	match.firstRounds = firstRounds;
	match.secondRounds = secondRounds;
	match.horizonMatch = horizonMatch;

	return match;

}

var checkOverlap = function (match) {

	var horizonMatch = match.horizonMatch,
		clubs = match.clubs,
		spread = [];

	if (clubs[clubs.length - 1] == DUMMY){				//DUMMY의 길이 빼기
		spread.length = clubs.length - 1;
	}else {
		spread.length = clubs.length;
	}

	for (var i = 0; i < horizonMatch.length; i++) {
		if (i%2 == 0) {
			if (horizonMatch[i][0] == horizonMatch[i + 1][0] || horizonMatch[i][0] == horizonMatch[i + 1][1] || horizonMatch[i][1] == horizonMatch[i + 1][0] || horizonMatch[i][1] == horizonMatch[i + 1][1]) {
				console.log(spread.length + '개팀의 일정은 ' + i + '번째 경기에서 중복이 있음');
				return false;
			}
		}
	};

	return match;
}

var loopCheckOverlap = function (number, clubs) {
	for (var i = 0; i < 1000000; i++) {
		var match = checkOverlap(sRobin(number, clubs));
		if (match != false) {
			return match;
		}
	};
}

var countOrder = function (match) {

	/*----------------------------------------------
	count match order */
	var clubs = match.clubs,
		spread = [],
		horizonMatch = match.horizonMatch;

	if (clubs[clubs.length - 1] == DUMMY){				//DUMMY의 길이 빼기
		spread.length = clubs.length - 1;
	}else {
		spread.length = clubs.length;
	}

	for (var j = 0; j < spread.length; j++) {
		spread[j] = [0, 0, 0, 0];
	};

	for (var i = 0; i < horizonMatch.length; i+=1) {
		var frontBack = 'front';
		if (i % 2 === 1) {
			frontBack = 'back';
		}
		for (var k = 0; k < horizonMatch[i].length; k+=1) {
			var homeAway = 'home';
			if (k % 2 === 1) {
				homeAway = 'away';
			}

			for (var m = 0; m < clubs.length; m+=1) {
				if (clubs[m] === horizonMatch[i][k]) {

					switch (frontBack+homeAway) {
						case 'fronthome' :
							// console.log('clubs[m]    : ', clubs[m]);
							spread[m][0]++;
							break;
						case 'frontaway' :
							// console.log('clubs[m]    : ', clubs[m]);
							spread[m][1]++;
							break;
						case 'backhome' :
							// console.log('clubs[m]    : ', clubs[m]);
							spread[m][2]++;
							break;
						case 'backaway' :
							// console.log('clubs[m]    : ', clubs[m]);
							spread[m][3]++;
							break;
					}
				}
			}
		}
	}

	match.spread = spread;

	return match;

}

var checkSpread = function (match) {

	var clubsNumber = match.spread.length,
		spread = match.spread;

	var avg;

	for (var i = 0; i < spread.length; i++) {
		for (var k = 0; k < spread[i].length; k++) {

			if (clubsNumber % 2 === 1) {
				avg = Math.floor(clubsNumber/2);
				if (!(spread[i][k] === avg)) {
					// console.log(spread[i][k], false);
					console.log(clubsNumber + "개팀의 일정은 공평하지 않은 경기일정입니다.");
					return false;
				}
			}else {
				avg = clubsNumber/2;
				if (!((spread[i][k] === avg) || (spread[i][k] === (avg - 1)))) {
					// console.log(spread[i][k], false);
					console.log(clubsNumber + "개팀의 일정은 공평하지 않은 경기일정입니다.");
					return false;
				}
			}


		};
	};

	return match;
	/*--------------
	6 = 3,3,2,2
	7 = 3,3,3,3
	8 = 4,4,3,3
	9 = 4,4,4,4
	10 = 5,5,4,4
	11 = 5,5,5,5
	20 = 10,10,9,9
	--------------*/
}

var loopCheckSpread = function (number, clubs) {
	for (var i = 0; i < 1000000; i++) {
		var match = checkSpread(countOrder(loopCheckOverlap(number, clubs)));;
		if (match != false) {
			return match;
		}
	};
}

// 한일정만 출력
// 중복경기 생략
// console.log(countOrder(sRobin(6, ['a', 'b', 'c', 'd', 'e', 'f'])));
// console.log(countOrder(sRobin(7)));
// console.log(countOrder(loopCheckOverlap(9)));


// 분포체크만(8개팀 참가의 경우에만 사용된다.)
// console.log('final use 8 or more    : ', checkSpread(countOrder(sRobin(7))));

// console.log('final   : ', loopCheckSpread(6, ['a', 'b', 'c', 'd', 'e']));
console.log('final   : ', loopCheckSpread(7));


/*----------------------------------------------
search & paste function */
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

