var restcoin =0; // 자판기가 가지고 있는 잔액
var insertcoin = 0; // 투입금액
var totalprice = 0;

function Beverage(name, price, stock, company){
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.company = company;
}

Beverage.prototype.Calculate = function(num){
    var beverage_price = this.price * num;
    return beverage_price;
}

Beverage.prototype.Stock = function(){ // 매개변수 X, 받는대로 그냥 주는 쓸모없는 함수
    var beverage_stock = this.stock;
    return beverage_stock;
}

function insert(){
    insertcoin = parseInt(document.getElementById('insertcoin').value);
    if (insertcoin == ''){
        alert('금액을 투입하세요!');
        return
    }
    else {
        document.getElementById('restcoin').innerHTML= '현재 잔고'+insertcoin +'원'
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
function init(){
    document.getElementById('insertcoin').value = 0;
    document.getElementById('coffeenum').value = 0;
    document.getElementById('sodanum').value = 0;
    document.getElementById('waternum').value = 0;

}

function pay(can, val){ // 캔 유형, 캔 가격(val)
    var insertcoin = insert();

    var coffeenum = document.getElementById('coffeenum').value ;
    var sodanum = document.getElementById('sodanum').value;
    var waternum = document.getElementById('waternum').value;

    var beverage_coffee = new Beverage('캔커피', 800, 10, '상명');
    cancoffee_total_price = beverage_coffee.Calculate(coffeenum);

    var beverage_soda = new Beverage('소다', 600, 10, '상명대');
    soda_total_price = beverage_soda.Calculate(sodanum);

    var beverage_water = new Beverage('물', 500, 10, '상명대학교');
    water_total_price = beverage_water.Calculate(waternum);

    totalprice = cancoffee_total_price+soda_total_price+water_total_price;
    var changecoin = insertcoin - totalprice;

    if (totalprice>insertcoin){
        alert('동전을 더 넣으세요');
        return
    }
    else {
        document.getElementById('result').innerHTML += '캔커피 ' + coffeenum + '개 ' + beverage_coffee.Calculate(coffeenum)+'원'+'<br>';
        document.getElementById('result').innerHTML += '소다 ' + sodanum + '개 ' + beverage_soda.Calculate(sodanum)+'원'+'<br>';
        document.getElementById('result').innerHTML += '물 ' + waternum + '개 ' + beverage_water.Calculate(waternum)+'원'+'<br>';
        if (coffeenum >=1){
            var cancoffee_stock = beverage_coffee.Stock()-coffeenum;
            document.getElementById('cancoffeestock').innerHTML= '재고 '+cancoffee_stock +' 개';
        }
        if (sodanum>=1){
            var soda_stock = beverage_soda.Stock()-sodanum;
            document.getElementById('sodastock').innerHTML= '재고 '+ soda_stock +' 개';
        }
        if (waternum>=1){
            var water_stock = beverage_water.Stock()-waternum;
            document.getElementById('waterstock').innerHTML= '재고 '+water_stock+' 개';
        }
        document.getElementById('result').innerHTML += '총 결제 금액' + totalprice+'원'+'<br>';
        document.getElementById('result').innerHTML += '거스름돈' + changecoin +'원' +'<br>';
        restcoin = changecoin
        document.getElementById('restcoin').innerHTML = '현재 잔고는' + restcoin +'원 입니다.';
    }

    init();

}