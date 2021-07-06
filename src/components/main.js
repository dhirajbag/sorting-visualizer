
import {React, Component} from 'react';
import Header from './header';
import Footer from './footer';
import  SortInterface from './sortingInterface';
class Main extends Component{

    render(){
        return (
            <div>
                <Header/>
                <SortInterface/>
                <Footer/>
                
            </div>
        )
    }
}

export default Main;