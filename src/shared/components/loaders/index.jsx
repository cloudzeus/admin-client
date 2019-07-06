import React from 'react';
import loaderImg from './loader.gif'


const styles = (size) =>{
    switch(size){
        case 'small':
            return {
                width :45,
                height :45
            }
        case 'large':
            return {
                width : 50,
                height : 50
            }
    }
}


 const Loader = props => {
     return (
        <span style={styles(props.size)}>
            <img style={styles(props.size)} src={loaderImg} alt="loader" className="img-responsive"/>
        </span>
     )
 }
 export default Loader