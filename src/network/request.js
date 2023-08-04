import request from "@/axios";

// 防抖时间
let delayDebounceTime = 1 * 1000;
// 节流时间
let delayThrottleTime = 2 * 1000;

// 防抖
let debounceRequest  = (function(){
    let timer = null;

    return function(config){
        if(timer != null) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {

            request({
                ...config
            });

        }, delayDebounceTime);
    }
})();


// 节流
let throttleRequest  = (function(){

    let time = ture;
    return function(config){
        if(time) {
            time = false;
            setTimeout(() => {
                request({
                    ...config
                });

                time = true;
            }, delayThrottleTime);
        }
    }
})();


export {
    request,
    debounceRequest,
    throttleRequest,
}