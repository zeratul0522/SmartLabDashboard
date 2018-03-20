$(document).ready(function(){

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


    /*
     For test
     */


    // var count = 0;
    // var int = self.setInterval(action(),1000);
    // function action(){
    //     count++;
    //     alert("count = "+count);
    // }
    var int = self.setInterval(askIfLabFullClosed(), 1000);


    function askIfLabFullClosed() {
        $.ajax({
            url:"http://192.168.1.166:8080/smartLab/iffullclosed",
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

                labFullClosed = json[1];
                console.log("ask once: " + labFullClosed);
                $(".labfullclosed").text(labFullClosed);


            }
        });



    }



});