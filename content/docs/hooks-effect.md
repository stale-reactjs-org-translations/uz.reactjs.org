---
id: hooks-state
title: Taʼsir hukini ishlatish
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

*Huklar* - React 16.8'ga kiritilgan yangilik. Ular sizga klass yozmasdan turib holat (state) va React'ning boshqa qulayliklarini ishlatishga yordam beradi.

Funksiyaviy komponentlarda *Taʼsir Huki* tashqi taʼsirlar koʻrsatishga yordam beradi:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount hamda componentDidUpdate ga oʻxshash:
  useEffect(() => {
    // Hujjat sarlavhasini brauzer APIʼyi orqali oʻzgartirish
    document.title = `You clicked ${count} times`;
  });

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

Ushbu boʻlak [oldingi sahifadagi sanagich misolidan](/docs/hooks-state.html) olingan. Biroq, unga hujjat sarlavhasini tugmani necha marta bosilganini haqidagi matnga oʻzgartadigan yangilik kiritik.

Quyidagilarni tashqi taʼsirlar deya olamiz: maʼlumotlarni olish, obuna boʻlish va DOMʼni qoʻlda oʻzgartirish. Ularni "tashqi taʼsir" (yoki shunchaki "taʻsir") deb nomlaganmisiz yoʻqmi, lekin ularni komponentlaringizda ishlatgan boʻlsangiz kerak.

>Maslahat
>
>Agar Reactʼning hayotiy jarayon metodlari bilan tanish boʻlsangiz, `useEffect` hukini `componentDidMount`, `componentDidUpdate` va `componentWillUnmount` kabilarni birlashgani deyishingiz mumkin .

React komponentlarda ikki xil tashqi taʼsirlar bor: tozalash taʼlab qilmaydigan, hamda talab qiladigan. Qani endi shu farqga koʻproq toʻxtalamiz.

## Tozalanmaydigan tashqi taʼsirlar {#effects-without-cleanup}

Baʼzida, **React DOMʼni yangilaganidan soʻng qoʻshimcha kodni** yurgizishimiz kerak. Tarmoq soʻrovi, DOMʼni qoʻlda oʻzgartirish va loglash tozalash - buni tozalashni qilmaydigan tashqi taʼsirlarga yaqqol misoldir. Bunday deyishimizga sabab bu kodlarni yurgizib ular haqida unuta olamiz. Qani endi klasslar hamda huklar qanday qilib tashqi taʼsirlarni amalga oshirishini solishtiramiz.

### Klasslardagi misol {#example-using-classes}

Reactʼning klass komponentlarida, `render` metodi tashqi taʼsir koʻrsatmasligi kerak. Bu ancha ertaroq boʻlib qoladi -- odatda React DOMʼni yangilaganidan keyingina biz oʻz taʼsirlarimizni koʻrsatamiz.

Shuning uchun klasslarda, tashqi taʼsirlarni `componentDidMount` hamda `componentDidUpdate`larni ichida amalga oshiramiz. Misolimizga qaytar ekanmiz, ushbu sanagich keltirilgan Reactʼning klass komponentida DOMʼga oʻzgartirishlar kiritilganidan soʻng hujjat sarlavhasini oʻzgartiramiz:

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `Siz ${this.state.count} marta bosdingiz`;
  }

  componentDidUpdate() {
    document.title = `Siz ${this.state.count} marta bosdingiz`;
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

**Klasslarda bitta kodni ikki hayotiy jarayon metodlari ichida nusxalashga majbur ekanligimizga** eʼtibor qarating.

Chunki koʻp holatlarda bitta taʼsirni komponent hozirgina oʻrnatilganligi yoki yangilanganligidan qatʼiy nazar amalga oshirishni hohlaymiz. Xayolan, biz uni har safar chizilishdan (render) soʻng amalga oshishini xohlaymiz -- lekin React klass komponentlarda bunaqa metod yoʻq. Oʻsha boʻlakni alohida metodga ajrata olamiz, lekin baribir uni ikka marta chaqirishimiz kerak.

Qani endi xuddi shu narsani `useEffect` huki bilan amalga oshiramiz.

### Huklar bilan misol {#example-using-hooks}

Bu misolni sahifa tepasida allaqachon koʻrgan edingiz, qani endi yaqinroq tanishamiz:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Siz ${count} marta bosdingiz`;
  });

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

**`useEffect` nima ish bajaradi?** Ushbu huk orqali, Reactʼga komponentni chizgandan soʻng nima qilishni aytishingiz mumkin. React berib yuborgan funksiyangizni eslab qoladi (bu narsani "taʼsir" deb ataymiz), hamda DOM oʻzgarishlari amalga oshganidan soʻng chaqiradi. Bu taʼsirda, biz hujjat sarlavhasini oʻzgartirmoqdamiz, buni oʻrniga maʼlumot olish yoki ixtiyoriy APIʼdan biror narsani chaqirishimiz ham mumkin.

**Nega `useEffect` komponent ichida chaqirilmoqda?** `useEffect`ni komponentning ichida joylash orqali `count` holat oʻzgaruvchisiga (yoki kiritmalarga (props)) taʼsir ichidan turib ishlata olamiz. Buni oʻqish uchun bizga hech qanday API kerak emas -- u allaqachon funksiya qamrovi ichida. Huk JavaScript yopilishlarini (closureʼlarni) ishlatadi va faqat React uchun tanish boʻlgan API yaratilishini oldini oladi.

**`useEffect` har bir chizilishdan soʻng yurgiziladimi?** Ha! Odatda, u birinchi chizilish *hamda* har bir oʻzgarishdan soʻng yurgiziladi. (Keyinroq buni [qanday oʻzgartirish](#tip-optimizing-performance-by-skipping-effects) haqida gaplashamiz.) "Oʻrnatilish" yoki "yangilanishga" asoslangan fikrdan koʻra, taʼsirlar "chizishdan keyin" amalga oshadi deb firklash ancha tushinarliroq. React taʼsirlarni DOM oʻzgartirilganidan soʻng chaqirilishini kafolatlaydi.

### Batafsil tushuntirish {#detailed-explanation}

Endi taʼsirlar haqida koʻproq bilamiz va ushbu kod siz uchun maʼno anglatishi kerak:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Siz ${count} marta bosdingiz`;
  });
}
```

`count` deb nomanlan holat oʻzgaruvchisini yaratamiz va Reactʼga taʼsir koʻrsatishimiz kerakligi haqida aytamiz. `useEffect` hukiga funksiya berib yuboramiz. Berib yuborilgan funksiya - *bu* bizning taʼsirimiz hisoblanadi. Taʼsirimiz ichida, Brauzerning `document.title` APIʼdan foydalanib hujjat sarlavhasini oʻzgartiramiz. `count` funksiyamiznig qamrovida boʻlgani uchun uni taʼsirning ichida oxirgi qiymatida ishlata olamiz. React komponentimizni chizganida, ishlatgan taʼsirimizni eslaydi va DOMʼni yangilashi bilanoq bizni taʼsirni ishga tushiradi. Bu har chizishda amalga oshadi, eng birinchisida ham.

Tajribali JavaScript dasturchilar sezishi mumkinki `useEffect`ga berib yuborilgan funksiya har safar har xil boʻladi. Bu ataylabdan. Chunki, aynan shu narsa bizga taʼsir ichida turib `count`ning eskirib qolmayotganini kafolatlaydi. Har safar qayta-chizishda, oldingisini oʻrniga _boshqa_ taʼsirni rejalashtiramiz. Qaysidur maʼnoda, bu - taʼsirlarni chizishning oqibatlari boʻlagiga aylantiradi -- har taʼsir aynan bir chizishga "tegishli". Bu nimaga foydali ekanligiga [keyinroq toʻxtalamiz](#explanation-why-effects-run-on-each-update).

>Maslahat
>
>`componentDidMount` yoki `componentDidUpdate`ga oʻxshamagan holda, `useEffect` orqali rejalashtirilgan taʼsirlar brauzer ekranni yangilashiga toʻsqinlik qilmaydi. Bu dasturimizni sezgirroq qiladi. Koʻpchilik taʼsirlar ket-ma ketlikda bajarilishi kerak emas. Baʼzi holatlar uchun (masalan, oʻlchovlar olishda) esa, APIʼyi `useEffect`ga oʻxshash boʻlgan alohida [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) huki bor .

## Tozalanadigan taʼsirlar {#effects-with-cleanup}

Yuqorida, qanday qilib tozalash talab qilmaydigan taʼsir koʻrsatish haqida toʻxtaldik. Biroq, baʼzi taʼsirlar buni talab qiladi. Masalan, biror tashqi maʼlumot manbaiga **obuna boʻlmoqchimiz**. Bu holatda, xotira sizishini toʻxtatish uchun tozalash ishlarini olib borish muhimdir! Qani endi buni klasslarda hamda huklarda qanday qilishimiz mumkinligini solishtiramiz.

### Klass orqali yozilganida {#example-using-classes-1}

React klasslarida, obunani odatda `componentDidMount`da sozlaysiz va `componentWillUnmount`da tozalaysiz. Masalan, aytaylik doʻstimizning statusi haqida maʼlumot beradigan `ChatAPI` toʻplamimiz bor. Quyida buni klasslar orqali qanday yozishimiz mumkinligi aks etgan:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Yuklanyapti...';
    }
    return this.state.isOnline ? 'Onlayn' : 'Oflayn';
  }
}
```

`componentDidMount` bilan `componentWillUnmount` bir birini takrorlashiga eʼtibor qarating. Kodning gʻoyasi bitta taʼsir ekanligiga qaramasdan, hayotiy jarayon metodlari ularni ikkita mantiqiy boʻlaklarga ajratishga majburlaydi.

>Eslatma
>
>Ziyrak oʻquvchilarimiz ushbu kod aniq ishlashi uchun `componentDidUpdate` kerak ekanligini sezgandurlar. Hozircha buni chetga surib turamiz, lekin albatta [keyingi boʻlimda](#explanation-why-effects-run-on-each-update) bunga qaytamiz.

### Huklar bilan misol {#example-using-hooks-1}

Ushbu komponentni huklar yordamida qanday yozishimizni koʻramiz.

Tozalashni amalga oshirish uchun alohida taʼsir kerak deb oʻylayotgandir siz. Lekin obuna boʻlish va uni bekor qilish bir biriga shunchalik bogʻliqki, `useEffect` ularni bir joyda saqlashni koʻzda tutgan. Agar taʼsiringiz funksiya qaytarsa, React uni tozalash vaqtida chaqiradi:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Yuklanyapti...';
  }
  return isOnline ? 'Onlayn' : 'Oflayn';
}
```

**Nimaga taʼsirimizdan funksiya qaytardik?** Bu taʼsirlar uchun ixtiyoriy tozalash usuli. Barcha taʼsirlar oʻzlarini tozalaydigan funksiya qaytarishi mumkin. Bu bizga obuna boʻlish va bekor qilishning mantiqiy qismini bir joyda saqlashga imkon beradi. Ular ayni bir taʼsirning boʻlarlaridir!

**Aynan qachon React taʼsirni tozalaydi?** Komponent tushirilgandan keyin React tozalashni amalga oshiradi. Biroq, oldinroq oʻrganganimizdek, taʼsirlar bir martagina emas balki har bir chizishda chaqiriladi. Chunki React taʼsirlarni yana chaqirishdan avval oldingi chizishning taʼsirlarini *ham* tozalab chiqadi. Bu nimaga [xatoliklarni chetlab oʻtishga yordam berishi](#explanation-why-effects-run-on-each-update) hamda [agar tezlikda muammo keltirgan paytlarda bundan qutilish](#tip-optimizing-performance-by-skipping-effects) haqida quyida yana toʻxtalamiz.

>Eslatma
>
>Taʼsirlardan nomli funksiya qaytarishimiz majburiy emas. Funksiyani maqsadini aniqlab ketish uchun `cleanup` nomlagan edik. Siz yoylik funksiyalardan yoki boshqa nomdan foydalanishingiz mumkin.

## Takrorlash {#recap}

`useEffect` turli xil taʼsirlar koʻrsatishimizda yordam berishini bilib oldik. Baʼzi tozalashni talab qiladigan taʼsirlar funksiya qaytaradi:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Tozalash kerak boʻlmagan taʼsirlar ham bor va ular hech narsa qaytarmaydi.

```js
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

Taʼsir huki ikki holatni yagona API mujassam etadi.

-------------

**Taʼsir huki qanday ishlashini yaxshi tushungan boʻlsangiz yoki sizga qiyinlik qilyotgan boʻlsangiz keyingi [Huklar uchun qoidalar](/docs/hooks-rules.html) sahifasiga oʻtishingiz mumkin.**

-------------

## Taʼsirlarni ishlatishda tavsiyalar {#tips-for-using-effects}

Tajribali React foydalanuvchilari uchun qiziq boʻlgan, `useEffect`ning baʼzi jabhalarini chuqurroq oʻrganishda davom etamiz. Ular haqida hozir bilishingiz majburiy emas albatta. Istagan payt taʼsir huki haqida bilimlarni kuchaytirish uchun ushbu sahifaga qaytishingiz mumkin.

### Maslahat: Vazifasiga qarab taʼsirlarni ajrating {#tip-use-multiple-effects-to-separate-concerns}

Klasslarning hayotiy-jarayon metodlarida bir-biriga bogʻliq boʻlmagan mantiqiy qismlar saqlanadi, bogʻliqlari esa bir necha metodlarga ajratiladi. Bu bizni huklarni yaratishga undagan [sabab](/docs/hooks-intro.html#complex-components-become-hard-to-understand)lardan biri ekanligi haqida aytgan edik. Ushbu komponent sizga tanish boʻlgan sanagich va doʻstingizning statusi haqidagi misollardagi mantiqiy qismlarni birlashtiradi:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `Siz ${this.state.count} marta bosdingiz`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `Siz ${this.state.count} marta bosdingiz`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

`document.title` bilan ishlaydigan mantiqiy qismlar `componentDidMount` hamda `componentDidUpdate` boʻylab ajratilganiga eʼtibor bering. Obuna boʻlish bilan bogʻliq mantiq ham `componentDidMount` va `componentWillUnmount` orasida taqsimlangan. `componentDidMount`da boʻlsa ikkala vazifaga ham aloqador kodni uchratishingiz mumkin.

Xoʻsh, ushbu muammoni huklar bilan qanday hal qilamiz? [*Holat* hukini bir necha marta ishlata olganingiz](/docs/hooks-state.html#tip-using-multiple-state-variables) kabi, Taʼsir hukini ham bir necha bor ishlata olasiz. Bu bizga bogʻliq boʻlmagan mantiqiy qismlarni bir-biridan ajratishga yordam beradi:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Siz ${count} marta bosdingiz`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

Hayotiy-jarayon metodlaridan farqli, **huklar bilan kod nima qilishiga qarab, ularni ajrata olamiz**. React komponent ishlatgan *har bir* taʼsirni yozilgan ketma-ketligida amalga oshirib chiqadi.

### Sharh: Nega Taʼsirlar har yangilanishda chaqiriladi {#explanation-why-effects-run-on-each-update}

Klasslarga oʻrganib qolgan boʻlsangiz, oʻylayotgan boʻlishingiz mumkin taʼsirni tozalash nimaga har qayta chizishdan soʻng amalga oshiriladi, shunchaki (komponent) tushirilganidan soʻng bir martagina emas? Qani bu usul kamroq baglar bilan komponent yozishimizda qanday yordam berishi mumkinligini koʻramiz.

[Shu sahifaning teparogʻida](#example-using-classes-1), doʻstingiz onlayn yoki yoʻqligini koʻrsatadigan `FriendStatus` komponentini taqdim etgandik. Klassimiz `this.props`dan `friend.id`ni oʻqiydi, komponent oʻrnatilganidan keyin doʻstimizning statusiga obuna boʻladi, shu bilan (komponent) tushirilishida obunani bekor qiladi:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Komponent ekranda paytida **`friend` kiritmasi (prop) oʻzgarsa nima boʻladi?** Komponentimiz boshqa doʻstimizning tarmoqda ekanligi haqidagi maʼlumotni koʻrsatib turadi va bu - bag. Komponentni tushirish paytida obunani boshqa ID bilan bekor qilganimiz uchun xotira sizishi yoki dasturni ishdan chiqishiga ham olib kelamiz.

Klass komponentlarda, buni hal qilishimiz uchun `componentDidUpdate` kerak:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Avvalgi friend.id bilan obunani bekor qilish
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Yangi friend.id bilan obuna boʻlish
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

React dasturlaridagi koʻp baglar `componentDidUpdate`ni boshqarishdagi xatoliklar ortidan kelib chiqadi.

Komponentni huklarda yozilgan koʻrinishiga eʼtibor bering:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Bu unday bagdan holis. (Hech qanday oʻzgartirish kiritmasak ham.)

Yangilanishlarni boshqarish uchun hech qanday maxsus kod kerak emas, chunki `useEffect` *boshidan* bu ishni oʻzi qiladi. U yangi taʼsirlarni amalga oshirishdan oldin eskilarini tozalab chiqadi. Obuna boʻlish va uni bekor qilish ortidan komponent nimalar qilishini tasavvur qilib koʻramiz:

```js
// { friend: { id: 100 } } kiritmalari bilan oʻrnatildi
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Birinchi taʼsir koʼrsatildi

// { friend: { id: 200 } } kiritmalari bilan yangilandi
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Taʼsir tozalandi
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Keyingi taʼsir koʼrsatildi

// { friend: { id: 300 } } kiritmalari bilan yangilandi
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Taʼsir tozalandi
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Keyingi taʼsir koʼrsatildi

// Tushirildi
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Eng oxirgi taʼsir tozalandi
```

Bu xulq (behaviour) mustahkamlikni boshidan taʼminlab, klasslarda yangilashning mantiqiy qismi yo'qligi ortidan kelib chiqadigan baglarni oldini oladi.

### Maslahat: Tezlikni taʼsirlarni tashlab ketib oshirish {#tip-optimizing-performance-by-skipping-effects}

Baʼzi holatlarda, har chizishda taʼsirlarni tozalash yoki amalga oshirish tezlikka taʼsir qilishi mumkin. Buni klass komponentlarda `componentDidUpdate`ning ichida `prevProps` yoki `prevState`dan foydalanib qoʻshimcha solishtirish amali orqali hal qilamiz:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

Bu ish koʻp talab qilingani uchun `useEffect` huki APIʼda bu koʻzda tutilgan. Qayta chizishlar davrida baʼzi qiymatlar oʻzgarmagan boʻlsa, Reactʼga taʼsirlarni *tashlab* ketishi mumkinligini aytsangiz boʻladi. Bu uchun, `useEffect`ga ixtiyoriy boʻlgan ikkinchi argument sifatida massiv berib yuboring:

```js{3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count oʻzgarsagina, taʼsir koʻrsatiladi
```

Yuqoridagi misolda, ikkinchi argument sifatida `[count]`ni berib yubordik. Bu nima degani? Agar `count`ni `5` desak, qayta chizishdan keyin komponentimizdagi `count` haliyam `5`ga teng boʻlsa, React oldingi chizishdagi `[5]` bilan keyingi chizishdagi `[5]`ni solishtiradi. Massivdagi barcha qiymatlar tengligi uchun (`5 === 5`), React (oʻsha) taʼsirni tashlab ketadi. Bu bilan kodni iloji boricha yaxshiladik.

`count` qiymati `6`ga oʻzgarganidan keyingi chizishda, React oldingi chizishdagi massiv qiymatlari `[5]` bilan keyingi chizishdagi massivni `[6]` solishtiradi. Bu safar, `5 !== 6` ekanligi uchun React taʼsirni amalga oshiradi. Massivda birnechta qiymatlar boʻladigan boʻlsa, ularni bittaginasi oʻzgargan boʻlsa ham React taʼsirni qayta amalga oshiradi.

Bu tozalanishi kerak boʻlgan taʼsirlarga ham amal qiladi:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Faqatgina props.friend.id oʻzgarsa qayta obuna boʻl
```

Kelajakda, ikkinchi argument bajarilish davridagi oʻzgarishlar ortidan oʻz-oʻzidan berib yuborilishi mumkin.

>Eslatma
>
>Bu usulni ishlatmoqchi boʻlsangiz, massiv ichida **komponent qamrovidagi vaqt oʻtishi bilan oʻzgaradigan (holat yoki kiritmalar kabi) hamda taʼsir tomonidan ishlatilgan qiymatlar** borligini tekshiring. Aks holda, kodingiz oldingi chizishlardan qolgan, eskirgan qiymatlarni ishlatishi mumkin. [Funksiyalar bilan qanday ishlash](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) yoki [massiv juda koʻp oʻzgarganda nima qilish](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) koʻproq oʻqishingiz mumkin.
>
>Taʼsirni faqat bir marta amalga oshirib hamda tozalamoqchi boʻlsangiz (oʻrnatilgani va tushirilganida), ikkinchi argument sifatida boʻsh massiv berib yuborishingiz (`[]`) mumkin. Bu orqali React taʼsiringiz *hech qanday* holat yoki kiritmaga boʻysunmasligini biladi va uni qayta yurgizmaydi. Bunga alohida holat sifatida qaralmaydi -- taʼsir oʻziga kerakli massivga qarab, odatiy ishlash usulida  davom etadi .
>
>Boʻsh massiv (`[]`) berib yuborilganida, taʼsir ichidagi kiritma hamda holat qiymatlari boshlangʼich holatida qolagi. `[]` berib yuborish bizga tanish `componentDidMount` bilan `componentWillUnmount`ning andazasiga yaqin va odatda taʼsirlarni koʻp marta qayta ishlatmaslik uchun [yaxshiroq](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [yechimlar](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) ham mavjud. Esdan chiqarmangki, bravzer barcha oʻzgarishlarni chizib tugatmaganicha, React `useEffect`ni chaqirilishini orqaga surib turadi, shu uchun qoʻshimcha ish qilishga muammo sifatida qaramang.
>
>[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) toʻplamimizning boʻlagi hisoblanadigan  [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qoidasini ishlatishni maslahat beramiz. U taʼsir boʻysunadigan qiymatlar notoʻgʻri qoʻyilganligidan ogohlantirib, yechim taklif qiladi.

## Keyingi qadamlar {#next-steps}

Tabriklaymiz! Sahifa ancha choʻzilib ketdi, ammo umid qilamizki oxiriga kelib taʼsirlar haqidagi savollaringizga javob topdingiz. Holat va Taʼsir huklari haqida oʻrganib boʻldingiz va bu ikkalasidan foydalanib *anchagina* narsalar qilishingiz mumkin. Bular klasslar ishlatiladigan koʻpgina vaziyatlarni qamrab oladi. [Qoʻshimcha huklar](/docs/hooks-reference.html) haqida bilish zarar qilmaydi.

Huklarni yaratishga [undagan](/docs/hooks-intro.html#motivation) bir qancha muammolar yechilyotganini koʻra boshladik. Taʼsirni tozalash `componentDidUpdate` hamda `componentWillUnmount`dagi nusxa koʻchirishlarni tugatib, bir-biriga aloqador kodlarni yaqinlashtirgani shuning bilan birga bagsiz kod yozishga yordam berishini koʻrdik. Klasslarda qilishni iloji boʻlmagan ish yaʼni, Taʼsirlarni vazifasiga qarab ajratishni haqida oʻrganib oldik.

Bu nuqtaga kelib, Huklar qanday ishlashiga qiziqayotgan boʻlishingiz mumkin. Qayta chizishlar orasida React qanday biladiki qaysi `useState` chaqiruvi uchun qaysi holat oʻzgaruvchisiga tegishli? Har yangilanishda React qanday qilib oldingi va keyingi taʼsirlarni "toʻgʻirlab" keta olyapti? **Keyingi sahifada [Huklar uchun qoidalar](/docs/hooks-rules.html) haqida oʻrganishingiz mumkin -- ular Huklarni ishlatadigan asosiy narsalar.**
