let num = prompt('Введите номер задания');
switch(num){
case '1':
console.log('1 Задание');
let speed;
let conv_to;
function convertSpeed(speed, conv_to) {
    if(conv_to==='toKMH'){
speed= prompt ("Введите скорость в км/ч");
console.log(`convertSpeed(${speed},'toKMH') -> '${speed*1000/3600} км/ч'`);
    }
    else if(conv_to==='toMS'){
        speed= prompt ("Введите скорость в м/с");
        console.log(`convertSpeed(${speed},'toMS') -> '${speed*3600/1000} м/с'`);
    }
}
convertSpeed(speed=0, conv_to='toMS');

convertSpeed(speed=0, conv_to='toKMH');
break;
case '2':
    
    function absValue(value){
        //let value = prompt('Введите число');
        if(value<0){
            //console.log(`${value}`);
            console.log(`absValue(${value})-> ${value*(-1)}`);
        }
        else{console.log(`absValue(${value})-> ${value}`);}
    }
    absValue(prompt('Введите число'));
    break;
case '3':
    let student = {
        group: 201,
        last_name: "Иванов",
        first_name: "Иван"
        };
        console.log('Список свойств: group, last_name, first_name');
        console.log(`Студент ${student.first_name} ${student.last_name} учится в ${student.group} группе`);
        break;
case '4':
    let min= prompt('Введите левый передел');
    let max= prompt('Введите правый передел');
function sampleArray(min, max){
    return Math.floor(Math.random() * (max - min)) + parseInt(min);
}
console.log(`${sampleArray(min, max)}`);
break;
case '5':
    let mass = [1,2,3,4];
    let mass1 = [];
    let count = prompt('Введите количество чисел от 1 до 4');
    for(let i=0;i<count;i++){
        mass1[i]=mass[sampleArray(0,4)];
    }
    console.log(`sampleArray([${mass}], ${count}) -> [${mass1}]`);
    break;
}

