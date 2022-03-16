---
id: rendering-elements
title: Elementlarni Chizish
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Elementlar React ilovalarining eng kichik qurish bloklari hisoblanadi.

Element siz ekranda ko'rmoqchi bo'lgan narsangizni tasvirlaydi.

```js
const element = <h1>Salom Dunyo!</h1>;
```

Brauzer DOM elementlaridan farqli o'laroq, React elementlari oddiy obyektlar hisoblanadi va ularni yaratish katta kompyuter resurslarini talab qilmaydi. React DOM esa DOM ni React elementlariga mos ravishda yangilashni o'z zimmasiga oladi.

>**Eslatma:**
>
>Kimdir elementlarni keng tarqalgan konsepsiya - "komponent" lar bilan adashtirishi mumkin. Komponentlar [keyingi bo'limda](/docs/components-and-props.html) tanishtiriladi. Komponentlar o'zi elementlardan iborat, biz sizga boshqa mavzularga o'tishdan oldin, bu bo'limni yakunlashingizni maslahat beramiz.

## Elementni DOM ga Chizish {#rendering-an-element-into-the-dom}

Aytaylik HTML faylimizni qayeridadir `<div>` bor:

```html
<div id="root"></div>
```

Buni biz "ildiz" DOM tugunimiz deb ataymiz, chunki ichidagi hamma narsa React DOM orqali boshqariladi.

React bilan qurilgan ilovalar odatda faqat bir dona ildiz DOM tuguni bo'ladi. Agar siz React ni boshqa ishlab turgan ilovaga biriktirmoqchi bo'lsangiz, siz bir biridan alohida bo'lgan bir nechta o'zak DOM elementlarini yaratishingiz mumkin.

React elementini asosiy DOM elementi ichiga chizish uchun, bu ikkisini [`ReactDOM.render()`](/docs/react-dom.html#render) ichiga tashlang:

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

Bu sahifada "Hello, world" deb ko'rsatadi.

## Chizilgan Elementni Yangilash {#updating-the-rendered-element}

React elementlari [o'zgarmas](https://en.wikipedia.org/wiki/Immutable_object) hisoblanadi. Bir marta yaratilgandan keyin, uni bolalari yoki atributlarini o'zgartirolmaysiz. Element kino lentasigadagi bir kadrga o'xshaydi: u ma'lum bir vaqtdagi UI ni tasvirlaydi.

Bizni bilishimizcha, UI ni yangilashning birdan bir yo'li yangi element hosil qilib uni [`ReactDOM.render()`](/docs/react-dom.html#render) ga uzatishdir.

Mana bu soat misoliga e'tibor bering:

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

Bu misol [`ReactDOM.render()`](/docs/react-dom.html#render) ni har soniyada [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) kolbek orqali chaqiradi.

>**Eslatma:**
>
>React ilovalari amalda [`ReactDOM.render()`](/docs/react-dom.html#render)ni faqat bir marta chaqiradi. Keyingi bo'limlarda shunday kodni qanday qilib [holatli komponent](/docs/state-and-lifecycle.html)lar orqali yozishni oʻrganamiz.
>
>Mavzularni sakrab ketmasligingizni maslahat beramiz, chunki bular bir biriga bog'liq.

## React Faqat Zarur Narsalarni Yangilaydi {#react-only-updates-whats-necessary}

React DOM element va uni bolalarini eskisi bilan solishtirib, DOM ni kerakli holatga keltirish uchun faqat zarur bo'lgan joylarini yangilaydi.

Bundan [oldingi misol](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) ni brauzer vositalari orqali ko'zdan kechirishingiz mumkin:

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

Har bir soniyada biz butun bir UI daraxtini tasvirlaydigan element hosil qilishimizga qaramasdan, React DOM faqatgina oʻzgargan matnli elementlarnigina yangilaydi.

Tajribamizdan kelib chiqib aytish mumkinki, UIʼni qanday qilib o'zgartirishdan ko'ra, UI qanday ko'rinishga ega bo'lishi kerakligi haqida o'ylash, anchagina xatolarni bartaraf qiladi.
