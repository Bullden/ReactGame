import React from 'react'
import {blocks} from '../../mockData/Blocks'
import Block from '../Block/Block';
import './MainComponent.css'

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: blocks,
            isCorrect: true,
            success: false,
            rounds: 0
        };
    }
    componentWillMount() {
        this.setState({blocks: this.shuffle(this.state.blocks)})
    }
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    arrayOfIds = []
    sameBlocks = []
    
    openBlock =(id, background, active) => {
        if(!active) {
            this.setState({isCorrect: true})
            let arrayBlocks = this.state.blocks.slice()
            let currentBlock = {
                id: id,
                background: background
            } 
            this.arrayOfIds.push(currentBlock)
            if(this.arrayOfIds.length === 2) {
                for(let i = 0; i <= this.arrayOfIds.length; i ++ ) {
                    if(this.arrayOfIds[i].id !== this.arrayOfIds[i+1].id) {
                        this.setState({rounds: this.state.rounds +1})
                        
                    }
                    if(this.arrayOfIds[i].id !== this.arrayOfIds[i+1].id && this.arrayOfIds[i].background === this.arrayOfIds[i+1].background) {
                        this.sameBlocks.push(this.arrayOfIds[i].background)
                        if(this.sameBlocks.length === 8) {
                            this.setState({success: true})
                        }
                        arrayBlocks.map((j) => {                                          
                            if(j.id === this.arrayOfIds[i].id) {
                                j.active = true
                            }
                            if(j.id === this.arrayOfIds[i+1].id) {
                                j.active = true
                                this.setState({blocks: arrayBlocks})
                            }
                        })
                        this.arrayOfIds = []    
                    } else {
                        this.arrayOfIds = []
                        this.setState({blocks: arrayBlocks , isCorrect: false})
                    } 
                }            
            }       
        }
    }

    render() {        
        return(
            <div className="mainBlock">
                {this.state.success ? (
                    <div className="textSuccess">Congratulations, you win!</div>
                ) : null}
                <div className="containerWrapBlocks">
                    <div className="round">
                        <div>Round: {this.state.rounds}</div>
                    </div>
                    <div className="wrapBlocks">
                        {this.state.blocks.map((i) => (
                            <Block background={i.background} isCorrect={this.state.isCorrect} active={i.active} id={i.id} key={i.id} openBlock={this.openBlock} sameBlocks={this.sameBlocks} allBlocks={this.state.blocks}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}