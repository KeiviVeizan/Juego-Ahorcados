import { useEffect, useState } from 'react'
import { letters } from './helpers/letters'
import './App.css'
import { HandImage } from './components/HangImage'
import { getRandomWord } from './helpers/getRandomWord';


function App() {

  const [word, setWord] = useState (getRandomWord);
  const [hiddenWord, setHiddenWord] =useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);

  const [lose, setLose] = useState(false);
  const [win, setWin] = useState(false);

  //determinamos si la persona perdio;
  useEffect(()=>{
    if (attempts >= 9){
      setLose(true);
    }
  }, [attempts]);


  //Determinar si la persona gano;

  useEffect(()=>{
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word){
      setWin(true);
    }
  }, [hiddenWord]);


  const checkLetter = (letter:string)=>{

    if (lose){return};
    if (win){return};

    if( !word.includes(letter) ){
      setAttempts(Math.min(attempts +1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    console.log(hiddenWordArray);

    for(let i = 0; i< word.length; i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));

  }


  const newGame = () =>{
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWin(false);
  }

  return (
    <main className="App">
      {/*Imagenes*/}
      <HandImage imageNumber ={attempts}/>
      
      {/*Palabra Oculta */}
      <h4>{hiddenWord}</h4>

      {/*Intentos*/}
      <h5>Intentos: {attempts}</h5>

      {/*Mensaje si perdio */}
      {
        (lose) ? <h2>Perdio, la palabra era: { word}</h2>: ''
      }
      {/*Mensaje si Gano */}
      {
        (win) ? <h2>Felicidades, Usted Gano</h2>: ''
      }
      <section className="buttonsGame">
          <div className="buttonsLetters">
            {
            letters.map(letter =>(
              <button
                onClick={() => checkLetter(letter)}
                key={letter}
              >
                {letter}
              </button>
            ))
            }
          </div>
          <div className="buttonNewIntent">
            <button onClick={newGame}>¿Nuevo Juego?</button>
          </div>
      </section>
    </main>
  )
}
export default App
