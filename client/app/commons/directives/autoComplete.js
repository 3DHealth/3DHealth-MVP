/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
angular.module('myAPP',[]).directive('autoComplete',function($timeout) {
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function() {
                $timeout(function() {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
})