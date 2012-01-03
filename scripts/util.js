/*basic utils used in the js*/
// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
    log.history = log.history || []; // store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments));
    }
}

function getPieceName(pieceValue){
    switch (pieceValue) {
        case WHITE_KING: return 'WHITE_KING';
        case WHITE_QUEEN: return 'WHITE_QUEEN';
        case WHITE_ROOK: return 'WHITE_ROOK';
        case WHITE_BISHOP: return 'WHITE_BISHOP';
        case WHITE_KNIGHT: return 'WHITE_KNIGHT';
        case WHITE_PAWN: return 'WHITE_PAWN';
        
        case BLACK_KING: return 'BLACK_KING';
        case BLACK_QUEEN: return 'BLACK_QUEEN';
        case BLACK_ROOK: return 'BLACK_ROOK';
        case BLACK_BISHOP: return 'BLACK_BISHOP';
        case BLACK_KNIGHT: return 'BLACK_KNIGHT';
        case BLACK_PAWN: return 'BLACK_PAWN';
        
        default: return 'EMPTY';
    }
}

var onDrop = function(event, ui) {
            
    var parent = ui.draggable.parent();
    
    if(validateMove(currentPlayer, parent.data('square'), $(this).data('square'))){
        board[$(this).data('square')] = board[parent.data('square')];
        board[parent.data('square')] = 0;
        currentPlayer = (currentPlayer === 0) ? 8 : 0;
    }else{
        // don't touch the board.
    }
    
    setTimeout(function(){drawBoard(board);},50);
}

$(function(){
    drawBoard(board);
});

function drawBoard(board){
    var str = '';
    for( var i = 0 ; i < 128 ; i++ ){
        if( i % 8 === 0 ) {
            str += '<div class="row">';
        }
        
        if(! (i & 0x88) ) {
            str += '<div class="column ' +
            ( (i & 0x1) ^ ((i >> 4)  & 0x1) ? 'light': 'dark') +
            '" data-square="' + i + '">' +
            '<div class="' + getPieceName(board[i]) + '"></div>' +
            '</div>';
        }
        if( i % 8 === 0 ) {
            str += '</div>';
        }
    }

    $('#board').html(str);
    
    $( ".column" ).droppable({
        drop: onDrop
    });
    
    $( ".column div" ).draggable({ revert: 'invalid' });
}