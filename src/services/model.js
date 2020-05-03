import CreateEvent from "../utils/createEvents";

export default class Model extends CreateEvent{
    constructor(){
        super();
        this.data = {};
    }

    fromJson(json){
        this.data = Object.assign(this.data, json);
        this.trigger('datachange', this.toJson());
    }
    toJson(){
        return this.data;
    }
}