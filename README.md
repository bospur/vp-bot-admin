# vp-bot-admin

Административная панель для ветеринарного Telegram Mini App.
Позволяет управлять контентом: животные, категории симптомов, статьи первой помощи.

**Prod:** https://admin.snzbeachvolleyball25.ru

## Стек

| Инструмент | Назначение |
|---|---|
| Vite 8 + React 19 + TypeScript | Основа |
| MUI v7 | UI-компоненты |
| React Router v7 | Роутинг |
| TanStack Query v5 | Серверное состояние |
| TanStack Table v8 | Таблицы |
| React Hook Form + Valibot | Формы и валидация |
| TipTap v2 | WYSIWYG редактор статей |
| Axios | HTTP-клиент |
| emoji-picker-react | Выбор иконок |

## Запуск локально

```bash
npm install
cp .env.example .env.local   # задай VITE_API_URL и VITE_CLINIC_SLUG
npm run dev
```

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_API_URL` | Базовый URL бэкенда | `https://api.snzbeachvolleyball25.ru` |
| `VITE_CLINIC_SLUG` | Slug клиники | `default` |

## Статус

- [x] Auth: JWT, AuthContext, axios interceptor
- [x] Layout: AppBar + Sidebar (mobile hamburger)
- [x] CRUD: Животные (таблица/карточки + emoji picker)
- [x] CRUD: Категории (аккордеон по животным + emoji picker)
- [x] CRUD: Статьи (список + full-page WYSIWYG редактор)
- [x] TipTap редактор: H1/H2/H3, bold, italic, списки
- [x] Авто-slug из заголовка (транслитерация)
- [x] Привязка статей к категориям (чекбоксы)
- [x] Деплой: GitHub Actions → VPS (scp)
- [x] Bundle оптимизация: lazy routes + manual chunks
- [ ] Mini App (vp-bot-app) — не начат

## Документация

- [Архитектура](docs/architecture.md)
- [Деплой](docs/deployment.md)
- [Инструкция для пользователя](docs/user-guide.md)
