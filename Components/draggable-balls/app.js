import "./style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import range from 'lodash.range'
import {Motion,spring,presets,StaggeredMotion} from 'react-motion'

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};

function reinsert (arr,from,to) {
    let _arr = arr.slice(0);
    let val = _arr[from];
    _arr.splice(from,1);
    _arr.splice(to,0,val);
    return _arr
}

function clamp(n,min,max){
    return Math.min(Math.max(n,min),max);
}

const allColors = [
  '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

const [count,width,height] = [11,70,90]
const layout = range(count).map(n =>{
    let row = Math.floor(n/3)
    let col = n%3;
    return [width*col , height * row]
})

class Demo extends React.Component {
    constructor(){
        super()
        this.state={
            mouse:[0,0],
            delta:[0,0],
            lastPress:null,
            isPress:false,
            order:range(count)
        }
    }
    componentDidMount() {
        window.addEventListener('mouseup',this.handleMouseUp.bind(this))
        window.addEventListener('mousemove',this.handleMouseMove.bind(this))
    }
    handleMouseMove({pageX,pageY}){
        const {order,mouse,delta:[dx,dy],isPress,lastPress} = this.state;
        if(isPress){
            const mouse=[pageX-dx,pageY-dy];
            const col = clamp(Math.round(mouse[0]/width),0,2);
            const row = clamp(Math.round(mouse[1]/height),0,Math.floor(count / 3))
            let index = row * 3 + col
            const newOrder = reinsert(order,order.indexOf(lastPress),index);
            this.setState({mouse:mouse,order:newOrder})
        }
    }
    handleMouseDown(key,[pressX,pressY],{pageX,pageY}){
        this.setState({
            lastPress:key,
            isPress:true,
            mouse:[pressX,pressY],
            delta:[pageX - pressX,pageY - pressY]
        })
    }
    handleMouseUp(){
        this.setState({isPress:false,delta:[0,0]})
    }
    render(){
        const {order,lastPress,isPress,mouse} = this.state;
        return(
            <div className="demo1">
                {order.map((_,key)=>{
                    let style;
                    let x;
                    let y;
                    let visualPosition = order.indexOf(key)
                    if (lastPress===key&&isPress){
                        [x,y] = mouse;
                        style={
                            translateX:x,
                            translateY:y,
                            scale: spring(1.2, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        }
                    }else{
                        [x,y] = layout[visualPosition]
                        style ={
                            translateX:spring(x,springSetting2),
                            translateY:spring(y,springSetting2),
                            scale: spring(1, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        }
                    }
                    return(
                        <Motion key={key} style={style}>{
                            ({translateX,translateY,scale,boxShadow}) => 
                            <div className="demo-ball"
                            onMouseDown={(e)=>this.handleMouseDown(key,[x,y],e)}
                            style={{
                                backgroundColor:allColors[key],
                                transform:`translate3d(${translateX}px,${translateY}px,0) scale(${scale})`,
                                boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                                zIndex: key === lastPress ? 99 : visualPosition,
                            }}>
                            </div>
                        }</Motion>
                    )
                })}
            </div>
        )
    }
}

ReactDOM.render(<Demo />,document.getElementById('app'))