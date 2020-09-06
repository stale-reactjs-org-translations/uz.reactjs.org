---
id: higher-order-components
title: Yuqori darajadagi komponentlar
permalink: docs/higher-order-components.html
prev: web-components.html
next: render-props.html
---

Yuqori darajadagi komponent (HOC) - bu mantiqni qayta ishlatishning ilg'or usullaridan biri. HOClar React API-ning bir qismi emas, lekin ko'pincha tarkibiy qismlarning kompozitsion xususiyati tufayli ishlatiladi.

Oddiy qilib aytganda, **yuqori darajadagi komponent - bu komponentni qabul qiladigan va yangi komponentni qaytaradigan funktsiya.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Agar oddiy komponent rekvizitlarni UI ga aylantirsa, unda yuqori darajadagi komponent komponentni boshqa komponentga o'zgartiradi.

HOC ko'pincha Redux-da [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) va Relay-da [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) kabi uchinchi tomon kutubxonalarida uchraydi..

Ushbu bobda biz nima uchun yuqori darajadagi komponentlar foydali ekanligini va ularni qanday yaratishni muhokama qilamiz.

## Boshidan oxirigacha ishlash uchun HOC {#use-hocs-for-cross-cutting-concerns}

> **Eslatma**
>
> Ilgari biz aralashtirish funktsiyasini amalga oshirish uchun miksinlarni tavsiya qilgan edik, ammo vaqt o'tishi bilan ular foydadan ko'ra ko'proq zarar yetkazishini aniqladik. Nima uchun aralashmalarni olib tashlashga qaror qilganimizni va qanday qilib eski qismlarni qayta yozishni [bilib oling](/blog/2016/07/13/mixins-considered-harmful.html).

An'anaviy komponentlarni qayta ishlatish mumkin, ammo ular ba'zi muammolarni osonlikcha hal qilmaydi.

Tashqi ma'lumotlar manbasidan sharhlar ro'yxatini oladigan va ularni ko'rsatadigan `CommentList` misolini ko'rib chiqamiz:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" tashqi ma'lumotlar manbaasi
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Ogohlantirishlarga obuna bo'lish
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Ogohlantirishlardan obunani bekor qilish
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Sharhlarni state ga o'zlashtirish
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

Endi biz ma'lum bir nashrdagi o'zgarishlarni kuzatadigan va biz bilgan namunani takrorlaydigan yangi komponentni yaratamiz:

```js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

`CommentList` va `BlogPost` o'rtasidagi farq shundaki, ular turli xil DataSource usullarini chaqirishadi va har xil natijalarni berishadi. Biroq, aksariyat hollarda ular o'xshash:

- Ikkala komponent ham o'rnatilganida `DataSource` xabarnomalariga obuna bo'lishadi.
- `DataSource` o'zgarganda ikkalasi ham ichki holatni o'zgartiradi.
- O'chirish paytida ikkalasi ham `DataSource`dan obunani bekor qilishadi.

Katta ilovalarda "`DataSource`-ga obuna bo'lish, keyin `setState`-ni chaqirish" to'plami juda tez-tez takrorlanadi. Ushbu funksiyani ajratib olish va uni boshqa komponentlarda ishlatish juda yaxshi bo'lar edi.

Keling, `withSubscription` funktsiyasini amalga oshiraylik - u tarkibiy qismlarni yaratadi va ularni DataSource yangilanishlariga obuna qiladi (masalan, `CommentList` va `BlogPost`). Funktsiya o'ralgan komponentni qabul qiladi va `props`lar orqali yangi ma'lumotlarni uzatadi:

```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

Birinchi parametr - bu o'rash uchun komponent. Ikkinchisi, biz uchun kerakli ma'lumotlarni oladigan funktsiya, u `DataSource` va joriy `props`larni oladi.

`CommentListWithSubscription` va `BlogPost Subscription` ko'rsatilganda, `CommentList` va `Blog Post` `DataSource`dan olingan eng so'nggi ma'lumotlarni `data` orqali uzatadi.:

```js
// Bu funksiya komponentni qabul qiladi...
function withSubscription(WrappedComponent, selectData) {
  // ...va boshqa komponentni qaytaradi...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... ogohlantirishlarga obuna bo'lish uchun...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... va yangi ma'lumotlar bilan boshqa komponentni qaytaradi!
      // Boshqa propslarni ham shu komponentga berganimizga e'tibor bering
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

Shuni esda tutingki, HOC hech narsani o'zgartirmaydi va o'ralgan komponentning xatti-harakatini meros qilib olmaydi, aksincha HOC tarkibidagi asl komponentni konteynerga o'raydi. HOC noaniq ta'sirga ega bo'lgan sof funktsiyadir.

Hammasi shu! Qaytariladigan komponent konteynerga yuborilgan barcha `props`larni, shuningdek, `prop` ma'lumotlarini oladi. HOC uchun ma'lumotlarning qanday ishlatilishi muhim emas va aylantirilgan komponent qayerdan kelib chiqqanligi muhim emas.

`WithSubscription` muntazam funktsiyasi bo'lgani uchun, biz istalgan miqdordagi argumentlarni olib tashlashimiz yoki qo'shishimiz mumkin. Masalan, biz `data` nomini sozlanishi va HOCni o'ralgan komponentdan ajratib qo'yishimiz mumkin. Biz shuningdek, `shouldComponentUpdate` yoki ma'lumotlar manbai konfiguratsiyasi uchun argument qo'sha olamiz. Bularning barchasi mumkin, chunki HOC komponentlarni yaratish jarayonini to'liq nazorat qiladi.

`WithSubscription` va o'ralgan komponent o'rtasidagi aloqa, xuddi oddiy komponentlar kabi rekvizitlar yordamida amalga oshiriladi. Shu tufayli, bir xil rekvizitlarni o'ralgan komponentga o'tkazib yuborish sharti bilan, biz bir HOCni boshqasiga osongina almashtirishimiz mumkin. Bu, masalan, ma'lumot olish kutubxonasini o'zgartirishga qaror qilsak foydali bo'lishi mumkin.

## O'ralgan komponentning mutatsiyasini qilmang. Kompozitsiyadan foydalaning. {#dont-mutate-the-original-component-use-composition}

HOC tarkibidagi komponentning prototipini o'zgartirishga (yoki boshqa usul bilan mutatsiyaga) o'zgartirish vasvasasiga tushmang.

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // Agar biz o'ralgan komponentni qaytaradigan bo'lsak, ehtimol biz uni o'zgartirdik.
  return InputComponent;
}

// EnhancedComponent rekvizit o'zgarganda konsolga bosib chiqaradi
const EnhancedComponent = logProps(InputComponent);
```

Yuqoridagi misolda biz `InputComponent`ni `EnhancedComponent`dan tashqari qayta ishlata olmaymiz. Eng muhimi, agar biz `EnhancedComponent`ni boshqa HOC-ga o'rashni xohlasak, u tarkibiyDidUpdate-ni o'zgartiradi, biz birinchi HOC tomonidan belgilangan funktsiyalarni o'chirib tashlaymiz! Bundan tashqari, `EnhancedComponent` funktsional komponentlar bilan ishlamaydi, chunki ular hayot aylanishining usullaridan mahrum.

Mutatsiyaga uchragan HOClar nozik abstraktsiyalardir, ular boshqa HOClar bilan to'qnashadi, biz ularni aynan nima o'zgarayotganini bilmasdan foydalana olmaymiz.

Mutatsiyaning o'rniga yuqori darajadagi komponentlar tarkibni idishga o'rash orqali kompozitsiyani qo'llashlari kerak:

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // Biz tarkibiy qismni mutatsiyalarsiz idishga o'rab olamiz. Super!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

Ushbu HOC oldingisiga o'xshash funktsiyaga ega, ammo boshqa HOClar bilan ziddiyatlarni keltirib chiqarmaydi va funktsional va sinf komponentlari bilan ishlaydi. Bundan tashqari, HOC sof funktsiya bilan amalga oshiriladi, shuning uchun u boshqa HOClar bilan yoki hatto o'zi bilan birlashtirilishi mumkin.

HOC va *konteyner tarkibiy* qismlari o'rtasidagi o'xshashlikni allaqachon sezgan bo'lishingiz mumkin. Eslatib o'tamiz, konteynerlar bilan biz odatda umumiy funktsiyalarni xususiy funktsiyalardan ajratamiz. Masalan, konteynerda biz ichki holatni yoki tashqi resurslarga obuna bo'lishni boshqaramiz va rekvizitlar orqali ma'lumotlarni interfeysni yaratish uchun javobgar bo'lgan qismlarga o'tkazamiz. HOC-larni amalga oshirishda biz ham konteynerlardan foydalanamiz. HOC - bu parametrlangan konteyner yaratish vositasi deb aytishimiz mumkin.

## Konventsiya: o'ralgan komponentga begona rekvizitlarni yuboring {#convention-pass-unrelated-props-through-to-the-wrapped-component}

HOC komponentlarga funksionallikni qo'shadi, lekin ular asl maqsadlarini o'zgartirmasligi kerak. HOC-dan qaytib kelgan komponentning interfeysi o'ralgan komponent bilan o'xshash bo'lishi kerak.

HOC funktsiyasi bilan bevosita bog'liq bo'lmagan rekvizitlar o'zgarishsiz o'ralgan komponentga uzatilishi kerak. Ko'pgina HOClarning ishlash usuli quyidagilarga o'xshash:

```js
render() {
  // Faqatgina ushbu HOCga tegishli bo'lgan va uni uzatish shart bo'lmagan filtrli rekvizitlar
  const { extraProp, ...passThroughProps } = this.props;

  // O'ralgan komponentga yangi rekvizitlar qo'shing. Biz odatda holat qiymatlarini yoki misol usullarini o'tkazamiz
  const injectedProp = someStateOrInstanceMethod;

  // Rekvizitlarni o'ralgan komponentga o'tkazing
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

Ushbu konventsiya moslashuvchan, qayta ishlatiladigan komponentlarni yaratishga yordam beradi.

## Konventsiya: Kompozitivlikni maksimal darajada oshirish {#convention-maximizing-composability}

Hamma HOClar bir xil ko'rinishga ega emas. Ba'zilar faqat bitta argumentni, o'ralgan komponentni oladilar:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Odatda HOClar bir nechta dalillarni keltirib chiqaradi. `Relay`-ning ushbu misolida biz tarkibiy qism uchun ma'lumotlarni tavsiflash uchun konfiguratsiya ob'ektidan foydalanamiz:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

HOCga murojaat qilishning eng keng tarqalgan usuli quyidagicha ko'rinadi:

```js
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*Siz hayron qoldingizmi?* Keling, ushbu qatorni ajratib olaylik.

```js
// connect funksiyasiga murojaat boshqa funksiyani qaytaradi
const enhance = connect(commentListSelector, commentListActions);
// Bu funksiya HOC da ham bor. U Redux ga bog'langan komponentni qaytaradi
const ConnectedComment = enhance(CommentList);
```
Boshqacha qilib aytganda, `connect` - bu yuqori darajadagi komponentni qaytaradigan yuqori darajadagi funktsiya!

Ushbu shakl chalkash va keraksiz bo'lib tuyulishi mumkin, ammo foydasi bor. `connect`ga murojaat HOC-ni `Component => Component` imzosi bilan qaytaradi. Bir xil natija turi va bitta argumentga ega funktsiyalar tarkibida osongina birlashtirilishi mumkin.

```js
// Buning o'rniga...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... mos keladigan yordamchi funktsiyasidan foydalanishingiz mumkin
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // Ikkala parametr ham HOC va bitta argumentni oladi
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(Shuning uchun biz `connect` va boshqa HOC kengaytmalaridan eksperimental JavaScript dekorativlari sifatida foydalanishimiz mumkin.)

`compose` yordamchi funktsiyasini ko'plab boshqa kutubxonalarda, shu jumladan lodash-da topishingiz mumkin ([`lodash.flowRight`](https://lodash.com/docs/#flowRight)), [Redux](https://redux.js.org/api/compose), va [Ramda](https://ramdajs.com/docs/#compose).

## Konvensiya: osonlikcha ekran nomini qo'shing {#convention-wrap-the-display-name-for-easy-debugging}

Yaratilgan HOC konteyner komponentlari [React ishlab chiqish asboblari konsoli](https://github.com/facebook/react-devtools)da boshqa komponentlar bilan birga namoyish etiladi. Nosozliklarni tuzatishni osonlashtirish uchun ma'lum bir komponent HOC yordamida yaratilganligini aytadigan ismni belgilashingiz mumkin.

Eng keng tarqalgan usul - o'ralgan komponent nomini o'rash. Masalan, agar siz `Subscription` bilan yuqori darajadagi komponentni nomlagan bo'lsangiz va o'ralgan komponent nomi `CommentList` bo'lsa, u holda ekran nomi `WithSubscription (CommentList)` bo'ladi:

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```


## Ogohlantirishlar {#caveats}

Yuqori darajadagi komponentlar bilan ishlashda nozik muammolarga duch kelishingiz mumkin.

### Render metodi ichida HOC ishlatmang {#dont-use-hocs-inside-the-render-method}

`React`ning taqqoslash algoritmi (yarashish yoki yarashtirish deb nomlanadi) mavjud subtree-ni yangilash yoki uning o'rniga yangisini olib tashlash va o'rnatishni aniqlash uchun komponent identifikatoridan foydalanadi. Agar renderlash natijasida olingan komponent oldingi `render`dagi komponent bilan bir xil bo'lsa `(===)`, u holda React subtree bilan taqqoslashni davom ettiradi. Agar komponentlar teng bo'lmasa, React eski subtree-ni butunlay olib tashlaydi va o'rnini bosadi.

Odatda bu bizni bezovta qilmaydi. Biroq, komponentning renderlash usuli ichida yuqori darajali komponentlarni qo'llay olmasligimizni hisobga olish muhimdir:

```js
render() {
  // Biz har bir renderda EnhancedComponentning yangi versiyasini yaratamiz
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!Biz har safar subtree-ni o'chiramiz va o'rnatamiz!
  return <EnhancedComponent />;
}
```

Muammo faqat ishlashda emas. Komponentni qayta o'rnatishda uning holati va uning asosiy komponentlari holati tiklanadi.

Boshqa komponentning ta'rifida HOC dan foydalanmang. Birinchidan, siz HOC-dan komponentni alohida olishingiz kerak va shundan keyingina foydalaning. Shu tarzda React xuddi shu komponentni qayta ishlashda taqqoslaydi.

Agar kerak bo'lsa (kamdan-kam hollarda), siz HOCni hayot aylanish davri usullarida yoki komponent konstruktorida dinamik ravishda qo'llashingiz mumkin.

### Statik metodlarni nusxalash {#static-methods-must-be-copied-over}

Ba'zan komponent uchun statik usullarni aniqlash foydali bo'ladi. Masalan, Relay-ning statik `getFragment` usuli sizga `GraphQL` ma'lumotlar qismlarini yaratishga imkon beradi.

HOCni qo'llaganimizda, biz asl komponentni idishga o'rab olamiz. Shuning uchun yangi komponentda asl komponentning statik usullari bo'lmaydi.

```js
// Keling, statik metodni aniqlaymiz
WrappedComponent.staticMethod = function() {/*...*/}
// Endi HOCni qo'llaymiz
const EnhancedComponent = enhance(WrappedComponent);

// Kengaytirilgan komponentda statik metodlar mavjud emas
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

Yo'qotilgan metodlarni konteynerga nusxalash:

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Qaysi usullarni nusxalash kerakligini aniq bilishimiz kerak :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Afsuski, nusxa olishning qaysi metodlarini aniq bilishingiz kerak. React bilan bog'liq bo'lmagan statik metodlarni avtomatik ravishda nusxalash uchun [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)-dan foydalanishingiz mumkin:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Boshqa mumkin bo'lgan yechim - bu statik metodlarni komponentdan alohida eksport qilish.

```js
// Buning o'rniga...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...metodni alohida eksport qiling...
export { someFunction };

// ...iste'molchi modulida ikkala eksportdan ham foydalanishimiz mumkin
import MyComponent, { someFunction } from './MyComponent.js';
```

### Reflar uzatilmaydi {#refs-arent-passed-through}

An'anaga ko'ra, yuqori darajadagi komponentlar o'ralgan komponentdan tashqari barcha rekvizitlardan o'tadi. `ref` aslida `key` kabi tirgak emas va shuning uchun React tomonidan boshqacha muomala qilinadi. HOC-dan komponent tomonidan yaratilgan elementning `ref`i o'ralgan komponentga emas, balki iyerarxiyadagi eng yaqin konteynerning nusxasini ko'rsatib beradi.

Ushbu muammoni `React.forwardRef` API usuli bilan hal qilishingiz mumkin (React 16.3 da qo'shilgan). [Qayta yo'naltirish bo'limida ko'proq bilib oling](/docs/forwarding-refs.html).
