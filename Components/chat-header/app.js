import "./style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import range from 'lodash.range'
import {Motion,spring,presets,StaggeredMotion} from 'react-motion'

class Demo extends React.Component {
    constructor(){
        super();
        this.state={
            x:250,y:300
        }
    }
    componentDidMount() {
        window.addEventListener('mousemove',this.handleMouseMove.bind(this))
    }
    handleMouseMove({pageX:x,pageY:y}){
        this.setState({x,y})
    }
    getStyles(prevStyles) {
    // `prevStyles` is the interpolated value of the last tick
        const endValue = prevStyles.map((_, i) => {
          return i === 0
            ? this.state
            : {
                x: spring(prevStyles[i - 1].x,presets.gentle),
                y: spring(prevStyles[i - 1].y,presets.gentle),
              };
        });
        return endValue;
    }
    render(){
        return(
        <StaggeredMotion defaultStyles={range(6).map(() => ({x: 0, y: 0}))}
        styles={this.getStyles.bind(this)}>
        {(balls) =>
            <div className="demo">
                {balls.map(({x,y},i) => 
                    <div key={i} className={`demo-ball ball-${i}`} style={{
                        transform:`translate3d( ${x - 25}px,${y - 25}px,0)`,
                        zIndex:balls.length - i
                    }}></div>)
                }
            </div>
        }
        </StaggeredMotion>
        )
    }
}

ReactDOM.render(<Demo />,document.getElementById('app'))