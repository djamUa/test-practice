const maxNumber = require('./maxNumbers'); // Подключаем функцию, которую будем тестировать

describe('Тестирование функции maxNumber', () => {
  test.each([
    { numbers: [1, 2, 3, 4, 5], expectedResult: 5 },
    { numbers: [-100, 2, -1, 4, 10], expectedResult: 10 },
    { numbers: [888], expectedResult: 888 }, // Исправлено на 888, так как это единственный элемент
    { numbers: [], expectedResult: -1 } // Это значение возвращается, если массив пустой
  ])('возвращает $expectedResult, когда массив $numbers', ({ numbers, expectedResult }) => {
    expect(maxNumber(numbers)).toBe(expectedResult);
  });
});



