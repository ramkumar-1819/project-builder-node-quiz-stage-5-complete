import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import './Quiz.css';

export default function Quiz(){
    const history=useHistory();              //this API to change the the URL's when we are quiting or completed the quiz
    const [datas,setDatas]=useState([])      //hold datas collected from api;
    const [current,setCurrent]=useState(0)  //hold the current question number
    const [time,setTime]=useState(1000)       //hold the timer
    const [marks,setMarks]=useState({})      //hold right and wrong answer for each question that user answered
    const [lastAnswered,setLast]=useState(1000) //last question answered time
    
    //UseEffect collect quiz info ie(Question,Answer,Option) from the backend using Axios
    useEffect(()=>{
        axios.get('http://localhost:4000/map/view')
        .then(datas=>{
            console.log(datas.data)
            if(datas.data.length>0){
                setCurrent(0)
                setDatas(datas.data)
            }
        })
        .catch(err=>console.log(err))
        const interval=setInterval(timer,1000)  //setting the timer
        return ()=>clearInterval(interval)      //clearing when component is unmounting
    },[])

    //this useEffect is basically used to restore the default color to each options when we came to new question
    useEffect(()=>{
        if(datas.length>0){
            let childs=document.getElementsByClassName('answers')[0].children;
            for(let i=0;i<childs.length;i++){
                childs[i].style.backgroundColor="rgb(25, 158, 211)"
            }
        }
    },[current])

    //this use Effect is used to change the buttons transperency 
    //when you are in 1st or last question
    //and change to next question if 10s over on a single question
    useEffect(()=>{
        if(time>0){
            //make the next button as transparent when you reach the last question
            if(current+1===datas.length && datas.length>0){
                document.getElementById("next").style.opacity="0.5"
                document.getElementById("next").style.cursor="not-allowed";
            }
            else if(current+1!==datas.length && datas.length>0) {
                document.getElementById("next").style.opacity="1"
                document.getElementById("next").style.cursor="pointer";
            }
            //make the previous button as transparent when you are in first question
            if(current===0 && datas.length>0){
                document.getElementById("prev").style.opacity="0.5"
                document.getElementById("prev").style.cursor="not-allowed";
            }
            else if(current>0 && datas.length>0){
                document.getElementById("prev").style.opacity="1"
                document.getElementById("prev").style.cursor="pointer";
            }
            //change the question after 10s completed on a single question
            if(lastAnswered-time===10){
                if(current+1!==datas.length){
                    setLast(time)
                    setCurrent(prev=>prev+1)
                }
            }
        }
    },[time])
    //timer fuction to change the timer every second
    const timer=()=>{
        setTime(prev=>prev-1) 
    }
    //when option is clicked or you waited more than 10s in a sigle question means
    //this function executed to change the next question

    const nextHandler=(e)=>{
        //when option is selected then give color to the selected opton
        //Then give a popup that your selected answer is correct/wrong
        e.target.style.backgroundColor="blue";
        if(document.getElementById('answer_type').hasAttribute('class')){
            document.getElementById('answer_type').removeAttribute('class')
        }
        setTimeout(changeNext,500);
        function changeNext(){
            if(datas[current].answer[0].answer===e.target.innerHTML){
                document.getElementById('answer_type').style.backgroundColor="green";
                document.getElementById('answer_type').innerHTML="Correct Answer";
                document.getElementById('answer_type').classList.add('animation')
                setMarks({...marks,[current]:1}) 
            }
            else{   
                document.getElementById('answer_type').style.backgroundColor="red";
                document.getElementById('answer_type').innerHTML="Wrong Answer";
                document.getElementById('answer_type').classList.add('animation')
                setMarks({...marks,[current]:0})
            }
            if(current===datas.length-1){
                sessionStorage.setItem("details",getResult())
                alert("Quiz has Ended")
                history.push('/result')
            }
            else if(current<datas.length){
                setCurrent(prev=>prev+1)
            }
            setLast(time)
        }  
    }
    
    //when the nextbutton is clicked
    const nextButtonHandler=()=>{
        if(current+1!==datas.length){
            setCurrent(prev=>prev+1)
            setLast(time)
        }
    }
    //when prevoius button is clicked
    const previousButtonHandler=()=>{
        if(current!==0){
            setCurrent(prev=>prev-1)
            setLast(time)
        }
    }
    //It hold the user result
    const getResult=()=>{
        const result=[0,0,0,datas.length]; 
        //0th index hold - Total number of answered Question
        //1st index hold - Number of Correctly Answered Question
        //2nd index hold - Number of wrongly Answered Question
        //3rd index hold - Total Number of Questions

        for(const i in marks){
            result[0]+=1;
            if(marks[i]===1){
                result[1]+=1
            }
            else{
                result[2]+=1
            }
        }
        return result;
    }
    //when quit button is clicked
    const submitHandler=(e)=>{
        e.preventDefault();
        //store result in session and redirect to result page
        sessionStorage.setItem("details",getResult())
        history.push('/result')
    }
    //if time is over store result in session
    if(time.currentTime===0){
        sessionStorage.setItem("details",getResult())
    }

    return(
        <>
        {(datas.length>0 && current<datas.length && time>0) &&
        <div className="home">
            <h1>Question</h1>
            <div id="answer_type"></div>
            <div id="questionSection">
                <div className="questionNumber">{datas[current].number} of 15</div>
                <div className="questionName">{datas[current].question}</div>
                <div className="timer">{time}S</div>
            </div>
            <div className="answers">
                <div onClick={nextHandler}>{datas[current].option[0].optionA}</div>
                <div onClick={nextHandler}>{datas[current].option[0].optionB}</div>
                <div onClick={nextHandler}>{datas[current].option[0].optionC}</div>
                <div onClick={nextHandler}>{datas[current].option[0].optionD}</div>
            </div>
            <div className="footer">
                <button id="prev" type="button" onClick={previousButtonHandler}>Previous</button>
                <button id="next" type="button" onClick={nextButtonHandler}>Next</button>
                <button id="quit" type="button" onClick={submitHandler}>Quit</button>
            </div>
        </div>
        }
        {time===0 &&
            <Redirect push to="/result"></Redirect>
        }   
        </>
    )
}
