


function maxNumber(numbers) {
    if (numbers.length === 0) return -1; // Возвращаем -1, если массив пуст
    return Math.max(...numbers); // Возвращаем максимальное число в массиве
  }
  
  module.exports = maxNumber;
  