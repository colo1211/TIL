var count=0;
function myRandom(min,max){
    var value = Math.floor(Math.random() *(max-min+1)) + min;
    return value;
}
function yutGame(){
    var result = myRandom(1,5);
    if (result == 1){
        document.getElementById('result').innerHTML += '도';
    }
    else if(result==2){
        document.getElementById('result').innerHTML += '개';
    }
    else if(result==3){
        document.getElementById('result').innerHTML += '걸';
    }
    else if(result==4){
        document.getElementById('result').innerHTML += '윷';
    }
    else if(result==5){
        document.getElementById('result').innerHTML += '모';
    }
}

function yut(){
    var game = confirm('윷 던질까?'); // 프롬프트 창에서 False or True 로 리턴
    count +=1
    if (game===true){
        yutGame();
    }
    else if(game === false){
        alert('게임 종료');
        document.getElementById('result').innerHTML+= (count-1) +'회 던졋음';
        return
    }
    else {
        alert('입력오류');
        return
    }
}