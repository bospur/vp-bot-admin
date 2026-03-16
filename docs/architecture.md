# Архитектура фронтенда

## Структура проекта (FSD)

```
src/
├── App.tsx                        — роутинг, lazy loading экранов
├── main.tsx                       — точка входа
│
├── data/
│   └── source/                    — axios вызовы к API
│       ├── axiosInstance.ts       — axios с Bearer interceptor
│       ├── animals.ts
│       ├── categories.ts
│       └── articles.ts
│
├── modules/                       — бизнес-модули
│   ├── animals/
│   │   ├── domain/types.ts        — Animal, AnimalFormValues
│   │   └── features/
│   │       ├── AnimalsTable/      — таблица / карточки + useLogic + styles
│   │       └── AnimalFormDialog/  — диалог создания/редактирования + useLogic
│   ├── categories/
│   │   ├── domain/types.ts        — Category, CategoryRow, CategoryFormValues
│   │   └── features/
│   │       ├── CategoriesTable/   — аккордеон по животным + таблица/карточки
│   │       └── CategoryFormDialog/
│   └── articles/
│       ├── domain/types.ts        — Article, ArticleFormValues
│       └── features/
│           └── ArticlesTable/     — таблица / карточки
│
├── screens/                       — страницы (Layout + модули)
│   ├── LoginScreen/
│   ├── AnimalsScreen/
│   ├── CategoriesScreen/
│   ├── ArticlesScreen/            — список статей
│   └── ArticleEditorScreen/       — full-page редактор статьи
│
└── shared/
    ├── config/
    │   ├── env.ts                 — API_BASE_URL, CLINIC_SLUG
    │   └── AuthContext.tsx        — JWT в localStorage, useAuth()
    ├── theme/
    │   └── theme.ts               — MUI тема (primary=#2e7d32, зелёная)
    └── ui/
        ├── Layout/                — Drawer sidebar + AppBar + hamburger
        ├── ProtectedRoute.tsx     — редирект на /login если нет токена
        ├── ConfirmDialog/         — переиспользуемый диалог подтверждения
        ├── Notification/          — NotificationContext, useNotification()
        └── RichTextEditor/        — TipTap WYSIWYG обёртка
```

## Паттерны

### Структура фичи
Каждая фича (компонент с логикой) состоит из трёх файлов:
```
features/MyFeature/
├── index.tsx      — JSX компонент (только разметка)
├── useLogic.ts    — хуки, мутации, состояние
└── styles.ts      — MUI sx объекты (вынесены для чистоты JSX)
```

### Запросы к API (TanStack Query)
```ts
// Чтение
const { data, isLoading } = useQuery({ queryKey: ['animals'], queryFn: getAnimals });

// Мутация
const mutation = useMutation({
  mutationFn: (id) => deleteAnimal(id),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['animals'] }),
});
```

### Формы (React Hook Form + Valibot)
```ts
const schema = v.object({ name: v.pipe(v.string(), v.minLength(1, 'Обязательно')) });
const form = useForm({ resolver: valibotResolver(schema) });
```

### Авторизация
`AuthContext` хранит JWT в `localStorage`. `axiosInstance` автоматически добавляет `Authorization: Bearer <token>` ко всем запросам через interceptor.

## Роутинг

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/login` | LoginScreen | Форма входа |
| `/animals` | AnimalsScreen | CRUD животных |
| `/categories` | CategoriesScreen | CRUD категорий |
| `/articles` | ArticlesScreen | Список статей |
| `/articles/new` | ArticleEditorScreen | Создание статьи |
| `/articles/:id/edit` | ArticleEditorScreen | Редактирование статьи |

Все защищённые маршруты обёрнуты в `ProtectedRoute`.

## Мобильная адаптация

- Layout `<md` → временный Drawer с hamburger кнопкой
- Таблицы `<sm` → card view (Paper карточки)
- Кнопки `<sm` → только IconButton (без текста)

## Оптимизация бандла

- `React.lazy()` + `<Suspense>` для всех экранов
- `manualChunks` в `vite.config.ts` — вендоры в отдельных чанках

| Чанк | Содержимое | Размер (gzip) |
|------|-----------|---------------|
| vendor-mui | @mui/material, @mui/icons-material, @emotion | ~96 kB |
| vendor-tiptap | @tiptap/*, prosemirror-* | ~90 kB |
| vendor-emoji | emoji-picker-react | ~77 kB |
| vendor-react | react, react-dom, react-router-dom | ~80 kB |
| vendor-query | @tanstack/react-query, @tanstack/react-table | ~23 kB |

## TipTap редактор

`shared/ui/RichTextEditor` — обёртка над TipTap с MUI-стилизованным тулбаром.

Поддерживаемые форматы: H1, H2, H3, жирный, курсив, маркированный список, нумерованный список.

Контент сохраняется как HTML-строка. Бот конвертирует HTML в Telegram-формат на стороне сервера.
