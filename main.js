let num = prompt("Введите номер задания");
switch (num) {
  case "1":
    function convertSpeed(speed, conv_to) {
        if (conv_to === "toKMH") {
          return speed / 3.6;
  
        } else if (conv_to === "toMS") {
          return speed * 3.6;
        }
    }


    let speed = prompt("Введите скорость в км/ч");
    console.log(convertSpeed(speed, "toMS"));

    speed = prompt("Введите скорость к м/с")
    console.log(convertSpeed(speed, "toKMH"));
    
    break;

  case "2":
    function absValue(value) {
        if (value > 0) {
            return value
        }
        else return -1*value;
    }

    number = prompt("Введите число чтобы узнать модуль")
    
    console.log(`${absValue(number)}`);
    break;

  case "3":
    let student = {
      group: 201,
      last_name: "Иванов",
      first_name: "Иван",
    };

    
    let str=``
    for (key in student){
        str +=`${key} `;
    }

    console.log(`${str}`);
    console.log(
      `Студент ${student.first_name} ${student.last_name} учится в ${student.group} группе`
    );
    break;

  case "4":
    function sampleArray(min, max) {
        return Math.floor(Math.random() * (max - min)) + parseInt(min);
    }  

    let min = prompt("Введите левый передел");
    let max = prompt("Введите правый передел");
    
    console.log(sampleArray(min, max));
    break;

  case "5":
    let mass = [1, 2, 3, 4];
    let mass1 = [];
    let count = prompt("Введите количество чисел от 1 до 4");
    for (let i = 0; i < count; i++) {
      mass1[i] = mass[sampleArray(0, 4)];
    }
    console.log(`[${mass}] -> [${mass1}]`);
    break;
}
