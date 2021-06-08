import React from 'react';
import './Result.css';
import {Link} from 'react-router-dom';

function Result(){
          const main=sessionStorage.getItem("details").split(',')
          const result=main.map(val=>Number(val))
          var quote=""
          const percent=parseInt((result[1]/11*100));
          //calculating the percentage based on the answers and gives us a quote based on the percentage
          if(percent>90){
              quote="Excellent"
          }
          else if(percent>75){
                quote="Good"
          }
          else if(percent>50){
              quote="Average"
          }
          else{
              quote="Need to Practice more"
          }
          return(<div className="result">
              <div className="res">
              <img src="https://cdn-0.emojis.wiki/emoji-pics/microsoft/check-mark-microsoft.png" alt="tick pic"></img>
              <div>Result</div>
              </div>
              <div className="box">
                  <div>{quote}</div>
                  <div>{percent}%</div>
                  <pre><span>Total Number of Questions</span><span>{result[3]}</span></pre>
                  <pre><span>Total Number of Attempted Questions</span><span>{result[0]}</span></pre>
                  <pre><span>Total Number of Correct Answers</span><span>{result[1]}</span></pre>
                  <pre><span>Total Number of Wrong Answers</span><span>{result[2]}</span></pre>
              </div>
              
              <Link to='/'><button className="stop">BackToHome</button></Link>
              <Link to='/quiz'><button className="play">PlayAgain</button></Link>
          </div>)
}
export default Result;