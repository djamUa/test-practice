const axios = require('axios');

// Налаштування інтерсепторів для логування запитів і відповідей
axios.interceptors.request.use((config) => {
  console.log(`Відправляємо запит: ${config.method.toUpperCase()} ${config.url}`);
  return config;
}, (error) => {
  console.error('Помилка при відправці запиту:', error.message);
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  console.log(`Отримано відповідь: ${response.status} ${response.statusText}`);
  return response;
}, (error) => {
  console.error('Помилка у відповіді:', error.message);
  return Promise.reject(error);
});

describe('JSONPlaceholder API Tests', () => {
  // Тест для отримання списку постів
  test('GET /posts - отримання списку постів', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status).toBe(200); // Перевірка статусу відповіді
    expect(Array.isArray(response.data)).toBe(true); // Перевірка, чи відповідь є масивом
    expect(response.data.length).toBeGreaterThan(0); // Перевірка, що масив не порожній
  });

  // Тест для отримання одного поста
  test('GET /posts/1 - отримання поста за ID', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1); // Перевірка, чи є в відповіді потрібний ID
    expect(response.data).toHaveProperty('title'); // Перевірка наявності заголовку
  });

  // Тест для створення нового поста
  test('POST /posts - створення нового поста', async () => {
    const newPost = {
      title: 'New Post',
      body: 'This is a new post body',
      userId: 1,
    };

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    expect(response.status).toBe(201); // Статус створення
    expect(response.data).toHaveProperty('id'); // Перевірка наявності ID у створеному об'єкті
    expect(response.data.title).toBe(newPost.title); // Перевірка відповідності даних
  });

  // Тест для отримання списку користувачів
  test('GET /users - отримання списку користувачів', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data[0]).toHaveProperty('username'); // Перевірка наявності імені користувача
  });

  // Тест для створення нового коментаря
  test('POST /comments - створення нового коментаря', async () => {
    const newComment = {
      postId: 1,
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment.',
    };

    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', newComment);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id'); // Перевірка наявності ID
    expect(response.data.body).toBe(newComment.body); // Перевірка тіла коментаря
  });
});
