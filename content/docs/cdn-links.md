---
id: cdn-links
title: CDN Links
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

React va ReactDOM ikkalasi ham CDN orqali mavjud.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

Yuqoridagi versiyalar faqat dasturlash uchun mo'ljallangan va foydalanuv uchun mos emas. React-ning minimallashtirilgan va optimallashtirilgan  foydalanuv versiyalari quyidagi CDN lar orqali mavjud:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

`React` va `React-dom` ning ma'lum bir versiyasini yuklash uchun `16` raqamini versiya raqami bilan almashtiring.

### Nima uchun `crossorigin` Atributi? {#why-the-crossorigin-attribute}

Agar siz React ni CDN orqali ishlatmoqchi bo'lsangiz, [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) atributini qo'shishni tavsiya etamiz:

```html
<script crossorigin src="..."></script>
```

Siz foydalanayotgan CDN-ning `Access-Control-Allow-Origin: *` HTTP headerini o'rnatganligini tekshirishni tavsiya etamiz.

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Bu React 16 va undan keyingi versiyalarida [xatolarni boshqarish tajribasi](/blog/2017/07/26/error-handling-in-react-16.html) ni yaxshilaydi.
