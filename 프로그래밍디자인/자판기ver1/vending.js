var restcoin = 500; // 자판기가 가지고 있는 잔액
var insertcoins = 0; // 투입금액
var beverage_stock = {};
beverage_stock['캔커피']= 10; // 개수
beverage_stock['소다']= 10;
beverage_stock['생수']= 10;

function insert(){
    var insertcoin = document.getElementById('insertcoin').value;
    if (insertcoin == ''){
        alert('금액을 투입하세요!');
        return
    }
    else {``
        document.getElementById('order').innerHTML = insertcoin+'원을 투입.';
        if (insertcoin < 500){
            alert('투입 금액 부족');
        }
        else {
            alert('투입금액 정상 처리!');
            return insertcoin; // 반환
        }
    }
}

function pay(can, val){ // 캔 유형, 캔 가격(val)
    var insertcoin = insert();

    // can 1: 커피 2: 소다 3: 물
    if (can == "1"){
        count = document.getElementById('coffeenum').value; // 캔 개수
        var totalprice = parseInt(count) * val;
        var changecoin = insertcoin - totalprice;

        if (totalprice>insertcoin){
            alert('동전을 더 넣으세요');
        }
        else {
            document.getElementById('result').innerHTML+= '<br>'+'캔커피는 '+ count+'개 총 '+totalprice+'원 계산 됨'+'<br>';
            document.getElementById('result').innerHTML+= '<br>'+'거스름돈은 '+ changecoin+'원 입니다.'+'<br>';
            document.getElementById('coffeestate').style.backgroundColor='red';
            document.getElementById('coffeestate').innerHTML='판매완료';
            document.getElementById('coffeestate').style.color='white';


        }

    }
    else if (can == "2"){
        count = document.getElementById('sodanum').value; // 캔 개수
        var totalprice = parseInt(count) * val;
        var changecoin = insertcoin - totalprice;

        if (totalprice>insertcoin){
            alert('동전을 더 넣으세요');
        }
        else {
            document.getElementById('result').innerHTML+= '<br>'+'소다는 '+ count+'개 총 '+totalprice+'원 계산 됨'+'<br>';
            document.getElementById('result').innerHTML+= '<br>'+'거스름돈은 '+ changecoin+'원 입니다.'+'<br>';
            document.getElementById('sodastate').style.backgroundColor='red';
            document.getElementById('sodastate').innerHTML='판매완료';
            document.getElementById('sodastate').style.color='white';
        }

    }
    else if (can == "3"){
        count = document.getElementById('waternum').value; // 캔 개수
        var totalprice = parseInt(count) * val;
        var changecoin = insertcoin - totalprice;

        if (totalprice>insertcoin){
            alert('동전을 더 넣으세요');
        }
        else {
            document.getElementById('result').innerHTML+= '<br>'+'물은 '+ count+'개 총 '+totalprice+'원 계산 됨'+'<br>';
            document.getElementById('result').innerHTML+= '<br>'+'거스름돈은 '+ changecoin+'원 입니다.'+'<br>';
            document.getElementById('waterstate').style.backgroundColor='red';
            document.getElementById('waterstate').innerHTML='판매완료';
            document.getElementById('waterstate').style.color='white';
        }

    }
}