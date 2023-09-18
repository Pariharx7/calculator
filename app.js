let operator = "";
let previousValue = "";
let currentValue = "";
let currentScreen = document.querySelector('.current');
document.addEventListener('DOMContentLoaded',function(){
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.deci');

    let numbers = document.querySelectorAll('.numbers');
   
    let operators = document.querySelectorAll('.operators');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    let deleteButton = document.querySelector('.delete');

    numbers.forEach((number)=>
        number.addEventListener('click', function(e){
            handleNumber(e.target.textContent);
            currentScreen.textContent = currentValue;
        }));

        operators.forEach((op) => op.addEventListener('click', function(e){
            handleOperator(e.target.textContent);
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent = currentValue;
        }));

        clear.addEventListener('click', function(){
            previousValue= '';
            currentValue = '';
            operator = '';
            previousScreen.textContent = '';
            currentScreen.textContent = '';
        });

        equal.addEventListener('click', function(){
            if(currentValue != '' && previousValue != ''){
            calculate();
            previousScreen.textContent = '';
            if(previousValue.length <= 7){
                currentScreen.textContent = previousValue;
            } else{
                currentScreen.textContent = previousValue.slice(0,7) + "...";
            }
        }
        });

        decimal.addEventListener('click', function(){
            addDecimal();
        });

        deleteButton.addEventListener('click', function(){
        deleteNumber();
        })
        
    });
   
function handleNumber(num){
    if(currentValue.length <= 7){
        currentValue += num;
    }
}

function handleOperator(oper){
    operator = oper;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue = previousValue +  currentValue;
    } else if(operator === "-"){
        previousValue -= currentValue;
    } else if (operator === "*"){
        previousValue *= currentValue;
    } else if(operator === "%"){
        previousValue %= currentValue;
    } else{
        previousValue /= currentValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num *1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes('.')){
        currentValue += '.';
    }
}

function deleteNumber(){
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
    currentValue = '';
    previousValue = '';
}