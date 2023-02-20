---
id: components-and-props
title: Komponentlar va Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

<<<<<<< HEAD
Komponentlar sizga UI'ni qayta ishlatiladigan, mustaqil qismlarga bo'lish va har bir qism haqida yakka holda o'ylashingizga imkoniyat beradi. Bu sahifa komponentlar haqida boshlang'ich ma'lumot beradi. Komponent API haqida batafsil ma'lumotni esa [bu yerdan](/docs/react-component.html) topishingiz mumkin. 
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Your First Component](https://beta.reactjs.org/learn/your-first-component)
> - [Passing Props to a Component](https://beta.reactjs.org/learn/passing-props-to-a-component)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a [detailed component API reference here](/docs/react-component.html).
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

Tushuncha jihatdan, komponentlar huddi JavaScript funksiyalariga o'xshaydi. Ular ("props" deb atalgan) qandaydir kiritmalarni qabul qiladi va ekranda nima chiqishini tasvirlaydigan React elementlarini qaytaradi.

## Funksiya va Klass Komponentlari {#function-and-class-components}

Komponent hosil qilishning eng oddiy yo'li bu JavaScript funksiyasini yozish:

```js
function Welcome(props) {
  return <h1>Salom, {props.name}</h1>;
}
```

Bu funksiya React komponent deb aytishga loyiq chunki u yagona "props" (kengaytmasi inglizcha "properties") obyekt argumentini ma'lumotlari bilan birga qabul qiladi va React elementini qaytaradi. Biz bunday komponentlarni "funksiya komponentlari" deb ataymiz chunki shundoq ham JavaScript funksiya bo'lgani uchun.

Bundan tashqari siz [ES6 klasslari](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)dan foydalanib komponent hosil qilishingiz mumkin:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salom, {this.props.name}</h1>;
  }
}
```

Yuqoridagi ikki komponentlar React nuqtai nazaridan bir biriga teng.

[Keyingi bo'limlarda](/docs/state-and-lifecycle.html) funksiya va klass komponentlarini o'ziga hos qo'shimcha xususiyatlari haqida muhokama qilamiz.

## Komponentlarni Chizish {#rendering-a-component}

Bundan oldin biz faqat DOM teglariga ega bo'lgan React elementlarini ko'rib chiqgan edik:

```js
const element = <div />;
```

Ammo, React elementlar dasturchi tomonidan yaratilgan komponentlarni ham o'z ichiga olishi mumkin

```js
const element = <Welcome name="Sara" />;
```

Qachonki React dasturchi yaratgan komponentni element ko'rinishida uchratsa, JSX attributlari va bolalarini shu komponentga bir dona obyekt sifatida uzatadi. Biz bu obyektni "props" deb ataymiz.

Masalan, Ushbu kod sahifada "Salom, Sara" deb chiziladi:

```js{1,6}
function Welcome(props) {
  return <h1>Salom, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**

Keling bu misolda nimalar bo'lishini xulosa qilamiz:
1. Biz `<Welcome name="Sara" />` elementini `ReactDOM.render()` orqali chaqiramiz.
2. React `Welcome` komponentini chaqirib, `{name: 'Sara'}`ni prop sifatida uzatadi.
3. Bizning `Welcome` komponentimiz esa `<h1>Salom, Sara</h1>` elementini natija sifatida qaytaradi.
4. React DOM esa DOMni samarali ravishda `<h1>Salom, Sara</h1>` deb yangilaydi.

>**Eslatma:** Komponent nomini doim katta harfdan boshlang.

>React kichik harf bilan boshlangan komponentlarni DOM teglari sifatida ko'radi.   
Masalan,`<div />` HTML div teg ni ifodalaydi, lekin `<Welcome />` esa komponentni ifodalaydi va `Welcome` ni shu kodning qamrovida bo'lishini talab qiladi.
>
>Bu konvensiyaga sabab nima ekanligini bilish uchun [JSX haqida batafsil](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) o'qishingiz mumkin.

## Komponentlarni Tashkil Qilish {#composing-components}

Komponentlar o'zining natijasida boshqa komponentlardan tashkil topgan bo'lishi mumkin. Bu bizga bir xil komponentni har xil darajadagi aniqlikda ishlatish imkonini beradi. Tugma, forma, dialog, ekran: bularning hammasi React ilovasida komponent sifatida tasvirlanadi. 

Masalan, biz bir nechta `Welcome` komponentini tashkil qilgan `App` komponentini yaratishimiz mumkin

```js{8-10}
function Welcome(props) {
  return <h1>Salom, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**

Odatda yangi React ilovalari eng yuqori qismida yagona `App` komponenti turadi. Ammo, siz React ni ishlab turgan ilovangizga qo'shmoqchi bo'lsangiz, siz eng pastdagi `Button` ga o'xshagan kichik bir komponent orqali boshlab, sekin asta ierarxiyani yuqori qismiga intilgan holda ishlashingiz mumkin.

## Komponentlarni Ajratish {#extracting-components}

Komponentlarni kichik komponentlarga ajratib olishdan qo'rqmang.

Masalan, quyidagi `Comment` komponentiga e'tibor bering:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**

Bu komponent o'ziga `author` (obyekt), `text` (string) va `date` (date) larni props sifatida oladi va ijtimoiy tarmoq veb-saytidagi kommentni tasvirlaydi.

Bu elementlar bir birini ichida joylashgani uchun komponentni o'zgartirish muammo bo'lishi mumkin, shu o'rinda bu komponentni alohida qismlarini ham qayta ishlatish muammo. Keling bundan bir nechta komponent ajratib olamiz. 

Birinchi bo'lib, `Avatar`ni ajratib olamiz:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar` komponenti `Comment` komponenti ichida chizilayotganini bilishi shart emas. Shuning uchun biz prop nomini `author` emas, balki `user` deb umumiy shaklda nomladik.

Biz komponent ishlatilayotgan joyi nuqtai nazaridan kelib chiqib proplarni nomlashdan ko'ra, prop nomlarini komponentning o'zini nuqtai nazaridan kelib chiqqan holda nomlashni maslahat beramiz.

Endi `Comment` ni ozgina soddalashtiramiz:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Undan keyin, foydalanuvchi ismi yonida keladigan `Avatar` komponentini chizuvchi `UserInfo` komponentini ajratamiz:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Bu esa `Comment` ni bundanda soddalashtirishga imkon beradi:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrJNJY?editors=1010)**

Komponentlarni ajratish boshida mayda ishga o'xshab tuyilishi mumkin, lekin katta ilovalarda qayta ishlatiladigan komponentlar to'plamiga ega bo'lish ko'p yengilliklarni yaratadi. Agarda sizning UI'ingizdagi qaysidir bo'lak bir necha marta ishlatiladigan bo'lsa (`Button`, `Panel`, `Avatar`) yoki o'z o'zidan murakkab bo'lsa (`App`, `FeedStory`, `Comment`), shu bo'lakni komponentga ajratish yaxshi nomzod bo'ladi. 

## Props Faqat O'qish Uchun {#props-are-read-only}

Komponentni [klass yoki funksiya sifatida](#function-and-class-components) hosil qilishingizdan qat'iy nazar, u hech qachon o'zining kiritmalarini (props) o'zgartirmasligi kerak. Quyidagi `sum` funksiyasiga e'tibor bering:

```js
function sum(a, b) {
  return a + b;
}
```

Bunday funksiyalar ["toza (pure)"](https://en.wikipedia.org/wiki/Pure_function) funksiya deyiladi chunki ular funksiyaga argument sifatida berilgan kiritmalarini o'zgartirmaydi va doim bu kiritmalarni javobida shundayligicha qaytaradi.

Tepadagi funksiyadan farqli o'laroq, quyidagi funksiya toza hisoblanmaydi (impure) chunki u o'zining kiritmasini o'zgartiradi:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React juda moslashuvchan lekin bitta qat'iy qoidasi bor:

**Hamma React komponentlari kiritmalariga nisbatan toza funksiya sifatida yozilishi kerak**

Albatta, ilova UI'lari dinamik hisoblanadi va vaqt o'tgan sari o'zgarishi mumkin. [Keyingi bo'limda](/docs/state-and-lifecycle.html), biz "holat" (state) tushunchasi bilan tanishib chiqamiz. Holat React komponentlariga vaqt o'tgan sari foydalanuvchi harakatlari, tarmoq javoblari, va boshqa holatlar orqali bu qoidani buzmagan holda reaksiya qilib o'zining qaytarmalarini o'zgartirishga imkon beradi.
