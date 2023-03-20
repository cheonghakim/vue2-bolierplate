## Composition-api(~2.7)

### 1. 객체 관리

ref: 배열 및 원시타입 데이터, ref값에 읽기/쓰기할때는 .value로 접근한다  
reactive: 객체타입을 깊은 감시한다. 객체안의 데이터를 변경하는 방식으로 사용한다.

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
import { useStore } from "@/state/store";
const store = useStore();
const stateData = computed(() => store.state.moduleName.stateData); //state
const getterData = computed(() => store.getters["moduleName/getterData"]); //getter
const doDispatch = (data) => store.dispatch("moduleName/dispatchName", data); //dispatch
```

### 5. method

methods내부에서 this에 접근이 필요한 경우 getCurrentInstance로 접근한다

```javascript
setup(){
    const { proxy } = getCurrentInstance();  // 안티패턴 => setup 안에서 구현하거나 외부에서 가져오도록 변경
    const doSomthing = (message) => {
        proxy.$subject.$emit("info", message)
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

### 7. ref

Vue2에서 this.$refs에 접근하는 방법은 다음과 같다

1. ref()를 이용해 변수에 할당한다
2. 1에서 선언한 변수를 toRef(refVar)에 넣고 template에 ref의 변수와 동일한 이름으로 만든다
3. 2의 .value로 ref에 접근한다

```javascript
export default {
    setup(props, context){
        const test = ref(null)
        const testRef = toRef(test)
        // testRef.value로 접근
    }
}
<template>
    <div ref="testRef"></div>
</template>
```
