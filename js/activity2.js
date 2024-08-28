$(function() {

// Draggable items & droppable container
    let $draggableItems = $("#draggableItems");
    let $droppableContainer = $("#droppableContainer");

// Make food items draggable
   $(".draggable", $draggableItems).draggable({
    revert: "invalid", 
    // the item will come back to its original position if not dropped into the container
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

// Make container droppable
  $droppableContainer.droppable({
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function(event, ui) {
        ui.draggable.appendTo($droppableContainer)
    }
  });

});