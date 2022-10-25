import {getRandomFromArray, getRandomInt} from "../utils";

const MIN_DESCRIPTION = 1;
const MAX_DESCRIPTION = 3;
const MIN_DURATION_HOURS = 1;
const MAX_DURATION_HOURS = 3;
const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 59;

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const TITLES = [
  `The Voyeurs`,
  `Three Billboards Outside Ebbing, Missouri`,
  `Yes Man`,
  `A Beautiful Mind`,
  `Snatch`,
  `Requiem for a Dream`,
  `Forrest Gump`,
  `Fight Club`,
  `The Dark Knight`,
  `Into the Deep`,
  `The Lord of the Rings: The Rings of Power`,
  `House of the Dragon`,
  `Man vs. Bee`,
  `The Handmaid's Tale`,
  `Last Night in Soho`
];

const POSTERS_FILENAMES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
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
    let generatedDescription = ``;
    for (let i = MIN_DESCRIPTION; i <= getRandomInt(MIN_DESCRIPTION, MAX_DESCRIPTION); i++) {
      generatedDescription += sentences[getRandomInt(0, sentences.length - 1)];
    }
    return generatedDescription;
  };

  const generateRating = () => {
    return getRandomInt(1, 9) + `.` + getRandomInt(0, 9);
  };

  return {
    title: getRandomFromArray(TITLES),
    rating: generateRating(),
    year: getRandomInt(1950, 2025),
    duration: getRandomInt(MAX_DURATION_HOURS, MIN_DURATION_HOURS) + `h ` + getRandomInt(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES) + `m`,
    genre: getRandomFromArray(GENRES),
    poster: `./images/posters/` + getRandomFromArray(POSTERS_FILENAMES),
    description: generateDescription(),
    comments: getRandomInt(0, 100),
    isInWatchlist: getRandomInt(0, 1),
    isWatched: getRandomInt(0, 1),
    isFavorite: getRandomInt(0, 1)
  };
};
