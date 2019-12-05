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
  // "count" deb nomlangan, yangi holat (state) o'zgaruvchisini yaratish
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

Biz huklar haqida o'rganishni ularni klassdagi akslari bilan taqqoslagan holda boshlaymiz.

<!-- ## Equivalent Class Example {#equivalent-class-example} -->
## Klass orqali yozilganida {#equivalent-class-example}

Agar React'da klasslarni ishlatgan bo'lsangiz, bu kod tanish bo'lishi kerak:

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

Holat `{ count: 0 }` kabi boshlanadi va biz `this.setState()`ni chaqirish orqali, `state.count` qiymatini oshiramiz. Ushbu misol parchalarini sahifa bo'ylab hali ko'p ishlatamiz.

>Eslatma
>
>Nimaga haqiqiy misollar qolib shunchaki sanagichni misol tariqasida ko'ryapmiz, deb o'ylayotgan bo'lishingiz mumkin. Bu bizni asosiy e'tiborimizni API'ga qaratish yo'lida qilinmoqda, zero huklarga endigina qadam bosmoqdamiz.

## Huklar hamda funksiyaviy komponentlar {#hooks-and-function-components}

Eslatish uchun, funksiyaviy komponentlar React'da ushbu ko'rinishda bo'ladi:

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

Siz bularni "holatsiz komponentlar" ("stateless components") kabi bilishingiz mumkin. Biz hozirda ushbu komponentlarda holatlarni ishlatish imkoniyatini bermoqdamiz, shuning uchun "funksiyaviy komponentlar" nomini afzal ko'ramiz.

Huklar klasslarning ichida **ishlamaydi**. Lekin ularni klass yozmasdan turib ishlatsangiz bo'ladi.

## Nima o'zi u, Huk? {#whats-a-hook}

Yangi misolimizni `useState`ni React'ning ichidan chaqirib boshlaymiz:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Huk - bu nima?** Huk maxsus funksiya bo'lib, React'ning afzalliklaridan foydalanishga (hook into) yordam beradi. Misol uchun, `useState` orqali funksiyaviy komponentlarga React holatini (state) qo'sha olasiz. Boshqa huklarni keyinroq o'rganamiz.

**Hukni qachon ishlataman?** Aytaylik funksiyaviy komponent yozdingiz, tasavvur qiling unga qanaqadur holat qo'shmoqchisiz, oldinlari uni klassga o'girishga to'g'ri kelardi. Endi siz funksiyaviy komponentlarni ichida Huk ishlatgan holda buni amalga ohirishingiz mumkin. Biz hozir shunday qilmoqchimiz!

>Eslatma:
>
>Komponentning qayerlarida huklarni ishlata olish hamda ishlata olmaslik haqida qoidalarimiz bor. Ular haqida [Huklar uchun qoidalar](/docs/hooks-rules.html) bo'limida o'rganamiz.

## Holat o'zgaruvchisini yaratish {#declaring-a-state-variable}

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

Funksiyaviy komponentda, bizda `this` yo'q, demakki `this.state` ni tayinlay yoki o'qiy olmaymiz. O'rniga, `useState` hukini komponentni ichidan chaqiramiz:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

**`useState` nima ish bajaradi?** U "holat o'zgaruvchisi"ni yaratadi. Hozir o'zgaruvchimiz `count` deb nomlangan va uni boshqacha nomlay olamiz, misol uchun `banana`. Bu funksiya chaqiruvlari orasida qiymatni saqlab qolishning bir yo'li — `useState` klasslardagi `this.state` ta'minlaydigan qulayliklarni ishlatishning yangi ko'rinishi. Odatda, o'zgaruvchilar funksiya tugaganidan keyin "unutiladi", lekin holat o'zgaruvchilarini React saqlab turadi.

**Argument sifatida `useState`ga nima beramiz?** `useState()` uchun yagona argument - bu boshlang'ich holat qiymati. Klasslardan farqli, holat obyekt bo'lishi shart emas. Yozuv yoki raqamni saqlash biz uchun yetarli bo'lsa, shularnigina saqlay olamiz. Misolimizga qarasak, bizga foydalanuvchi tugmani necha marta bosganligi kerak, shuning uchun boshlang'ich holat qiymatini `0` deb belgiladik. (Agar ikki xil qiymatlarni holatini saqlamoqchi bo'lsak, `useState()`ni ikki marta chaqira olamiz.)

**Bizga `useState` nima qaytaradi?** U qiymatlar juftligini qaytaradi: joriy holat hamda uni yangilaydigan funksiya. Shuning uchun `const [count, setCount] = useState()` deb yozamiz. Bu klasslardagi `this.state.count` va `this.setState`larga o'xshab ketadi, farqi ularni juftlik sifatida olasiz. Biz ishlatgan yozish uslubi (syntax) bilan tanish bo'lmasangiz, [sahifaning oxirog'ida](/docs/hooks-state.html#tip-what-do-square-brackets-mean) bu mavzuga yana qaytamiz.

Endi `useState` huki nima qilishini bilamiz, bizning misolimiz endi yaxshiroq ma'no kasb etsa kerak:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" deb nomanlan holat o'zgaruvchisini yaratamiz
  const [count, setCount] = useState(0);
```

`count` deb nomlangan, `0`ga teng holat o'zgaruvchisini yaratamiz. React qayta chizishlar orasida uning joriy qiymatini eslab qoladi va bizni eng yangi qiymat bilan ta'minlaydi. Agar `count`ning qiymatini o'zgartirmoqchi bo'lsak, `setCount`ni chaqiramiz.

>Eslatma
>
>O'ylashingiz mumkin: nima uchun `useState`ni `createState` deb nomlashmagan?
>
>"Create" ozgina noaniq bo'lib qolardi, chunki holat faqatgina komponent chizilganda yaratiladi ("create"). Keyingi chizishlar jarayonida, `useState` bizga joriy holatni berib turadi. Aks holda bu "holat" ("state") bo'lmas edi! Nimaga huklar *har doim* `use` bilan boshlanishiga boshqa sabab ham bor. Bu haqida [Huklar uchun qoidalar](/docs/hooks-rules.html) bo'limida o'rganamiz.

## Holatni o'qish {#reading-state}

Klassda joriy `count`ni ko'rsatmoqchi bo'lganimizda, uni `this.state.count` orqali o'qiymiz:

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

Funksiyada, bizda `setCount` hamda `count` o'zgaruvchi sifatida bor, `this` ni ishlatishimizga esa hojat yo'q:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Meni bosing
  </button>
```

## Takrorlash {#recap}

Qani endi **o'rganganlarimizni qatorma-qator esga olamiz** va bilimlarimizni tekshiramiz.

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

* **1-qator:** React'dan `useState` hukini chaqiramiz. U bizga ichki holat o'zgaruvchisini saqlashga yordam beradi.
* **4-qator:** `Example` komponenti ichida, yangi holat o'zgaruvchisini `useState` hukini chaqirish orqali yaratamiz. U nomlashimiz kerak bo'lgan qiymatlar juftligini qaytaradi. O'zgaruvchimiz raqamga doir ma'lumot saqlangani uchun `count` deb nomlaymiz. U nol qiymatda boshlanishi uchun `useState` argumenti sifatida `0` yuboramiz. Ikkinchi qaytgan qiymat funksiya hisoblanadi. U `count`ni yangilashda yordam bergani uchun `setCount` deb nomlaymiz.
* **9-qator:** Foydalanuvchi tugmani bosganida, `setCount`ni qiymatini oshirgan holda chaqiramiz. Bundan keyin, React `count`ning yangi qiymati bilan `Example` komponentini qayta chizadi.

Bir qarashda juda ham murakkab tuyilishi mumkin. Lekin, shoshilmang! Ta'rifdan chalkashib ketgan bo'lsangiz, kodni qayta tepadan pastga qarab o'qib chiqing. Klasslardagi holat (state) qanday ishlashini *unutishingizni* so'ragan bo'lardik, shundan so'ng kodga yangicha nigoh bilan qaray olasiz, bu ish beradi.

### Maslahat: To'rtburchak qavslar nimaga kerak? {#tip-what-do-square-brackets-mean}

Holat o'zgaruvchilarini yaratgandagi to'rtburchak qavslarni payqagan bo'lsangiz kerak:

```js
  const [count, setCount] = useState(0);
```

Chap tomondagi nomlarni React'ning API'yiga aloqasi yo'q. Xohlagan nomingizni qo'yishingiz mumkin:

```js
  const [fruit, setFruit] = useState('banana');
```

Bu yozish uslubi ["massiv tarqatilishi"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) ("array destructuring) deb ataladi. Bu shuni anglatadiki, yangi ikkita o'zgaruvchilar bo'lmish `fruit` va `setFruit`larni yaratmoqdamiz, qaysiki `fruit` aslida `useState` dan qaytarilgan massivning birinchisi hisoblanadi, shu o'rinda `setFruit` qiymatning ikkinchisidir. Kodni quyidagicha ham yozsak bo'ladi:

```js
  var fruitStateVariable = useState('banana'); // Juftlik qaytariladi
  var fruit = fruitStateVariable[0]; // Juftlikni birinchisi
  var setFruit = fruitStateVariable[1]; // Juftlikni ikkinchisi
```

`useState` orqali holat o'zgaruvchisini yaratganimizda, u juftlik qaytaradi — ikki qismli massiv. Birinchi qismi joriy qiymat, ikkinchisida shu qiymatni o'zgartiruvchi funksiya mavjud. Bu juftlik o'ziga xos ma'noga kasb eta oladi, `[0]` hamda `[1]` orqali ularni olish chalkashtiruvchi bo'lishi mumkin. Shuning uchun yozish uslubi massiv tarqatilishi turidan foydalanamiz.

>Eslatma
>
>React qanday qilib `useState` qaysi komponentga tegishli ekanligini biladi deb qiziqayotgan bo'lishingiz mumkin, axir React'ga `this` kabi hech narsa berib yubormayapmiz. [Bu savolingizga](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) va boshqa ko'plab savollaringizga FAQ bo'limida javob olishingiz mumkin.

### Maslahat: Bir qancha holat o'zgaruvchilarini ishlatish {#tip-using-multiple-state-variables}

Holat o'zgaruvchilarini juftlik `[something, setSomething]` sifatida yaratish juda qulay, chunki bu bilan kerak bo'lsa *har xil* nomli, bittadan ko'p  holat o'zgaruvchilarini yarata olamiz:

```js
function ExampleWithManyStates() {
  // Bir necha holat o'zgaruvchilarini yaratamiz!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

Yuqoridagi komponentda, bizda `age`, `fruit` va `todos` ichki o'zgaruvchilar bor va ularni birma bir yangilay olamiz:

```js
  function handleOrangeClick() {
    // this.setState ga o'xshash ({ fruit: 'orange' })
    setFruit('orange');
  }
```

Bir nechta holat o'zgaruvchilarini ishlatishingiz **shart emas**. Holat o'zgaruvchilari obyekt yoki massivlarni o'zida saqlay oladi, anglashiladiki bir-biriga bog'liq ma'lumotlarni guruhlasangiz bo'ladi. Biroq bunda, o'zgaruvchini klasslardagi `this.setState` kabi chapishtirilmaydi, balki *almashtiriladi*.

Holat o'zgaruvchilarini bir-biridan ajratish to'g'risida maslahatlarga [FAQ'da](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) to'xtalib o'tganmiz.

## Keyingi qadamlar {#next-steps}

Ushbu sahifada React tomonidan taqdim etilayotgan `useState` nomli huk haqida o'rgandik. Yana ba'zi paytlarda uni "holat huki" deb ham nomlaymiz. U React'ning funksiyaviy komponentlariga ichki holat qo'shib beradi -- bunaqasi hali bo'lmagan.

Biz yana huklar o'zi nima ekanligi haqida ham birqancha bilimlarga ega bo'ldik. Huk maxsus funksiya bo'lib, React'ning afzalliklarini funksiyaviy komponentlarda ishlatishga yordam beradi. Ularning nomlari `use` bilan boshlanadi, hali biz ko'rmagan huklar ham bor.

**Qani endi [`useEffect` hukini o'rganish](/docs/hooks-effect.html)ga kirishamiz.** Ushbu huk klasslardagi hayotiy jarayon metodlariga o'xshaydi. Hamda sizga komponent ichida tashqi ta'sir ko'rsatishga yordam beradi.
