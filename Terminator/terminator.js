$(function(){
	var myDate = new Date(),
			today  = myDate.toLocaleDateString(),
			y 	   = myDate.getFullYear(),
			m 	   = myDate.getMonth()+1,
			d 	   = myDate.getDate(),
			f	   = "01/01/2000",
			l	   = d+ "/" + m + "/" + y;
	$(".dataDrop").click(function(){
		$(".angle-wrapper").toggle();
	})
	update(f,l);
	//点击对应选项的时候，调用对应的函数
	$(".angle-wrapper-option").click(function(){
		switch($(this).val()){
			case "All":
				selectDateAll(y, m, d);
				break;
			case "Today":
				selectDateToday(y, m, d);
				break;
			case "Yesterday":
				selectDateYesterday(y, m, d);
				break;
			case "Last 7 Days":
				selectDateSeven(y, m, d);
				break;
			case "Last 30 Days":
				selectDateThirty(y, m, d);
				break;
			case "This Month":
				selectDateThisMonth(y, m, d);
				break;
			case "Last Month":
				selectDateLastMonth(y, m, d);
				break;
			case "Custom":
				selectDateCustom(y, m, d);
				break;
		}
	})
	$("input[value='取消']").click(function(){
		$(".angle-wrapper").css("display","none");
		$(".selectDateDiv").removeClass("newSelectDateDiv");
		$(".angle-wrapper").removeClass("newAngle-wrapper");
		$(".angle-wrapper form").removeClass("newForm");
	})
	//计算所有
	function selectDateAll(y, m, d){
		f = "01/01/2000";
		l = d+ "/" + m + "/" + y ;
		update(f,l);
	}
	
	//计算今天
	function selectDateToday(y, m, d){
		f = d + "/" + m + "/" + y ;
		l = d + "/" + m + "/" + y ;
		update(f,l);
	}
	
	//计算昨天的日期
	function selectDateYesterday(y, m, d){
		
		//计算昨天 有以下几种可能
		//1.day-1
		if (d>1) {
			d--;
		} else if (m>1) {//2.month-1  day变为最大
			m--;
			switch(m) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
					d = 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					d = 30;
					break;
				case 2:
					if ( ((y%4 == 0)&&(y%100 != 0)) || (y%400 == 0) ) {
						d = 29;
					} else {
						d = 28;
					}
					break;
			}
		} else {//3.year-1,12-31
			y--;
			m = 12;
			d = 31;
		}
		f = d + "/" + m + "/" + y ;
		l = d + "/" + m + "/" + y ;
		update(f,l);
	}
	
	//计算 当前日期  的  7 天前的日期
	function selectDateSeven(y, m, d){
		if (d > 7) {
			d = d - 7;
		} else if (m > 1){
			m--;
			switch(m) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
					d += 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					d += 30;
					break;
				case 2:
					if ( ((y%4 == 0)&&(y%100 != 0)) || (y%400 == 0) ) {
						d += 29;
					} else {
						d += 28;
					}
					break;
			}
			d = d - 7;
		} else {
			y--;
			m = 12;
			d = d + 24;
		}

		f = d + "/" + m + "/" + y ;
		update(f,l);
	}
	
	//计算 当前日记  的  30天前的日期
	function selectDateThirty(y, m, d){
		if (d == 31){
			d = 1;
		} else {
			switch (m){
				case 2:
				case 4:
				case 6:
				case 8:
				case 9:
				case 11:
					m--;
					d++;
					break;
				case 5:
				case 7:
				case 10:
				case 12:
					m--;
					break;
				case 1:
					y--;
					m = 12;
					d++;
					break;
				case 3:
					if ( ((y%4 == 0)&&(y%100 != 0)) || (y%400 == 0) ) {
						d += 29;
					} else {
						d += 28;
					}
					if(d > 30){
						m = 2;
						d = d - 30;
					} else {
						m = 1;
						d++;
					}
					break;
			}

		}
		d++;
		f = d + "/" + m + "/" +y ;
		update(f,l);
	}
	
	//计算 当前日期  的  当月的日期
	function selectDateThisMonth(y, m, d){
		switch(m) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
					d = 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					d = 30;
					break;
				case 2:
					if ( ((y%4 == 0)&&(y%100 != 0)) || (y%400 == 0) ) {
						d = 29;
					} else {
						d = 28;
					}
					break;
			}

		f ="01"+ "/" + m + "/" + y ;
		l = d + "/" + m + "/" + y ;
		update(f,l);
	}
	
	//计算 当前日期  的  上个月的日期
	function selectDateLastMonth(y, m, d){
		if (m>1) {
			m--;
			switch(m) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
					d = 31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					d = 30;
					break;
				case 2:
					if ( ((y%4 == 0)&&(y%100 != 0)) || (y%400 == 0) ) {
						d = 29;
					} else {
						d = 28;
					}
					break;
			}
		} else {
			y--;
			m = 12;
			d = 31
		}

		f = "01" + "/" + m + "/" + y ;
		l = d + "/" + m + "/" + y ;
		update(f,l);
	}
	
	//更新日期
	function update(f,l){
		$(".dataDrop").val(f+"-"+l);
		$("input[id=datepicker]").val(f);
		$("input[id=datepicker2]").val(l);
	}
	

	$( "#datepicker" ).datepicker();
	$( "#datepicker2" ).datepicker();
	
	 
});
		  
