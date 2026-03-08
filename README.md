# React + TypeScript + Vite
# Домашнє завдання 3 – Пошук фільмів (React + TypeScript)

## Опис
Третє домашнє завдання з TypeScript.  
Практика створення повноцінного пошукового інтерфейсу для фільмів з використанням API TMDB, типізацією всіх компонентів, асинхронних запитів, модального вікна, обробки помилок, лоадера та toast-повідомлень.

Це класичний проєкт «Movie Search» з пошуком, сіткою карток, детальним переглядом у модалці та коректною обробкою станів завантаження/помилок.

## Технології / стек
- React
- TypeScript
- Vite (або CRA) + React Strict Mode
- HTTP-запити: **axios**
- Сповіщення: **react-hot-toast**
- Портали: `createPortal` (для модального вікна)
- CSS-модулі (module.css)
- Асинхронні функції та try/catch/finally
- Типізація API-відповідей та стану
- Lazy loading зображень (`loading="lazy"`)

## Структура проєкту

| Файл / Компонент              | Призначення                              | Основні типи / особливості                              |
|-------------------------------|------------------------------------------|------------------------------------------------------------------|
| src/types/movie.ts            | Інтерфейс Movie                          | `id`, `title`, `poster_path`, `backdrop_path`, `overview` тощо   |
| src/services/movieService.ts  | Запит до TMDB API                        | `fetchMovies(query): Promise<Movie[]>` з типізацією axios       |
| src/components/App/App.tsx    | Головний компонент                       | `useState<Movie[]>`, `useState<Movie | null>`, обробка пошуку   |
| src/components/SearchBar      | Форма пошуку                             | `onSubmit: (query: string) => void`, toast при порожньому запиті |
| src/components/MovieGrid      | Сітка карток фільмів                     | `movies: Movie[]`, `onSelect: (movie: Movie) => void`           |
| src/components/MovieModal     | Модальне вікно з деталями фільму         | `createPortal`, закриття по Esc / backdrop, `movie: Movie`      |
| src/components/Loader         | Індикатор завантаження                   | Показується під час запиту                                      |
| src/components/ErrorMessage   | Повідомлення про помилку                 | Статичний текст при помилці запиту                              |
| .env                          | Змінні оточення                          | `VITE_TMDB_TOKEN` — ключ доступу до TMDB API                    |

## Основні типи

```ts
// src/types/movie.ts
export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
```
## Типізація запиту:
TypeScriptexport const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<{ results: Movie[] }>(
    "https://api.themoviedb.org/3/search/movie",
    { params: { ... }, headers: { Authorization: `Bearer ${...}` } }
  );
  return response.data.results;
};

## Функціонал

Пошук фільмів за назвою через TMDB Search API
Відображення сітки карток (постер + назва)
Клік по картці → відкривається модальне вікно з:
великим фоновим зображенням (backdrop)
описом, датою виходу, рейтингом

Закриття модалки: кнопка ×, клік по backdrop, клавіша Esc
Стани:
завантаження → показ Loader
помилка → показ ErrorMessage
немає результатів → toast.error("No movies found...")
порожній запит → toast.error("Please enter your search query.")

Powered by TMDB посилання в хедері

## Посилання

Демо [посилання](https://03-react-movies-13gu.vercel.app)
