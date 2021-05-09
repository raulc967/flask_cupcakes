$.get("http://127.0.0.1:5000/api/cupcakes", function(data){
    data.res.map(function(value, index, arr) {
        $("#get_all").append(`
            <div class="text-center">
                <h2 class="display-3 flavor ${value.id}">${value.flavor}</h2>
                <img src="${value.image}" width="200px" height="250px"><br>
                <h4 class="display-4">Rating: ${value.rating}</h4>
                <h4 class="display-4">Size: ${value.size}in</h4>
                <hr>
            </div>
        `);
    });
});


$("#get_all").on("click", ".flavor", function(e) {
    $.get(`http://127.0.0.1:5000/api/cupcakes/${e.target.classList[2]}`, function(data){
        $("#get_all").hide();
        $("#create_cupcake").hide();
        $("#get_one").append(`
            <div class="text-center">
                <h2 class="display-3">${data.flavor}</h2>
                <img src="${data.image}" width="300px" height="350px"><br>
                <h4 class="display-4">Rating: ${data.rating}</h4>
                <h4 class="display-4">Size: ${data.size}in</h4>
                <button class="btn btn-lg btn-primary"><a href="/">Go Back</a></button>
                <button class="btn btn-lg btn-danger ${data.id}" id="delete">Delete</button>
            </div>
            <div class="text-center">
                <form action="/api/cupcakes/${data.id}" method="POST">
                    <div class="form-group">
                        <label for="flavor">Flavor:</label>
                        <input class="form-control" type="text" name="flavor"><br>
                    </div>
                    <div class="form-group">
                        <label for="size">Size:</label>
                        <input class="form-control" type="number" name="size"><br>
                    </div>
                    <div class="form-group">
                        <label for="rating">Rating:</label>
                        <input class="form-control" type="range" name="rating"><br>
                    </div>
                    <div class="form-group">
                        <label for="image">Image:</label>
                        <input class="form-control" type="text" name="image"><br>
                    </div>
                    <button class="btn btn-primary">Submit</button>
                </form>
            </div>
        `);
    });
});

$("#get_one").on("click", "#delete", function(e) {
    $.ajax({
        url: `http://127.0.0.1:5000/api/cupcakes/${e.target.classList[3]}`,
        type: 'DELETE',
        success: function() {
            $("#get_all").show();
        }
    });
});