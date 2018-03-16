$(document).ready(function(){
    //alert(1);
    $("#shape196").click(function(){
        $("h1.page-header").hide();
        $("[data-toggle='popover']").popover();
    });


    // $("#shape9").mouseover(function() {
    //     ({
    //         html : true,
    //         title: title(),
    //         delay:{show:500, hide:1000},
    //         content: function() {
    //             return content();
    //         }
    //     });
    //     alert(2);
    // })

    var labFullClosed = 1000;
    var int = self.setInterval(ask(), 1000);


    function ask() {
        $.ajax({
            url:"http://localhost:8080/labFullClosed",
            type:"get",
            async:false,
            dataType:"jsonp",
            jsonp:"callback",
            jsonpCallback:"labFullClosed",
            error: function (xhr, status, errorThrown) {
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.log( xhr );
            },
            success:function (json) {
                //alert(json[0]);
                labFullClosed = json[1];
                console.log("ask once" + labFullClosed);
            }
        });
    }



});