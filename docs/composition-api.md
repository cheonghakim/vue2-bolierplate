## Composition-api(~2.7)

### 1. 객체 관리

ref: 배열 및 원시타입 데이터, ref값에 읽기/쓰기할때는 .value로 접근한다  
reactive: 객체타입을 깊은 감시한다. 가능하면 객체안의 데이터를 변경하는 방식으로 사용한다.  
reactive안에 값을 이용하는 것이 올바른 사용방법이다.  
어쩔 수 없이 reactive를 변경해야하고 재할당을 해야하는 경우 Object.assign(reactiveObj, newValue)를 사용한다.  
렌더링을 다시해야 하는 경우 instance.proxy.$forceupdate()를 사용한다.  
에러를 발생시킬 가능성이 높고 성능에도 좋지 않으므로 이런 방법은 사용하지 않는 것이 좋다.

### 2. Props

기존과 동일하게 정의하고 setup 싸이클 안에서 ref로 변환하여 리턴한다

```javascript
props:{
    prop1:{
        type:String
    },
    prop2:{
        type:Number
    }
},
setup(props){
    const {prop1, prop2} = toRefs(props)
    return  {prop1, prop2}
}
```

### 3. data

기존의 Data는 ref나 reactive로 감싸준다.

```javascript
setup(){
    const someObj = reactive({
        name:"Lisa",
        age: 19
    })
    const someArray = ref([1,2,3,])

    return {
        someObj,
        someArray
    }
}
```

### 4. Store

getInstance로 $store에 접근하여 스토어 데이터 및 디스패치를 가져온다

```javascript
const instance = getCurrentInstance();
const store = instance.proxy.$store;
const stateData = computed(() => store.state.moduleName.stateData); //state
const getterData = computed(() => store.getters["moduleName/getterData"]); //getter
const doDispatch = (data) => store.dispatch("moduleName/dispatchName", data); //dispatch
```

### 5. method

methods내부에서 this에 접근이 필요한 경우 getCurrentInstance.proxy 로 접근한다

```javascript
setup(){
    const instance = getCurrentInstance()
    const doSomthing = (message) => {
        instance.proxy.$subject.$emit("info", message)
    }
    return {
        doSomthing
    }
}
```

### 6. $emit

상위컴포넌트로 emit해야 하는 경우 setup의 두번째 인자를 이용한다

```javascript
setup(props, context){
    context.emit("emitToParent")
}
```
