function ramen(){
    var getsu = 0;
    var mul = 500;
    var sigan = 4; // 1개당 4분

    alert('라면 조리 준비 완료!');
    getsu = prompt('몇 개의 라면을 끓여볼래?');
    document.getElementById('id1_text').innerHTML +=
        '<br>' + '주문한 라면 ' + getsu + '개를 조리합니다.' + '</br>';

    for(var i=0; i<getsu; i++){
        document.getElementById('id1_text').innerHTML += '<img src="ramen_1.PNG" width="100px" height="100px">';
    }

    mul = mul*getsu;
    sigan = sigan+(getsu*0.2);
    document.getElementById('id1_text').innerHTML += '<br>'+'물의 양은' + mul +'ml'+'넣었습니다.'+'<br>';
    document.getElementById('id1_text').innerHTML += '<br>' +'면과 스프를 ' + getsu + '개 넣었습니다.' +'<br>';
    document.getElementById('id1_text').innerHTML += '<br>' + '조리 시간은 약' + sigan +'분(초)입니다.' +'<br>';

    setTimeout(
        function(){
            document.getElementById('id1_text').innerHTML += '<br>' + '조리가 완료 됨'+'<br>';
            for (var i=0; i<getsu; i++){
                document.getElementById('id1_text').innerHTML += '<img src="ramen_2.PNG" width="100px" height="100px">';
             }
            }
        ,sigan*1000);

}