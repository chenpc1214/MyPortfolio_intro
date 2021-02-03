$(document).ready(function(){
    $surface = $(".surface");
    $car = $(".car");
    $img = $(".car img");
    let flag =true;
    const car=["./assets/Img_05.png","./assets/Img_06.png"]

    $(document).on("keypress",function(e){              //停車
        if(e.which==13)
        {
            $($surface).toggleClass("moveright");
            $($car).toggleClass("suspension");

        }
    })

    $(document).on("keypress",function(e){
        if(e.which==119)
        {
            if(flag)
            {
                flag=false;
                $img.attr("src",car[0]);
            }
            else
            {
                flag=true;
                $img.attr("src",car[1]);
            }
        }
    })
});