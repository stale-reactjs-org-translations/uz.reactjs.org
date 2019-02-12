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

  **React dan class larni o'chirib tashlash rejasi yo'q.** You can read more about the gradual adoption strategy for Hooks in the [bottom section](#gradual-adoption-strategy) of this page.

  **Ho'k lar React konsiyasi haqidagi bilimlaringizni o'zgartirmaydi.** Instead, Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. As we will show later, Hooks also offer a new powerful way to combine them.

  **Agar Ho'k ni o'rganishni xohlayotgan bo'lsagniz, [keyingi sahifaga o'tib ketish](/docs/hooks-overview.html)ingiz mumkin!** You can also keep reading this page to learn more about why we're adding Hooks, and how we're going to start using them without rewriting our applications.

## Motivatsiya {#motivation}

Hooks solve a wide variety of seemingly unconnected problems in React that we've encountered over five years of writing and maintaining tens of thousands of components. Whether you're learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

### Komponentlar orasida holatli logikalardan  qayta foydalanish qiyin. {#its-hard-to-reuse-stateful-logic-between-components}

React doesn't offer a way to "attach" reusable behavior to a component (for example, connecting it to a store). If you've worked with React for a while, you may be familiar with patterns like [render props](/docs/render-props.html) and [higher-order components](/docs/higher-order-components.html) that try to solve this. But these patterns require you to restructure your components when you use them, which can be cumbersome and make code harder to follow. If you look at a typical React application in React DevTools, you will likely find a "wrapper hell" of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions. While we could [filter them out in DevTools](https://github.com/facebook/react-devtools/pull/503), this points to a deeper underlying problem: React needs a better primitive for sharing stateful logic.

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. **Hooks allow you to reuse stateful logic without changing your component hierarchy.** This makes it easy to share Hooks among many components or with the community.

We'll discuss this more in [Building Your Own Hooks](/docs/hooks-custom.html).

### Murakkab komponentlar tushunishga qiyin bo'lib qoladi  {#complex-components-become-hard-to-understand}

We've often had to maintain components that started out simple but grew into an unmanageable mess of stateful logic and side effects. Each lifecycle method often contains a mix of unrelated logic. For example, components might perform some data fetching in `componentDidMount` and `componentDidUpdate`. However, the same `componentDidMount` method might also contain some unrelated logic that sets up event listeners, with cleanup performed in `componentWillUnmount`. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.

In many cases it's not possible to break these components into smaller ones because the stateful logic is all over the place. It's also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

To solve this, **Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data)**, rather than forcing a split based on lifecycle methods. You may also opt into managing the component's local state with a reducer to make it more predictable.

We'll discuss this more in [Using the Effect Hook](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

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
