import React, { Component } from 'react';
import classes from './Buttons.module.css';
import getFourRndImages from './components/getFourRndImages';
import PlaySound from './components/PlaySound';

class App extends Component {
  state = {
    imgList: [
      { id: 0, img: require('./assets/images/0.jpg'), sound: require('./assets/sounds/0.m4a'), name: 'ship' },
      { id: 1, img: require('./assets/images/1.jpg'), sound: require('./assets/sounds/1.m4a'), name: 'train' },
      { id: 2, img: require('./assets/images/2.jpg'), sound: require('./assets/sounds/2.m4a'), name: 'ambulance car' },
      { id: 3, img: require('./assets/images/3.jpg'), sound: require('./assets/sounds/3.m4a'), name: 'bike' },
      { id: 4, img: require('./assets/images/4.jpg'), sound: require('./assets/sounds/4.m4a'), name: 'bus' },
      { id: 5, img: require('./assets/images/5.jpg'), sound: require('./assets/sounds/5.m4a'), name: 'car' },
      { id: 6, img: require('./assets/images/6.jpg'), sound: require('./assets/sounds/6.m4a'), name: 'garbage truck' },
      { id: 7, img: require('./assets/images/7.jpg'), sound: require('./assets/sounds/7.m4a'), name: 'excavator' },
      { id: 8, img: require('./assets/images/8.jpg'), sound: require('./assets/sounds/8.m4a'), name: 'fire truck' },
      { id: 9, img: require('./assets/images/9.jpg'), sound: require('./assets/sounds/9.m4a'), name: 'motorbike' },
      { id: 10, img: require('./assets/images/10.jpg'), sound: require('./assets/sounds/10.m4a'), name: 'plane' },
      { id: 11, img: require('./assets/images/11.jpg'), sound: require('./assets/sounds/11.m4a'), name: 'police car' },
      { id: 12, img: require('./assets/images/12.jpg'), sound: require('./assets/sounds/12.m4a'), name: 'scooter' }
    ],
      rndImages: [0, 0, 0, 0], //Хранятся индексы imgList 4-х картинок
      questionIndex: 0,
      maxArray: 12,
      correctAnswer: false,
      playResultAnswer: false,
      playError: true,
      playQuestion: true,
      gameOver: false,    
      countCorrectAnswer: 0,
      countWrongAnswer: 0
  };

  componentDidMount() {
    this.initialState(this.state.maxArray);    
  }

  initialState = (maxArray) => {
    const rndIndexes = getFourRndImages(maxArray); //Получить 4 случайных индекса из массива imgList         
    const questionIndex = Math.floor(Math.random() * 4 ); //Индекс озвученной картинки 
    
    this.setState( { rndImages: rndIndexes, questionIndex: questionIndex } ); //Запомнить 4 картинки и индекс озвученной картинки 
  }
  
  changeImgList = (buttonIndex) => {
    let tmpArray = this.state.imgList;  //imgList записываю во временный массив 
    const rndImages = this.state.rndImages; //ХРАНЯТСЯ ИНДЕКСЫ!
    const maxArray = this.state.maxArray;
    const idImage = tmpArray[rndImages[buttonIndex]].id; //Нахожу картинку по индексу кнопки

    const imageIndex = tmpArray.findIndex(idImg => idImg.id === idImage); //Нахожу индекс картинки в imgList по картинке
    tmpArray.splice(imageIndex, 1);  //Удаляю эту картинку из imgList
  
    const rndIndexes = getFourRndImages(maxArray-1); //Получить 4 случайных индекса из массива imgList
         
    const questionIndex = Math.floor(Math.random() * 4 ); //Индекс озвученной картинки 

    this.setState({ imgList: tmpArray, maxArray: (maxArray-1), rndImages: rndIndexes, questionIndex: questionIndex, 
      correctAnswer: false, playResultAnswer: false }); 

    console.log("Размер массива: " + this.state.imgList.length);
  };
  
  checkAnswer = (buttonIndex) => {    
    if (buttonIndex === this.state.questionIndex) {
      if (this.state.imgList.length > 4) {
        this.setState( {questionIndex: buttonIndex, correctAnswer: true, playResultAnswer: true, playError: false, countCorrectAnswer: this.state.countCorrectAnswer + 1}); 
      } 
      else {
        this.setState({gameOver: true}); 
//        alert("УРА! ФАНФАРЫ!");
      } 
    } 
    else {
      this.setState( (state) => ({ correctAnswer: false, playResultAnswer: true, playError: !state.playError, countWrongAnswer: this.state.countWrongAnswer + 1 }) ); 
    }    
  };
 
  repeatAnswer = () => {
   this.setState( (state) => ({ playQuestion: !state.playQuestion }) ); 
  };

  render() {  
  
    let nextButton, playQuestion, playSound, playGameOver;

    if (this.state.playResultAnswer === true) {
      if (this.state.correctAnswer === false ) {
        nextButton = null; //Прячем кнопку
        if (this.state.playError === true) {
          playSound = (
            <PlaySound urlStr= { require('./assets/sounds/e1.mp3') } />    
          );
        }      
        else {
          playSound = (
            <PlaySound urlStr= { require('./assets/sounds/e3.mp3') } />    
          );
        }
      }
      else {
        playSound = (
          <PlaySound urlStr= { require('./assets/sounds/s1.mp3') } />    
        );
        nextButton = (
          <div className={classes.column}>
             <img 
               onClick={() =>  {this.changeImgList(this.state.questionIndex)} }
               src= {require('./assets/arrows/arrow2.png')} 
               alt ="ButtonNext" className={classes.OrderBtnNext}/>
          </div>
        );
      };    
    }

    if (this.state.playQuestion === true) {
      playQuestion = (
        <PlaySound urlStr= { this.state.imgList[this.state.rndImages[this.state.questionIndex]].sound} />    
      );
    }
    else {
      playQuestion = ( //playQuestion во второй раз включает <div>, чтобы был рендеринг! 
        <div>  
          <PlaySound urlStr= { this.state.imgList[this.state.rndImages[this.state.questionIndex]].sound} />    
        </div>
      );
    }


    if (this.state.gameOver === true) {
      playGameOver = (
        <PlaySound urlStr= { require('./assets/sounds/s1.wav') } />    
      );
    }

    return (
      <div>
        {playQuestion}
        {playSound}
        {playGameOver}
        <div className={classes.row}>
            <div className={classes.column}> 
              <img className={classes.OrderButton}
                onClick={() => { this.checkAnswer(0); } }
                src= {this.state.imgList[this.state.rndImages[0]].img} 
                alt ="Button1"/>
                <p>{this.state.imgList[this.state.rndImages[0]].name}</p>
            </div>
            
            <div className={classes.column}> 
             <img className={classes.OrderButton}
               onClick={() => { this.checkAnswer(1); } }
               src= {this.state.imgList[this.state.rndImages[1]].img} 
               alt="Button2"/>
              <p>{this.state.imgList[this.state.rndImages[1]].name}</p>
            </div>

            <div className={classes.column}>
             <img className={classes.OrderBtnRepeat}
               onClick={() =>  {this.repeatAnswer()} }
               src= {require('./assets/arrows/speaker1.png')} 
               alt ="ButtonRepeat" />
              <p><font size="4"> {this.state.countCorrectAnswer} : {this.state.countWrongAnswer} </font></p>
            </div>
        </div>
        <div className={classes.row}>
            <div className={classes.column}> 
             <img className={classes.OrderButton}
               onClick={() => { this.checkAnswer(2); } }
               src= {this.state.imgList[this.state.rndImages[2]].img} 
               alt="Button3" />
              <p>{this.state.imgList[this.state.rndImages[2]].name}</p>
            </div>
            <div className={classes.column}> 
             <img className={classes.OrderButton}
               onClick={() => { this.checkAnswer(3); }  }
               src= {this.state.imgList[this.state.rndImages[3]].img} 
               alt="Button4" />
              <p>{this.state.imgList[this.state.rndImages[3]].name}</p>
            </div>
          
            {nextButton}
        </div>
      </div>
    );
  }
}

export default App;


