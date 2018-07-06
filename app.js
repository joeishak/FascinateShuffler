var column_sort_space = 10 //sets the space between the sorted columns of the squares
	;
let jsonData = [];
let filtered = false;

$(document).ready(function () {
    getData();

    
    //mill_squares.ChangeAlertValue("Mined");

    initiateBtns();

})

//Function to make a GET Request from the Infosol Fascination POC API Server
function getData() {
  $.get('http://vm3.infosol.com:8012',(data)=>{
    //Use this function to say how many rows you want to display
    console.log(data);
    filterRowCount(data,14);

  });
}

/**
 * 
 * @param {array} data Data from any source. Must be an Array. 
 * @param {int} max The maximum number of rows youd like to use for the DEMO.
 */
function filterRowCount(data,max){
    
    let numberInBetween = (data.length/max) ;
    console.log('Number in Between',numberInBetween);
    let nextRow = 0 ;
    let indexesToUse = [];
    for(let i = 0; i<= max; i++){
        console.log("Iteration ",i+1);
        switch(i){
            case 0:
                console.log('First Record');
                // indexesToUse.push(nextRow);
                nextRow = nextRow+ numberInBetween;
                console.log(nextRow);
            break;
            default: 
                console.log('Record before iff',nextRow);
                    nextRow = nextRow +numberInBetween;
                    indexesToUse.push(nextRow);
                    
            break;
        }
    }
   for(let i =0 ; i< indexesToUse.length;i++){
       jsonData.push(data[indexesToUse[i]]);
   }

    console.log("Here is the filtered data", jsonData);
    mill_squares = new Squares("#lv");
}
/*function beginApp() {

    mill_squares = new Squares("#lv");

    initiateBtns();
}
*/
var Squares = function(id, options) {
    var self = this;

    self.id = id;
    self.options = options || {};

    self._templateID = self.options.templateID || "mill_squares_template";
    self._displayMode = self.options.displayMode || "sortedBlocks";
    self._bgColor = self.options.bgColor || "transparent";
    self._blockMaxRows = self.options.blockMaxRows || 6;
    self._blockColumnWidth = self.options.blockColumnWidth || 177;
    self._blockRowHeight = self.options.blockRowHeight || 120;
    self._width = self.options.width || 768;
    self.column_sort_space = self.options.column_sort_space || column_sort_space;

    self._blockSortOptions = {
        a: "Organization",
        b: "Gender",
        c: "archetype"
    };

    self._blockSort = self.options.blockSort || self._blockSortOptions.a+","+self._blockSortOptions.b+","+self._blockSortOptions.c;

    self._alert_value = self.options.alert_value || "Mined";

    self.drill_options = {
        expanded: false,
        storedCSS: 0,
        storedTransform: 0
    };


    self._alert_colors = {
        best: "green",
        middle: "yellow",
        worst: "red"
    };

    self.drawSquares();
};


Squares.prototype.drawSquares = function() {
    var self = this;

    self.squares = $(self.id).kendoIBEListView({
        local: true,
        localData: jsonData,
        templateID: self._templateID,
        displayMode: self._displayMode,
        //displayMode: "tile",
        bgColor: self._bgColor,
        blockSort: self._blockSort,
        blockMaxRows: self._blockMaxRows,
        blockColumnWidth: self._blockColumnWidth,
        blockRowHeight: self._blockRowHeight,
        width:self._width,
        onSelect: function(sel) {
            
            self.expandSquare(sel);
                
        }
    }).data("kendoIBEListView");
};


Squares.prototype.expandSquare = function(e) {
    var self = this;

    if(self.drill_options.expanded===false){

        self.drill_options.storedCSS = $("[data-uid='" + e.uid +"']").css([
            "width", "height", "position", "z-index", "-webkit-transform", "border-color"
        ]);

        self.drill_options.storedTransform = self.drill_options.storedCSS[0].style.webkitTransform;
        self.drill_options.storedWidth = self.drill_options.storedCSS[0].style.width;
        self.drill_options.storedHeight = self.drill_options.storedCSS[0].style.height;
        self.drill_options.storedColor = self.drill_options.storedCSS[0].style.borderColor;

        $("[data-uid='" + e.uid +"']").css({
            
            "-webkit-transition": "width .3s, height .3s, -webkit-transform .36s",
            "-ms-transition": "width .4s, height .4s, -ms-transform .4s",
            "transition": "width .4s, height .4s, transform .4s",
            "width": "100vw",
            "height": "91%",
            "position":"relative",
            "z-index":"15",
            "-webkit-transform":"translate(0px, 0px)",
            "-ms-transform":"translate(0px,0px)",
            "transform": "translate(0px,0px)",
            "border-width": "25px",
            "border-top-width": "25px",
            "background-color": "white"
        });

        $("[data-uid='" + e.uid +"']").children().css({
            "visibility": "visible"
        });

        self.drill_options.expanded=true;
    }else{
        $("[data-uid='" + e.uid +"']").css({
            "-webkit-transition": "width .3s, height .3s, -webkit-transform .3s, z-index 3s",
            "-ms-transition": "width .4s, height .4s, -ms-transform .4s, z-index 4s",
            "transition": "width .4s, height .4s, transform .4s, z-index 4s",
            "width": self.drill_options.storedWidth,
            "height": self.drill_options.storedHeight,
            "position":"absolute",
            "z-index":"0",
            "top":"0",
            "left":"0",
            "border-width": "2px",
            "background-color": self.drill_options.storedColor,
            "-webkit-transform": self.drill_options.storedTransform,
            "-ms-transform": self.drill_options.storedTransform,
            "transform": self.drill_options.storedTransform
        });

        $("[data-uid='" + e.uid +"']").children().css({
            "visibility": "visible"
        });


        setTimeout(function(){
            $("[data-uid='" + e.uid +"']").css({
                "z-index":"0"
            });
        },3000);

        self.drill_options.expanded=false;
    }
            
};
function changeGenderStatus() {
        if(filtered){
            document.getElementById('listviewSort2').disabled = true;
            $(`#listviewSort2`).css({
                "border": "none",
                "background-color": "#grey",
                "color":"grey" })
        } else {
            document.getElementById('listviewSort2').disabled = false;
            $(`#listviewSort2`).css({
                "border": "none",
                    "background-color": "#f7c051",
                    "color":"black" })
        }
}

function initiateBtns() {

    $(".sortButtons").click(function(e) {
        var sort = e.target.id;
        if (sort === "listviewSort1"){
            mill_squares.squares.applySort(mill_squares._blockSortOptions.a);
        } else if (sort === "listviewSort2") {
            mill_squares.squares.applySort(mill_squares._blockSortOptions.b);
        } else if (sort === "listviewSort3") {
            mill_squares.squares.applySort(mill_squares._blockSortOptions.c);
        }
            
    });
    $('.sortButtons').hover(
        //Hover Over
            (element)=>{
                $(`#${element.currentTarget.id}`).css({
                    "border": "2px solid #f7c051",
                    "background-color": "#2c2d2d",
                    "color":"#f7c051" })},
        //Hover Off
            (element)=>{
                $(`#${element.currentTarget.id}`).css({
                    "border": "none",
                    "background-color": "#f7c051",
                    "color":"black" })
            }
    );

    $('.filterButtons').hover(
        //Hover Over
            (element)=>{
                $(`#${element.currentTarget.id}`).css({
                    "border": "2px solid #f7c051",
                    "background-color": "#2c2d2d",
                    "color":"#f7c051" })},
        //Hover Off
            (element)=>{
                $(`#${element.currentTarget.id}`).css({
                    "border": "none",
                    "background-color": "#f7c051",
                    "color":"black" })
            }
    );
    $(".filterButtons").click(function(e) {
        var filter = e.target.defaultValue;
        if (filter === "Clear Filter") {
            mill_squares.squares.clearFilter();
            filtered = false;
            changeGenderStatus();
        } else {
            mill_squares.squares.applyFilter("." + filter);
            filtered = true;
            changeGenderStatus();
            
        }
    });

   
    /*$(".alertButtons").click(function(e) {
        var alertValueSelected = e.target.defaultValue,
            millSquaresData = mill_squares.squares.getData(),
            top,
            middle,
            bottom,
            comparedValue;


        if(alertValueSelected === "Mined"){
            top = "A";
            middle = "B";
            bottom = "C";
            comparedValue = "TestCat";
            mill_squares.ChangeAlertValue(millSquaresData, top, middle, bottom, comparedValue);
        }else {
            console.log("No Data");
        }


        
    });*/
}

/*Squares.prototype.ChangeAlertValue = function(squaresData, top, middle, bottom, comparedValue) {
    var self = this;

    for (i=0; i<squaresData.length; i++){
        var squareID = squaresData[i].uid;

        if(squaresData[i][comparedValue] === top) {
            $("[data-uid='" + squareID + "']").removeClass("bestAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("middleAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("worstAlertValue");
            $("[data-uid='" + squareID + "']").addClass("bestAlertValue");
        }else if(squaresData[i][comparedValue] === middle) {
            $("[data-uid='" + squareID + "']").removeClass("bestAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("middleAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("worstAlertValue");
            $("[data-uid='" + squareID + "']").addClass("middleAlertValue");
        }else {
            $("[data-uid='" + squareID + "']").removeClass("bestAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("middleAlertValue");
            $("[data-uid='" + squareID + "']").removeClass("worstAlertValue");
            $("[data-uid='" + squareID + "']").addClass("worstAlertValue");
        }

    }


};*/

/*function changeAlertClass(top, middle, bottom) {
    $( ".ibe-listview-item" ).addClass(function( index, currentClass ) {
        var addedClass;
 
        if ( $("[data-mpgrange='" + top +"']")) {
            //$("[data-mpgrange='" + top +"']").removeClass("mpgrange2");
            addedClass = "bestAlertValue";
        }else if ($("[data-mpgrange='" + middle +"']")) {
            addedClass = "middleAlertValue";
        }
     
        return addedClass;
        });
}*/




