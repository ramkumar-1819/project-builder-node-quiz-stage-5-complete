import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

class Home extends React.Component{
     render(){
         //This is Home Page Component
         return(<div className="homepage">
             <div>Quiz App</div>
             <div><Link to="/quiz"><button>PLAY</button></Link></div>
         </div>)
     }
}
export default Home