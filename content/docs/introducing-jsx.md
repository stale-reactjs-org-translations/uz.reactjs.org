---
id: introducing-jsx
title: JSX ga kirish
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

<<<<<<< HEAD
Quyidagi o'zgaruvchi bayonotiga e'tibor bering:
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Writing Markup with JSX](https://beta.reactjs.org/learn/writing-markup-with-jsx)
> - [JavaScript in JSX with Curly Braces](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Consider this variable declaration:
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

```js
const element = <h1>Salom Dunyo!</h1>;
```

Bu ajoyib yozish uslubi na string na HTML ga o'xshaydi.

Bu JSX deb ataladi, ya'ni JavaScript yozish uslubi kengaytmasi. Biz UI ni qanday ko'rinishga ega bo'lishini tasvirlash uchun shuni React bilan qo'llagan holda ishlatishni maslahat beramiz. JSX sizga boshqa qolip tillarini eslatishi mumkin, lekin u JavaScript ning to'liq kuchi bilan keladi. 

JSX React "elementlari" ni hosil qiladi. Biz ularni DOM ga chizishni [keyingi bo'limda](/docs/rendering-elements.html) ko'rib chiqamiz. Quyida, siz boshlashingiz uchun kerak bo'ladigan JSX ning asoslari bilan tanishib chiqishingiz mumkin.

### Nega JSX? {#why-jsx}

React chizish mantig'i boshqa UI matig'lari ( hodisalar bilan qanday ishlanadi, vaqt o'tishi bilan holat qanday o'zgaradi, va ma'lumotlar namoyish qilish uchun qanday tayyorlanadi) bilan tabiiy ravishda boshg'liqligini qo'llab quvvatlaydi

Belgilash va mantiq fayllarini alohida fayllarga qo'yib, sun'iy ravishda *texnologiyalarni* ajratish o'rniga, React [*tashvishlarni*](https://en.wikipedia.org/wiki/Separation_of_concerns) erkin bog'langan va har ikkalasini (mantiq va belgilash) o'z ichiga olgan "komponentlar" orqali ajratadi.

React da JSX ni ishtatish [zarur emas](/docs/react-without-jsx.html), lekin ko'pchilik JavaScript da UI bilan ishlash uchun vizual yordam sifatida ma'qul ko'radi.

Endi buni chetga surgan holda, qani boshladik!

### JSX Ichida Ifoda Biriktirish {#embedding-expressions-in-jsx}

Quyidagi misolda, biz `name` degan o'zgaruvchi hosil qilamiz va uni JSX ichida jingalak qavsga o'ragan holda ishlatamiz:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

JSX dagi jingalak qavslar ichida istalgan to'g'ri [JavaScript ifodas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)ini qo'yishingiz mumkin. Masalan, `2 + 2`, `user.firstName`, yoki `formatName(user)`, bu hammasi to'g'ri JavaScript ifodalari.

Quyidagi misolda, biz `formatName(user)` JavaScript funksiyasi natijasini `<h1>` elementiga biriktiramiz. 

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/PGEjdG?editors=1010)**

Biz JSX ni o'qish osonroq bo'lishi uchun bir nechta qatorlarga  ajratib qo'ydik. Bunday qilish aslida shart emas, agar ajratadigan bo'lsangiz, [avtomat ravishda nuqta-vergul qo'yish](https://stackoverflow.com/q/2846283) tuzog'ini oldini olish uchun, uni qavs ichiga joylashingizni ham maslahat beramiz.

### JSX O'zi Ham Ifoda {#jsx-is-an-expression-too}

Kompilyatsiyadan keyin, JSX ifodani o'zi ham oddiy JavaScript funksiya chaqiruvlari hisoblanadi va JavaScript obyektlariga aylanadi.

Bu degani, siz JSX ni `if` bayonotlarida va `for` tsikllarida, o'zgaruvchilarga berishda, argument sifatida qabul qilishda va funksiyalardan qaytarishda ishlatishingiz mumkin

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX Atributlarni Ishlatish {#specifying-attributes-with-jsx}

Matnni atribut sifatida belgilash uchun qo'shtirnoq ishlatishingiz mumkin:

```js
const element = <a href="https://www.reactjs.org"> link </a>;
```

Atributga JavaScript ifodasini biriktirish uchun jingalak qavsdan foydalansangiz ham bo'ladi:

```js
const element = <img src={user.avatarUrl}></img>;
```

JavaScript ifodasini atributga biriktirganda, jingalak qavs atrofida qo'shtirnoq ishlatmang. Siz yo qo'shtirnoq (matn uchun) yo jingalak qavslar (ifodalar uchun) ishlatishingiz kerak, ikkalasini birdaniga emas.

>**Ogohlantiruv:**
>
>JSX HTML dan ko'ra JavaScriptga yaqinroq bo'lgani uchun, React DOM xususiyat nomlashda HTML atribut nomlarini o'rniga xususiyatlarni `tuyasimonYozuv` shaklida nomlash odatini ishlatadi.
>
>Masalan, `class` JSX da [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)ga o'zgaradi, va `tabindex` esa [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)ga o'zgaradi.

### JSX Bilan Bolalarni Belgilash {#specifying-children-with-jsx}

Agar teg ichi bo'sh bo'lsa, tezda `/>` bilan yopishingiz mumkin, huddi XML ga o'xshab:

```js
const element = <img src={user.avatarUrl} />;
```

JSX teglari bolalarini o'z ichiga olgan bo'lishi mumkin:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX In'ektsiya Hujumlarni Oldini Oladi {#jsx-prevents-injection-attacks}

JSX da foydalanuvchi kiritmalarini biriktirish xavsiz:

```js
const title = response.potentiallyMaliciousInput;
// Bu havfsiz:
const element = <h1>{title}</h1>;
```

React DOM JSX ga biriktirilgan har qanday qiymatlarni chizishdan oldin [to'g'rilab qo'yadi](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html). Natijada ilovangizda ochiqchasiga yozilmagan hech qanday narsaga in'eksiya qilolmasligingizni ta'minlaydi. Hamma narsa chizishdan avval matnga o'giriladi. Bu [saytlar-aro-skriptlash (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) hujumlarni oldini olishga yordam beradi.

### JSX Obyektni Tashkil Qiladi {#jsx-represents-objects}

Babel JSX ni `React.createElement()` funksiya chaqiruvlariga kompilyatsiya qiladi.

Bu ikki misol bir xil natijaga ega:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` sizga xatosiz kod yozishga yordam bergan holda, bir nechta tekshiruvlarni amalga oshiradi, lekin oxir oqibat mana shunga o'xshagan obyekt yaratadi:

```js
// Eslatma: bu tarkib soddalashtirilgan
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Bu obyektlar "React elementlari" hisoblanadi. Tasavvur qilish uchun siz bularni ekranda ko'rmoqchi bo'lgan narsalarni ma'lumotlari deb faraz qilsangiz bo'ladi. React bu obyektlarni o'qiydi va DOM ni qurish va uni yangilab turish uchun ishlatadi.

Biz React elementlarini DOM da chizishni [keyingi bo'limda](/docs/rendering-elements.html) yoritamiz.

>**Maslahat:**
>
>Siz yoqtirgan redaktoringizda ES6 va JSX kod to'g'ri yoritilishi uchun [Babel](https://babeljs.io/docs/en/next/editors) bilan sozlashingizni maslahat beramiz.
