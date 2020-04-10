import Events from 'events'

class DetailStore extends Events {
    state;
    items;
    itemObject;
    ready = false;
    /**
     * 构造函数
     * @param {object} props props
     * @constructor
     */
    constructor(props) {
        super(props);
        this.props = props;

        this._init();
    }

    _init(){
        const {
            items = []
        } = this.props;

        this.state = this._stateKeyPush(items);
        this.items = items;


        if(this.items instanceof Array){
            this.itemObject = {
                default:{
                    hideTitle: true,
                    currentState: this.state,
                    items: this.items
                }
            }
        } else {
            this.itemObject =  this.items;
        }

        console.log(this)

        this.ready = true;
    }
    /*
    *
    * 给data push key
    * */
    _stateKeyPush(items, state = {}){
        if(items instanceof Array){
            for (let item of items){
                let {key, value = ''} = item;
                const {createState = false} = item;
                if(typeof createState === 'string'){
                    state[createState] = Object.create({});
                    item.currentState = state[createState];
                } else{
                    item.currentState = state;
                }
                item.currentState[key] = value;
            }
        } else{
            for (let [key, item] of Object.entries(items)){
                const {createState = false} = item;
                if(typeof createState === 'string'){
                    state[createState] = Object.create({});
                    item.currentState = state[createState];
                } else {
                    item.currentState = state;
                }
                this._stateKeyPush(item.items, item.currentState)
            }
        }
        return state;
    }


    getStateKey(state, ...keys){
        let value = state;
        for(let key of keys.filter(c => c)){
            value = value[key]
        }
        return value;
    };
}
export default DetailStore;
