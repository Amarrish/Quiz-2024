import React, { useEffect, useState } from 'react'
import './quiz.css'
import data from '../datas/data'
import correctans from '../Assets/audio/rightanswer-95219.mp3'
import wrongans  from '../Assets/audio/error-4-199275.mp3'
import ConfettiExplosion from 'react-confetti-explosion';

const Quiz = () => {
const [qstans,setQstans] = useState(data);
const [qstnmbr,setQstnmbr] = useState(0);
const [selectedoption,setSelectedoption] = useState('')
const [colors,setColors] = useState('')
const [isExploding, setIsExploding] = useState(false);

// Audio
const correctaudio = new Audio(correctans);
const incorrectaudio = new Audio(wrongans)
// console.log(qstans[qstnmbr].answer);
const handlecheck =()=>{
    if(qstans[qstnmbr].answer===selectedoption){
        console.log('Correct answer');
        setColors('correct')
       
       
            if(qstnmbr>=9){
                setIsExploding(true)
                setTimeout(()=>{
                    alert('congrats')
                setQstnmbr(0)
                },2000)
                
            }else{
              setTimeout(()=>{
                setQstnmbr(qstnmbr+1) 
                correctaudio.play()
              },2000)
           
            }
            
      
        
    }
    else{
        setColors('incorrect')
        setTimeout(()=>{
            incorrectaudio.play()
            alert(`Oops Game over Your Score is ${qstans[qstnmbr].price} `)
        setQstnmbr(0)
        },1000)
        
    }
}


const handleoptselect = (option)=>{
    setSelectedoption(option)
    setColors('selected')
}
useEffect(()=>{
   
},[selectedoption])

  return (
    <div className='quiz-container'>
        {isExploding && <ConfettiExplosion />}
        <div className="scorepoint">
                <h1>Earned</h1>
                <h3>{qstans[qstnmbr].price}</h3>
            </div>

        <div className="timer">
            <h1>30 sec</h1>
        </div>

        <div className="game-container">

                    <div className="qst-ans">
                    <div className="qstn">
                        <p>{qstnmbr+1}.) {qstans[qstnmbr].question}</p>
                    </div>
                    {
                        qstans[qstnmbr].options.map((opt,index)=>(
                    <div key={index} className="options">
                        <button className={selectedoption===opt.option?colors==='selected'?'selected':colors==='correct'?'correct':colors==='incorrect'?'incorrect':'':''} onClick={()=>handleoptselect(opt.option,'')} >{index+1}.) {opt.option}</button>
                    </div>
                        ))
                    }
                    <button  onClick={handlecheck} id='check'>check</button>
                </div>

                

        </div>

      
    </div>
  )
}

export default Quiz