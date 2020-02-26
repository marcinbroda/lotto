(function ($) {
	
$(document).ready(function () {
	let allNumbers = $(".circle li"),//wszystkie liczby 
	    getNumbers = $("#getNumbers"),//przycik do losowania
		showNum = $("#showNumbers"),// output wylosowane
		yourNum = $(".setNumbers"),// wybrane liczby
		repeatNum = $("#yourRepeat"),// trafione liczby powtorzone w arr
		currentRowIndex = 0,
		$tBody = $('tbody'),
		reset = $(".btnReset"),//button do reset
		counter = 0,
		arrayFigure=[],
		//added last time
		lucky = $(".luckyLosser"),
		luckyNumbers=[];
		

		allNumbers.on("click", function (e) {
			var that = $(this),
				figure;
					
			if (counter++ < 6) {
				that.css("display", "none");
					figure =that.text();
					arrayFigure.push(figure);

			}  if (counter === 6){
				yourNum.val(arrayFigure.toString(" ,"));
				}
			return arrayFigure;	
		})	
		reset.on("click", function () {
			
			counter=0;
			allNumbers.css("display", "inline-block");	
			yourNum.val([]);
			arrayFigure=[];
			showNum.val([]);
			repeatNum.val([]);
			luckyNumbers.val([]);

		})

	function makeArray(nodeList){
		var arr=[];

		for ( var i = 0; i < nodeList.length; i++){
				arr.push(nodeList[i]);
		}

		return arr;
	}

	function getRandom(min ,max){
		return Math.round(Math.random() * (max-min) + min );

	};


	lucky.on("click",function () {
		console.log(lucky);
		allNumbers.disabled = true;
		console.log(allNumbers);
		let luckyNumbers=[];

		for ( var i = 0; i < 6; i++){
			var random = getRandom(1,49);

			while(luckyNumbers.indexOf(random) !== -1){
				var random = getRandom(1,49);
			}

			luckyNumbers.push(random);
		}

		yourNum.val(luckyNumbers.toString(" ,"));

	})



	

	getNumbers.on("click", function(){

		var numbers =[],
			random, yourRegExp, yourNumArray, concatValue;

		for ( var i = 0; i < 6; i++){
			var random = getRandom(1,49);

			while(numbers.indexOf(random) !== -1){
				var random = getRandom(1,49);
			}

			numbers.push(random);
		}
	
		showNum.val(numbers.toString(" ,"));

		yourRegExp = yourNum.val().match(/\d{1,2}/gmi);
		yourNumArray = makeArray(yourRegExp);
		console.log(yourNumArray.length);

		concatValue = numbers.concat(yourNumArray);
		//

		var sorted_arr = concatValue.slice().sort(); 
		var sameNumbers = [];

		for (var i = 0; i < concatValue.length - 1 ; i++) {
		    if ( sorted_arr[i] == sorted_arr[i + 1] )  {
		        sameNumbers.push(sorted_arr[i]);   
		    }
		}


		repeatNum.val(sameNumbers.toString(" ,"));
		var tablice = [[yourNumArray],[numbers],[sameNumbers]];
				//df = $(ducument.createDocumentFragment());	
			var $tRow = $tBody.find('tr').eq(currentRowIndex)
			$.each(tablice, function(i,val) {
				$tRow.find('td').eq(i).html(val)						  		
			});
		
		currentRowIndex++;	
		console.log(currentRowIndex);	



		let yourLength = yourNumArray.length;
		console.log(yourLength);

		function checkRowIndex(){
				
		if (currentRowIndex >= 10 && yourLength === 6 ) { // nie widzi go
			$tBody.css("overflow-y","scroll"),
			 $tBody.append("<tr>"),
			$("tbody tr:last").append("<td></td><td></td><td></td>");		
			} 
		}	

		checkRowIndex();
			 			 
	});	



	

																						
	$("#yourMatch").on("click", function () {
		//sprawdz
		var tbody = $("tbody"),
			trs = $("tbody tr"),
			trsArr = makeArray(trs),
			df= $(document.createDocumentFragment());

		trsArr.sort(function (a,b) {

			var tdA = a.children[2].textContent,
				tdB = b.children[2].textContent;

			if (tdA.length< tdB.length) {
				return 1;
			} else if(tdA.length> tdB.length){
				return -1;
			} else {
				return 0;
			}
		});
		$.each(trsArr, function ( i,val) {
			df.append(val);			
		})

		$("#myTable").append(df);
		$("tbody tr:first").css("color", "blue");

	});
});
})(jQuery);