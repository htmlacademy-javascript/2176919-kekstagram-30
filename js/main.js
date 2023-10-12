const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван Смирнов',
  'Александр Кузнецов',
  'Михаил Попов',
  'Дмитрий Соколов',
  'Андрей Лебедев',
  'Анна Козлова',
  'Екатерина Новикова',
  'Мария Морозова',
  'Ольга Петрова',
  'Татьяна Волкова',
  'Сергей Соловьев',
  'Николай Васильев',
  'Алексей Зайцев',
  'Елена Павлова',
  'Людмила Семенова',
  'Наталья Голубева',
  'Ирина Виноградова',
  'Виктор Богданов',
  'Владимир Воробьев',
  'Анатолий Федоров',
  'Галина Михайлова',
  'Нина Беляева',
  'Лариса Тарасова',
  'Юрий Белов',
  'Светлана Иванова',
];
const DESCRIPTIONS = [
  'Магия сезонов, каждый со своим очарованием.',
  'Ощущение свободы и приключений.',
  'Окруженный природой, наслаждаюсь моментом.',
  'Архитектура, которая захватывает дух.',
  'Мир красок и ярких оттенков вокруг.',
  'Удивительные исторические места, полные секретов.',
  'Рай для любителей приключений.',
  'Игра света и тени',
  'Эмоциональный момент',
  'Природа в движении',
  'Тайна и загадка',
  'Игра цветов',
  'Минимализм',
  'Ритм и гармония',
  'Фокусировка на деталях',
  'Атмосфера загадочности',
  'Энергия движения',
  'Необычная перспектива',
  'Формы и текстуры',
  'Симметрия и асимметрия',
  'Игра отражений',
  'Интригующий фокус',
  'Абстрактное отображение',
  'Эстетика хаоса',
  'Динамика и скорость',
  'Фантастический мир',
  'Игра пропорций',
  'Магия света',
  'Скрытые детали',
];
const PHOTO_COUNT = 25;

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (a = 1, b = 500) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generatePhotoId = createIdGenerator();
const generateUrl = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENTS)}`,
  name: `${getRandomArrayElement(NAMES)}`,
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const createPhotos = Array.from({length: PHOTO_COUNT}, createPhoto);
