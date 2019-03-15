document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
    // alert("Device is Ready");
}

// index.html----------------
 $(document).ready(function(){

    var displayAllstoragesListed = "displayAllstoragesListed";

            $.ajax({
                url:"http://localhost/phonegap/fetch.php",
                method:"post",
                data:{displayAllstoragesListed:displayAllstoragesListed},
                success:function(data){
                    $("#displayAllstoragesListed").html(data);
                }
            })
        })

        function seachValue(search_value){
            $.ajax({
                url:"http://localhost/phonegap/search.php",
                method:"post",
                data:{search_value:search_value},
                beforeSend:function(){

                },
                success:function(data){

                }
            })
        }
// end of index.html--------

 //----- Starting of addproperty.html Validating and Posting of Items to the database
        $(document).ready(function(){
            $(".confirm_details").css("display","none");
            $("#confirm_storage").css("display", "none");
            $("#post_storage").click(function(event){
                event.preventDefault();
                // alert("hello");
                var storage_image = $("#storage_image").val();
                var storage_type = $("#storage_type").val();
                var storage_dimension = $("#storage_dimension").val();
                var storage_features = $("#storage_features").val();
                var storage_rent = $("#storage_rent").val();
                var storage_location = $("#storage_location").val();
                var storage_other_details = $("#storage_other_details").val();
                var user_phone = $("#user_phone").val();
                var username = $("#username").val();
                if(storage_image == ""){
                    $("#allErrors").html("<span style='color:red'>Select Image</span>");
                    return false;
                }else if ($("#storage_type").val() == "") {
                    $("#allErrors").html("<span style='color:red'>Select Storage Type</span>");
                    return false;
                }else{
                    $("#allErrors").html("");
                }
                if ($("#storage_dimension").val() == "") {
                    $("#allErrors").html("<span style='color:red'>Select Storage Dimensions</span>");
                    return false;
                }else{
                    $("#allErrors").html("");
                }

                var checkbox = document.querySelector('input[name="storage_features[]"]:checked');
                if(!checkbox) {
                    $("#allErrors").html("<span style='color:red'>Please Tick At-least One Feature!</span>");
                    return false;
                }else{
                    $("#allErrors").html("");
                }
                if ($("#storage_location").val() == "") {
                    $("#allErrors").html("<span style='color:red'>Select Enter Your Storage Location</span>");
                    return false;
                }else{
                    $("#allErrors").html("");
                }
                if ($("#storage_rent").val() == "") {
                    $("#allErrors").html("<span style='color:red'>Select Storage Monthly Rent</span>");
                    return false;
                }else{
                    $("#allErrors").html("");
                }

                if (user_phone == "") {
                    $("#allErrors").html("<span style='color:red'>Please Enter Your Mobile Phone</span>");
                    return false;
                }else if(user_phone.length < 10 || user_phone.length > 10){
                    $("#allErrors").html("<span style='color:red'>Phone Number Cannot Be Less or More Than 10 Digits</span>");
                    return false;
                    
                }else{
                    $("#allErrors").html("");
                }
                if (username == "") {
                    $("#allErrors").html("<span style='color:red'>Please Enter Your User Name</span>");
                    return false;
                }else{
                    $("#allErrors").html("");

                }
                // We display all user inputs and show them to the user for confirmation before they are posted to the server.
                // var imageStorageInput = document.getElementById("storage_image");
                $(".form-well-div").css("display", "none");
                $(".confirm_details").css("display","block");
                $("#confirm_storage").css("display", "block");
                // $("#storage_image_show").html('<img id="image_display"  style="height:100px; width:100px;"  src="'+imageStorageInput+'" >');
                $("#storage_type_show").html("<h4>Storage Type: </h4>"+storage_type);
                $("#storage_dimension_show").html("<h4>Dimensions: </h4>"+ storage_dimension);
                $("#storage_features_show").html("<h4>Main Features: </h4>"+ storage_features);
                $("#storage_location_show").html("<h4>Storage Location: </h4>"+storage_location);
                $("#storage_other_details_show").html("<h4>Other Details: </h4>"+storage_other_details);
                $("#storage_rent_show").html("<h4>Monthly Rent: </h4>$"+storage_rent);
                $("#user_phone_show").html("<h4>User Phone: </h4>"+user_phone);
                $("#username_show").html("<h4>Listed By: </h4>"+username);
                
                // imageStorageInput.click();

                $("#editdetails").click(function(){
                    $(".form-well-div").css("display", "block");
                    $(".confirm_details").css("display","none");
                    $("#confirm_storage").css("display", "none");
                })
            });

            // Now we Post the details to the server via php ---------

            $("#confirm_storage").click(function(){
                var formData = $("#storageLoadingForm").serialize();
                var storage_image = $("#storage_image").val();
                var storage_type = $("#storage_type").val();
                var storage_dimension = $("#storage_dimension").val();
                var storage_features = $("#storage_features").val();
                var storage_rent = $("#storage_rent").val();
                var storage_location = $("#storage_location").val();
                var storage_other_details = $("#storage_other_details").val();
                var user_phone = $("#user_phone").val();
                var username = $("#username").val();
                $.ajax({
                    url:"http://localhost/phonegap/insert.php",
                    method:"post",
                    data:{
                        storage_image:storage_image, 
                        storage_type:storage_type, 
                        storage_dimension:storage_dimension, 
                        storage_location:storage_location,
                        storage_features:storage_features,
                        storage_rent:storage_rent,
                        storage_other_details:storage_other_details,
                        user_phone:user_phone,
                        username:username 

                    },
                    beforeSend:function(){
                        $("#confirm_storage").html("Processing...");
                        $("#confirm_storage").attr("disabled");
                    },
                    success:function(data){
                        if (data == "success") {
                            alert("Storage Posted");
                            $("#confirm_storage").html("Post Storage");
                            $("#confirm_storage").removeAttr("disabled");
                            // We will call a function to display the posted data
                            window.location = "./";
                        }else if(data == "error"){
                            alert("Error");
                            $("#confirm_storage").html("Post Storage");
                            $("#confirm_storage").removeAttr("disabled");
                        }
                    }

                })
            })
            // We now configure the user to delete the items they posted-----

            $("#my_properties").click(function(){
                $("#checkuploadedStorages").toggle();
                $(".all_data").toggle();
                // When user clicks on this button, we show them a form for them to enter phone-number, they we will show them the details they uploaded.
                // for security, we can also implement sms verification.

            });

            $("#checkproperty").click(function(){
                var phonenumber = $("#phonenumber").val();
                if(phonenumber == ""){
                    alert("Fill in Your Phone Number");
                    return false;
                }else{
                    $.ajax({
                       url:"http://localhost/phonegap/display.php",
                        method:"post",
                        data:{phonenumber:phonenumber},
                        beforeSend:function(){
                            $("#checkproperty").html("Processing...");
                            $("#checkproperty").attr("disabled");
                        },
                        success:function(data){
                            $("#displayUserPostedStorage").html(data).css("display", "block");
                            $("#phonenumber").val("");
                            $("#checkproperty").html("Submit");
                            $("#checkproperty").removeAttr("disabled");
                            $("#checkuploadedStorages").css("display", "none");
                        }
                    })
                }
            })

            // We will now create a function to delete the post by the user ---
            $(document).on("click", ".remove_post", function(){
                var post_id = $(this).attr("id");
                // after we get the id of the posted storage, we will delete if on user confirmation

                if (confirm("Are You Sure Your Wish to remove the post")) {

                    $.ajax({
                        url:"http://localhost/phonegap/delete.php",
                        method:"post",
                        data:{post_id:post_id},
                        beforeSend:function(data){
                            $(".remove_post").attr("disabled", "disabled");
                            $(".remove_post").html('Deleting...');
                        },
                        success:function(data){
                            if (data == "success") {
                                alert("Storage Removed From The Listing");
                                $(".remove_post").removeAttr("disabled", "disabled");
                                $(".remove_post").html('<i class="glyphicon glyphicon-trash"></i>');
                                window.location = "./";
                            }else if (data == "error") {
                                alert(data);
                                $(".remove_post").attr("disabled", "disabled");
                                $(".remove_post").html('<i class="glyphicon glyphicon-trash"></i>');
                            }
                            
                        }
                    })
                }else{
                   return false; 
                }
            })

        })

// ----End addproperty.html------------

// ----------- Starting of findproperty.html------------

function getSelectedValue(argument) {
            if (argument == "") {
                $("#errorField").html("<span style='color:red'>Select Storage Type</span>");
            }else{
                $("#errorField").html("");
                // alert(argument);
                // we now send the argument to php via ajax---
                $.ajax({
                    url:"http://localhost/phonegap/search.php",
                    method:"post",
                    data:{argument:argument},
                    beforeSend:function(){
                        $(".searchResults").html("Processing...");
                    },
                    success:function(data){
                        $(".searchResults").html(data);

                    }
                })
            }
        }

        function getSelectedValue2(searchvalue){
            if (searchvalue.length < 3) {
                $("#errorField2").html("<span style='color:red'>Type in More Than Three Characters</span>");
            }else{
                $("#errorField2").html("");
                // alert(argument);
                // we now send the argument to php via ajax---
                $.ajax({
                    url:"http://localhost/phonegap/search.php",
                    method:"post",
                    data:{searchvalue:searchvalue},
                    beforeSend:function(){
                        $(".searchResults").html("Processing...");
                    },
                    success:function(data){
                        $(".searchResults").html(data);

                    }
                })
            }
        }

// ------------ end of findproperty.html---------------


