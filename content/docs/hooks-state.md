---
id: hooks-state
title: Holat hukini ishlatish
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Huklar* - React 16.8'ga kiritilgan yangilik. Ular sizga klass yozmasdan turib holat (state) va React'ning boshqa qulayliklarini ishlatishga yordam beradi.

Sizni huklar bilan tanishtirish uchun [kirish sahifasida](/docs/hooks-intro.html) quyidagi misolni keltirgan edik:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // "count" deb nomlangan, yangi holat (state) oʻzgaruvchisini yaratish
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Siz {count} marta bosdingiz</p>
      <button onClick={() => setCount(count + 1)}>
        Meni bosing
      </button>
    </div>
  );
}
```

Biz huklar haqida oʻrganishni ularni klassdagi akslari bilan taqqoslagan holda boshlaymiz.

<!-- ## Equivalent Class Example {#equivalent-class-example} -->
## Klass orqali yozilganida {#equivalent-class-example}

Agar React'da klasslarni ishlatgan boʻlsangiz, bu kod tanish boʻlishi kerak:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>Siz {this.state.count} marta bosdingiz</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Meni bosing
        </button>
      </div>
    );
  }
}
```

Holat `{ count: 0 }` kabi boshlanadi va biz `this.setState()`ni chaqirish orqali, `state.count` qiymatini oshiramiz. Ushbu misol parchalarini sahifa boʻylab hali koʻp ishlatamiz.

>Eslatma
>
>Nimaga haqiqiy misollar qolib shunchaki sanagichni misol tariqasida koʻryapmiz, deb oʻylayotgan boʻlishingiz mumkin. Bu bizni asosiy e'tiborimizni API'ga qaratish yoʻlida qilinmoqda, zero huklarga endigina qadam bosmoqdamiz.

## Huklar hamda funksiyaviy komponentlar {#hooks-and-function-components}

Eslatish uchun, funksiyaviy komponentlar React'da ushbu koʻrinishda boʻladi:

```js
const Example = (props) => {
  // Huklarni shu yerda ishlatasiz!
  return <div />;
}
```

yoki bunday:

```js
function Example(props) {
  // Huklarni shu yerda ishlatasiz!
  return <div />;
}
```

Siz bularni "holatsiz komponentlar" ("stateless components") kabi bilishingiz mumkin. Biz hozirda ushbu komponentlarda holatlarni ishlatish imkoniyatini bermoqdamiz, shuning uchun "funksiyaviy komponentlar" nomini afzal koʻramiz.

Huklar klasslarning ichida **ishlamaydi**. Lekin ularni klass yozmasdan turib ishlatsangiz boʻladi.

## Nima oʻzi u, Huk? {#whats-a-hook}

Yangi misolimizni `useState`ni React'ning ichidan chaqirib boshlaymiz:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Huk - bu nima?** Huk maxsus funksiya boʻlib, React'ning afzalliklaridan foydalanishga (hook into) yordam beradi. Misol uchun, `useState` orqali funksiyaviy komponentlarga React holatini (state) qoʻsha olasiz. Boshqa huklarni keyinroq oʻrganamiz.

**Hukni qachon ishlataman?** Aytaylik funksiyaviy komponent yozdingiz, tasavvur qiling unga qanaqadur holat qoʻshmoqchisiz, oldinlari uni klassga oʻgirishga toʻgʻri kelardi. Endi siz funksiyaviy komponentlarni ichida Huk ishlatgan holda buni amalga ohirishingiz mumkin. Biz hozir shunday qilmoqchimiz!

>Eslatma:
>
>Komponentning qayerlarida huklarni ishlata olish hamda ishlata olmaslik haqida qoidalarimiz bor. Ular haqida [Huklar uchun qoidalar](/docs/hooks-rules.html) boʻlimida oʻrganamiz.

## Holat oʻzgaruvchisini yaratish {#declaring-a-state-variable}

Klassda, `count` holatni `0` deb yaratish uchun `this.state` ni `{ count: 0 }` ga tenglashtiramiz.

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Funksiyaviy komponentda, bizda `this` yoʻq, demakki `this.state` ni tayinlay yoki oʻqiy olmaymiz. Oʻrniga, `useState` hukini komponentni ichidan chaqiramiz:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

**`useState` nima ish bajaradi?** U "holat oʻzgaruvchisi"ni yaratadi. Hozir oʻzgaruvchimiz `count` deb nomlangan va uni boshqacha nomlay olamiz, misol uchun `banana`. Bu funksiya chaqiruvlari orasida qiymatni saqlab qolishning bir yoʻli — `useState` klasslardagi `this.state` ta'minlaydigan qulayliklarni ishlatishning yangi koʻrinishi. Odatda, oʻzgaruvchilar funksiya tugaganidan keyin "unutiladi", lekin holat oʻzgaruvchilarini React saqlab turadi.

**Argument sifatida `useState`ga nima beramiz?** `useState()` uchun yagona argument - bu boshlangʻich holat qiymati. Klasslardan farqli, holat obyekt boʻlishi shart emas. Yozuv yoki raqamni saqlash biz uchun yetarli boʻlsa, shularnigina saqlay olamiz. Misolimizga qarasak, bizga foydalanuvchi tugmani necha marta bosganligi kerak, shuning uchun boshlangʻich holat qiymatini `0` deb belgiladik. (Agar ikki xil qiymatlarni holatini saqlamoqchi boʻlsak, `useState()`ni ikki marta chaqira olamiz.)

**Bizga `useState` nima qaytaradi?** U qiymatlar juftligini qaytaradi: joriy holat hamda uni yangilaydigan funksiya. Shuning uchun `const [count, setCount] = useState()` deb yozamiz. Bu klasslardagi `this.state.count` va `this.setState`larga oʻxshab ketadi, farqi ularni juftlik sifatida olasiz. Biz ishlatgan yozish uslubi (syntax) bilan tanish boʻlmasangiz, [sahifaning oxirogʻida](/docs/hooks-state.html#tip-what-do-square-brackets-mean) bu mavzuga yana qaytamiz.

Endi `useState` huki nima qilishini bilamiz, bizning misolimiz endi yaxshiroq ma'no kasb etsa kerak:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" deb nomanlan holat oʻzgaruvchisini yaratamiz
  const [count, setCount] = useState(0);
```

`count` deb nomlangan, `0`ga teng holat oʻzgaruvchisini yaratamiz. React qayta chizishlar orasida uning joriy qiymatini eslab qoladi va bizni eng yangi qiymat bilan ta'minlaydi. Agar `count`ning qiymatini oʻzgartirmoqchi boʻlsak, `setCount`ni chaqiramiz.

>Eslatma
>
>Oʻylashingiz mumkin: nima uchun `useState`ni `createState` deb nomlashmagan?
>
>"Create" ozgina noaniq boʻlib qolardi, chunki holat faqatgina komponent chizilganda yaratiladi ("create"). Keyingi chizishlar jarayonida, `useState` bizga joriy holatni berib turadi. Aks holda bu "holat" ("state") boʻlmas edi! Nimaga huklar *har doim* `use` bilan boshlanishiga boshqa sabab ham bor. Bu haqida [Huklar uchun qoidalar](/docs/hooks-rules.html) boʻlimida oʻrganamiz.

## Holatni oʻqish {#reading-state}

Klassda joriy `count`ni koʻrsatmoqchi boʻlganimizda, uni `this.state.count` orqali oʻqiymiz:

```js
  <p>Siz {this.state.count} marta bosdingiz</p>
```

Funksiyada, biz `count`ni bevosita ishlata olamiz:

```js
  <p>Siz {count} marta bosdingiz</p>
```

## Holatni yangilash {#updating-state}

Klassda, `count` ni yangilash uchun, `this.setState()`ni chaqirishimiz kerak:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Meni bosing
  </button>
```

Funksiyada, bizda `setCount` hamda `count` oʻzgaruvchi sifatida bor, `this` ni ishlatishimizga esa hojat yoʻq:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Meni bosing
  </button>
```

## Takrorlash {#recap}

Qani endi **oʻrganganlarimizni qatorma-qator esga olamiz** va bilimlarimizni tekshiramiz.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->

```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

* **1-qator:** React'dan `useState` hukini chaqiramiz. U bizga ichki holat oʻzgaruvchisini saqlashga yordam beradi.
* **4-qator:** `Example` komponenti ichida, yangi holat oʻzgaruvchisini `useState` hukini chaqirish orqali yaratamiz. U nomlashimiz kerak boʻlgan qiymatlar juftligini qaytaradi. Oʻzgaruvchimiz raqamga doir ma'lumot saqlangani uchun `count` deb nomlaymiz. U nol qiymatda boshlanishi uchun `useState` argumenti sifatida `0` yuboramiz. Ikkinchi qaytgan qiymat funksiya hisoblanadi. U `count`ni yangilashda yordam bergani uchun `setCount` deb nomlaymiz.
* **9-qator:** Foydalanuvchi tugmani bosganida, `setCount`ni qiymatini oshirgan holda chaqiramiz. Bundan keyin, React `count`ning yangi qiymati bilan `Example` komponentini qayta chizadi.

Bir qarashda juda ham murakkab tuyilishi mumkin. Lekin, shoshilmang! Ta'rifdan chalkashib ketgan boʻlsangiz, kodni qayta tepadan pastga qarab oʻqib chiqing. Klasslardagi holat (state) qanday ishlashini *unutishingizni* soʻragan boʻlardik, shundan soʻng kodga yangicha nigoh bilan qaray olasiz, bu ish beradi.

### Maslahat: Toʻrtburchak qavslar nimaga kerak? {#tip-what-do-square-brackets-mean}

Holat oʻzgaruvchilarini yaratgandagi toʻrtburchak qavslarni payqagan boʻlsangiz kerak:

```js
  const [count, setCount] = useState(0);
```

Chap tomondagi nomlarni React'ning API'yiga aloqasi yoʻq. Xohlagan nomingizni qoʻyishingiz mumkin:

```js
  const [fruit, setFruit] = useState('banana');
```

Bu yozish uslubi ["massiv tarqatilishi"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) ("array destructuring) deb ataladi. Bu shuni anglatadiki, yangi ikkita oʻzgaruvchilar boʻlmish `fruit` va `setFruit`larni yaratmoqdamiz, qaysiki `fruit` aslida `useState` dan qaytarilgan massivning birinchisi hisoblanadi, shu oʻrinda `setFruit` qiymatning ikkinchisidir. Kodni quyidagicha ham yozsak boʻladi:

```js
  var fruitStateVariable = useState('banana'); // Juftlik qaytariladi
  var fruit = fruitStateVariable[0]; // Juftlikni birinchisi
  var setFruit = fruitStateVariable[1]; // Juftlikni ikkinchisi
```

`useState` orqali holat oʻzgaruvchisini yaratganimizda, u juftlik qaytaradi — ikki qismli massiv. Birinchi qismi joriy qiymat, ikkinchisida shu qiymatni oʻzgartiruvchi funksiya mavjud. Bu juftlik oʻziga xos ma'noga kasb eta oladi, `[0]` hamda `[1]` orqali ularni olish chalkashtiruvchi boʻlishi mumkin. Shuning uchun yozish uslubi massiv tarqatilishi turidan foydalanamiz.

>Eslatma
>
>React qanday qilib `useState` qaysi komponentga tegishli ekanligini biladi deb qiziqayotgan boʻlishingiz mumkin, axir React'ga `this` kabi hech narsa berib yubormayapmiz. [Bu savolingizga](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) va boshqa koʻplab savollaringizga FAQ boʻlimida javob olishingiz mumkin.

### Maslahat: Bir qancha holat oʻzgaruvchilarini ishlatish {#tip-using-multiple-state-variables}

Holat oʻzgaruvchilarini juftlik `[something, setSomething]` sifatida yaratish juda qulay, chunki bu bilan kerak boʻlsa *har xil* nomli, bittadan koʻp  holat oʻzgaruvchilarini yarata olamiz:

```js
function ExampleWithManyStates() {
  // Bir necha holat oʻzgaruvchilarini yaratamiz!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

Yuqoridagi komponentda, bizda `age`, `fruit` va `todos` ichki oʻzgaruvchilar bor va ularni birma bir yangilay olamiz:

```js
  function handleOrangeClick() {
    // this.setState ga oʻxshash ({ fruit: 'orange' })
    setFruit('orange');
  }
```

Bir nechta holat oʻzgaruvchilarini ishlatishingiz **shart emas**. Holat oʻzgaruvchilari obyekt yoki massivlarni oʻzida saqlay oladi, anglashiladiki bir-biriga bogʻliq ma'lumotlarni guruhlasangiz boʻladi. Biroq bunda, oʻzgaruvchini klasslardagi `this.setState` kabi chapishtirilmaydi, balki *almashtiriladi*.

Holat oʻzgaruvchilarini bir-biridan ajratish toʻgʻrisida maslahatlarga [FAQ'da](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) toʻxtalib oʻtganmiz.

## Keyingi qadamlar {#next-steps}

Ushbu sahifada React tomonidan taqdim etilayotgan `useState` nomli huk haqida oʻrgandik. Yana ba'zi paytlarda uni "holat huki" deb ham nomlaymiz. U React'ning funksiyaviy komponentlariga ichki holat qoʻshib beradi -- bunaqasi hali boʻlmagan.

Biz yana huklar oʻzi nima ekanligi haqida ham birqancha bilimlarga ega boʻldik. Huk maxsus funksiya boʻlib, React'ning afzalliklarini funksiyaviy komponentlarda ishlatishga yordam beradi. Ularning nomlari `use` bilan boshlanadi, hali biz koʻrmagan huklar ham bor.

**Qani endi [`useEffect` hukini oʻrganish](/docs/hooks-effect.html)ga kirishamiz.** Ushbu huk klasslardagi hayotiy jarayon metodlariga oʻxshaydi. Hamda sizga komponent ichida tashqi ta'sir koʻrsatishga yordam beradi.
