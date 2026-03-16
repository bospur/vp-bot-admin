# VP Bot Admin

Панель управления контентом для Telegram Mini App ветеринарной клиники.

## Стек

| Инструмент | Назначение |
|---|---|
| Vite + React + TypeScript | Основа |
| MUI v7 | UI-компоненты |
| React Router v7 | Роутинг |
| TanStack Query v5 | Серверное состояние |
| TanStack Table v8 | Таблицы |
| React Hook Form + Valibot | Формы и валидация |
| Axios | HTTP-клиент |
| React Context | Auth состояние |

## Архитектура (Feature-Sliced Design)

```
src/
├── data/source/          # axios-вызовы к API
├── modules/
│   └── {name}/
│       ├── domain/       # типы, константы
│       └── features/
│           └── {Component}/
│               ├── useLogic.ts   # вся логика
│               ├── index.tsx     # чистый TSX
│               └── styles.ts     # MUI sx-объекты
├── screens/              # страницы + роутинг
├── shared/
│   ├── config/           # env, AuthContext
│   ├── theme/            # MUI тема (единый источник токенов)
│   └── ui/               # переиспользуемые компоненты
```

**Правила:**
- Вся логика в `useLogic.ts`, TSX остаётся чистым
- Стили только через MUI `sx` + `styles.ts`, без хардкода значений
- Серверное состояние — TanStack Query, Auth — React Context
- Глобального store нет

## Запуск локально

```bash
cp .env.example .env   # заполни VITE_API_URL
npm install
npm run dev
```

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_API_URL` | Базовый URL бэкенда | `https://api.example.com` |

## API

Бэкенд: `vp-bot-server` (Go + PostgreSQL)

### Авторизация

```
POST /api/admin/login
Body: { "login": "string", "password": "string" }
Response: { "token": "jwt_string" }
```

Все защищённые запросы: заголовок `Authorization: Bearer <token>`

### Контент (защищённые роуты)

| Метод | URL | Описание |
|---|---|---|
| POST | `/api/admin/animals` | Создать животное |
| PUT | `/api/admin/animals/{id}` | Обновить животное |
| DELETE | `/api/admin/animals/{id}` | Удалить животное |
| POST | `/api/admin/categories` | Создать категорию |
| PUT | `/api/admin/categories/{id}` | Обновить категорию |
| DELETE | `/api/admin/categories/{id}` | Удалить категорию |
| POST | `/api/admin/articles` | Создать статью |
| PUT | `/api/admin/articles/{id}` | Обновить статью |
| DELETE | `/api/admin/articles/{id}` | Удалить статью |

## Деплой

Сборка: `npm run build` → папка `dist/`
Nginx отдаёт `dist/` по пути `/admin` на домене `api.snzbeachvolleyball25.ru`
CI/CD: GitHub Actions деплоит при пуше в ветку `dev`

## Статус разработки

- [x] Проект, зависимости, архитектура
- [x] MUI тема (бело-зелёная)
- [x] Auth: JWT, AuthContext, axios interceptor
- [x] Уведомления: NotificationContext (Snackbar)
- [x] Экран логина (RHF + Valibot, обработка ошибок)
- [ ] Layout: AppBar + Sidebar
- [ ] CRUD: Животные
- [ ] CRUD: Категории
- [ ] CRUD: Статьи
- [ ] Деплой
