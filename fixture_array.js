
for (var i = 0; i < 1000000; i++) {
	lastIter();
};



function lastIter(){
	var result = resultFixture();
	iter(result.fixtureCounting, result.resultRound, function (count) {
		console.log(result);
	});
}

function iter(counting, result, callback){
	var count = 0;
	for (var key in counting) {

		if(
			counting[key].FH < 3 && counting[key].FH > 0 &&
			counting[key].FA < 3 && counting[key].FA > 0 &&
			counting[key].BH < 3 && counting[key].BH > 0 &&
			counting[key].BA < 3 && counting[key].BA > 0) {
			// console.log(key);
			// console.log('key : ', counting[key]);
			count++;
		}
	}
	if(count == 8){
		callback(count);
	}
}




function resultFixture(){


	var fixRound = [
		["c","d","h","b", "a","g","f","e"],
		["g","f","e","b", "c","a","d","h"],
		["c","g","a","d", "f","e","b","h"],
		["e","b","h","d", "c","f","g","a"],
		["c","e","f","g", "b","h","d","a"],
		["h","d","a","g", "c","b","e","f"],
		["c","h","b","e", "d","a","g","f"]
	]
	var shuffleRound = [
		["c","d","h","b", "a","g","f","e"],
		["g","f","e","b", "c","a","d","h"],
		["c","g","a","d", "f","e","b","h"],
		["e","b","h","d", "c","f","g","a"],
		["c","e","f","g", "b","h","d","a"],
		["h","d","a","g", "c","b","e","f"],
		["c","h","b","e", "d","a","g","f"]
	]


	var resultRound = [];
	// console.log(r1[0]);

	for (var i = 0; i < 7; i++) {
		// console.log(fixRound[i]);
		// console.log(shuffleRound[i]);
		var shuffleTeam = shuffle(shuffleRound[i]);
		orderArray(fixRound[i], shuffleTeam, function (FH_1, FA_1, team6) {
			var home = [];
			var away = [];
			home.push(FH_1);
			away.push(FA_1);
			orderArray(fixRound[i], team6, function (BH_1, BA_1, team4) {
				home.push(BH_1);
				away.push(BA_1);
				orderArray(fixRound[i], team4, function (FH_2, FA_2, team2) {
					home.push(FH_2);
					away.push(FA_2);
					orderArray(fixRound[i], team2, function (BH_2, BA_2) {
						home.push(BH_2);
						away.push(BA_2);
						// console.log('home : ', home);
						// console.log('away : ', away);
						// console.log('this round : ', home.concat(away));
						return resultRound.push(home.concat(away));
					});
				});
			});
		});
	};


	// var round = [r1, r2, r3, r4, r5, r6, r7]

	var fixtureCounting = {
		a : { FH : 0, FA : 0, BH : 0, BA : 0 },
		b : { FH : 0, FA : 0, BH : 0, BA : 0 },
		c : { FH : 0, FA : 0, BH : 0, BA : 0 },
		d : { FH : 0, FA : 0, BH : 0, BA : 0 },
		e : { FH : 0, FA : 0, BH : 0, BA : 0 },
		f : { FH : 0, FA : 0, BH : 0, BA : 0 },
		g : { FH : 0, FA : 0, BH : 0, BA : 0 },
		h : { FH : 0, FA : 0, BH : 0, BA : 0 }
	}



	for (var i = 0; i <resultRound.length ; i++) {
		for (var k = 0; k < resultRound[i].length; k++) {
			if(k > -1 && k < 4){
				if(k%2 == 0) {
					fixtureCounting[resultRound[i][k]].FH++;
				}else {
					fixtureCounting[resultRound[i][k]].BH++;
				}
			}else {
				if(k%2 == 0) {
					fixtureCounting[resultRound[i][k]].FA++;
				}else {
					fixtureCounting[resultRound[i][k]].BA++;
				}
			}
			// var countObj = "fixtureCounting." + round[i][k];
			// eval(countObj).BA++;
			// eval을 쓰는것은 문자열을 컴파일러에게 넘긴후 결과를 실행(컴파일러실행시 속도가 느려지는 현상).

		};
	};

	var result = {
		resultRound : resultRound,
		fixtureCounting : fixtureCounting
	}

	return result;

}





function orderArray(realOriginTeam, shuffleTeam, callback) {
	var homeVal = shuffleTeam[0];
	var homeOriginIndex = realOriginTeam.indexOf(homeVal);
	var awayOriginIndex;
	var awayOriginVal;
	var shuffleAwayIndex;
	if(homeOriginIndex > -1 && homeOriginIndex < 4){
		awayOriginIndex = homeOriginIndex + 4;
	}else {
		awayOriginIndex = homeOriginIndex - 4;
	}
	awayOriginVal = realOriginTeam[awayOriginIndex];
	shuffleAwayIndex = shuffleTeam.indexOf(awayOriginVal);
	shuffleTeam.splice(shuffleAwayIndex, 1);
	shuffleTeam.splice(0, 1);

	callback(homeVal, awayOriginVal, shuffleTeam);

}

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

