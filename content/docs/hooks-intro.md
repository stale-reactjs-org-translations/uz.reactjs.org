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
<<<<<<< HEAD
>React 16.8.0 Ho'kni qo'llab-quvvatlaydigan birinchi release dir. Yangilaganizda, hamma paketlarini yangilashni unutmang, qaysiki React DOM ni ham. React Native Ho'kni keyingi barqaror release da qo'llab quvvatlaydi.
=======
>React 16.8.0 is the first release to support Hooks. When upgrading, don't forget to update all packages, including React DOM.
>React Native supports Hooks since [the 0.59 release of React Native](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059).
>>>>>>> de497e250340ff597ce4964279369f16315b8b4b

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

Buni hal qilish uchun, **Ho'klar bitta koponentni ko'proq qaysi qismlarga bog'liqligiga ko'ra(ma'lumot uzatish yoki obunalarni sozlash kabilar) kichikroq funksiyalarga ajratishga imkon beradi**, hayotiy sikl metodlariga asoslangan holda ajratishni majburlashga qaragandi. Komponentning lokal holatini uni yanada oldindan ko'ra oladigan bo'lishi uchun reducer bilan boshqarishga tanlashingingiz mumkin.

Biz bu haqida batafsil [Ho'k Effektlardan Foydalanish](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) da muhokama qilamiz.

### Class lar odamlarni ham, mashinalarni ham chalg'itadi {#classes-confuse-both-people-and-machines}

Kodni qayta foydalanish va kodni yanada qiyinroq tashkil qilinishiga qo'shimcha tarzda, class lar React ni o'rganishda kattagina to'siq bo'layotganini aniqladik. Siz JavaScriptda `this` qanday ishlashini tushunishingiz kerak, qaysiki u ko'p tillarda qanday ishlatilishiga ko'ra anchagina farq qiladi. Event hendler larni ham biriktirishni(bind) unutmasligingiz kerak. Beqaror(unstable) [takliflar sintaksis](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)isiz, kod juda cho'zilib ketgan. Odamlar props, state va yuqoridan-pastga ma'lumotlar oqimini ancha yaxshi tushuna oladi, lekin hanuzgacha class lar kurashishyapti. React da funksiya va class komponentlari orasidagi farq va ularni qachon ishlatilishi hatto tajribali React dasturchilari orasida ham qarama-qarshiliklarga olib keladi. 

Undan tashqari, React 5 yil davomida xizmat qilib keldi va biz uni keyingi 5 yillikda ham o'zini o'rnini saqlab qolishini xohlaymiz. [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) va boshqalarnikiga ko'ra, komponentlarning [oldindan tayyorlangan komplyatsiya](https://en.wikipedia.org/wiki/Ahead-of-time_compilation)si anchagina kelajak potensialiga ega. Ayniqsa, u shablonlarga cheklangan bo'lmasa. Yaqinda, Biz Yaqinda biz [Prepack] (https://prepack.io/) dan foydalanib [komponentli qatlama] (https://github.com/facebook/react/issues/7323) bilan tajriba o'tkazdek va biz va'da qilingan ilk natijalarini ko'rdik. Ammo, class komponentlar maqsadsiz patternlarni(qaysiki ushbu optimallashtirishlari fall back i sekinroq yo'lda qilinishi uchun) rag'batlantirishi mumkinligini aniqladik. Class lar hozirgi toollar uchun muammolarni vujudga keltiryapti. Misol uchun, class lar yaxshi minimallashmaydi va ular qaynoq qayta yangilanishi ham qatma-qat va ishonchsizdir. Kodni optimallashtiradigan yo'lda saqlab qolish uchun ko'proq imkoniyat yaratadigan API taqdim etishni istaymiz.

Ushbu muammolarni hal qilish uchun, **Ho'klar sizga Reactning ko'pgina classlarsiz imkoniyatlarini ishlatishga imkon beradi.** Konsepsiyasiga ko'ra, React komponentlari doim funksiyalariga yaqin hisoblanadi. Ho'klar funksiyalarni qamrab oladi, lekin Reactning amaliy ruhini qurbon qilmasdan. Ho'klar imperativ qochish lyuklariga kirishni ta'minlaydi va sizdan murakkab funksiyalashgan yoki reaktive dasturlash texnikalarini o'rganishni talab qilmaydi.

>Misollar
>
>[Bir qarashda Ho'klar](/docs/hooks-overview.html) - bu ho'klarni o'rganishga yaxshi joy.

## Bosqichma-bosqich Qabul qilish Strategiyasi {#gradual-adoption-strategy}

>**TLDR: Bu yerda React dan class larni o'chirish haqida rejalar yo'q.**

Biz Reakt dasturchilari mahsulotlarni etkazib berishga yo'naltirilganligini bilamiz va ular chiqarilayotgan har qanday yangi APIni ko'rib chiqish uchun vaqt topa olmaydilar. Ho'klar hali juda yangi va  o'rganish yoki ularni qabul qilishdan avval ko'proq misollarni va darslarni kutish yaxshiroq bo'lishi mumkin.

Biz shuni ham tushunishimiz kerakki, Reactga yangi primitiv qo'shish uchun katta-talab juda yuqori bo'ladi. Qiziquvchan o'quvchilar uchun, [batafsil qilingan RFC](https://github.com/reactjs/rfcs/pull/68)ni tayyorladik, qaysiki motivatsiyaga ko'proq tafsilotlari bilan kiradigan va o'ziga xos dizayn qarorlarida va ilgarigi sanat bilan bog'liqlikdagi qo'shimcha perspektiva lar bilan ta'minlaydigan.

**Eng muhimi, Ho'k lar mavjud kod bilan yonma-yon ishlaydi, shuning uchun aste-sekinlik bilan moslashib borasiz.** Ho'klarga o'tkazib chiqishga shoshish shartmas. Biz, har qanday "keng ko'lamda qayta yozishlar"dan(big rewrites) qochishingizni tavsiya qilamiz, ayniqsa mavjud, murakkab class komponentlar uchun. "Ho'klarda o'ylash"ni boshlashga biroz fikr-mulohaza qilib olish kerak. Bizning tajribamizda, Ho'klardan foydalanishda birinchi yangi va juda muhim bo'lmagan komponentlarda tajriba qilib ko'rish yaxshiroqdir, va jamoangizdagi hamma Ho'klar bilan yaxshi ishlay olishini ta'minlashingiz kerak. Ho'klarni sinab ko'rganingizda keyin, iltimos [fikr-mulohazalaringizni bizga jo'nating](https://github.com/facebook/react/issues/new), ijobiy yoki salbiy bo'lsa ham.

Biz Ho'klarni classlardagi barcha mavjud bo'lgan holatlar uchun qamrab olishi niyatidamiz, lekin **biz class komponentlarni yaqin kelajak uchun qo'llab-quvvatlashni davom ettiramiz.** Facebook da 10 minglab komponentlar class lar sifatida yozilgan va biz ularni qayta yozishni rejalashtirmayapmiz. Balki, class lar bilan yonma-yon tarzda yangi kodlarni Ho'klar bilan yozishni boshlayapmiz.

## Ko'p beriladigan Savol-Javoblar {#frequently-asked-questions}

Biz Ho'k haqidagi ko'p beriladigan umumiy savollarga javoblari uchun [Ho'klar FAQ sahifasi](/docs/hooks-faq.html)ni tayyorladik .

## Keyingi Qadamlar {#next-steps}

Bu sahifaning yakuni sifatida, siz Ho'klar qanday muammolarni hal qilish haqdia ishlov berilmagan fikrlar bo'lishi kerak, lekin ko'p detallar ehtimol noaniq bo'lishi mumkin. Xavotir olmang! **Keling hoziroq Ho'k haqida misollar bilan o'rganishni boshlash uchun [keyingi sahifa](/docs/hooks-overview.html)ga o'tamiz.**
