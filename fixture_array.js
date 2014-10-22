var r1 = ["c","d","h","b","e","f","g","a"];
var r2 = ["g","f","e","b","h","d","a","c"];
var r3 = ["c","g","a","d","h","b","e","f"];
var r4 = ["e","b","h","d","a","g","f","c"];
var r5 = ["c","e","f","g","a","d","h","b"];
var r6 = ["h","d","a","g","f","e","b","c"];
var r7 = ["c","h","b","e","f","g","a","d"];

var round = [r1, r2, r3, r4, r5, r6, r7]

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



for (var i = 0; i <7 ; i++) {
	for (var k = 0; k < round[i].length; k++) {
		switch (k%4){
			case 0 :
				fixtureCounting[round[i][k]].FH++;
				break;
			case 1 :
				fixtureCounting[round[i][k]].FA++;
				break;
			case 2 :
				fixtureCounting[round[i][k]].BH++;
				break;
			case 3 :
				fixtureCounting[round[i][k]].BA++;
				break;
				// var countObj = "fixtureCounting." + round[i][k];
				// eval(countObj).BA++;
				// eval을 쓰는것은 문자열을 컴파일러에게 넘긴후 결과를 실행(컴파일러실행시 속도가 느려지는 현상).
		}
	};
};


console.log(fixtureCounting);



