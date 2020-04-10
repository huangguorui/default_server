
/*基础props*/
export const baseProps = {
    store: Object,
    value: [String, Number, Array, Object, Boolean],
    itemConfig: Object,
    currentState: Object,
    itemObjectKey: String,
};
/*基础 changeOptions*/
export const changeOptionsC = (store)=>({
    store: store.store,
    value: store.value,
    itemConfig: store.itemConfig,
    currentState: store.currentState,
    itemObjectKey: store.itemObjectKey,
    change(value){
        store.$emit('input', value)
    }
});
