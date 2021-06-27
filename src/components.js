import React,{Component} from 'react'
import ReactDOM from 'react-dom'


// function Component
function FunctionComponents(props){
    return <div>Hello {props.name} Function Components</div>
}

// class Component
class ClassComponents extends Component{
    render(){
        return(
            <div>Hello {this.props.name} Class Components</div>
        )
    }
}

// Component 합성
// 컴포넌트안에 컴포넌트를 집어넣을수있습니다.
class App extends Component{
    render(){
        return(
            <div>
                <FunctionComponents name="ingoo" />
                <ClassComponents name="ingoo" />
            </div>
        )
    }
}


//const element = <ClassComponents name="ingoo" />


// 컴포넌트를 잘게잘게 쪼개는것 그것이 리액트의 핵심이에요

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

/*
    component 만들떄 항상 첫글자는 대문자부터 시작해야합니다. 페이스북이 그게 규칙이래요. 
    프레임워크를 사용하는입장에서는 사용법에 맞게 잘써야합니다.

    만든이가 말하길 HTML 태그와 사용자정의 컴포넌트 (우리가만든 function 이나 class)
    의 차이점을 첫글자 대소문자로 구별하기 위해서라고 하네요. 그냥 알고만있으면 됩니다.

    <Welcome name="Sara" /> 엘리먼트로 ReactDOM.render()를 호출합니다.
    React는 {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출합니다.
    Welcome 컴포넌트는 결과적으로 <h1>Hello, Sara</h1> 엘리먼트를 반환합니다.
    React DOM은 <h1>Hello, Sara</h1> 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트합니다.
*/