---
id: hooks-state
title: Holat hukini ishlatish
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Huklar* React 16.8'ga kiritilgan yangilik. Ular sizga klass yozmasdan turib holat (state) va React'ning boshqa qulayliklarini ishlatishga yordam beradi.

[Kirish sahifasida](/docs/hooks-intro.html) sizni huklar bilan tanishtirish uchun quyidagi misol ishlatilgan edi:

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

Agat React'da klasslarni ishlatgan bo'lsangiz, bu kod tanish bo'lishi kerak:

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

Holat `{ count: 0 }` kabi boshlanadi va biz `this.setState()`ni chaqirish orqali, `state.count`ni oshiriramiz. Ushbu misol parchalarini sahifa bo'ylab hali ko'p ishlatamiz.

>Eslatma
>
>Nimaga haqiqiy misollar qolib shunchaki sanog'ichni misol tariqasida ko'ryapmiz deb, o'ylayotgan bo'lishingiz mumkin. Bu bizni asosiy e'tiborimizni API'ga qaratish yo'lida qilinmoqda, zero huklarga endigina qadam bosmoqdamiz.

## Huklar hamda fungsiyaviy komponentlar {#hooks-and-function-components}

Eslatish uchun, fungsiyaviy komponentlar React'da ushbu ko'rinishda bo'ladi:

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

Siz bularni "holatsiz komponentlar" ("stateless components") kabi bilishingiz mumkin. Biz hozirda ushbu komponentlarda holatlarni ishlatish imkoniyatini bermoqdamiz, shuning uchun "fungsiyaviy komponentlar" nomini afzal ko'ramiz.

Huklar klasslarning ichida **ishlamaydi**. Lekin ularni klass yozmasdan turib ishlatsangiz bo'ladi.

## Nima o'zi u, Huk? {#whats-a-hook}

Yangi misolimizni `useState`ni React'ning ichidan chaqirib boshlaymiz:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Huk - nima?** Huk maxsus fungsiya bo'lib, React'ning afzalliklariga sho'ng'ishga yordam beradi. Misol uchun, `useState` orqali fungsiyaviy komponentlarga React holatini (state) qo'sha olasiz. Boshqa huklarni keyinroq o'rganamiz.

**Hukni qachon ishlataman?** agar fungsiyaviy komponent yozdingiz, tasavvur qiling unga ozgina holatini qo'shmoqchisiz, oldinlari uni klassga o'girishga to'g'ri kelardi. Endi, siz fungsiyaviy komponentlarni ichida Huk ishlatishingiz mumkin. Biz hozir shunday qilmoqchimiz!

>Eslatma:
>
>Komponentning qayerlarida huklarni ishlata olish hamda ishlata olmaslik haqida qoidalarimiz bor. Ular haqida [Huklar Qoidalari](/docs/hooks-rules.html) bo'limida o'rganamiz.

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

Fungsiyaviy komponentda, bizda `this` yo'q, demakki `this.state` ni tayinlay yoki o'qiy olmaymiz. O'rniga, `useState` hukini komponentni ichidan chaqiramiz:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

**`useState`ni chaqirish nima qiladi?** It declares a "state variable". Our variable is called `count` but we could call it anything else, like `banana`. This is a way to "preserve" some values between the function calls — `useState` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables "disappear" when the function exits but state variables are preserved by React.

**What do we pass to `useState` as an argument?** The only argument to the `useState()` Hook is the initial state. Unlike with classes, the state doesn't have to be an object. We can keep a number or a string if that's all we need. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable. (If we wanted to store two different values in state, we would call `useState()` twice.)

**What does `useState` return?** It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`. This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair. If you're not familiar with the syntax we used, we'll come back to it [at the bottom of this page](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Now that we know what the `useState` Hook does, our example should make more sense:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

We declare a state variable called `count`, and set it to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. If we want to update the current `count`, we can call `setCount`.

>Eslatma
>
>O'ylashingiz mumkin: nima uchun `useState`ni `createState` deb nomlashmagan?
>
>"Create" ozgina noaniq bo'lib qolardi, chunki holat faqatgina komponent chizilganda yaratiladi ("create"). Keyingi chizishlar jarayonida, `useState` bizga joriy holatni berib turadi. Aks holda bu "holat" ("state") bo'lmas edi! Nimaga huklar *har doim* `use` bilan boshlanishiga boshqa sabab ham bor. Bu haqida [Huklar Qoidalari](/docs/hooks-rules.html) bo'limida o'rganamiz.

## Holatni o'qish {#reading-state}

Klassda joriy `count`ni ko'rsatmoqchi bo'lganimizda, `this.state.count` orqali bajaramiz:

```js
  <p>Siz {this.state.count} marta bosdingiz</p>
```

Fungsiyada, biz `count`ni bevosida ishlata olamiz:

```js
  <p>Siz {count} marta bosdingiz</p>
```

## Holatni yangilash {#updating-state}

In a class, we need to call `this.setState()` to update the `count` state:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

In a function, we already have `setCount` and `count` as variables so we don't need `this`:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

## Recap {#recap}

Let's now **recap what we learned line by line** and check our understanding.

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

* **Line 1:** We import the `useState` Hook from React. It lets us keep local state in a function component.
* **Line 4:** Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We're calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we'll name it `setCount`.
* **Line 9:** When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

This might seem like a lot to take in at first. Don't rush it! If you're lost in the explanation, look at the code above again and try to read it from top to bottom. We promise that once you try to "forget" how state works in classes, and look at this code with fresh eyes, it will make sense.

### Tip: What Do Square Brackets Mean? {#tip-what-do-square-brackets-mean}

You might have noticed the square brackets when we declare a state variable:

```js
  const [count, setCount] = useState(0);
```

The names on the left aren't a part of the React API. You can name your own state variables:

```js
  const [fruit, setFruit] = useState('banana');
```

This JavaScript syntax is called ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we're making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:

```js
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using `[0]` and `[1]` to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

>Note
>
>You might be curious how React knows which component `useState` corresponds to since we're not passing anything like `this` back to React. We'll answer [this question](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) and many others in the FAQ section.

### Tip: Using Multiple State Variables {#tip-using-multiple-state-variables}

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give *different* names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

You **don't have to** use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always *replaces* it instead of merging it.

We provide more recommendations on splitting independent state variables [in the FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## Next Steps {#next-steps}

On this page we've learned about one of the Hooks provided by React, called `useState`. We're also sometimes going to refer to it as the "State Hook". It lets us add local state to React function components -- which we did for the first time ever!

We also learned a little bit more about what Hooks are. Hooks are functions that let you "hook into" React features from function components. Their names always start with `use`, and there are more Hooks we haven't seen yet.

**Now let's continue by [learning the next Hook: `useEffect`.](/docs/hooks-effect.html)** It lets you perform side effects in components, and is similar to lifecycle methods in classes.
