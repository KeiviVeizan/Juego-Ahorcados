
let word:string[] = ['VEICHANCHO', 'SEGALINHOS', 'VEGAANUEL', 'CAMEJUDO'];

export function getRandomWord (){

    const randomIndex = (Math.floor( Math.random()* word.length));

    return word[randomIndex];
}