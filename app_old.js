var lv,
    columnSpace = 0, //adjust space between sorted blocks of squares
    expanded = false, //binary variable to determined if a square is expanded or none
    storedCSS, //used to store information on selected square
    storedTransform //used to get original position of a selected square
	;


//Test Data////////
var lvItems = [
    { carclass:"Truck", mpg:21, mpgrange:1, brand:"Honda", carline:"A" },
    { carclass:"Coupe", mpg:23, mpgrange:1, brand:"Toyota", carline:"B" },
    { carclass:"Sedan", mpg:21, mpgrange:1, brand:"Ford", carline:"C" },
    { carclass:"Coupe", mpg:27, mpgrange:2, brand:"Honda", carline:"D" },
    { carclass:"Jeep", mpg:23, mpgrange:1, brand:"Chevy", carline:"E" },
    { carclass:"Truck", mpg:27, mpgrange:2, brand:"Toyota", carline:"F" },
    { carclass:"Coupe", mpg:21, mpgrange:1, brand:"GM", carline:"G" },
    { carclass:"Sedan", mpg:27, mpgrange:2, brand:"Honda", carline:"H" },
    { carclass:"Coupe", mpg:27, mpgrange:2, brand:"GM", carline:"I" },
    { carclass:"Truck", mpg:21, mpgrange:1, brand:"Chevy", carline:"J" },
    { carclass:"Jeep", mpg:25, mpgrange:2, brand:"GM", carline:"K" },
    { carclass:"Coupe", mpg:23, mpgrange:1, brand:"Honda", carline:"L" },
    { carclass:"Truck", mpg:27, mpgrange:2, brand:"Ford", carline:"M" },
    { carclass:"Sedan", mpg:21, mpgrange:1, brand:"Toyota", carline:"N" },
    { carclass:"Jeep", mpg:27, mpgrange:2, brand:"GM", carline:"O" },
    { carclass:"Coupe", mpg:23, mpgrange:1, brand:"Honda", carline:"P" },
    { carclass:"Truck", mpg:21, mpgrange:1, brand:"GM", carline:"Q" },
    { carclass:"Sedan", mpg:27, mpgrange:2, brand:"Toyota", carline:"R" },
    { carclass:"Coupe", mpg:25, mpgrange:2, brand:"Ford", carline:"S" },
    { carclass:"Sedan", mpg:21, mpgrange:1, brand:"Chevy", carline:"T" },
    { carclass:"Truck", mpg:27, mpgrange:2, brand:"Honda", carline:"U" },
    { carclass:"Sedan", mpg:27, mpgrange:2, brand:"GM", carline:"V" },
    { carclass:"Coupe", mpg:21, mpgrange:1, brand:"Toyota", carline:"W" },
    { carclass:"Truck", mpg:27, mpgrange:2, brand:"Honda", carline:"X" },
    { carclass:"Sedan", mpg:25, mpgrange:2, brand:"GM", carline:"Y" },
    { carclass:"Coupe", mpg:21, mpgrange:1, brand:"Ford", carline:"Z" },
    { carclass:"Coupe", mpg:27, mpgrange:2, brand:"Chevy", carline:"AA" },
    { carclass:"Truck", mpg:25, mpgrange:2, brand:"Honda", carline:"AB" },
    { carclass:"Coupe", mpg:27, mpgrange:2, brand:"Chevy", carline:"AC" },
    { carclass:"Truck", mpg:21, mpgrange:1, brand:"Toyota", carline:"AD" },
    { carclass:"Sedan", mpg:25, mpgrange:2, brand:"Honda", carline:"AE" },
    { carclass:"Sedan", mpg:21, mpgrange:1, brand:"Ford", carline:"AF" },
    { carclass:"Truck", mpg:27, mpgrange:2, brand:"Honda", carline:"AG" },
    { carclass:"Coupe", mpg:25, mpgrange:2, brand:"Toyota", carline:"AH" }
];
///////////


function beginApp() {

    initiateSquares();
    sortButton();
    filterButton();

}

function initiateSquares() {

    lv = $("#lv").kendoIBEListView({
        local: true,
        localData: lvItems,
        templateID: "t_car",
        displayMode: "sortedBlocks",
        //displayMode: "tile",
        bgColor: "transparent",
        //bgColor: "white",
        //blockSort: "brand, carclass, mpgrange",
        blockSort: "brand,mpgrange,carclass",
        blockMaxRows: 5,
        blockColumnWidth: 110,
        blockRowHeight: 110,
        width:768,
        onSelect: function(sel) {
            
            if(expanded===false){

                storedCSS = $("[data-uid='" + sel.uid +"']").css([
                    "width", "height", "position", "z-index", "-webkit-transform"
                ]);

                storedTransform = storedCSS[0].style.webkitTransform;

                $("[data-uid='" + sel.uid +"']").css({
                    
                    "-webkit-transition": "width .4s, height .4s, -webkit-transform .4s",
                    "-ms-transition": "width .4s, height .4s, -ms-transform .4s",
                    "transition": "width .4s, height .4s, transform .4s",
                    "width": "1016px",
                    "height": "696px",
                    "position":"fixed",
                    "z-index":"10",
                    "-webkit-transform":"translate(0px, 0px)",
                    "-ms-transform":"translate(0px,0px)",
                    "transform": "translate(0px,0px)"
                });

                $("[data-uid='" + sel.uid +"']").children().css({
                    "visibility": "hidden"
                });

                expanded=true;
            }else{
                $("[data-uid='" + sel.uid +"']").css({
                    "-webkit-transition": "width .4s, height .4s, -webkit-transform .4s, z-index 4s",
                    "-ms-transition": "width .4s, height .4s, -ms-transform .4s, z-index 4s",
                    "transition": "width .4s, height .4s, transform .4s, z-index 4s",
                    "width": "100px",
                    "height": "100px",
                    "position":"absolute",
                    "z-index":"0",
                    "top":"0",
                    "left":"0",
                    "-webkit-transform":storedTransform,
                    "-ms-transform":storedTransform,
                    "transform": storedTransform
                });

                $("[data-uid='" + sel.uid +"']").children().css({
                    "visibility": "visible"
                });

                setTimeout(function(){
                    $("[data-uid='" + sel.uid +"']").css({
                        "z-index":"0"
                    });
                },3000);

                expanded=false;
            }
                
        }
    }).data("kendoIBEListView");
}
    


function sortButton() {
    $(".sortButtons").click(function(e) {
        var sort = e.target.id;
        if (sort === "listviewSortClass"){
            lv.applySort("carclass");
        } else if (sort === "listviewSortBrand") {
            lv.applySort("brand");
        } else if (sort === "listviewSortMPG") {
            lv.applySort("mpgrange");
        }
            
    });
}
    


function filterButton() {
    $(".filterButtons").click(function(e) {
        var filter = e.target.defaultValue;
        if (filter === "Clear Filter") {
            lv.clearFilter();
        } else {
            lv.applyFilter("." + filter);
        }
    });
}



