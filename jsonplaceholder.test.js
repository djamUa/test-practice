const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {
  
  // Тест для отримання списку всіх постів
  test('GET /posts - Отримання списку постів', async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    
    expect(response.status).toBe(200); // Перевірка статусу відповіді
    expect(Array.isArray(response.data)).toBe(true); // Перевірка, чи відповідь є масивом
    expect(response.data.length).toBeGreaterThan(0); // Перевірка, що масив не порожній

    // Додаткові перевірки для першого поста
    const firstPost = response.data[0];
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
  });

  // Тест для отримання одного поста за ID
  test('GET /posts/1 - Отримання поста за ID', async () => {
    const response = await axios.get(`${BASE_URL}/posts/1`);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1); // Перевірка, чи є в відповіді потрібний ID
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
  });

  // Тест для створення нового поста
  test('POST /posts - Створення нового поста', async () => {
    const newPost = {
      title: 'New Post',
      body: 'This is a new post body',
      userId: 1,
    };

    const response = await axios.post(`${BASE_URL}/posts`, newPost);
    
    expect(response.status).toBe(201); // Перевірка статусу відповіді
    expect(response.data).toHaveProperty('id'); // Перевірка, що в відповіді є новий ID
    expect(response.data.title).toBe(newPost.title); // Перевірка відповідності даних
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
  });

  // Тест для оновлення поста
  test('PUT /posts/1 - Оновлення існуючого поста', async () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Post Title',
      body: 'This is an updated post body',
      userId: 1,
    };

    const response = await axios.put(`${BASE_URL}/posts/1`, updatedPost);
    
    expect(response.status).toBe(200); // Перевірка статусу відповіді
    expect(response.data.title).toBe(updatedPost.title); // Перевірка, що заголовок був оновлений
    expect(response.data.body).toBe(updatedPost.body); // Перевірка, що тіло поста було оновлене
  });

  // Тест для видалення поста
  test('DELETE /posts/1 - Видалення поста за ID', async () => {
    const response = await axios.delete(`${BASE_URL}/posts/1`);
    
    expect(response.status).toBe(200); // Перевірка статусу відповіді
  });
  
});
