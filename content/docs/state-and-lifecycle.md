---
id: state-and-lifecycle
title: Holat va hayotiy ketma-ketlik
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

<<<<<<< HEAD
Bu sahifa React komponentidagi holat(state) va hayotiy ketma-ketlik(lifecycle) tushunchalarini tanishtiradi.Bu yerda [batafsil komponentinig API ma'lumotnomasini](/docs/react-component.html) topa olasiz.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)
> - [Synchronizing with Effects](https://beta.reactjs.org/learn/synchronizing-with-effects)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This page introduces the concept of state and lifecycle in a React component. You can find a [detailed component API reference here](/docs/react-component.html).
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

[Oldingi bo'limlarning namunalardan biridagi](/docs/rendering-elements.html#updating-the-rendered-element) soatga e'tibor bering. [Elementlarni chizish](/docs/rendering-elements.html#rendering-an-element-into-the-dom) bo'limida, biz faqat foydalanuvchi interfeysini(UI) yangilashni bir yo'lini o'rgandik. Biz chizilgan natijani o'zgartirish uchun `root.render()`ni chaqiramiz:

```js{10}
const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Salom, dunyo!</h1>
      <h2>Hozir soat {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

Bu bo'limda, biz qanday qilib `Clock` komponentini rostdan ham qayta ishlaydigan va jamlangan qilishni o'rganamiz. Soat komponenti o'zinig taymerini o'rnatadi va har sekundda o'zini yangilaydi.
 
Biz soat qanday ko'rinishini yig'ishdan boshlaymiz:

```js{5-8,13}
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Salom, dunyo!</h1>
      <h2>Hozir soat {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Ammo, u muhim talabni bajarmadi: bu fakt shuki taymerni o'rnatish va foydalanuvchi interfeysini har soniyada yangilashini `Clock` komponenti o'zi amalga oshirish kerak.

Ideal holda biz bu `Clock` komponentini bir marta yozishni va o'zi yangilanishini hohlaymiz:

```js{2}
root.render(<Clock />);
```

Buni amalga oshirish uchun, biz `Clock` komponentiga "holat(state)" ni qo'shishimiz kerak.

Holat(State) kiritmalarga(props) o'xshash, lekin u shaxsiy va komponent tomonidan to'liq nazorat qilinadi.

## Funksiyani klassga aylantirish {#converting-a-function-to-a-class}

Siz `Clock` ga o'xshash funksiyaviy komponentni besh qadamda klass komponentiga aylantira olasiz:

1. Bir xil nom bilan `React.Component`dan vorislik oladigan [ES6 klassni](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) yarating.

2. Klassga bitta bo'sh `render()` deb nomlangan metod qo'shing.

3. Funksiyaning tanasini `render()` metodiga ko'chiring.

4. `render()` metodi tanasidagi `props` o'zgaruvchini `this.props` bilan o'zgartiring.

5. Qolgan bo'sh funksiyani o'chiring.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir soat {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` hozir funksiya sifatida emas klass sifatida belgilangan.

Har doim yangilanish sodir bo'lganida `render` metodi chaqiriladi, lekin agarda biz `<Clock />` komponentini bir DOM tuguniga(node) chizsak, `Clock` klassining faqat bir modeli(instance) foydalaniladi. Bu bizga qo'shimcha imkoniyatlar jumladan lokal holat va hayotiy ketma-ketlik metodlaridan foydalanishga ruhsat beradi.

## Lokal holatni klassga qo'shish {#adding-local-state-to-a-class}

Biz `date`ni kiritmalardan(props) holatga(state) uch qadamda ko'chiramiz:

1) `render()` metodidagi `this.props.date` ni `this.state.date` bilan almashtiring:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir soat {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Boshlang'ich `this.state`ni tayinlaydigan [klass konstruktorini](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) qo'shing:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir soat {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Qnaday qilib `props`ni asosiy konstruktorga o'tkazganimizga etibor bering:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Klass komponentlari har doim asosiy konstruktorni `props` bilan chaqirishi kerak.

3) `<Clock />` elementidan `date` xususiyatini o'chiring:

```js{2}
root.render(<Clock />);
```

Keyinchalik taymer kodini komponentning o'ziga qaytaramiz.

Natija shunday ko'rinadi:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir soat {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Keyin, biz `Clock` komponenti o'zi taymer o'rnatatadigan va har soniyada yangilaydigan qilamiz.

## Adding Lifecycle Methods to a Class {#adding-lifecycle-methods-to-a-class}

Ko'p komponentlarga ega ilovalarda, komponentlar yo'q qilinganda ular tomonidan olingan resurslarni bo'shatish juda muhim.

Biz [taymer o'rnatishni](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) hohlaymiz qachonki `Clock` komponenti DOMga birinchi marta chizilganda va bu Reactda "mounting" deb ataladi.

Shuningdek, biz [taymerni to'xtatishni](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) hohlaymiz qachonki `Clock` komponenti tomonidan yaratilgan DOM olib tashlanganda va bu Reactda "unmounting" deb nomlanadi.

Biz komponent o'rnatilganda(mount) va yechilganda(unmount) biror kod bajarish uchun klass komponentida maxsus metodlarni e'lon qilishimiz mumkin:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir vaqt {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Bu metodlar hayotiy ketma-ketlik metodlari("lifecycle methods") deb ataladi.

`componentDidMount()` metodi komponent natijasi DOMga chizilgandan keyin ishlaydi. Bu taymer o'rnatish uchun juda yaxshi joy:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Taymer IDni qanday saqlaganimizga e'tibor bering (`this.timerID`).

`this.props` React o'zi tomonidan o'rnatilgan va `this.state` maxsus ma'noga ega. Agar siz ma'lumot oqimida qatnashmaydigan narsalarni (masalan, taymer identifikatori) saqlashingiz kerak bo'lsa, siz qo'lda klassga qo'shimcha maydonlarni qo'shishingiz mumkin..

Taymerni `componentWillUnmount()` hayotiy ketma-ketlik metodida yo'q qilamiz:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Va nihoyat, biz `Clock` komponentini har soniyada ishlatadigan `tick()` metodini qo'llaymiz.

Komponent lokal holatiga yangilanishlarni rejalashtirish uchun u `this.setState()` dan foydalanadi:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Salom, dunyo!</h1>
        <h2>Hozir vaqt {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Endi soat har soniyada ishlaydi.

Keling, nima bo'layotganini va metodlar chaqirilish tartibini tezlik bilan takrorlaylik:

1) `<Clock />` komponenti `root.render()` ga o'tkazilganda, React `Clock` komponentining konstruktorini chaqiradi. `Clock` joriy vaqtni ko'rsatishi kerak bo'lganligi sababli, u `this.state` ni joriy vaqtni o'z ichiga olgan ob'ekt bilan boshlaydi. Keyinchalik bu holatni yangilaymiz.

2) React keyin `Clock` komponentining `render()` metodini chaqiradi. Shunday qilib, React ekranda nimani ko'rsatish kerakligini bilib oladi. React keyin DOMni `Clock` komponenti ko'rsatuviga mos keladigan tarzda yangilaydi.

3) DOMga `Clock` natijasi kiritilganda, React `componentDidMount()` hayotiy ketma-ketlik metodini chaqiradi. Uning ichida `Clock` komponenti brauzerdan sekundiga bir marta `tick()` metodini chaqirish uchun taymerni o'rnatishni so'raydi.

4) Har soniyada brauzer `tick()` metodini chaqiradi. Uning ichida `Clock` komponenti joriy vaqtni o'z ichiga olgan ob'ekt bilan `setState()`ni chaqirib, UI yangilanishini rejalashtiradi. `setState()` chaqiruvi tufayli React holat o'zgarganini biladi va ekranda nima bo'lishi kerakligini bilish uchun `render()` usulini qayta chaqiradi. Bu safar `render()` usulidagi `this.state.date` har xil bo'ladi, shuning uchun renderning qaytargan natijasi yangilangan vaqtni o'z ichiga oladi. React DOMni shunga mos ravishda yangilaydi.

5) Agar `Clock` komponenti DOMdan o'chirilsa, React `componentWillUnmount()` hayotiy ketma-ketlik metodini chaqiradi, shuning uchun taymer to'xtatiladi.

## Holatdan to'g'ri foydalanish {#using-state-correctly}

`setState()` haqida siz bilishingiz kerak bo'lgan uchta narsa bor.

### Holatni to'g'ridan to'g'ri o'zgartirmang {#do-not-modify-state-directly}

Masalan, bu komponentni qaytadan chizmaydi:

```js
// Wrong
this.state.comment = 'Salom';
```

Uning o'rniga `setState()`dan foydalaning:

```js
// Correct
this.setState({comment: 'Salom'});
```

siz `this.state`ni tayinlay oladigan yagona joy bu konstruktor.

### Holat yangilanishlari asinxron bo'lishi mumkin {#state-updates-may-be-asynchronous}

React ko'p `setState()` chaqiruvlarini bittaga tezkorlik uchun guruhlashi mumkin.

Chunki `this.props` va `this.state` asinxron tarzda yangilanishi mumkin, keyingi holatni hisoblashda ularning qiymatlariga tayanmaslik kerak.

Misol uchun, bu kod hisoblagichni yangilay olmasligi mumkin:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Buni tuzatish uchun ob'ektni emas, funktsiyani qabul qiladigan `setState()` ning ikkinchi shaklidan foydalaning. Bu funktsiya "oldingi holat"ni birinchi argument sifatida va yangilanishlar bo'lganda "props"ni ikkinchi argument sifatida qabul qiladi:

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Biz yuqorida [ko'rsatkich funksiyadan](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) foydalandik, lekin u oddiy funktsiyalar bilan ham ishlaydi:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Holat yangilanishlari birlashtiriladi {#state-updates-are-merged}

Qachonki siz `setState()`ni chaqirganingizda, React obyektni siz taqdim qilgan hozirgi holatga birlashtiradi.

Masalan, sizning statetingiz bir nechta mustaqil o'zgaruvchilarni o'z ichiga olishi mumkin:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Keyin siz mustaqil ravishda alohida `setState()` chaqiruvlari bilan yangilay olasiz:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Birlashish sayoz, shuning uchun `this.setState ({comments})` `this.state.posts` 'ni buzmasdan qoldiradi, lekin `this.state.comments` ni to'liq almashtiradi.

## Ma'lumotlar pastga qarab oqadi {#the-data-flows-down}

Ota(parent) ham, bola(children) komponentlari biror maxsus komponentning holatli(stateful) yoki holatsiz(stateless) ekanligini bila olmaydi va ular maxsus komponentning funktsiya yoki klass sifatida belgilanishi haqida o'ylamaydi.

Shuning uchun holat ko'pincha loakl yoki birlashgan deb nomlanadi. Unga egalik qiladigan va o'rnatgan komponentdan boshqa hech qaysi komponent kira olmaydi.

Komponent o'z holatini bola komponentlariga kiritmalar sifatida o'tkazishni tanlashi mumkin:

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` komponenti `date` ni kiritmalarda oladi va u `Clock` holatidan, `Clock` kiritmalaridan kelganini yoki qo'lda yozilganligini bilmaydi:

```js
function FormattedDate(props) {
  return <h2>Hozir soat {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Bu odatda "yuqoridan pastga" yoki "bir tomonlama" ma'lumotlar oqimi deb ataladi. Har qanday holat har doim ma'lum bir komponentga tegishli va bu holatdan olingan har qanday ma'lumotlar yoki foydalanuvchi interfeysi faqat daraxtda(tree) undan "pastda" joylashgan komponentlarga ta'sir qilishi mumkin.

Agar siz komponent daraxtni kiritmalar sharsharasi deb tasavvur qilsangiz, har bir komponentning holati qo'shimcha suv manbaiga o'xshaydi, u o'zboshimchalik bilan birlashadi, lekin u pastga qarab harkatlanadi.

Barcha komponentalar chindan ham izolyatsiya qilinganligini ko'rsatish uchun biz uchta `Clock` ni ko'rsatadigan `App` komponentini yaratishimiz mumkin:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```

[**CodePenda sinab ko'ring**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Har bir `Clock` o'z taymerini o'rnatadi va mustaqil ravishda yangilanadi.

React ilovalarida komponentning holatli yoki holatsiz ekanligi komponentni amalga oshirish tafsiloti hisoblanadi va bu vaqt o'tishi bilan o'zgarishi mumkin. Holatsiz bo'lgan komponentlarni holatli komponentlar ichida ishlatishingiz mumkin va aksincha.
