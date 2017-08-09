import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from './sketch'; 
// import IO from 'socket.io-client';

// const wsClient = IO(`ws://127.0.0.1:12346`);

class Whiteboard extends Component {

  // socket = null;
  constructor(props){
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      previousCol: '#444444',
      color: '#444444',
      fill: false,
      fillColor: '#444444',
      items: [],
      data: '',
      URL: ''
    }

      this.save = this.save.bind(this);
      this.clear = this.clear.bind(this);
      this.displayThumb = this.displayThumb.bind(this);
      this.retrieve = this.retrieve.bind(this);
      this.erase = this.erase.bind(this);
  }

  

  // componentDidMount() {
  //   wsClient.on('addItem', item => this.setState({items: this.state.items.concat([item])}));
  // }

  retrieve(data){
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext("2d"); 
      ctx.putImageData(data,0,0);
  }

  displayThumb(){
        document.getElementById("thumb").style.border = "1px solid";  
        //replace this.state.URL with data from database      
        document.getElementById("thumb").src = this.state.URL;
        document.getElementById("thumb").style.display = "inline";
  }

  save() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d"); 
        // action creator or axios call here instead of setting state
        this.setState({URL:canvas.toDataURL(), data:ctx.getImageData(0,0,500,500)});
        this.clear();
    }

    clear() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        var m = window.confirm("Want to clear");
        var w = canvas.width;
        var h = canvas.height;
        if (m) {
            ctx.clearRect(0, 0, w, h);
        }
    }

    //on click erase - 1. set current state previousCol to currCol 2.line size to 20  3.display color white
   // on click of pencil - 2. set current state currCol to prevCol line size to 2, display current col

    erase(){
      this.setState({previousCol: this.state.color, color: 'white', tool:TOOL_PENCIL, size:20});          
    }
    
    componentDidUpdate(){
      this.displayThumb();
    }

render() {
  const { tool, size, color, fill, fillColor, items, previousCol } = this.state;
  console.log("data", this.state.data);
  console.log('url',this.state.URL)
    return (
      <div>
        <h1>React SketchPad</h1>
        <div style={{float:'left', marginRight:20}}>
          <SketchPad 
            width={500}
            height={500}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            //onCompleteItem={(i) => wsClient.emit('addItem', i)}
          />
        </div>
        <div style={{float:'left'}}>
          <div className="tools" style={{marginBottom:20}}>
            <button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL, color:previousCol, size: 2})}
            >Pencil</button>
            <button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            >Line</button>
            <button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            >Ellipse</button>
            <button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            >Rectangle</button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
          </div>
            
          {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <label htmlFor="">with color:</label>
                  <input id='color2' type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                </span> : ''}
            </div> : ''}
            <button onClick={() => this.erase()} className="eraser">Eraser</button>
            <button onClick={()=>this.save()}>Save</button>
            <button onClick={()=>this.clear()}>Clear</button>
            <button>Undo</button>
        </div>
        <img onClick={()=>this.retrieve(this.state.data)} id='thumb' style={{display: 'none', height: '150px', width:'150px'}}></img>
      </div>
    );
  }
}

export default Whiteboard;