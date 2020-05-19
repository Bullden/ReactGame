import React from 'react'
import './Block.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {background: this.props.background};
        
    }
    openBlock = (background, id, active) => {
        this.setState({background: background})
        this.props.openBlock(id, background, active)    
    }
    componentDidMount(){  
        setTimeout(() => {
            this.setState({background: 'gray'})
            this.flippy.toggle()
        }, 2000)
    }
    componentDidUpdate() {      
        if(this.props.isCorrect === false && this.state.background !== 'gray') { 
            setTimeout(() => {
                if(this.props.active === false) {
                    this.setState({background: 'gray'})
                    this.flippy.toggle()
                }
            }, 1000)
        }
    }

    render() {          
        return(
            <div onClick ={() => this.openBlock(this.props.background, this.props.id, this.props.active)} >        
                <Flippy
                    flipOnHover={false}
                    flipOnClick={true}
                    ref={(r) => this.flippy = r}
                    flipDirection="horizontal"
                    style={{ width: '150px', height: '150px', margin: '2px'}}>
                        <FrontSide style={{backgroundColor: this.state.background}} />
                        <BackSide style={{backgroundColor: this.state.background}} />
                </Flippy>
            </div>
        )
    }
}