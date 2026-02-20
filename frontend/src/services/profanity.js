import filter from 'leo-profanity';

filter.loadDictionary('ru');

const englishProfanity = ['boobs', 'fuck', 'shit', 'ass', 'damn', 'cunt', 'dick', 'porn'];

filter.add(englishProfanity);


export default filter;