    var sourceBoardDraggedItemIndex;

    const boards = [{
            "id": "board-id-1", // id of the board
            "title": "Board Title", // title of the board
            "class": "success", // css classes to add at the title
            "dragTo": ['board-id-2', 'board-id-3', 'board-id-4'], // array of ids of boards where items can be dropped (default: [])
            "item": [ // item of this board
                {
                    "id": "item-id-1", // id of the item
                    "title": ` <div class="d-flex align-items-center">
                        <div class="mr-3">
                            <img alt="Pic" src="https://www.smallworldfs.com/assets/www/pictures/s-wapp-icon@3x.png" width="50" />
                        </div>
                        <div class="d-flex flex-column align-items-start">
                            hola                               
                        </div>
                    </div>
                    <a href="#" class="">este es un link</a>
                `, // title of the item
                    "class": ["myClass"], // array of additional classes
                },
                {
                    "id": "item-id-2",
                    "title": "Item 2"
                },
                {
                    "id": "item-id-3",
                    "title": "Item 3"
                }
            ]
        },
        {
            "id": "board-id-2",
            "title": "Board Title 2"
        },
        {
            "id": "board-id-3",
            "title": "Board Title 3"
        },
        {
            "id": "board-id-4",
            "title": "Board Title 4"
        },
    ];

    var kanban = new jKanban({
        element: '#myKanban', // selector of the kanban container
        gutter: '15px', // gutter of the board
        widthBoard: '450px', // width of the board
        responsivePercentage: true, // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
        dragItems: true, // if false, all items are not draggable
        boards: boards, // json of boards
        dragBoards: true, // the boards are draggable, if false only item can be dragged
        itemAddOptions: {
            enabled: true, // add a button to board for easy item creation
            content: '+', // text or html content of the board button   
            class: 'kanban-title-button btn btn-default btn-xs', // default class of the button
            footer: false // position the button on footer
        },
        itemHandleOptions: {
            enabled: false, // if board item handle is enabled or not
            handleClass: "item_handle", // css class for your custom item handle
            customCssHandler: "drag_handler", // when customHandler is undefined, jKanban will use this property to set main handler class
            customCssIconHandler: "drag_handler_icon", // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
            customHandler: "<span class='item_handle'>+</span> %title% " // your entirely customized handler. Use %title% to position item title 
                // any key's value included in item collection can be replaced with %key%
        },
        click: function(el) {
            console.log('element clicked');
        }, // callback when any board's item are clicked
        context: function(el, event) {}, // callback when any board's item are right clicked
        dragEl: function(el, source) {
            let sourceBoardId = source.parentElement.dataset.id;
            let sourceBoardItems = Array.from(kanban.getBoardElements(sourceBoardId));
            sourceBoardDraggedItemIndex = sourceBoardItems.indexOf(el);
        }, // callback when any board's item are dragged
        dragendEl: function(el) {
            console.log('dragendEl');
        }, // callback when any board's item stop drag
        dropEl: function(el, target, source, sibling) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Esta seguro mover a ${target.parentElement.children[0].children[0].innerText}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, mover!',
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Agregado!',
                        'Your file has been deleted.',
                        'success'
                    )
                } else {
                    const board = kanban.element.querySelector(
                        '[data-id="' + source.offsetParent.getAttribute('data-id') + '"] .kanban-drag'
                    )
                    const refElement = board.childNodes[sourceBoardDraggedItemIndex]
                    board.insertBefore(el, refElement)
                }
            })
        }, // callback when any board's item drop in a board
        dragBoard: function(el, source) {}, // callback when any board stop drag
        dragendBoard: function(el) {}, // callback when any board stop drag
        buttonClick: function(el, boardId) {
            console.log('buttonClick');
        }, // callback when the board's button is clicked
        propagationHandlers: [], // the specified callback does not cancel the browser event. possible values: "click", "context"
    })