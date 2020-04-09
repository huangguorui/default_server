import Events from 'events'

class DetailStore extends Events{

    data = {};
    items = [];
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
        this.items = items;

        const data = Object.create({});
        for (let item of items){
            data[items.key] = items.value || '';
        }

        this.data = data;

        this.ready = true;
    }


    keyValue(key){
        return new Function(`
         try {
            return ${this.data}.${key}
        } catch (e) {
            console.error(e)
            return null;
        }`)
    }
}
export default DetailStore;
