$(function () {
    let winSellIndex = [

        //horizontal:
        [0,1,2],[3,4,5],[6,7,8],
        //vertical:
        [0,3,6],[1,4,7],[2,5,8],
        //diagonal:
        [0,4,8],[2,4,6]
    ]

    let selectedCells = {//выбранные пользователем ячейки
        'x':[],
        'o':[]
    }
    let player = 'x'

    $('.wrap').on('click','.cell:not(".cell-x,cell-o")',oneStep)

    function oneStep(event) {
        let $cell = $(event.currentTarget)// тот элемент, по которому кликнули
        $cell.addClass('cell-' + player + ' offset-' + player)

        let indexCell = $('.wrap .cell').index($cell)//порядковый номер того элемента, по которому кликнул пользователь
        let selectedCellsPlayer = selectedCells[player]
        selectedCellsPlayer.push(indexCell)

        checkWinner(selectedCellsPlayer)


        if (player === 'x') {
            player = 'o'
        } else {
            player = 'x'
        }
    }


        function checkWinner(selectedCellsPlayer) {
            for (let i=0;i<winSellIndex.length;i++){
                let allWinCells = true
                for(let j = 0; j < winSellIndex[i].length; j++) {
                    if ($.inArray(winSellIndex[i][j],selectedCellsPlayer) === -1){
                        allWinCells = false
                    }
                }
                if(allWinCells) {
                    alert('Player ' + player + ' win!!!')
                    $('.cell').each(function (ind,elem) {
                        if ($.inArray(ind,winSellIndex[i]) !== -1){
                            var cl = 'win'
                            if( i <= 2 )
                                cl += '0'
                            else if(i >= 3 && i<= 5)
                                cl += '1'
                            else
                                cl += ($.inArray(0,winSellIndex[i])) ? '2' : '3'
                        }
                        cl += " offset-"+player
                        $(this).addClass(cl)

                    })
                    $('.wrap').off('click')
                }
                if(!allWinCells && $('.cell:not(".cell-x,.cell-o")').length === 0) {
                    alert('Ходов больше нет!')
                    $('.wrap').off('click')
                    break
                }
            }
            }

})