// 1번
function Cal(){
    var num1= Number(prompt("숫자를 입력하세요_1"));
    var num2= Number(prompt("숫자를 입력하세요_2"));

    var hap = num1 + num2;
    var cha = num1 - num2;
    var gop = num1 * num2;
    var bun = num1 / num2;

    // 텍스트 문서상 결과 출력 .innerHTML
    document.getElementById('result').innerHTML = ` 
     합 : ${hap} </br>
     차 : ${cha} </br>
     곱 : ${gop} </br>
     나누기 : ${bun} </br> 
    `;

    //	두 수를 입력받아 사칙연산 하는 결과를 출력
}

//2번
function Cal2(){
    var num1 = Number(document.getElementById('firstNum').value);
    var num2 = Number(document.getElementById('secondNum').value);

    var oper = operand.options[operand.selectedIndex].value; // 리스트
    //console.log(operand.options);

    if (oper === "hap"){
        var hap = num1 + num2;
        document.getElementById('resultNum').value = hap; // 빈칸 내에 삽입 .value
    }
    else if (oper === "cha"){
        var cha = num1 - num2 ;
        document.getElementById('resultNum').value = cha;
    }
    else if (oper === "gop"){
        var gop = num1 * num2;
        document.getElementById('resultNum').value = gop;
    }
    else {
        var bun  = num1/num2;
        document.getElementById('resultNum').value = bun;
    }
}

// 3번
function GuGuDan(){
    document.getElementById("result4").innerHTML = ' ';
    for (var i=2;i<=9;i++){ // 단
        document.getElementById("result4").innerHTML += "==" + i + "단 =="+"<br>";
        for (var j=1;j<=9;j++){ // 연산
            document.getElementById("result4").innerHTML += i+"*"+j+"="+i*j+"<br>";
        }
    }
}

//5번
function GuGuDan2(){
    var dan = Number(gugudan.options[gugudan.selectedIndex].value);
    document.getElementById("result5").innerHTML =dan+'단'+'<br>';
    for (var i = 2; i <= 9; i++) {
        document.getElementById("result5").innerHTML += dan+'*'+i+'='+dan*i+'<br>';
    }
}

//6번
function Star(){
    var count = Number(document.getElementById('StarNum').value);
    var direct = star.options[star.selectedIndex].value;
    console.log(count, direct);
    if (direct === 'left'){
        document.getElementById('result6').innerHTML = ' ';
        var output = " ";
        for(var i=0; i<=count;i++){
            for (var j=0;j<i;j++){
                output += '*';
            }
            output += "<br>";
        }
        document.getElementById('result6').innerHTML = output;
    }
    else if (direct === 'right') {
            document.getElementById('result6').innerHTML = ' ';
            var output = " ";
            for (var i=0; i<count; i++){
                for (var j=0; j<count-i;j++){
                    output += '&nbsp';
                }
                for (var j=0;j<i+1;j++){
                    output += '*';
                }
                output += '<br>';
            }
            document.getElementById('result6').innerHTML = output;
        }
}