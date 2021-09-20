---
id: lists-and-keys
title: Roʻyxatlar va kalitlar
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Keling, avval roʻyxatlarni JavaScriptʼda qanday oʻzgartirishni koʻramiz.

Quyidagi kodda, [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) funksiyasi yordamida `numbers` massivini olib, qiymatlarini ikkiga koʻpaytirib boshqa `doubled` oʻzgaruvchisiga oʻtkazyapmiz va loglayapmiz:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Bu kod konsolga `[2, 4, 6, 8, 10]`larni chiqaradi.

Reactʼda, massivlarni [elementlar](/docs/rendering-elements.html) jamlanmasiga oʻzgartirish ham deyarli bir xil.

### Bir nechta komponentlarni chizish {#rendering-multiple-components}

Elementlar jamlanmasini yaratib, jingalak qavslar `{}` yordamida [JSXʼni ichiga qoʻshib yubora olasiz](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

Quyida, JavaScriptʼdagi [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) funksiyasi yordamida `numbers` massivi ichidan yurib chiqamiz. Har bir narsa uchun `<li>` elementini qaytaramiz. Oxirida, elementlar jamlanmasini `listItems` nomli oʻzgaruvchiga joylaymiz:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

`listItems` massivini `<ul>` elementi ichiga joylab, [DOMʼda chizish](/docs/rendering-elements.html#rendering-an-element-into-the-dom) uchun yuboramiz:

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**CodePenʼda ochish**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Bu kod birdan beshgacha boʻlgan sonlarni ekranga chiqazib beradi.

### Oddiy roʻyxat komponenti {#basic-list-component}

Odatda roʻyxatlarni [komponent](/docs/components-and-props.html) ichida chizasiz.

Oldingi misolni `numbers` massivini qabul qilib elementlar jamlanmasini qaytaradigan qilib qayta yozsak boʻladi.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Ushbu kodni ishga tushirganingizda, roʻyxat elementlari uchun kalit (key) berib yuborish kerakligi haqida ogohlantirish olasiz. "key" (kalit) - bu yozuv (`string`) qabul qiladigan maxsus kiritma (prop). Bu nima uchun kerakligi haqida keyingi boʻlimda oʻrganamiz.

Qani endi roʻyxatdagi elementlarga `numbers.map()` ichida `key` kiritmasini (prop) qoʻshib, xatolikni toʻgʻirlaylik.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePenʼda ochish**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Kalitlar {#keys}

Kalitlar Reactʼga qaysi narsalar oʻzgargani, qoʻshilgani yoki olib tashlangani haqida aytib turadi. Kalitlar massiv ichidagi elementlarga bir-birlaridan farqni turgʻun saqlab turishlari uchun kerak:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Kalit tanlashning eng yaxshi yoʻli narsani sheriklari ichida ajratib turadigan yozuvni (`string`) ishlatish. Koʻpincha maʼlumotlaringizdagi IDʼlarni kalit (key) sifatida ishlatasiz:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Narsalarni chizish uchun turgʻun ID yoʻq paytlarda, narsaning turgan oʻrni sonini (index) oxirgi chora sifatida ishlatishingiz mumkin:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

Narsalarni joyi oʻzgarishi mumkin boʻlgan hollarda, turgan oʻrnini sonini (index) ishlatishni maslahat bermaymiz. Bu chaqqonlikka (performance) yomon taʼsir koʻrsatishi yoki komponent holatlari bilan muammo kelib chiqishi mumkin. Robin Pokorni tomonidan yozilgan maqolada, [turgan oʻrni sonini kalit sifatida ishlatishni yomon tomonlari](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) haqida chquur yoritilgan. Agar biror kalit berib yubormasangiz, React oʻzi ham turgan oʻrnini kalit sifatida ishlatadi.

Agar qiziqsangiz, bu yerda [kalitlar nima uchun kerakligi haqida chuqurroq](/docs/reconciliation.html#recursing-on-children) koʻproq narsa oʻqishingiz mumkin.

### Komponentlarni kalitlar yordamida ajratish {#extracting-components-with-keys}

Kalitlar faqat massivlar bilan ishlaganda kerak boʻladi.

Masalan, agar `ListItem` degan komponent [ajratib olsangiz](/docs/components-and-props.html#extracting-components), kalitni `ListItem` ichidagi `<li>` elementiga emas, balki `<ListItem />`da qoldirishingizga toʻgʻri keladi. 

**Misol: Kalitni notoʻgʻri ishlatilishi**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Notoʻgʻri! Bu yerda kalit (key) kiritmasi kerak emas:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Notoʻgʻri! Kalit (key) kiritmasi bu yerda yozilishi kerak edi:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Misol: Kalitni toʻgʻri ishlatilishi**

```javascript{2,3,9,10}
function ListItem(props) {
  // Toʻgʻri! Bu yerda kalit (key) kiritmasi kerak emas:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Toʻgʻri! Kalit (key) kiritmasi massiv ichida ishlatilishi kerak:
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePenʼda ochish**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Bitta osongina qoida bor, `map()` ichidagi elementlarga kalitlar kerak.

### Kalitlar sheriklarinikidan boshqacha boʻlishi kerak {#keys-must-only-be-unique-among-siblings}

Bir massiv ichidagi kalitlar bir-biridan farqlanishi kerak holos. Kalitlar umumiy olib qaraganda har xil boʻlishi shart emas. Yaʼni, boshqa-boshqa massivlarni yaratishda bir xil kalitlarni qayta ishlata olamiz:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Salom dunyo', content: 'Reactʼni oʻrganishga xush kelibsiz!'},
  {id: 2, title: 'Oʻrnatish', content: 'Reactʼni npm orqali oʻrnata olasiz.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**CodePenʼda ochish**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Kalitlar React uchun ishoralar kabidir, yaʼni ular komponent ichiga berib yuborilmaydi. Agar sizga oʻsha qiymat kerak boʻlib qolsa, boshqa kiritma sifatida berib yuboring:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

Yuqoridagi misolda, `Post` komponenti `props.id`ni oʻqiy oladi, `props.key`ni emas.

### JSX ichida `map()` bilan ishlash {#embedding-map-in-jsx}

Yuqoridagi misollarda, `listItems` oʻzgaruvchisini yaratib, uni JSX ichiga berib yubordik:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX [hohlagan ifodani](/docs/introducing-jsx.html#embedding-expressions-in-jsx) jingalak qavslar ichiga joylashga ruhsat beradi va `map()` qaytargan javobni bir qatorda yozib keta olamiz:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**CodePenʼda ochish**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Baʼzida bu yaxshiroq kod yozishga yordam beradi, biroq bu yozuv uslubi ham suistemol qilinishi mumkin. JavaScriptʼdagidek, kod yaxshi oʻqilishi uchun alohida oʻzgaruvchi ishlatish sizga bogʻliq. Eslab qolingki, agar `map()` qaytaradigan element kattarib ketsa, yangi [komponent yaratish](/docs/components-and-props.html#extracting-components) yaxshi yechim boʻlishi mumkin.