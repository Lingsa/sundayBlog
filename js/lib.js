(function(window, undefined) {
    var Stork=window.Stork;
    Stork.productWidget=function(options) {
        options=options || {};

        var productId=options.id;
        var targetDom=options.target;

        loadProductData(productId, function(targetDom) {
            renderWidget(targetDom, productData)
        });
    };

    var listeners={};

    Stork.listen=function(eventName, callback) {
        if(typeof listeners[eventName] === 'undefined') {
            listeners[eventName]=[];
        }
        listeners[eventName].push(callback);
    };
    Stork.unlisten=function(eventName, callbakc) {
        if (!listeners[eventName])
            return;
        
        for (var i = 0; i < listeners[eventName].length; i++) {
            if (listeners[eventName][i] === handler) {
                listeners.splice(i, 1);
                break;
            }
        }
    };
    
    function broadcast(eventName) {

        if (!listeners[eventName])
            return;

        for (var i = 0; i < listeners[eventName].length; i++) {
            listeners[eventName][i]();
        }
        
    }
})(this);

function loadProductData(productId, callback) {
    //
}

function renderWidget(targetDom, productData) {
    //
}
