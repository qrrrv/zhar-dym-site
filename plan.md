# План реализации

## Цель
Одностраничный публичный сайт шашлычной «Жар & Дым» на русском языке: меню, оффер, доверие, контакты и быстрый сценарий заказа.

## Архитектура
- Статический frontend без backend: `index.html`, `styles.css`, `script.js`.
- Публикация как static output; интерактивность реализуется браузером.
- Один indexable route `/`; служебный route manifest `/manus-routes.json`.
- Публичный HTML содержит весь ключевой контент без зависимости от JavaScript.

## Структура
- `index.html`: семантичные секции hero, menu, benefits, fire-process, reviews, visit и footer; SEO/social metadata; inline SVG logo/fallback.
- `styles.css`: дизайн-токены Material 3, responsive breakpoints, tonal surfaces, motion.
- `script.js`: фильтр меню, корзина-счётчик, toast feedback, mobile nav, текущий год.
- `assets/hero-grill.png`: уникальный hero-ассет с фактурой огня и мяса.
- `public/manus-routes.json`: полный manifest текущих страниц.
- `app.config.ts`: project logo metadata.

## Визуальное направление
Material Hearth из `ideas.md`: кремовый фон, burnt orange, ink brown, sage, Space Grotesk + Inter, мягкие крупные скругления и editorial-композиция.

## Deployment
Статическая раздача: dev server на порту 3000, production build копирует файлы в `dist/`; публикационный контракт — `npm run build` с `dist` как outputDirectory. Versioned assets можно кешировать долго; HTML остаётся revalidatable. Backend и database не нужны.

## Проверка
- `npm run check` для проверки обязательных файлов и JSON manifest.
- `npm run build` для production output.
- HTTP readiness на `/`, `/manus-routes.json`, `/assets/hero-grill.png`.
- Исходный HTML содержит содержательный body и SEO metadata.
- Интерактивы проверяются code review и локальным smoke test без обязательной browser-сессии.
