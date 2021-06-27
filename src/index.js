import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class CommentInput extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
        this.commentInputs = React.createRef();
    }

    //생명주기
    componentDidMount() {
        console.log(this.commentInputs);
    }
    
    render(){
        return(
            <span>
                <input type="text" 
                className="comment-update-input"
                ref={this.commentInputs}
                onKeyDown={(e)=>{ 
                    if(e.key === 'Enter'){
                        this.props.onUpdate()
                        
                        // 수정하기버튼 만들기
                        let index = this.props.index
                        let con = this.commentInputs.current.dataset.value
                        this.props.onUpdateCommit(index,con)
                        
                    } 
                }} 
                onChange={this.props.onUpdateSubmit} 
                data-value={this.props.content}
                defaultValue={this.props.content} 
                />
            </span>
        )
    }
}

class CommentList extends Component {
    render(){
        return(
            <li>
                <ul className="comment-row">
                    <li className="comment-id">{this.props.userid}</li>
                    <li className="comment-content">
                        {this.props.updateFlag ? <span onClick={this.props.onUpdate}>{this.props.content}</span> : <CommentInput key={this.props.index} onUpdate={this.props.onUpdate} onUpdateSubmit={this.props.onUpdateSubmit} index={this.props.index} content={this.props.content} onUpdateCommit={this.props.onUpdateCommit} /> }
                        {/* <button onClick={this.props.onUpdate}>수정</button> */}
                        <span className="comment-delete-btn" onClick={()=>this.props.onRemove(this.props.index)}>X</span>
                    </li>
                    <li className="comment-date">{this.props.date}</li>
                </ul>
            </li>
        )
    }
}

class CommentForm extends Component {
    render(){
        return(
            <li className="comment-form">
                <form method="post" onSubmit={this.props.onClick}>
                    <h4>댓글쓰기 <span>({this.props.count})</span></h4>
                    <span className="ps_box">
                        <input type="text" 
                            placeholder="댓글내용을 입력해주세요." 
                            className="int"
                            defaultValue={this.props.value}
                            onChange={this.props.onChange}
                            name="value"  
                        />
                    </span>
                    <input type="submit" className="btn" value="등록" />
                </form>
            </li>
        )
    }
}

class CommentApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            replays:[
                {userid:'web7722',content:'안녕하세요',date:'2021-06-24',updateFlag:true},
                {userid:'web7722',content:'안녕하세요1',date:'2021-06-24',updateFlag:true},
                {userid:'web7722',content:'안녕하세요2',date:'2021-06-24',updateFlag:true},
                {userid:'web7722',content:'안녕하세요3',date:'2021-06-24',updateFlag:true},
            ],
            value:'',
        }

        this.commentSubmit = this.commentSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateCommit = this.updateCommit.bind(this)
        
    }

    onUpdate(index){
        const replays = [...this.state.replays]
        replays[index].updateFlag = !replays[index].updateFlag
        this.setState({replays})
    }

    updateCommit(index,con){
        console.log(index,con)
        const replays = [...this.state.replays]
        replays[index].content = con;
        this.setState({replays})

    }

    commentSubmit(e){

        //DB 요청후 결과값 반환 객체
        let obj={userid:'web7722',content:this.state.value,date:'2021-06-24',updateFlag:true}
        this.setState({
            replays:this.state.replays.concat(obj),
            value:'',
        })

        e.preventDefault()
        e.target.reset()
    }

    handleChange(e){
        this.setState({ [e.target.name]:e.target.value })   
    }

    handleUpdate(e){
        e.target.dataset.value = e.target.value
    }

    onRemove(id){
        let replays = [...this.state.replays]
        let reply = replays.filter((value,index) => {
            return id !== index
        })
        this.setState({replays:reply })
    }

    renderComment(obj){
        let {replays} = {...this.state}
        return(
            replays.map((value,index)=>(
                    <CommentList 
                        key={index}
                        index={index}
                        userid={value.userid} 
                        content={value.content} 
                        date={value.date}
                        updateFlag={value.updateFlag}
                        onUpdate={()=>{this.onUpdate(index)}}
                        onUpdateSubmit={this.handleUpdate}
                        onRemove={this.onRemove}
                        onUpdateCommit={this.updateCommit}
                    />
            ))
        )
    }

    render(){
        return(
            <div>
                <ul className="comment">
                    <CommentForm 
                        count={this.state.replays.length} 
                        value={this.state.value}
                        onChange={this.handleChange}
                        onClick={this.commentSubmit}
                    />
                    {this.renderComment(this.state.replays)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <CommentApp />,
    document.querySelector('#root')
)