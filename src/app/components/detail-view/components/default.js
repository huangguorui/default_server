
/*基础props*/
export const baseProps = {
    store: Object,
    value: [String, Number, Array, Object, Boolean],
    itemConfig: Object,
    currentState: Object,
    itemObjectKey: String,
};

export const changeOptionsC = (store)=>({
    store: store.store,
    value: store.value,
    itemConfig: store.itemConfig,
    currentState: store.currentState,
    itemObjectKey: store.itemObjectKey
})
