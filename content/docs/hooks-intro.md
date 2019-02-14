---
id: hooks-intro
title: Ho'klarni tanishtirish
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

**Tarjima bo'yicha Eslatma**: Ingliz tilidagi *Hook* termini tarjima qilishda, shuni bildikki, bu Kapitan Ho'k nomiga ya'ni uning qo'lidagi "Ilgak" - ho'k deb ataladi. Demak, Hook ni bundan keyin Ho'k deb ishlatamiz.

*Hooks* React 16.8 versiyada yangi qo'shilgan. Ular sizga class yozmasdan holat(state) va boshqa React imkoniyatlaridan foydalalishga imkon beradi.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Yangi "count" deb ataladigan holat o'zgaruvchisi e'lon qilinyapti
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Ushbu yangi `useState` funksiyasi Ho'k haqida o'rganmoqchi bo'lgan birinchi "Ho'k"dir, lekin bu misol shunchaki tizer. Agar u tushunarsiz bo'layotgan bo'lsa, tashvishlanmang!

**Ho'k ni o'rganishni [keyingi sahifada](/docs/hooks-overview.html) boshlashingiz mumkin.** Bu sahifada esa, Ho'kni React ga nega qo'shganimiz va zo'r ilovalarni yozishda qanday yormad berishi haqida tushuntirib o'tamiz.

>Eslatma
>
>React 16.8.0 Ho'kni qo'llab-quvvatlaydigan birinchi release dir. Yangilaganizda, hamma paketlarini yangilashni unutmang, qaysiki React DOM ni ham. React Native Ho'kni keyingi barqaror release da qo'llab quvvatlaydi.

## Video Tanishtiruv {#video-introduction}

React Conf 2018 da, Ryan Florence, qanday qilib ulardan foydalanib ilovani refaktor qilish mumkinligini namoyish qilib ko'rsatgandan so'ng, Sophie Alpert and Dan Abramov Ho'k larni tanishtirdi. Videoni shu yerda ko'ring:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

  ## Buzilgan o'zgarishlar yo'q {#no-breaking-changes}

  Davom etishdan avval, Ho'k lar nima ekanligi haqida eslatamiz:

  * **Mutlaqo tanlovli.** Bir qancha komponentlarda mavjud kodni qayta yozib chiqmasdan ham Ho'kni sinab ko'rishingiz mumkin. Lekin agar xohlamayotgan bo'lsangiz Ho'kni o'rganishingiz yoki ishlatishingiz shartmas.
  * **100% backwards-compatible.** Ho'klarda hech qanaqa buzilgan o'zgarishlar yo'q.Hooks don't contain any breaking changes.
  * **Hozir yaroqli.** v16.8.0 release bilan Ho'klar hozir ishlatishga tayyot.

  **React dan class larni o'chirib tashlash rejasi yo'q.** Ushbu sahifaning [quyi qismida](#gradual-adoption-strategy) Ho'klar uchun bosqichma-bosqich qabul qilinadigan strategiyasi haqida bilib olishingiz mumkin.

  **Ho'k lar React konsepsiyasi haqidagi bilimlaringizni o'zgartirmaydi.** Balki, Ho'klar o'zingiz avval bilgan React konsepsiyalarga yanada ko'proq bevosita API lar bilan ta'minlaydi: props, state, context, refs, va lifecycle.  Ho'klar ularni kombinatsiya qiluvchi yangi kuchliroq yo'llarni taklif qilishini ham ko'rib chiqamiz.

  **Agar Ho'k ni o'rganishni xohlayotgan bo'lsagniz, [keyingi sahifaga o'tib ketish](/docs/hooks-overview.html)ingiz mumkin!** Ho'klarni nimaga qo'shganimiz va ilovalarimizni qayta yozib chiqmasdan qanday qilib ho'klar dan foydalanib boshlash mumkinligi haqida ko'proq bilib olish uchun ushbu sahifani o'qishni davom ettirishingiz mumkin.

## Motivatsiya {#motivation}

Ho'klar Reactdagi chamasi aloqasi bo'lmagan turli xildagi muammolarni hal qiladi, qaysiki 5 yil ichida o'n minglab komponentlarni yozish va tuzatishlar davomida duch kelayotgan muammolar. Reactni o'rganyapsiz, undan kuniga foydalanyapsizmi yoki o'xshash komponent model bilan turli kutubxonalarni ishlatishni afzal ko'ryapsizmi, aytgan muammolarimizdan ba'zilarini bilib olgan bo'lishingiz mumkin.

### Komponentlar orasida holatli logikalardan qayta foydalanish qiyin. {#its-hard-to-reuse-stateful-logic-between-components}

React komponentga qayta foydalaniladigan hatti-harakat(behavior)ni "biriktirish" uchun yo'l taklif qilmaydi(misol uchun, komponentni store ga bog'lash behaviori). Agar React bilan bir muddat ishlab ko'rgan bo'lsangiz, buni hal qilish uchun [props ni chizish](/docs/render-props.html) and [yuqori-darajadagi komponentlar](/docs/higher-order-components.html) kabi pattern lar bilan tanish bo'lishingiz mumkin. Lekin bu pattern lar ulardan foydalanganingizda komponentlarni qayta strukturalab chiqishingizni talab qiladi, qaysiki patternlar bilan ketganizda beso'naqay va kodingiz yanada qiyinroq bo'lib qoladi. Agar tipik React ilovani React DevTools da qarasangiz, "wrapper hell" komponetlarning provider lar, consumer lar, higher-order koponentlar, render props va boshqa mavhumliklar bilan o'ralganini topishingiz ehtimoli bor. Biz [ularni DevTools da filter](https://github.com/facebook/react-devtools/pull/503) qila olsakda, bu tub muammoga chuqurroq ishora qiladi, ya'ni: holatli logika(statefull logic)  almashish uchun Reactga yaxshiroq primitiv kerak.


Ho'klar bilan, mustaqil ravishda testlana oladigan va qayta foydalaniladigan bo'lishi uchun holatli logikani komponentdan ajratib olishingiz mumkin. **Ho'klar sizning komponentlar irarhiyangizni o'zgartirmasdan turib, holatli logikangizni qayta foydalanishga imkon beradi.** Bu Ho'klarni ko'pgina komponentlar yoki jamoa lar orasida almashish(yoki ulashish)ni osonlashtiradi.

Bu haqida batafsil [O'zingizni Ho'klaringizni qurish](/docs/hooks-custom.html) da muhokama qilamiz.

### Murakkab komponentlar tushunishga qiyin bo'lib qoladi  {#complex-components-become-hard-to-understand}

Ko'pincha biz oddiy boshlagan komponentlarimizga tez-tez tuzatishlar qilib turishimiz kerak bo'ladi, lekin holatli logika(statefull logic) va kutilmagan ta'sirlarning(side-effects) boshqarib bo'lmaydigan chalkashliklari ko'payib ketadi. 
Har bir hayotiy sikl metodi  ko'pincha aloqasi bo'lmagan logikaning aralashmasini o'z ichiga oladi. Misol uchun, komponentlar `componentDidMount` va `componentDidUpdate` larni ichida ba'zi bir m'alumotlar uzatishlarni amalga oshirishi mumkin.   Ammo, bir xildagi  `componentDidMount` metod eventListener larni sozlash(qaysiki, `componentWillUnmount` da listenerlarni tozalashi bilan)ga o'xshash ba'zi bog'liq bo'lmagan logikalarni o'z ichiga olishi mumkin.  Birgalikda o'zgaradigan o'zaro bog'liq kodlar alohida-alohida qilib ajratiladi, ammo umuman bo'gliq bo'lmagan kodlar yagona metodda birlashtiriladi. Bu esa buglar va nomutanosibliklarni kelib chiqishino osonlashtiradi.

Ko'p hollarda ushbu komponentlarni kichiklariga ajratib chiqish imkonsiz bo'lib qoladi, chunki, holatli logika hamma joyda bo'ladi. Shuningdek ularni testlash ham qiyin kechadi. Bu ko'pchilik odamlarni React ni alohida holatlarni boshqarish kutubxonasini bilan kombinatsiya qilib ishlatishni afzal ko'rish sabablaridan biridir. Biroq, bu ko'pincha juda ham ko'p mavhumliklarni keltirib chiqaradi, turli fayllar orasida sakrab  yurishingizga majbur qiladi va komponentlardan qayda foydalanishni yanada qiyinlashtiradi.

Buni hal qilish uchun, **Ho'klar bitta koponentni ko'proq qaysi qismlarga bog'liqligiga ko'ra(ma'lumot uzatish yoki obunalarni sozlash kabilar) kichikroq funksiyalarga ajratishga imkon beradi**, hayotiy sikl metodlariga asoslangan holda ajratishga majburlashga qaragandi. 

To solve this, **Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data)**, rather than forcing a split based on lifecycle methods. Komponentning lokal holatini uni yanada oldindan ko'ra oladigan bo'lishi uchun reducer bilan boshqarishga tanlashingingiz mumkin.

Biz bu haqida batafsil [Ho'k Effektlardan Foydalanish](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) da muhokama qilamiz.

### Class lar odamlarni ham, mashinalarni ham chalg'itadi {#classes-confuse-both-people-and-machines}

In addition to making code reuse and code organization more difficult, we've found that classes can be a large barrier to learning React. You have to understand how `this` works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable [syntax proposals](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/), the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As [Svelte](https://svelte.technology/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/), and others show, [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) of components has a lot of future potential. Especially if it's not limited to templates. Recently, we've been experimenting with [component folding](https://github.com/facebook/react/issues/7323) using [Prepack](https://prepack.io/), and we've seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today's tools, too. For example, classes don't minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.

To solve these problems, **Hooks let you use more of React's features without classes.** Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don't require you to learn complex functional or reactive programming techniques.

>Examples
>
>[Hooks at a Glance](/docs/hooks-overview.html) is a good place to start learning Hooks.

## Gradual Adoption Strategy {#gradual-adoption-strategy}

>**TLDR: Bu yerda React dan class larni o'chirish haqida rejalar yo'q.**

We know that React developers are focused on shipping products and don't have time to look into every new API that's being released. Hooks are very new, and it might be better to wait for more examples and tutorials before considering learning or adopting them.

We also understand that the bar for adding a new primitive to React is extremely high. For curious readers, we have prepared a [detailed RFC](https://github.com/reactjs/rfcs/pull/68) that dives into motivation with more details, and provides extra perspective on the specific design decisions and related prior art.

**Eng muhimi, Ho'k lar mavjud kod bilan yonma-yon ishlaydi,  shuning uchun aste-sekinlik bilan moslashib borasiz.** We are sharing this experimental API to get early feedback from those in the community who are interested in shaping the future of React — and we will iterate on Hooks in the open.

Finally, there is no rush to migrate to Hooks. We recommend avoiding any "big rewrites", especially for existing, complex class components. It takes a bit of a mindshift to start "thinking in Hooks". In our experience, it's best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.

We intend for Hooks to cover all existing use cases for classes, but **we will keep supporting class components for the foreseeable future.** At Facebook, we have tens of thousands of components written as classes, and we have absolutely no plans to rewrite them. Instead, we are starting to use Hooks in the new code side by side with classes.

## Ko'p beriladigan Savol-Javoblar {#frequently-asked-questions}

We've prepared a [Hooks FAQ page](/docs/hooks-faq.html) that answers the most common questions about Hooks.

## Keyingi Qadamlar {#next-steps}

By the end of this page, you should have a rough idea of what problems Hooks are solving, but many details are probably unclear. Don't worry! **Let's now go to [the next page](/docs/hooks-overview.html) where we start learning about Hooks by example.**
