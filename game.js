var gameOfLife = {

  width: 12,
  height: 12, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  createAndShowBoard: function () {

    // create <table> element
    var goltable = document.createElement("tbody");

    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    for (var i=0; i < this.width; i++) {
      for (var j=0; j < this.height; j++) {
        iteratorFunc(document.getElementById(i + "-" + j), i, j)
        // var idCoord = document.getElementById("id")
        // console.log("idCoord", idCoord)
        var coord=[i,j]
        console.log(coord)
      }
    }
  },

  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

    var onCellClick = function (e) {

      // QUESTION TO ASK YOURSELF: What is "this" equal to here?

      // how to set the style of the cell when it's clicked
      if (this.dataset.status == 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      }
    };

    // var cell00 = document.getElementById('0-0');
    // cell00.addEventListener('click', onCellClick);
    this.forEachCell(cell => {
      cell.addEventListener('click', onCellClick);
      console.log("cell", cell)
      this.step(cell)
    })
      
    
      
      var clearBtn = document.getElementById('clear_btn');
      
      clearBtn.addEventListener('click', () => {
        console.log('clicked'); 
        this.forEachCell(cell => {
            cell.className = 'dead'; 
            cell.dataset.status = 'dead';
            
        })
      })

      
      
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    this.forEachCell(cell => {
      var neighbors = []; 
      var coord = cell.id.split('-').map(Number);
      for (var a = coord[0]-1; a < coord[0]+1; a++) {
        console.log("current coord",a, b); 
        for (var b = coord[1]-1; b < coord[1]+1; b++) {
          if (a === coord[0] && b === coord[1]) {
            continue;
          }
          var currentEl = document.getElementById(a + '-' + b);
            console.log(currentEl); 
          if (currentEl) {
            neighbors.push(currentEl)
          }
        }
      }
      console.log("neighbors", neighbors)
    })
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
  }

};

gameOfLife.createAndShowBoard();
