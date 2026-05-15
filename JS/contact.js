$("#sendMessageBtn").on("click", function () {

    let payload = {

        FullName: $("#contactName").val(),
        Email: $("#contactEmail").val(),
        Message: $("#contactMessage").val()

    };

    $.ajax({

        url: "includes/contact/save.php",
        method: "POST",
        data: payload,

        success: function (res) {

            if(res.status){

                alert(res.message);

                $("#contactForm")[0].reset();

            }else{

                alert(res.message);

            }

        },

        error: function () {

            alert("Something went wrong");

        }

    });

});