var Promise = require( 'es6-promise' ).Promise;

promo.Promise = Promise;
module.exports = promo;

function promo ( fn, context ) {
    if ( context === undefined && /this/.test( fn.toString() ) ) {
        console.warn( 'Function appears to reference `this` - you should pass in a context as the second argument' );
    }

    return function () {
        var args = toArray( arguments );

        return new Promise( function ( fulfil, reject ) {
            var callback = function ( err ) {
                var args;

                if ( err ) return reject( err );

                args = toArray( arguments );
                fulfil.apply( null, args.slice( 1 ) );
            };

            args.push( callback );
            fn.apply( context, args );
        });
    };
};

function toArray ( arrayLike ) {
    var arr = [], i = arrayLike.length;

    while ( i-- ) {
        arr[i] = arrayLike[i];
    }

    return arr;
}
