import autumnHarvestQuestions from '../questions/autumnHarvest';
import halloweenQuestions from '../questions/halloween';
import christmasQuestions from '../questions/christmas';
import springBloomQuestions from '../questions/springBloom';
import summerBeachQuestions from '../questions/summerBeach';
import sciFiFutureQuestions from '../questions/sciFiFuture';
import medievalCastleQuestions from '../questions/medievalCastle';
import underwaterAdventureQuestions from '../questions/underwaterAdventure';

export const themeMapping = {
  default: { name: 'Default', color: '#f0f0f0' },
  halloween: { name: 'Halloween', color: '#ff6600' },
  christmas: { name: 'Christmas', color: '#ff0000' },
  springBloom: { name: 'Spring Bloom', color: '#83c5be' },
  summerBeach: { name: 'Summer Beach', color: '#ffd166' },
  autumnHarvest: { name: 'Autumn Harvest', color: '#e07a5f' },
  sciFiFuture: { name: 'Sci-Fi Future', color: '#3a0ca3' },
  medievalCastle: { name: 'Medieval Castle', color: '#606c38' },
  underwaterAdventure: { name: 'Underwater Adventure', color: '#0077b6' }
};

export const getQuestionsForTheme = (theme) => {
  switch (theme) {
    case 'autumnHarvest':
      return autumnHarvestQuestions;
    case 'halloween':
      return halloweenQuestions;
    case 'christmas':
      return christmasQuestions;
    case 'springBloom':
      return springBloomQuestions;
    case 'summerBeach':
      return summerBeachQuestions;
    case 'sciFiFuture':
      return sciFiFutureQuestions;
    case 'medievalCastle':
      return medievalCastleQuestions;
    case 'underwaterAdventure':
      return underwaterAdventureQuestions;
    default:
      return [];
  }
};
