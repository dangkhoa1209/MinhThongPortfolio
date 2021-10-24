$(document).ready(function() {
    //Header mobile ****************************
    const doc = document;
    const menuOpen = doc.querySelector(".menu");
    const menuClose = doc.querySelector(".close");
    const overlay = doc.querySelector(".overlay");

    menuOpen.addEventListener("click", () => {
        overlay.classList.add("overlay--active");
    });

    menuClose.addEventListener("click", () => {
        overlay.classList.remove("overlay--active");
    });

    //Event cuộn ******************************
    $(window).scroll(function() {
        //Xử lý header
        let h = $(window).height();
        let w = $(window).width();
        if (w >= 768) {
            if ($(this).scrollTop() >= 50) {
                $(".boxheader").css("padding-top", "10px")
                $(".boxheader").css("padding-bottom", "10px")
                $(".boxheader").css("background-color", "black");
                $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
            } else {
                $(".boxheader").css("padding-top", "40px")
                $(".boxheader").css("padding-bottom", "40px")
                $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
                $(".boxheader").css("box-shadow", "none");
            }
        } else {
            if ($(this).scrollTop() >= 50) {
                $(".boxheader").css("padding-top", "10px")
                $(".boxheader").css("padding-bottom", "10px")
                $(".boxheader").css("background-color", "black");
                $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
            } else {
                $(".boxheader").css("padding-top", "15px")
                $(".boxheader").css("padding-bottom", "15px")
                $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
                $(".boxheader").css("box-shadow", "none");
            }
        }
    });

    //event done load page
    //chinh padding
    let h = $(window).height();
    let w = $(window).width();

    if (w >= 768) {
        if ($(this).scrollTop() >= 50) {
            $(".boxheader").css("padding-top", "10px")
            $(".boxheader").css("padding-bottom", "10px")
            $(".boxheader").css("background-color", "black");
            $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
        } else {
            $(".boxheader").css("padding-top", "40px")
            $(".boxheader").css("padding-bottom", "40px")
            $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
            $(".boxheader").css("box-shadow", "none");
        }

        $(".header .boxheader img").css("width", "146px");
        $(".header p.menu").css("line-height", "55px");
    } else {
        if ($(this).scrollTop() >= 50) {
            $(".boxheader").css("padding-top", "10px")
            $(".boxheader").css("padding-bottom", "10px")
            $(".boxheader").css("background-color", "black");
            $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
        } else {
            $(".boxheader").css("padding-top", "15px")
            $(".boxheader").css("padding-bottom", "15px")
            $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
            $(".boxheader").css("box-shadow", "none");
        }

        $(".header .boxheader img").css("width", "60px");
        $(".header p.menu").css("line-height", "0px");
    }

    //chinh padding
    if (w >= 1920) {
        document.getElementById("boxheader").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxheader").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("banner").style.paddingLeft = ((w - 1920) / 2) + "px";
        document.getElementById("banner").style.paddingRight = ((w - 1920) / 2) + "px";
        document.getElementById("boxTitlePort").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxTitlePort").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = (236 + (w - 1920) / 2) + "px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = (236 + (w - 1920) / 2) + "px";
        document.getElementById("boxFooter").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxFooter").style.paddingRight = (246 + (w - 1920) / 2) + "px";
    }
    if (w < 1920 && w >= 1280) {
        document.getElementById("boxheader").style.paddingLeft = "100px";
        document.getElementById("boxheader").style.paddingRight = "100px";
        document.getElementById("banner").style.paddingLeft = "0px";
        document.getElementById("banner").style.paddingRight = "0px";
        document.getElementById("boxTitlePort").style.paddingLeft = "100px";
        document.getElementById("boxTitlePort").style.paddingRight = "100px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = "90px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = "90px";
        document.getElementById("boxFooter").style.paddingLeft = "100px";
        document.getElementById("boxFooter").style.paddingRight = "100px";
    }

    if (w < 1280 && w >= 1024) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("banner").style.paddingLeft = "0px";
        document.getElementById("banner").style.paddingRight = "0px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";
    }

    if (w < 1024 && w >= 768) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("banner").style.paddingLeft = "0px";
        document.getElementById("banner").style.paddingRight = "0px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";
    }

    if (w < 768 && w >= 550) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("banner").style.paddingLeft = "0px";
        document.getElementById("banner").style.paddingRight = "0px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";
    }

    if (w < 550 && w >= 0) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("banner").style.paddingLeft = "0px";
        document.getElementById("banner").style.paddingRight = "0px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
        document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";
    }

    let wboxImage = $(".boxImage").css("width");
    $(".boxImage img").css("height", wboxImage);


    $(window).resize(function() {

        let h = $(window).height();
        let w = $(window).width();

        if (w >= 768) {
            if ($(this).scrollTop() >= 50) {
                $(".boxheader").css("padding-top", "10px")
                $(".boxheader").css("padding-bottom", "10px")
                $(".boxheader").css("background-color", "black");
                $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
            } else {
                $(".boxheader").css("padding-top", "40px")
                $(".boxheader").css("padding-bottom", "40px")
                $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
                $(".boxheader").css("box-shadow", "none");
            }

            $(".header .boxheader img").css("width", "146px");
            $(".header p.menu").css("line-height", "55px");
        } else {
            if ($(this).scrollTop() >= 50) {
                $(".boxheader").css("padding-top", "10px")
                $(".boxheader").css("padding-bottom", "10px")
                $(".boxheader").css("background-color", "black");
                $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
            } else {
                $(".boxheader").css("padding-top", "15px")
                $(".boxheader").css("padding-bottom", "15px")
                $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
                $(".boxheader").css("box-shadow", "none");
            }

            $(".header .boxheader img").css("width", "60px");
            $(".header p.menu").css("line-height", "0px");
        }

        //chinh padding
        if (w >= 1920) {
            document.getElementById("boxheader").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
            document.getElementById("boxheader").style.paddingRight = (246 + (w - 1920) / 2) + "px";
            document.getElementById("banner").style.paddingLeft = ((w - 1920) / 2) + "px";
            document.getElementById("banner").style.paddingRight = ((w - 1920) / 2) + "px";
            document.getElementById("boxTitlePort").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
            document.getElementById("boxTitlePort").style.paddingRight = (246 + (w - 1920) / 2) + "px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = (236 + (w - 1920) / 2) + "px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = (236 + (w - 1920) / 2) + "px";
            document.getElementById("boxFooter").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
            document.getElementById("boxFooter").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        }
        if (w < 1920 && w >= 1280) {
            document.getElementById("boxheader").style.paddingLeft = "100px";
            document.getElementById("boxheader").style.paddingRight = "100px";
            document.getElementById("banner").style.paddingLeft = "0px";
            document.getElementById("banner").style.paddingRight = "0px";
            document.getElementById("boxTitlePort").style.paddingLeft = "100px";
            document.getElementById("boxTitlePort").style.paddingRight = "100px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = "90px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = "90px";
            document.getElementById("boxFooter").style.paddingLeft = "100px";
            document.getElementById("boxFooter").style.paddingRight = "100px";
        }

        if (w < 1280 && w >= 1024) {
            document.getElementById("boxheader").style.paddingLeft = "10px";
            document.getElementById("boxheader").style.paddingRight = "10px";
            document.getElementById("banner").style.paddingLeft = "0px";
            document.getElementById("banner").style.paddingRight = "0px";
            document.getElementById("boxTitlePort").style.paddingLeft = "10px";
            document.getElementById("boxTitlePort").style.paddingRight = "10px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
            document.getElementById("boxFooter").style.paddingLeft = "10px";
            document.getElementById("boxFooter").style.paddingRight = "10px";
        }

        if (w < 1024 && w >= 768) {
            document.getElementById("boxheader").style.paddingLeft = "10px";
            document.getElementById("boxheader").style.paddingRight = "10px";
            document.getElementById("banner").style.paddingLeft = "0px";
            document.getElementById("banner").style.paddingRight = "0px";
            document.getElementById("boxTitlePort").style.paddingLeft = "10px";
            document.getElementById("boxTitlePort").style.paddingRight = "10px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
            document.getElementById("boxFooter").style.paddingLeft = "10px";
            document.getElementById("boxFooter").style.paddingRight = "10px";
        }

        if (w < 768 && w >= 550) {
            document.getElementById("boxheader").style.paddingLeft = "10px";
            document.getElementById("boxheader").style.paddingRight = "10px";
            document.getElementById("banner").style.paddingLeft = "0px";
            document.getElementById("banner").style.paddingRight = "0px";
            document.getElementById("boxTitlePort").style.paddingLeft = "10px";
            document.getElementById("boxTitlePort").style.paddingRight = "10px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
            document.getElementById("boxFooter").style.paddingLeft = "10px";
            document.getElementById("boxFooter").style.paddingRight = "10px";
        }

        if (w < 550 && w >= 0) {
            document.getElementById("boxheader").style.paddingLeft = "10px";
            document.getElementById("boxheader").style.paddingRight = "10px";
            document.getElementById("banner").style.paddingLeft = "0px";
            document.getElementById("banner").style.paddingRight = "0px";
            document.getElementById("boxTitlePort").style.paddingLeft = "10px";
            document.getElementById("boxTitlePort").style.paddingRight = "10px";
            document.getElementById("boxImagaPortfolio").style.paddingLeft = "0px";
            document.getElementById("boxImagaPortfolio").style.paddingRight = "0px";
            document.getElementById("boxFooter").style.paddingLeft = "10px";
            document.getElementById("boxFooter").style.paddingRight = "10px";
        }

        let wboxImage = $(".boxImage").css("width");
        console.log(wboxImage);
        $(".boxImage img").css("height", wboxImage);
        
    })

    $(".btnKindPorts").click(function(e){
        $("*").removeClass("kindPortActive");
        $(this).addClass("kindPortActive");
        let kindPort = $(this).attr("data-port");
        loadPortfolio(kindPort, 1);
        loadSwitchPage(kindPort);
    })

    loadPortfolio("all", 1);
    loadSwitchPage("all");
});

function loadPortfolioTmp(data){
    $("*").removeClass("active");
    $(data).addClass("active");
    let kindPort = $(data).attr("data-kindPort");
    let index = $(data).attr("data-index");
    loadPortfolio(kindPort, index)
}

function loadPortfolio(kindPort, index) {
    var dataform = new FormData();
    dataform.append("kindPort", kindPort);
    dataform.append("index", index);
    $.ajax({
        type: 'POST',
        url: '/loadPortfolioInPortfolioPage',
        cache: false,
        contentType: false,
        processData: false,
        data: dataform,
        success: function(data) {
            $(".boxImage").remove();
            data.forEach(portfolio => {
                $("#boxImagaPortfolio").append(`
                    <div class="boxImage">
                        <img src="images/${portfolio.image}" alt="">
                    </div>
                `)
            });
            let wboxImage = $(".boxImage").css("width");
            $(".boxImage img").css("height", wboxImage);
        },
        error: function() {
            alert("System Error!");
            location.reload();
        }

    })

}

function loadSwitchPage(kindPort) {
    var dataform = new FormData();
    dataform.append("kindPort", kindPort);
    $.ajax({
        type: 'POST',
        url: '/loadSwitchPage',
        cache: false,
        contentType: false,
        processData: false,
        data: dataform,
        success: function(data) {
           var countPort = data.length;
           countPort = Math.ceil(countPort/15);
           $(".boxSwitchPage").html('');
           for(let i = 1; i <= countPort; i++){
                if(i == 1){
                    $(".boxSwitchPage").append(`<button onclick="loadPortfolioTmp(this)" class="active" data-kindPort="${kindPort}" data-index="${i}">${i}</button>`)
                }else{
                    $(".boxSwitchPage").append(`<button onclick="loadPortfolioTmp(this)" data-kindPort="${kindPort}" data-index="${i}">${i}</button>`)
                }
           }
        },
        error: function(err) {
            alert("System Error!");
            console.log(err);
            //location.reload();
        }

    })
}