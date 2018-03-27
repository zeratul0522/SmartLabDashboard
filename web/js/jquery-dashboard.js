$(document).ready(function(){

    $("#shape196").click(function(){
        $("h1.page-header").hide();
        $("[data-toggle='popover']").popover();
       
    });

    $("#shape198").click(function () {
        convertGateToClosed();
    })

    var labFullClosed = 1000;
    var temperature = "0.0";
    var frontDoor = 1000;
    var frontWindow = 1000;
    var meetingRoom = 1000;
    var serverRoom = 1000;

    var int_ifLabFullClose = self.setInterval(askIfLabFullClosed, 1000);
    var int_temperature = self.setInterval(askTemperature, 1000);

    function askIfLabFullClosed() {
        $.ajax({
            url:"http://localhost:8080/smartLab/iffullclosed",
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
                frontDoor = json[3];
                frontWindow = json[5];
                meetingRoom = json[7];
                serverRoom = json[9];
                console.log("ask once: " + labFullClosed);
                $(".labfullclosed").text(labFullClosed);
                $(".frontDoor").text(frontDoor);
                $(".frontWindow").text(frontWindow);
                $(".meetingRoom").text(meetingRoom);
                $(".serverRoom").text(serverRoom);
                changeFrontDoor(frontDoor);
                changeFrontWindow(frontWindow);
                changeMeetingRoom(meetingRoom);
                changeServerRoom(serverRoom);
            }
        });
    }

    function changeFrontDoor(frontDoor) {
        if (frontDoor == 1)
        {
            convertGateToClosed();
        }
        else
        {
            convertGateToOpen();
        }
    }

    function changeFrontWindow(frontWindow) {
        if (frontWindow == 1)
        {
            convertWindowToClosed(10);
        }
        else
        {
            convertWindowToOpen(10);
        }
    }

    function changeMeetingRoom(meetingRoom) {
        if (meetingRoom == 1)
        {
            convertSideDoorToClosed(17);
        }
        else
        {
            convertSideDoorToOpen(17);
        }
    }

    function changeServerRoom(serverRoom) {
        if (serverRoom == 1)
        {
            convertSideDoorToClosed(18);
        }
        else
        {
            convertSideDoorToOpen(18);
        }
    }

    function askTemperature() {
        $.ajax({
            url:"http://localhost:8080/smartLab/temperature",
            type:"get",
            async:false,
            dataType:"jsonp",
            jsonp:"callback",
            jsonpCallback:"temperature",
            error: function (xhr, status, errorThrown) {
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.log( xhr );
            },
            success:function (json) {
                temperature = json[1];
                console.log("ask once: " + temperature);
                $(".temperature").text(temperature);
            }
        });
    }

});

/**
 * @desc 在平面图上动态地把正门从开启状态改变为关闭状态,或从关闭到开启
 *       正门对应的id是#shape9
 *
 */
function convertGateToClosed() {

    $("#shape9 path:first-child").attr("d","M0,0L72.1,0L72.1,15.1L0,15.1L0,0zM0,0L0,15.1L-5,15.1L-5,0L0,0zM72.1,0L77.1,0L77.1,15.1L72.1,15.1L72.1,0zM72.1,0L36,0L36,5L72.1,5L72.1,0zM0,0L36,0L36,5L0,5L0,0z");
    $("#shape9 path:last-child").attr("d","M36,0M0,0L0,15.1L-5,15.1L-5,0L0,0zM72.1,0L77.1,0L77.1,15.1L72.1,15.1L72.1,0zM72.1,0L36,0L36,5L72.1,5L72.1,0zM0,0L36,0L36,5L0,5L0,0zM36,0");

}

function convertGateToOpen() {
    $("#shape9 path:first-child").attr("d","M0,0L72.1,0L72.1,15.1L0,15.1L0,0zM0,0L0,15.1L-5,15.1L-5,0L0,0zM72.1,0L77.1,0L77.1,15.1L72.1,15.1L72.1,0zM72.1,0L72.1,-36L67.1,-36L67.1,0L72.1,0zM0,0L0,-36L5,-36L5,0L0,0z");
    $("#shape9 path:last-child").attr("d","M36,0C36,-19.9,52.2,-36,72.1,-36M0,0L0,15.1L-5,15.1L-5,0L0,0zM72.1,0L77.1,0L77.1,15.1L72.1,15.1L72.1,0zM72.1,0L72.1,-36L67.1,-36L67.1,0L72.1,0zM0,0L0,-36L5,-36L5,0L0,0zM36,0C36,-19.9,19.9,-36,0,-36");
}


/**
 * @desc 在平面图上动态地改变窗户的状态
 *       正门附近的三扇窗户的id分别为10、14、15
 *
 */
function convertWindowToOpen(windowId){
    $("#shape"+windowId+" path:first-child").attr("d","M0,15.1L113.4,15.1L113.4,0L0,0L0,15.1zM0,0L0,15.1L-7.6,15.1L-7.6,0L0,0zM113.4,0L113.4,15.1L121.4,15.1L121.4,0L113.4,0zM6,1.6L6,7.6L0,7.6L0,1.6L6,1.6zM107.4,1.6L107.4,7.6L113.4,7.6L113.4,1.6L107.4,1.6zM0,7.6L3,7.6L3,10.6L0,10.6L0,7.6zM113.4,7.6L110.4,7.6L110.4,10.6L113.4,10.6L113.4,7.6zM53.7,10.6L59.7,10.6L59.7,4.6L53.7,4.6L53.7,10.6zM55.2,1.6L58.2,1.6L58.2,4.6L55.2,4.6L55.2,1.6z");
    $("#shape"+windowId+" path:last-child").attr("d","M0,0L0,15.1L-7.6,15.1L-7.6,0L0,0zM113.4,0L113.4,15.1L121.4,15.1L121.4,0L113.4,0zM6,1.6L6,7.6L0,7.6L0,1.6L6,1.6zM107.4,1.6L107.4,7.6L113.4,7.6L113.4,1.6L107.4,1.6zM6,4.6L53.7,5.1M107.4,4.6L64.2,-15.8M0,7.6L3,7.6L3,10.6L0,10.6L0,7.6zM113.4,7.6L110.4,7.6L110.4,10.6L113.4,10.6L113.4,7.6zM53.7,10.6L59.7,10.6L59.7,4.6L53.7,4.6L53.7,10.6zM55.2,1.6L58.2,1.6L58.2,4.6L55.2,4.6L55.2,1.6z");
}

function convertWindowToClosed(windowId) {
    $("#shape"+windowId+" path:first-child").attr("d","M0,15.1L107.9,15.1L107.9,0L0,0L0,15.1zM0,0L0,15.1L-7.6,15.1L-7.6,0L0,0zM107.9,0L107.9,15.1L115.9,15.1L115.9,0L107.9,0zM4,3.6L4,7.6L0,7.6L0,3.6L4,3.6zM53.9,3.6L53.9,7.6L57.9,7.6L57.9,3.6L53.9,3.6zM53.9,7.6L57.9,7.6L57.9,11.6L53.9,11.6L53.9,7.6zM107.9,7.6L103.9,7.6L103.9,11.6L107.9,11.6L107.9,7.6z");
    $("#shape"+windowId+" path:last-child").attr("d","M0,0L0,15.1L-7.6,15.1L-7.6,0L0,0zM107.9,0L107.9,15.1L115.9,15.1L115.9,0L107.9,0zM4,3.6L4,7.6L0,7.6L0,3.6L4,3.6zM53.9,3.6L53.9,7.6L57.9,7.6L57.9,3.6L53.9,3.6zM4,5.6L53.9,5.6M57.9,9.6L103.9,9.6M53.9,7.6L57.9,7.6L57.9,11.6L53.9,11.6L53.9,7.6zM107.9,7.6L103.9,7.6L103.9,11.6L107.9,11.6L107.9,7.6z");
}

/**
 * @desc 在平面图上动态地改变室内的小门的状态
 *       办公室的id为19，贮藏室的id为18
 *
 */
function convertSideDoorToClosed(doorId){
    $("#shape"+doorId+" path:first-child").attr("d","M0,0L42,0L42,7.6L0,7.6L0,0zM0,0L0,7.6L-4,7.6L-4,0L0,0zM42,0L42,7.6L46,7.6L46,0L42,0zM42,0L0,0L0,4L42,4L42,0z");
    $("#shape"+doorId+" path:last-child").attr("d","M0,0M0,0L0,7.6L-4,7.6L-4,0L0,0zM42,0L42,7.6L46,7.6L46,0L42,0zM42,0L0,0L0,4L42,4L42,0z");
}

function convertSideDoorToOpen(doorId){
    $("#shape"+doorId+" path:first-child").attr("d","M0,0L42,0L42,7.6L0,7.6L0,0zM0,0L0,7.6L-4,7.6L-4,0L0,0zM42,0L42,7.6L46,7.6L46,0L42,0zM42,0L42,-42L38,-42L38,0L42,0z");
    $("#shape"+doorId+" path:last-child").attr("d","M0,0C0,-23.2,18.8,-42,42,-42M0,0L0,7.6L-4,7.6L-4,0L0,0zM42,0L42,7.6L46,7.6L46,0L42,0zM42,0L42,-42L38,-42L38,0L42,0z");
}