// console.log('1 Задание');
// let km_h = prompt("Введите скорость в км/ч");
// let m_s = prompt("Введите скорость в м/с");
// console.log(`${km_h} км/ч соответствует ${km_h*1000/3600} м/с`); 
// console.log(`${m_s} м/с соответствует ${m_s*3600/1000} км/ч`)

// console.log('2 Задание');

// let a = prompt("1 сторона");
// let b = prompt("2 сторона");
// let c = prompt("3 сторона");

// if(a+b<c && a+c<b && c+b<a){
//     console.log('треугольник не существует');
// } else{
//     let p = a+b+c;
//     let s=Math.sqrt(p/2*(p/2-a)*(p/2-b)*(p/2-c));
//     console.log('треугольник существует'); 
//     console.log(`Периметр = ${p}`); 
//     console.log(`Площадь = ${s}`); 
//     console.log(`Соотношение = ${s/p}`)
// }           isNaN(num)

console.log('3 Задание');

let num = prompt("Введите число");
while(isNaN(num)){
    console.log("Вы ввели не число"); 
    num = prompt("Введите число");
}
for(let i =0; i<=num; i++){
    if(i%2===0 && i%5!==0)  console.log(`${i} buzz`);
   else if(i%2!==0 && i%5!==0)  console.log(`${i} fizz`);
   else if(i%5===0 && i!==0)  console.log(`${i} fizz buzz`);
   else if(i===0)  console.log(`${i} buzz`);
   

}


// console.log('4 Задание');

// let str;
// for (let i=1; i<13; i++){
//    if(i%2===0) str="#";
//    else str="*";
//    console.log(`${str.repeat(i)}`);
// }
// console.log('||');


// console.log('5 Задание');

// const number_s = 10;
// let number_q;
// while (true){
//     number_q = prompt("Введите число");
//     if(number_q < number_s) console.log('"ваше число меньше"');
//     else if (number_q > number_s) console.log('"ваше число больше"');
//     else {
//         console.log('"угадано"');
//         break;
//     }
// }

// console.log('6 Задание');
// let res;
 
//  let n = prompt("Введите число n");
//  let x = prompt("Введите число x");
//  let y = prompt("Введите число y");
//  if(n%x===0 && n%y===0) res = "true"
//  else res = "false";
//  console.log(`n = ${n}, x = ${x}, y = ${y} => ${res}`);
 

// console.log('7 Задание');
// let quarter;
// let mounth = prompt("Введите номер месяца");
// if(mounth<4) quarter = 1;
// else if(mounth<7) quarter = 2;
// else if(mounth<10) quarter = 3;
// else if(mounth<13) quarter = 4;
// console.log(`месяц ${mounth} => ${quarter}`);
