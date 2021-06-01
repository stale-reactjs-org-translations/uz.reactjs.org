---
id: introducing-jsx
title: JSX Kirish
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Quyidagi o'zgaruvchi bayonotiga e'tibor bering:

```js
const element = <h1>Salom Dunyo!</h1>;
```

Bu ajoyib yozish uslubi na string na HTML ga o'xshaydi.

Bu JSX deb ataladi, ya'ni JavaScript yozish uslubi kengaytmasi. Biz UI ni qanday ko'rinishga ega bo'lishini tasvirlash uchun shuni React bilan qo'llagan holda ishlatishni maslahat beramiz. JSX sizga boshqa qolip tillarini eslatishi mumkin, lekin u JavaScript ning to'liq kuchi bilan keladi. 

JSX React "elementlari" ni hosil qiladi. Biz ularni DOM ga chizishni [keyingi bo'limda](/docs/rendering-elements.html) ko'rib chiqamiz. Quyida, siz boshlashingiz uchun kerak bo'ladigan JSX ning asoslari bilan tanishib chiqishingiz mumkin

### Nega JSX? {#why-jsx}

React chizish mantig'i boshqa UI matig'lari ( hodisalar bilan qanday ishlanadi, vaqt o'tishi bilan holat qanday o'zgaradi, va ma'lumotlar namoyish qilish uchun qanday tayyorlanadi) bilan tabiiy ravishda boshg'liqligini qo'llab quvvatlaydi

Belgilash va mantiq fayllarini alohida fayllarga qo'yib, sun'iy ravishda *texnologiyalarni* ajratish o'rniga, React [*tashvishlarni*](https://en.wikipedia.org/wiki/Separation_of_concerns) erkin bog'langan va har ikkalasini (mantiq va belgilash) o'z ichiga olgan "komponentlar" orqali ajratadi.

React da JSX ni ishtatish [zarur emas](/docs/react-without-jsx.html), lekin ko'pchilik JavaScript da UI bilan ishlash uchun vizual yordam sifatida ma'qul ko'radi.

Endi buni chetga surgan holda, qani boshladik!

### Embedding Expressions in JSX {#embedding-expressions-in-jsx}

In the example below, we declare a variable called `name` and then use it inside JSX by wrapping it in curly braces:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, `2 + 2`, `user.firstName`, or `formatName(user)` are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, `formatName(user)`, into an `<h1>` element.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

We split JSX over multiple lines for readability. While it isn't required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

### JSX is an Expression Too {#jsx-is-an-expression-too}

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### Specifying Attributes with JSX {#specifying-attributes-with-jsx}

You may use quotes to specify string literals as attributes:

```js
const element = <div tabIndex="0"></div>;
```

You may also use curly braces to embed a JavaScript expression in an attribute:

```js
const element = <img src={user.avatarUrl}></img>;
```

Don't put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

>**Warning:**
>
>Since JSX is closer to JavaScript than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names.
>
>For example, `class` becomes [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and `tabindex` becomes [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### Specifying Children with JSX {#specifying-children-with-jsx}

If a tag is empty, you may close it immediately with `/>`, like XML:

```js
const element = <img src={user.avatarUrl} />;
```

JSX tags may contain children:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Prevents Injection Attacks {#jsx-prevents-injection-attacks}

It is safe to embed user input in JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

By default, React DOM [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

### JSX Represents Objects {#jsx-represents-objects}

Babel compiles JSX down to `React.createElement()` calls.

These two examples are identical:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

We will explore rendering React elements to the DOM in the [next section](/docs/rendering-elements.html).

>**Tip:**
>
>We recommend using the ["Babel" language definition](https://babeljs.io/docs/en/next/editors) for your editor of choice so that both ES6 and JSX code is properly highlighted.
