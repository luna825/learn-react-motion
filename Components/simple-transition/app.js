import "./style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import {Motion,spring,presets} from 'react-motion'

class Demo extends React.Component {
    constructor(props) {
        super(props);   

        this.state = {
            open: true
        };
    }
    handleClick(e){
        e.preventDefault()
        this.setState({
            open:!this.state.open
        })
    }
    render(){
        console.log(this.state.open)
        return (
            <div >
                <button onClick={(e) => this.handleClick(e)}>Toggle</button>
                <Motion style={{x:spring(this.state.open ? 400: 0,presets.wobbly)}}>
                {({x}) => 
                    <div className="demo0">
                        <div className="demo0-block"
                        style={{
                            transform:`translate3d(${x}px,0,0)`
                        }}
                        ></div>
                    </div>
                }
                </Motion>
            </div>

        )
    }
}


ReactDOM.render(<Demo />,document.getElementById('app'))