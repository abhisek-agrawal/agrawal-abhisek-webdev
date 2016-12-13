(function () {
    angular
        .module("LifeDrops")
        .controller("NewPostController", NewPostController);

    function NewPostController($rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        function init() {
            var inputs = document.querySelectorAll('#file');
            Array.prototype.forEach.call( inputs, function( input ) {
                var label	 = input.nextElementSibling;
                var labelVal = label.innerHTML;

                input.addEventListener( 'change', function( e ) {
                    var fileName = '';
                    if( this.files && this.files.length > 1 )
                        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                    else
                        fileName = e.target.value.split( '\\' ).pop();

                    if( fileName )
                        label.querySelector( 'span' ).innerHTML = fileName;
                    else
                        label.innerHTML = labelVal;
                });
            });
        }
        init()
    }
})();