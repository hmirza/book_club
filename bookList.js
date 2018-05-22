
function ShowOverlay() {
    document.getElementById("overlay").style.display = "flex";
}

function HideOverlay2() {
    document.getElementById("overlay2").style.display = "none";
}

function HideOverlay() {
    document.getElementById("overlay").style.display = "none";

    console.log(document.getElementById("author").value);
    console.log(document.getElementById("title").value);
    console.log(document.getElementById("ISBN").value);
    // document.getElementById("author").value = "";
    // document.getElementById("title").value = "";
    // document.getElementById("ISBN").value = "";


    //clear overlay
    while (document.getElementById("id_overlay_inner").hasChildNodes()) {
        document.getElementById("id_overlay_inner").removeChild(document.getElementById("id_overlay_inner").lastChild);
    }
}

function NewTile() {

    var tiles = document.getElementById("border_tile_region");
    var inner_overlay = document.getElementById("id_overlay_inner");
    var divs = inner_overlay.getElementsByTagName("div");
    var newTile = document.createElement("div");
    var newButton = document.createElement("button");

    newTile.className = "flex_container";
    newTile.id = "tile"  + tiles.children.length;

    newButton.type = "button";
    newButton.className = "tile_delete_button_class"
    newButton.id = "tile_delete_button" + tiles.children.length;

    newButton.textContent = "ⓧ";
    /* Very important: onclick is all lowercase here;
                       onClick is a totally different name! */
    newButton.onclick = function() {
    tiles.removeChild(newTile);
  };



    newTile.appendChild(newButton);
    // items.appendChild( document.createElement("br") );








    for (var i = 0; i < divs.length; i++) {
        if(divs[i].style.display == 'block') {


              myThumnail = newTile.appendChild(divs[i]);
              myAuthor = newTile.appendChild(divs[i+1]);
              myDescription = newTile.appendChild(divs[i+2]);


              myThumnail.id = "tile_Thumbnail" + tiles.children.length;
    myAuthor.id = "tile_Author" + tiles.children.length;
    myDescription.id = "tile_Description" + tiles.children.length;
          }

    }




    //Creating the tiles and the elements within the tile such as the author, title, ISBN

    //Adding tiles to the border tile region
    tiles.appendChild(newTile);







    HideOverlay();





}

function LogContents(source) {
    var textBox = document.getElementById(source);
    console.log(source + " says " + textBox.value);
}

function GetNeuromancer() {
    /* Not covered in discussion:
        We don't want these to accumulate in our HTML document as we make
        successive requests, so we attach an ID to our script and start out
        by looking for a previously-added script and removing it.
    */
    var script = document.getElementById("JSONP")
    if (script) {
        document.body.removeChild(script);
    }

    script = document.createElement('script');
    script.id = "JSONP";
    script.src = "https://www.googleapis.com/books/v1/volumes?q=Neuromancer&callback=handleResponse";

    document.body.appendChild(script);

}


function user_request(first_try)
{
    //Hide left button on display
    document.getElementById('left_arrow').style.visibility = 'hidden';

    //If first try flag, then grab variables from previous page
    if (first_try == '1') {
        query = getQuery("1");

        //If refresh
        if (performance.navigation.type == 1) {
            location.href = 'bookList.html';
            // return;
        }
    }
    //Get them from input on tile page
    else {
        if (document.getElementById("author").value == '' && document.getElementById("title").value == '' &&  document.getElementById("ISBN").value == '') {
            display_not_found();
            return;
        }
        query = getQuery();

        // console.log(document.getElementById("author").value);
        // console.log(document.getElementById("title").value);
        // console.log(document.getElementById("ISBN").value);
    }

    var id_counter;

    //Check if new search has already been searched
    var script = document.getElementById(id_counter)
    if (script) {
        document.body.removeChild(script);
        console.log("ANOTHER ONE!");
    }


    script = document.createElement('script');
    script.id = id_counter;
    script.src = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&callback=user_request.handleResponseM";
    document.body.appendChild(script);

    // num_items = 10;
    user_request.handleResponseM = function (response) {
        //Access overlay inner box


       // console.log(response.items.length);
       console.log(response);

       if (response.totalItems == 0) {
           console.log('query not found');
           HideOverlay();
           display_not_found();
           return;
       }

       //Display overlay
       ShowOverlay();

       var inner_overlay = document.getElementById("id_overlay_inner");

       //Clear overlay
       clear_inner_overlay(inner_overlay);
       //Dynamically create html
       for (i = 0; i < response.items.length; i++) {
           console.log(i);

           //Creates elements
           var author = document.createElement("div");
           var description = document.createElement("div");
           var thumbnail_wrapper = document.createElement("div");
           var thumbnail = document.createElement("img");
           var title = document.createElement("div");
           var second_container = document.createElement("div");


           //Set contents
           title.textContent = response.items[i].volumeInfo.title;
           author.textContent = "by " + response.items[i].volumeInfo.authors;

           var desc = String(response.items[i].volumeInfo.description);
           desc = desc.split(" ");
           var smallDesc = desc.slice(0,15).join(" ");
           var full = smallDesc + '...';

           description.textContent = full;


           //TODO: display a box when notheing exists
           //Handle for when there is no picture
           if (response.items[i].volumeInfo.imageLinks == null) {
               thumbnail.alt = 'No image';
               // thumbnail.src = 'No Image';
               console.log('NO IMAGE');
           } else {
               thumbnail.src = response.items[i].volumeInfo.imageLinks.thumbnail;
           }


           //Set ID's
           title.id = "title_inner_overlay" + i;
           author.id = "author_inner_overlay" + i;
           description.id = "description_inner_overlay" + i;
           thumbnail.id = "thumbnail_inner_overlay" + i;
           thumbnail_wrapper.id = 'id_thumbnail_wrapper' + i;
           second_container.id = "id_second_container" + i;

           //Set Class Names
           title.className = "title_inner_overlay";
           author.className = "author_inner_overlay";
           description.className = "description_inner_overlay";
           second_container.className = "second_container";
           // thumbnail.className = "thumbnail_inner_overlay";
           thumbnail_wrapper.className = 'id_thumbnail_wrapper';


           //Add two containers
           inner_overlay.appendChild(thumbnail_wrapper);
           thumbnail_wrapper.appendChild(thumbnail);

           inner_overlay.appendChild(second_container);

           //Fill second container
           second_container.appendChild(title);
           second_container.appendChild(author);
           second_container.appendChild(description);

           // console.log(second_container);
           // console.log(thumbnail);

           document.getElementById(description.id).style.display = "block";
           document.getElementById(title.id).style.display = "block";
           document.getElementById(author.id).style.display = "block";
           document.getElementById(second_container.id).style.display = "block";
           document.getElementById(thumbnail_wrapper.id).style.display = "block";

           // thumbnail_wrapper.appendChild(thumbnail);



           //hide items
           if (i > 0) {
               document.getElementById(description.id).style.display = "none";
               document.getElementById(title.id).style.display = "none";
               document.getElementById(author.id).style.display = "none";
               document.getElementById(second_container.id).style.display = "none";
               document.getElementById(thumbnail_wrapper.id).style.display = "none";
           }
       }
    }
}




//Clears the overlay box when multiple searches in the same session
function clear_inner_overlay(inner_overlay)
{
    //clear thumbnail
    if (document.getElementById("thumbnail_inner_overlay")) {
        inner_overlay.removeChild(document.getElementById("thumbnail_inner_overlay"));
    }

    if (document.getElementById("description_inner_overlay")) {
        document.getElementById("id_second_container").removeChild(document.getElementById("description_inner_overlay"));
    }

    if (document.getElementById("title_inner_overlay")) {
        document.getElementById("id_second_container").removeChild(document.getElementById("title_inner_overlay"));
    }

    if (document.getElementById("author_inner_overlay")) {
        document.getElementById("id_second_container").removeChild(document.getElementById("author_inner_overlay"));
    }

    if (document.getElementById("id_second_container")) {
        inner_overlay.removeChild(document.getElementById("id_second_container"));
    }

}

//Function to get the user input from search bars
function getQuery(first_load_flag)
{
    if (first_load_flag == '1') {
        var author = localStorage.getItem("myAuthor");
        var title = localStorage.getItem("myTitle");
        var isbn = localStorage.getItem("myISBN");
    }
    else {
        var author = document.getElementById("author").value;
        var title = document.getElementById("title").value;
        var isbn = document.getElementById("ISBN").value;
    }

    if (document.getElementById("author").value) {
        author = author.trim();
        author = author.replace(/ /g, "+");
    }

    if (document.getElementById("title").value) {
        title = title.trim();
        title = title.replace(/ /g, "+");
    }

    if (document.getElementById("ISBN").value) {
        isbn = isbn.trim();
        isbn = isbn.replace(/-/g, "");
    }

    var query = ["",title,author,isbn].reduce(fancyJoin);
    console.log(query);
    return query;
}

//Trims function
function trimDescription(description)
{
    if (description) {
        console.log(description);
        ShortDescription = description.split(" ");
        Block = "";
        for(i = 0; i <20; i++){
            Block =  Block + " " + ShortDescription[i]
        }
        Block = Block + "..."
        return Block;
    }
    else {
        return "No Description Available";
    }



}
//MIGHT need this function.. I'll just leave it here for now. It's broken right now - need to fix the loop
function trimTitle(title)
{
    ShortTitle = title.split(" ");
    Block = "";
    if(ShortTitle.length>=5){
    for(i = 0; i<5; i++){
        Block =  Block + " " + ShortTitle[i]
    }
    }
        Block = Block + title + "...";

    // Block = Block + "..."

    return Block;
}



function arrow(direction) {
    var inner_overlay = document.getElementById("id_overlay_inner");
    var num_id = 0;
    var max_items = parseInt(inner_overlay.lastChild.id.slice(-1));

    var divs = inner_overlay.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        if(divs[i].style.display == 'block') {

            //Cast to Int
            num_id = parseInt(divs[i].id.slice(-1));
            if (direction == 'right') {
                num_id = num_id + 1;
                document.getElementById(divs[i].id).style.display = 'none';
            }

            if (direction == 'left') {
                num_id = num_id - 1;
                document.getElementById(divs[i].id).style.display = 'none';
            }
        }
    }

    if (num_id == max_items) {
        document.getElementById('right_arrow').style.visibility = 'hidden';
        document.getElementById('id_second_container' + String(num_id)).style.display = 'block';
        document.getElementById('title_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('author_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('description_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('id_thumbnail_wrapper' + String(num_id)).style.display = 'block';

    } else {
        document.getElementById('right_arrow').style.visibility = 'visible';
        document.getElementById('left_arrow').style.visibility = 'visible';

        if (num_id == 0) {
            console.log('first element');
            document.getElementById('left_arrow').style.visibility = 'hidden';
        }

        document.getElementById('id_second_container' + String(num_id)).style.display = 'block';
        document.getElementById('title_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('author_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('description_inner_overlay' + String(num_id)).style.display = 'block';
        document.getElementById('id_thumbnail_wrapper' + String(num_id)).style.display = 'block';
    }
}

function fancyJoin(a,b) {
    if (a == "") { return b; }
    else if (b == "") { return a; }
    else { return a+"+"+b; }
}

function landing_page_redirect()
{
    localStorage.setItem('myAuthor', document.getElementById("author").value);
    localStorage.setItem('myTitle', document.getElementById("title").value);
    localStorage.setItem('myISBN', document.getElementById("ISBN").value);
    location.href = 'tile_page.html';
}

function data_to_tiles()
{
        // åvar tiles = document.getElementById("border_tile_region");
    var inner_overlay = document.getElementById("id_overlay_inner");
    var divs = inner_overlay.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        if(divs[i].style.display == 'block') {
            // THIS PRINTS OUT ALL THE HTML IN THE OVERLAY AT THE TIME
            console.log(divs[i]);
        }
    }
}

function display_not_found()
{
    var message = document.createElement("div");
    message.id = 'book_not_found';



    document.getElementById('overlay2').style.display = 'flex';

    document.getElementById('overlay2').appendChild(message);
    console.log(document.getElementById("author").value);
    console.log(document.getElementById("title").value);
    console.log(document.getElementById("ISBN").value);
    // message.appendChild(document.getElementById("author").value);



}
