function on_key_down(){
    var keycode = event.keyCode;
    if (keycode === 13){ // Enter를 누르면
        Calculate();
    }
}

function setValue(val){
    var oper_result = document.getElementById('operating_display');
    oper_result.value = oper_result.value+val;
}

function Calculate(){
    var oper_result = document.getElementById('operating_display').value;
    var result = eval(oper_result);

    document.getElementById('result_display').value= result;
    document.getElementById('result_display_accum').innerHTML += document.getElementById('operating_display').value+'='+result+'<br>';
}

function AC(){
    document.getElementById('operating_display').value='';
    document.getElementById('result_display').value='';
}

function change_operand_button_color(){
    var color=document.getElementById("color_box").value
    document.getElementById("divide_button").style.backgroundColor=color
    document.getElementById("multiply_button").style.backgroundColor=color
    document.getElementById("minus_button").style.backgroundColor=color
    document.getElementById("plus_button").style.backgroundColor=color
}