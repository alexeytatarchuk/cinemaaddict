import {getRandomFromArray, getRandomInt, getRandomBoolean} from '../utils';
import {nanoid} from 'nanoid';

const MIN_DESCRIPTION = 1;
const MAX_DESCRIPTION = 3;
const MIN_DURATION_HOURS = 1;
const MAX_DURATION_HOURS = 3;
const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 59;
const WRITERS_COUNT = 3;
const CAST_COUNT = 3;
const MAX_DAY_GAP = 14;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;

const GENRES = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const COUNTRIES = [
  'USA',
  'France',
  'Germany',
  'England',
  'Italy',
  'India'
];

const SURNAMES = [
  'Douglas',
  'Smith',
  'Wigton',
  'Herald',
  'Potter'
];

const NICKNAMES = [
  'Tim Macoveev',
  'John Doe'
];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Great!',
];

const EMOJIS = [
  'angry',
  'puke',
  'sleeping',
  'smile',
];

const NAMES = [
  'John',
  'Mark',
  'Paul',
  'Kirk',
  'Bob',
];

const TITLES = [
  'The Voyeurs',
  'Three Billboards Outside Ebbing, Missouri',
  'Yes Man',
  'A Beautiful Mind',
  'Snatch',
  'Requiem for a Dream',
  'Forrest Gump',
  'Fight Club',
  'The Dark Knight',
  'Into the Deep',
  'The Lord of the Rings: The Rings of Power',
  'House of the Dragon',
  'Man vs. Bee',
  'The Handmaid\'s Tale',
  'Last Night in Soho'
];

const POSTERS_FILENAMES = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula
feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam
nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh
vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus
nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc
fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const generateFilm = () => {

  const generateDescription = () => {
    const sentences = DESCRIPTION.match(/[^.]+[. ]+/g);
    let generatedDescription = '';
    for (let i = MIN_DESCRIPTION; i <= getRandomInt(MIN_DESCRIPTION, MAX_DESCRIPTION); i++) {
      generatedDescription += sentences[getRandomInt(0, sentences.length - 1)];
    }
    return generatedDescription;
  };

  const generateRating = () => `${getRandomInt(1, 9) }.${ getRandomInt(0, 9)}`;

  const generateNamesArray = (quantity) => new Array(quantity)
    .fill(0, 0)
    .map(() => `${getRandomFromArray(NAMES) } ${ getRandomFromArray(SURNAMES)}`)
    .join(', ');

  const generateCommentData = () => {
    const daysGap = getRandomInt(0, MAX_DAY_GAP);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysGap);
    return new Date(currentDate);
  };

  const generateComment = () => ({
    emoji: getRandomFromArray(EMOJIS),
    comment: getRandomFromArray(COMMENTS),
    nickname: getRandomFromArray(NICKNAMES),
    dateComment: generateCommentData(),
  });

  const generateComments = () => {
    const commentsQuantity = getRandomInt(MIN_COMMENTS, MAX_COMMENTS);
    return new Array(commentsQuantity).fill(0, 0).map(generateComment);
  };

  return {
    id: nanoid(),
    title: getRandomFromArray(TITLES),
    titleOriginal: '',
    rating: generateRating(),
    year: getRandomInt(1950, 2025),
    duration: `${getRandomInt(MAX_DURATION_HOURS, MIN_DURATION_HOURS) }h ${ getRandomInt(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES) }m`,
    country: getRandomFromArray(COUNTRIES),
    genre: getRandomFromArray(GENRES),
    director: `${getRandomFromArray(NAMES) } ${ getRandomFromArray(SURNAMES)}`,
    writers: generateNamesArray(WRITERS_COUNT),
    cast: generateNamesArray(CAST_COUNT),
    comments: generateComments(),
    poster: `./images/posters/${ getRandomFromArray(POSTERS_FILENAMES)}`,
    description: generateDescription(),
    isInWatchList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite:getRandomBoolean(),
    age: `${getRandomInt(12, 21) }+`
  };
};
