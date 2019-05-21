var EventService = function(){
    this.eventFunc = {};
}

EventService.prototype.publish = function(type, data){
    if(this.eventFunc[type] && this.eventFunc[type].length != 0 ){
        var arr = this.eventFunc[type];

        for(var i = 0; i < arr.length; i++){
            arr[i](data);
        }
    }
};

EventService.prototype.subscribe = function(type, cb){

    if(!this.eventFunc[type]){
        this.eventFunc[type] = [];
    }

    this.eventFunc[type].push(cb);
}

EventService.prototype.clear = function(type){
    this.eventFunc[type] = [];
}

EventService.prototype.unSub = function(type, cb){

    if(!this.eventFunc[type] || this.eventFunc[type].length == 0){
        return;
    }

    var arr = this.eventFunc[type];

    for(var i = 0; i < arr.length; i++){

        if(arr[i] == cb){
            arr = arr.splice(i, 1);
            break;
        }
    }
}

exports.EventService = EventService;
