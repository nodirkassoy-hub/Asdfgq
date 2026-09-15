/* ============================================================
   POCKEY — Language dictionary (UZ / RU / EN)
   Edit these objects to change any interface text.
   ============================================================ */
(function () {
  'use strict';

  var UZ = {
    meta: { lang: 'uz' },
    brand: { name: 'POCKEY', tagline: 'PENOPLAST ZAVODI' },
    nav: {
      home: 'Bosh sahifa',
      products: 'Mahsulotlar',
      about: 'Biz haqimizda',
      production: 'Ishlab chiqarish',
      advantages: 'Afzalliklar',
      contacts: 'Aloqa',
      order: 'Buyurtma berish'
    },
    a11y: {
      menu: 'Menyu',
      close: 'Yopish',
      theme: 'Mavzuni almashtirish',
      lang: 'Tilni tanlash',
      scrollTop: 'Yuqoriga qaytish',
      search: 'Qidirish',
      skip: 'Asosiy kontentga o‘tish'
    },
    hero: {
      badge: 'Zamonaviy penoplast ishlab chiqarish',
      title1: 'Sifatli penoplast.',
      title2: 'Ishonchli qurilish.',
      sub: 'POCKEY — zamonaviy texnologiyalar asosida ishlab chiqariladigan sifatli penoplast va issiqlik izolyatsiyasi mahsulotlari.',
      ctaProducts: 'Mahsulotlarni ko‘rish',
      ctaOrder: 'Buyurtma berish',
      scroll: 'Pastga suring',
      stats: ['Yuqori sifat', 'Zamonaviy texnologiya', 'Tez yetkazib berish']
    },
    strip: {
      words: ['Yuqori sifat', 'Zamonaviy texnologiya', 'Aniq o‘lchamlar', 'Tez yetkazib berish', 'EPS 15 · 20 · 25 · 30', 'Issiqlik izolyatsiyasi']
    },
    products: {
      kicker: 'Mahsulotlar',
      title: 'Mahsulotlarimiz',
      sub: 'Turli zichlikdagi EPS plitalari — qurilish, izolyatsiya va sanoat uchun.',
      search: 'Qidirish',
      searchShort: 'Mahsulot, zichlik yoki qalinlik bo‘yicha qidirish',
      filterAll: 'Barchasi',
      filterDensity: 'Zichlik',
      filterThickness: 'Qalinlik',
      thicknessAll: 'Barcha qalinliklar',
      results: 'ta mahsulot topildi',
      empty: 'Hech narsa topilmadi',
      emptyHint: 'Filtrni o‘zgartirib ko‘ring yoki boshqa so‘z bilan qidiring.',
      reset: 'Filtrni tozalash',
      density: 'Zichlik',
      thickness: 'Qalinlik',
      size: 'O‘lcham',
      application: 'Qo‘llanilishi',
      price: 'Narx',
      priceValue: 'Kelishilgan holda',
      details: 'Batafsil',
      requestPrice: 'Narxni so‘rash',
      perList: 'Barcha o‘lchamlar',
      mm: 'mm',
      from: 'dan'
    },
    pmodal: {
      density: 'Zichlik',
      thicknessOptions: 'Qalinlik variantlari',
      dimensions: 'O‘lchamlar',
      application: 'Qo‘llanilishi',
      specs: 'Texnik xususiyatlar',
      specMaterial: 'Material',
      specMaterialValue: 'Kengaytirilgan polistirol (EPS)',
      specLambda: 'Issiqlik o‘tkazuvchanligi λ',
      specWeight: 'Vazn (1 m², 50 mm)',
      specSize: 'Standart varaq o‘lchami',
      specNote: 'Tipik qiymatlar — partiyaga qarab ozgina farq qilishi mumkin.',
      otherSizes: 'Boshqa o‘lchamlar — kelishuv bo‘yicha.',
      price: 'Narx',
      priceValue: 'Kelishilgan holda',
      order: 'Buyurtma berish',
      requestPrice: 'Narxni so‘rash'
    },
    adv: {
      kicker: 'Afzalliklar',
      title: 'Nima uchun POCKEY?',
      sub: 'Sifat, texnologiya va ishonch — bizning ishlab chiqarish tamoyillarimiz.',
      cards: [
        { t: 'Zamonaviy ishlab chiqarish', d: 'Zamonaviy uskunalar va texnologiyalarga asoslangan barqaror ishlab chiqarish jarayoni.' },
        { t: 'Sifatli xomashyo', d: 'Ishonchli xomashyo va barqaror mahsulot sifati.' },
        { t: 'Issiqlik izolyatsiyasi', d: 'Issiqlik izolyatsiyasi uchun mo‘ljallangan mahsulotlar.' },
        { t: 'Aniq o‘lcham', d: 'Barqaror o‘lchamlar va ishlab chiqarish aniqligi.' },
        { t: 'Tez yetkazib berish', d: 'Mijozlar uchun qulay va tezkor yetkazib berish.' },
        { t: 'Ishonchli hamkorlik', d: 'Har bir buyurtmaga professional yondashuv.' }
      ]
    },
    prod: {
      kicker: 'Ishlab chiqarish',
      title: 'Zamonaviy ishlab chiqarish',
      sub: 'Xomashyodan tayyor mahsulotgacha — nazorat qilinadigan to‘liq texnologik zanjir.',
      note: 'Har bir bosqich sifat nazorati ostida amalga oshiriladi.',
      steps: [
        { t: 'Xomashyo', d: 'Sifatli xomashyo qabul qilinadi va laborator tekshiruvdan o‘tadi.' },
        { t: 'Ko‘pirtirish', d: 'Granulalar bug‘ yordamida kengaytiriladi va dam beriladi.' },
        { t: 'Qoliplash', d: 'Kengaytirilgan granulalar blok qolipda biriktiriladi.' },
        { t: 'Kesish', d: 'Blok aniq o‘lchamlarda avtomatik simli stanoklarda kesiladi.' },
        { t: 'Sifat nazorati', d: 'Har bir partiya zichlik, o‘lcham va ko‘rinish bo‘yicha tekshiriladi.' },
        { t: 'Tayyor mahsulot', d: 'Mahsulot qadoqlanadi va yetkazib berishga tayyorlanadi.' }
      ]
    },
    show: {
      kicker: '3D tajriba',
      title: 'Mahsulotni yaqindan ko‘ring',
      sub: 'Penoplast blokni aylantiring, kattalashtiring va qalinlikni o‘zgartirib ko‘ring.',
      hint: 'Sichqoncha bilan aylantiring · g‘ildirak bilan kattalashtiring',
      thickness: 'Qalinlik',
      density: 'Zichlik',
      weight: 'Taxminiy og‘irlik',
      weightSheet: '1000×2000 mm varaq uchun',
      badges: ['Yengil', 'Issiqlik izolyatsiyasi', 'EPS', 'Yuqori aniqlik']
    },
    apps: {
      kicker: 'Qo‘llanilishi',
      title: 'POCKEY qayerda ishlatiladi?',
      sub: 'Qurilishdan tortib qadoqlashgacha — keng qo‘llanish sohalari.',
      items: [
        { t: 'Uy-joy qurilishi', d: 'Turar-joy binolari devorlari va pollarini izolyatsiyasi.' },
        { t: 'Binolar', d: 'Tijorat va ma’muriy binolar fasadlari va konstruksiyalari.' },
        { t: 'Devor izolyatsiyasi', d: 'Devor tizimlarida issiqlik izolyatsiyasi qatlami.' },
        { t: 'Tom va pol izolyatsiyasi', d: 'Tomlar va pollar ostida issiqlik izolyatsiyasi.' },
        { t: 'Sovutish tizimlari', d: 'Sovutgichlar va omborlarning issiqlik izolyatsiyasi.' },
        { t: 'Qadoqlash', d: 'Mo‘rt yuklarni zarba va titrevedan himoya qilish.' }
      ]
    },
    about: {
      kicker: 'Kompaniya',
      title: 'POCKEY haqida',
      p1: 'POCKEY — qurilish va izolyatsiya uchun ishonchli EPS (penoplast) mahsulotlarini ishlab chiqaruvchi zamonaviy zavod.',
      p2: 'Bizning maqsadimiz — barqaror sifat, aniq o‘lchamlar va mijozlarga qulay hamkorlik. Har bir partiya ichki sifat nazoratidan o‘tadi.',
      quote: '“Sifat — bu tasodif emas. Bu texnologiya, tartib va mas’uliyat natijasi.”',
      imgCaption: 'POCKEY ishlab chiqarish liniyasi',
      pillars: [
        { n: '01', t: 'Professional ishlab chiqarish' },
        { n: '02', t: 'Sifat nazorati' },
        { n: '03', t: 'Zamonaviy texnologiya' },
        { n: '04', t: 'Ishonchli yetkazib berish' }
      ]
    },
    quality: {
      kicker: 'Sifat',
      title: 'Sifat nazorati',
      sub: 'Har bir partiya bir necha bosqichli tekshiruvdan o‘tadi.',
      summary: 'Nazorat bosqichlari har bir ishlab chiqarish partiyasi uchun amalga oshiriladi.',
      items: [
        { t: 'Material sifati', d: 'Xomashyo va tayyor materialning uzluksiz tekshiruvi.' },
        { t: 'Zichlik nazorati', d: 'Har bir partiyada zichlik ko‘rsatkichlarini o‘lchash.' },
        { t: 'O‘lcham nazorati', d: 'Plitalar o‘lchamlari va geometrik aniqligi.' },
        { t: 'Mahsulot tekshiruvi', d: 'Ko‘rinish, qirralar va yuza sifatini nazorat qilish.' },
        { t: 'Qadoqlash tekshiruvi', d: 'Yetkazib berishgacha qadoqlash to‘g‘riligini tekshirish.' }
      ]
    },
    order: {
      title: 'Buyurtma berish',
      sub: 'Ma’lumotlarni qoldiring — menejerimiz tez orada siz bilan bog‘lanadi.',
      name: 'Ism',
      namePh: 'Ismingiz',
      phone: 'Telefon raqami',
      phonePh: '+998 -- --- -- --',
      product: 'Mahsulot',
      productNone: '— Mahsulotni tanlang —',
      thickness: 'Qalinlik',
      thicknessDefault: '— Tanlanmagan —',
      thicknessOther: 'Boshqa (kiritish)',
      thicknessPh: 'mm',
      qty: 'Miqdor',
      qtyUnitPiece: 'dona',
      qtyUnitM2: 'm²',
      note: 'Izoh',
      notePh: 'Qisqacha izoh (ixtiyoriy)',
      submit: 'So‘rov yuborish',
      sending: 'Yuborilmoqda…',
      successTitle: 'So‘rov yuborildi!',
      success: 'So‘rovingiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog‘lanamiz.',
      successNote: 'Ma’lumotlar shu brauzerda saqlandi (demo rejim).',
      again: 'Yana so‘rov yuborish',
      errRequired: 'Bu maydon to‘ldirilishi shart',
      errName: 'Ismingizni to‘liq kiriting',
      errPhone: 'Telefon raqamini to‘g‘ri kiriting',
      errThickness: 'Qalinlikni tanlang',
      summary: 'So‘rov xulosasi'
    },
    search: {
      title: 'Mahsulotlarni qidirish',
      ph: 'Nomi, zichlik yoki qalinlik bo‘yicha qidirish…',
      hint: 'Tanlash uchun Enter · Yopish uchun Esc',
      empty: 'Hech narsa topilmadi',
      try: 'Masalan: EPS 20, 50 mm, devor'
    },
    contact: {
      kicker: 'Aloqa',
      title: 'Biz bilan bog‘laning',
      sub: 'Savollaringiz bo‘lsa — biz bilan bog‘lanish uchun qulay usulni tanlang.',
      phone: 'Telefon',
      address: 'Manzil',
      email: 'Email',
      telegram: 'Telegram',
      mapNote: 'Xarita — real manzil bilan almashtiriladi',
      formTitle: 'Tez xabar yuborish',
      msg: 'Xabar',
      msgPh: 'Savolingizni yozing…',
      send: 'Yuborish',
      success: 'Xabaringiz uchun rahmat! Tez orada siz bilan bog‘lanamiz.'
    },
    footer: {
      tagline: 'Sifatli penoplast va issiqlik izolyatsiyasi mahsulotlari ishlab chiqaruvchisi.',
      navTitle: 'Sahifalar',
      prodTitle: 'Mahsulotlar',
      contTitle: 'Aloqa',
      rights: '© POCKEY. Barcha huquqlar himoyalangan.'
    }
  };

  var RU = {
    meta: { lang: 'ru' },
    brand: { name: 'POCKEY', tagline: 'ПЕНОПЛАСТ ЗАВОДЫ' },
    nav: {
      home: 'Главная',
      products: 'Продукция',
      about: 'О компании',
      production: 'Производство',
      advantages: 'Преимущества',
      contacts: 'Контакты',
      order: 'Оформить заказ'
    },
    a11y: {
      menu: 'Меню',
      close: 'Закрыть',
      theme: 'Переключить тему',
      lang: 'Выбрать язык',
      scrollTop: 'Наверх',
      search: 'Поиск',
      skip: 'Перейти к содержимому'
    },
    hero: {
      badge: 'Современное производство пенопласта',
      title1: 'Качественный пенопласт.',
      title2: 'Надёжное строительство.',
      sub: 'POCKEY — качественный пенопласт и продукты теплоизоляции, произведённые на основе современных технологий.',
      ctaProducts: 'Смотреть продукцию',
      ctaOrder: 'Оформить заказ',
      scroll: 'Прокрутите вниз',
      stats: ['Высокое качество', 'Современные технологии', 'Быстрая доставка']
    },
    strip: {
      words: ['Высокое качество', 'Современные технологии', 'Точные размеры', 'Быстрая доставка', 'EPS 15 · 20 · 25 · 30', 'Теплоизоляция']
    },
    products: {
      kicker: 'Продукция',
      title: 'Наша продукция',
      sub: 'Плиты EPS разной плотности — для строительства, изоляции и промышленности.',
      search: 'Поиск',
      searchShort: 'Поиск по продукции, плотности или толщине',
      filterAll: 'Все',
      filterDensity: 'Плотность',
      filterThickness: 'Толщина',
      thicknessAll: 'Все толщины',
      results: 'товаров найдено',
      empty: 'Ничего не найдено',
      emptyHint: 'Измените фильтры или попробуйте другой запрос.',
      reset: 'Сбросить фильтры',
      density: 'Плотность',
      thickness: 'Толщина',
      size: 'Размер',
      application: 'Применение',
      price: 'Цена',
      priceValue: 'По договорённости',
      details: 'Подробнее',
      requestPrice: 'Уточнить цену',
      perList: 'Все размеры',
      mm: 'мм',
      from: 'от'
    },
    pmodal: {
      density: 'Плотность',
      thicknessOptions: 'Варианты толщины',
      dimensions: 'Размеры',
      application: 'Применение',
      specs: 'Технические характеристики',
      specMaterial: 'Материал',
      specMaterialValue: 'Вспененный полистирол (EPS)',
      specLambda: 'Теплопроводность λ',
      specWeight: 'Вес (1 м², 50 мм)',
      specSize: 'Стандартный размер листа',
      specNote: 'Типичные значения — могут незначительно отличаться по партиям.',
      otherSizes: 'Другие размеры — по договорённости.',
      price: 'Цена',
      priceValue: 'По договорённости',
      order: 'Оформить заказ',
      requestPrice: 'Уточнить цену'
    },
    adv: {
      kicker: 'Преимущества',
      title: 'Почему POCKEY?',
      sub: 'Качество, технологии и надёжность — принципы нашего производства.',
      cards: [
        { t: 'Современное производство', d: 'Стабильный производственный процесс на основе современного оборудования и технологий.' },
        { t: 'Качественное сырьё', d: 'Надёжное сырьё и стабильное качество продукции.' },
        { t: 'Теплоизоляция', d: 'Продукция, предназначенная для теплоизоляции.' },
        { t: 'Точный размер', d: 'Стабильные размеры и точность изготовления.' },
        { t: 'Быстрая доставка', d: 'Удобная и быстрая доставка для клиентов.' },
        { t: 'Надёжное сотрудничество', d: 'Профессиональный подход к каждому заказу.' }
      ]
    },
    prod: {
      kicker: 'Производство',
      title: 'Современное производство',
      sub: 'От сырья до готовой продукции — полностью контролируемый технологический цикл.',
      note: 'Каждый этап выполняется под контролем качества.',
      steps: [
        { t: 'Сырьё', d: 'Качественное сырьё принимается и проходит лабораторную проверку.' },
        { t: 'Вспенивание', d: 'Гранулы вспениваются паром и выдерживаются.' },
        { t: 'Формование', d: 'Вспененные гранулы спекаются в блочной форме.' },
        { t: 'Резка', d: 'Блок режется на автоматических станках с точными размерами.' },
        { t: 'Контроль качества', d: 'Каждая партия проверяется по плотности, размерам и внешнему виду.' },
        { t: 'Готовая продукция', d: 'Продукция упаковывается и готовится к отгрузке.' }
      ]
    },
    show: {
      kicker: '3D-опыт',
      title: 'Посмотрите продукт вблизи',
      sub: 'Вращайте блок, масштабируйте и меняйте толщину.',
      hint: 'Вращайте мышью · масштабируйте колёсиком',
      thickness: 'Толщина',
      density: 'Плотность',
      weight: 'Примерный вес',
      weightSheet: 'для листа 1000×2000 мм',
      badges: ['Лёгкий', 'Теплоизоляция', 'EPS', 'Высокая точность']
    },
    apps: {
      kicker: 'Применение',
      title: 'Где используется POCKEY?',
      sub: 'От строительства до упаковки — широкая сфера применения.',
      items: [
        { t: 'Жилое строительство', d: 'Изоляция стен и полов жилых зданий.' },
        { t: 'Здания', d: 'Фасады и конструкции коммерческих и административных зданий.' },
        { t: 'Изоляция стен', d: 'Слой теплоизоляции в стеновых системах.' },
        { t: 'Изоляция кровли и полов', d: 'Теплоизоляция под кровлей и полами.' },
        { t: 'Холодильные системы', d: 'Теплоизоляция холодильников и складов.' },
        { t: 'Упаковка', d: 'Защита хрупких грузов от ударов и вибраций.' }
      ]
    },
    about: {
      kicker: 'Компания',
      title: 'О POCKEY',
      p1: 'POCKEY — современный завод, производящий надёжную продукцию EPS (пенопласт) для строительства и изоляции.',
      p2: 'Наша цель — стабильное качество, точные размеры и удобное сотрудничество с клиентами. Каждая партия проходит внутренний контроль качества.',
      quote: '«Качество — не случайность. Это результат технологий, порядка и ответственности.»',
      imgCaption: 'Производственная линия POCKEY',
      pillars: [
        { n: '01', t: 'Профессиональное производство' },
        { n: '02', t: 'Контроль качества' },
        { n: '03', t: 'Современные технологии' },
        { n: '04', t: 'Надёжная доставка' }
      ]
    },
    quality: {
      kicker: 'Качество',
      title: 'Контроль качества',
      sub: 'Каждая партия проходит многоэтапную проверку.',
      summary: 'Этапы контроля выполняются для каждой производственной партии.',
      items: [
        { t: 'Качество материала', d: 'Постоянная проверка сырья и готового материала.' },
        { t: 'Контроль плотности', d: 'Измерение показателей плотности каждой партии.' },
        { t: 'Контроль размеров', d: 'Точность размеров и геометрии плит.' },
        { t: 'Осмотр продукции', d: 'Проверка внешнего вида, кромок и поверхности.' },
        { t: 'Проверка упаковки', d: 'Проверка упаковки перед отгрузкой.' }
      ]
    },
    order: {
      title: 'Оформить заказ',
      sub: 'Оставьте данные — наш менеджер свяжется с вами в ближайшее время.',
      name: 'Имя',
      namePh: 'Ваше имя',
      phone: 'Номер телефона',
      phonePh: '+998 -- --- -- --',
      product: 'Продукт',
      productNone: '— Выберите продукт —',
      thickness: 'Толщина',
      thicknessDefault: '— Не выбрано —',
      thicknessOther: 'Другая (ввести)',
      thicknessPh: 'мм',
      qty: 'Количество',
      qtyUnitPiece: 'шт',
      qtyUnitM2: 'м²',
      note: 'Комментарий',
      notePh: 'Краткий комментарий (необязательно)',
      submit: 'Отправить заявку',
      sending: 'Отправка…',
      successTitle: 'Заявка отправлена!',
      success: 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
      successNote: 'Данные сохранены в этом браузере (демо-режим).',
      again: 'Отправить ещё заявку',
      errRequired: 'Обязательное поле',
      errName: 'Введите полное имя',
      errPhone: 'Введите корректный номер телефона',
      errThickness: 'Выберите толщину',
      summary: 'Сводка заявки'
    },
    search: {
      title: 'Поиск продукции',
      ph: 'Поиск по названию, плотности или толщине…',
      hint: 'Enter — выбрать · Esc — закрыть',
      empty: 'Ничего не найдено',
      try: 'Например: EPS 20, 50 мм, стены'
    },
    contact: {
      kicker: 'Контакты',
      title: 'Свяжитесь с нами',
      sub: 'Если у вас есть вопросы — выберите удобный способ связи.',
      phone: 'Телефон',
      address: 'Адрес',
      email: 'Email',
      telegram: 'Telegram',
      mapNote: 'Карта — будет заменена реальным адресом',
      formTitle: 'Быстрое сообщение',
      msg: 'Сообщение',
      msgPh: 'Напишите ваш вопрос…',
      send: 'Отправить',
      success: 'Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.'
    },
    footer: {
      tagline: 'Производитель качественного пенопласта и теплоизоляционных материалов.',
      navTitle: 'Разделы',
      prodTitle: 'Продукция',
      contTitle: 'Контакты',
      rights: '© POCKEY. Все права защищены.'
    }
  };

  var EN = {
    meta: { lang: 'en' },
    brand: { name: 'POCKEY', tagline: 'PENOPLAST FACTORY' },
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      production: 'Production',
      advantages: 'Advantages',
      contacts: 'Contacts',
      order: 'Request a quote'
    },
    a11y: {
      menu: 'Menu',
      close: 'Close',
      theme: 'Toggle theme',
      lang: 'Choose language',
      scrollTop: 'Back to top',
      search: 'Search',
      skip: 'Skip to content'
    },
    hero: {
      badge: 'Modern EPS foam manufacturing',
      title1: 'Quality penoplast.',
      title2: 'Reliable construction.',
      sub: 'POCKEY — quality penoplast (EPS) and thermal insulation products manufactured with modern technology.',
      ctaProducts: 'View products',
      ctaOrder: 'Request a quote',
      scroll: 'Scroll down',
      stats: ['High quality', 'Modern technology', 'Fast delivery']
    },
    strip: {
      words: ['High quality', 'Modern technology', 'Precise dimensions', 'Fast delivery', 'EPS 15 · 20 · 25 · 30', 'Thermal insulation']
    },
    products: {
      kicker: 'Products',
      title: 'Our products',
      sub: 'EPS boards in various densities — for construction, insulation and industry.',
      search: 'Search',
      searchShort: 'Search by product, density or thickness',
      filterAll: 'All',
      filterDensity: 'Density',
      filterThickness: 'Thickness',
      thicknessAll: 'All thicknesses',
      results: 'products found',
      empty: 'Nothing found',
      emptyHint: 'Try changing the filters or searching for something else.',
      reset: 'Reset filters',
      density: 'Density',
      thickness: 'Thickness',
      size: 'Size',
      application: 'Application',
      price: 'Price',
      priceValue: 'By agreement',
      details: 'Details',
      requestPrice: 'Request price',
      perList: 'All sizes',
      mm: 'mm',
      from: 'from'
    },
    pmodal: {
      density: 'Density',
      thicknessOptions: 'Thickness options',
      dimensions: 'Dimensions',
      application: 'Application',
      specs: 'Technical specifications',
      specMaterial: 'Material',
      specMaterialValue: 'Expanded polystyrene (EPS)',
      specLambda: 'Thermal conductivity λ',
      specWeight: 'Weight (1 m², 50 mm)',
      specSize: 'Standard sheet size',
      specNote: 'Typical values — may vary slightly between batches.',
      otherSizes: 'Other sizes — by agreement.',
      price: 'Price',
      priceValue: 'By agreement',
      order: 'Request a quote',
      requestPrice: 'Request price'
    },
    adv: {
      kicker: 'Advantages',
      title: 'Why POCKEY?',
      sub: 'Quality, technology and reliability — the principles of our production.',
      cards: [
        { t: 'Modern manufacturing', d: 'A stable production process based on modern equipment and technology.' },
        { t: 'Quality raw materials', d: 'Reliable raw materials and consistent product quality.' },
        { t: 'Thermal insulation', d: 'Products designed for thermal insulation applications.' },
        { t: 'Precise dimensions', d: 'Consistent dimensions and manufacturing precision.' },
        { t: 'Fast delivery', d: 'Convenient and fast delivery for customers.' },
        { t: 'Reliable partnership', d: 'A professional approach to every order.' }
      ]
    },
    prod: {
      kicker: 'Production',
      title: 'Modern manufacturing',
      sub: 'From raw material to finished product — a fully controlled technological cycle.',
      note: 'Every stage is carried out under quality control.',
      steps: [
        { t: 'Raw material', d: 'Quality raw material is received and laboratory tested.' },
        { t: 'Pre-expansion', d: 'Beads are expanded with steam and conditioned.' },
        { t: 'Molding', d: 'Expanded beads are fused into large block molds.' },
        { t: 'Cutting', d: 'The block is cut to precise dimensions on automatic machines.' },
        { t: 'Quality control', d: 'Each batch is checked for density, dimensions and appearance.' },
        { t: 'Finished product', d: 'The product is packaged and prepared for delivery.' }
      ]
    },
    show: {
      kicker: '3D experience',
      title: 'Explore the product up close',
      sub: 'Rotate the block, zoom in and change its thickness.',
      hint: 'Drag to rotate · scroll to zoom',
      thickness: 'Thickness',
      density: 'Density',
      weight: 'Approx. weight',
      weightSheet: 'for a 1000×2000 mm sheet',
      badges: ['Lightweight', 'Thermal insulation', 'EPS', 'High precision']
    },
    apps: {
      kicker: 'Applications',
      title: 'Where is POCKEY used?',
      sub: 'From construction to packaging — a wide range of applications.',
      items: [
        { t: 'Residential construction', d: 'Wall and floor insulation of residential buildings.' },
        { t: 'Buildings', d: 'Facades and structures of commercial and office buildings.' },
        { t: 'Wall insulation', d: 'A thermal insulation layer in wall systems.' },
        { t: 'Roof & floor insulation', d: 'Thermal insulation under roofs and floors.' },
        { t: 'Refrigeration systems', d: 'Thermal insulation for cold rooms and warehouses.' },
        { t: 'Packaging', d: 'Protecting fragile goods from impact and vibration.' }
      ]
    },
    about: {
      kicker: 'Company',
      title: 'About POCKEY',
      p1: 'POCKEY is a modern factory producing reliable EPS (penoplast) products for construction and insulation applications.',
      p2: 'Our goal is consistent quality, precise dimensions and convenient cooperation for every customer. Each batch passes internal quality control.',
      quote: '“Quality is never an accident. It is the result of technology, order and responsibility.”',
      imgCaption: 'POCKEY production line',
      pillars: [
        { n: '01', t: 'Professional production' },
        { n: '02', t: 'Quality control' },
        { n: '03', t: 'Modern technology' },
        { n: '04', t: 'Reliable delivery' }
      ]
    },
    quality: {
      kicker: 'Quality',
      title: 'Quality control',
      sub: 'Every batch passes a multi-stage inspection.',
      summary: 'Control stages are carried out for every production batch.',
      items: [
        { t: 'Material quality', d: 'Continuous inspection of raw material and finished material.' },
        { t: 'Density control', d: 'Measuring density indicators for each batch.' },
        { t: 'Dimension control', d: 'Precision of board dimensions and geometry.' },
        { t: 'Product inspection', d: 'Checking appearance, edges and surface quality.' },
        { t: 'Packaging inspection', d: 'Verifying packaging before delivery.' }
      ]
    },
    order: {
      title: 'Request a quote',
      sub: 'Leave your details — our manager will contact you shortly.',
      name: 'Name',
      namePh: 'Your name',
      phone: 'Phone number',
      phonePh: '+998 -- --- -- --',
      product: 'Product',
      productNone: '— Choose a product —',
      thickness: 'Thickness',
      thicknessDefault: '— Not selected —',
      thicknessOther: 'Other (enter value)',
      thicknessPh: 'mm',
      qty: 'Quantity',
      qtyUnitPiece: 'pcs',
      qtyUnitM2: 'm²',
      note: 'Note',
      notePh: 'Short note (optional)',
      submit: 'Send request',
      sending: 'Sending…',
      successTitle: 'Request sent!',
      success: 'Your request has been sent successfully. We will contact you shortly.',
      successNote: 'Data is saved in this browser (demo mode).',
      again: 'Send another request',
      errRequired: 'This field is required',
      errName: 'Please enter your full name',
      errPhone: 'Please enter a valid phone number',
      errThickness: 'Please select a thickness',
      summary: 'Request summary'
    },
    search: {
      title: 'Product search',
      ph: 'Search by name, density or thickness…',
      hint: 'Enter — select · Esc — close',
      empty: 'Nothing found',
      try: 'Try: EPS 20, 50 mm, wall'
    },
    contact: {
      kicker: 'Contacts',
      title: 'Get in touch',
      sub: 'If you have any questions — choose the most convenient way to contact us.',
      phone: 'Phone',
      address: 'Address',
      email: 'Email',
      telegram: 'Telegram',
      mapNote: 'Map — to be replaced with the real location',
      formTitle: 'Quick message',
      msg: 'Message',
      msgPh: 'Type your question…',
      send: 'Send',
      success: 'Thank you for your message! We will contact you shortly.'
    },
    footer: {
      tagline: 'Manufacturer of quality penoplast and thermal insulation products.',
      navTitle: 'Pages',
      prodTitle: 'Products',
      contTitle: 'Contacts',
      rights: '© POCKEY. All rights reserved.'
    }
  };

  window.I18N = {
    langs: ['uz', 'ru', 'en'],
    langMeta: {
      uz: { label: 'O‘zbek', short: 'UZ', flag: '🇺🇿' },
      ru: { label: 'Русский', short: 'RU', flag: '🇷🇺' },
      en: { label: 'English', short: 'EN', flag: '🇬🇧' }
    },
    dict: { uz: UZ, ru: RU, en: EN },
    get: function (lang) { return this.dict[lang] || UZ; }
  };
})();
