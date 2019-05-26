const getRndImages = (maxArray) => {
		
	const getRndInteger = () => {
		const min = 0;
		const max = maxArray; //Установить максимальный размер массива max + 1 = количеству картинок
		return (Math.floor(Math.random() * (max - min + 1) ) + min);
	}
	
	let x, a, b, c, d;

	// Генерация 1-го числа
	x = getRndInteger(); 
	a = x;

	// Генерация 2-го числа
	x = getRndInteger(); 
	while (x === a) 
		x = getRndInteger(); 
	b = x;

	// Генерация 3-го числа
	x = getRndInteger(); 
	while (x === a || x === b) 
		x = getRndInteger(); 
	c = x;

	// Генерация 4-го числа
	x = getRndInteger(); 
	while (x === a || x === b || x === c) 
		x = getRndInteger();
    d = x;
   
	return [a, b, c, d]; 
}
  
export default getRndImages;