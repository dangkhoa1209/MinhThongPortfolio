
$(document).ready(function() {
    //Kết nối tới server socket đang lắng nghe
    var socket = io();
    $('.owl-carousel').owlCarousel({
        center: true,
        items: 2.5,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            1280: {
                items: 4.5
            },
            1079: {
                items: 2.5
            }
        }
    });
    $(".portfolio .boxContentPort .boxSlideImagePort .owl-carousel .owl-prev").html(`<img src="/imagesSystem/portfolio/Asset 45ICONC.svg" alt="<">`);
    $(".portfolio .boxContentPort .boxSlideImagePort .owl-carousel .owl-next").html(`<img src="/imagesSystem/portfolio/Asset 46ICONC.svg" alt="<">`);

    //Không xuống dòng thể textarea
    $('#conctentMessage').keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    //login
    $("#formLogin").submit((e) => {
        e.preventDefault();
        $(".overlay").removeClass("overlay--active");
        var username = $("#username").val();
        var pwd = $("#pwd").val();

        var dataform = new FormData();
        dataform.append("username", username);
        dataform.append("pwd", pwd);
        $.ajax({
            type: 'POST',
            url: '/login',
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                if(data == "error"){
                    $("#errorLogin").html(`
                        <p class="text-danger">Error login</p>
                    `)
                }else{
                    $("#errorLogin").html(``);
                    $('#LoginModal').modal('toggle');
                    location.reload();
                    return false;
                }
            },
            error: function() {
                $("#errorLogin").html(`
                    <p class="text-danger">Error login</p>
                `)
            }

        })
    });

    //header ********************************
    $(".menu_down").css("display", "none");
    $(".link-user").click((e) => {
        e.preventDefault();
        if ($(".menu_down").css("display") === "none") {
            $(".menu_down").css("display", "block");
        } else {
            $(".menu_down").css("display", "none");
        }
    });

        //Header click
        $(".link-home").click(function(e){
            e.preventDefault();
            $("*").removeClass("linkHeaderActive");
            $(".link-home").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active");
            $("html, body").animate({ scrollTop: $("#banner").offset().top }, 1000);
        });
        $(".link-about").click(function(e){
            e.preventDefault(); //ko load trang
            $("*").removeClass("linkHeaderActive");
            $(".link-about").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active"); //dong menu mobile
            $("html, body").animate({ scrollTop: $("#about").offset().top - $(".boxheader").height()}, 1000); //di chuyen den vi tri(co tru hoa header)
        });
        $(".link-service").click(function(e){
            e.preventDefault();
            $("*").removeClass("linkHeaderActive");
            $(".link-service").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active");
            $("html, body").animate({ scrollTop: $("#services").offset().top - $(".boxheader").height()}, 1000);
        });
        $(".link-portfolio").click(function(e){
            e.preventDefault();
            $("*").removeClass("linkHeaderActive");
            $(".link-portfolio").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active");
            $("html, body").animate({ scrollTop: $("#portfolio").offset().top - $(".boxheader").height()}, 1000);
        });
        $(".link-new").click(function(e){
            e.preventDefault();
            $("*").removeClass("linkHeaderActive");
            $(".link-new").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active");
            $("html, body").animate({ scrollTop: $("#news").offset().top - $(".boxheader").height()}, 1000);
        });
        $(".link-contact").click(function(e){
            e.preventDefault();
            $("*").removeClass("linkHeaderActive");
            $(".link-contact").addClass("linkHeaderActive");
            $(".overlay").removeClass("overlay--active"); 
            $("html, body").animate({ scrollTop: $("#contact").offset().top - $(".boxheader").height()}, 1000);
            $('#nameContact').focus(); //focus vao form nhap thong tin khach hang
        });

        
    //End header ********************************
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

    //Kind port folioclick
    $(".btnKindPorts").click(function(e){
        $("*").removeClass("kindPortActive");
        $(this).addClass("kindPortActive");
        var kindPort = $(this).attr("data-port");
        var dataform = new FormData();
        dataform.append("kindPort", kindPort);
        $.ajax({
            type: "POST",
            url: "/loadPortfolio", //HomeController
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                for (var i=0; i<$('.item').length; i++) {
                    $(".owl-carousel").trigger('remove.owl.carousel', [i])
                                              .trigger('refresh.owl.carousel');
                 }
                data.forEach(portfolio => {
                    $('.owl-carousel').trigger('add.owl.carousel', [`
                        <div class="item">
                            <img src="/images/${portfolio.image}" alt="Portfolio">
                        </div>
                    `]).trigger('refresh.owl.carousel');
                })
                resetPage()
                
            },
            error: function() {
                alert("System Error!")
                location.reload();
            }
        });
    });

    //Contact ********* get info user
    $(".btnSendInfoUser").click((e) => {
        e.preventDefault();
        var name = $("#nameContact").val();
        var email = $("#emailContact").val().toLowerCase();
        console.log(email);
        var phone = $("#phoneContact").val();
        var title = $("#titleContact").val();
        var message = $("#messageContact").val();
        if(name.replace(/\s+/g, '') == ""){
            $("#nameContact").val("");
            $("#nameContact").focus();
            $(".resultSendInfoUser").show();
            $(".resultSendInfoUser").html("<p>Please enter Your Name!</p>");
            setInterval(function(){ $(".resultSendInfoUser").hide(500); }, 10000);
            return 0;
        }

        if(email.replace(/\s+/g, '') == ""){
            $("#emailContact").val("");
            $("#emailContact").focus();
            $(".resultSendInfoUser").show();
            $(".resultSendInfoUser").html("<p>Please enter Your Email!</p>");
            setInterval(function(){ $(".resultSendInfoUser").hide(500); }, 10000);
            return 0;
        }

        if(email.replace(/\s+/g, '') != ""){
            var dataform = new FormData();
            dataform.append("name", name);
            dataform.append("email", email);
            dataform.append("phone", phone);
            dataform.append("title", title);
            dataform.append("message", message);
            $.ajax({
                type: "POST",
                url: "/sendinfouser", //HomeController
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    $("#nameContact").val("");
                    $("#emailContact").val("");
                    $("#phoneContact").val("");
                    $("#titleContact").val("");
                    $("#messageContact").val("");
                    $(".resultSendInfoUser").show();
                    $(".resultSendInfoUser").html("<p>Thank you for contacting us!</p>");
                    setInterval(function(){ $(".resultSendInfoUser").hide(500); }, 10000);
                    $(".startChat").attr("data-emailguest", email);
                    $("#sendMessage").attr("data-email", email);
                    socket.emit('boxchat', {name: data.name, email: data.email, phone:data.phone, lastmessage:data.lastmessage, status:data.status, lasttime:data.lasttime});
                },
                error: function() {
                    $("#alertContact").html(`<p class="text-danger">Error sending contact information!</p>`)
                }
            });
        }else{
            $("#nameContact").focus();
            $(".resultSendInfoUser").show();
            $(".resultSendInfoUser").html("<p>System error!</p>");
            setInterval(function(){ $(".resultSendInfoUser").hide(500); }, 10000);
        }
        
    });

    //End contact *******

    //Footer click
    $(".linkFooter").click(function(e){
        var link = $(this).attr("data-link");
        if(link == "about"){
            $("html, body").animate({ scrollTop: $("#about").offset().top - $(".boxheader").height()}, 1000); //di chuyen den vi tri(co tru hoa header)
        }
        if(link == "graphic" || link == "web" || link == "edit"){
            $("html, body").animate({ scrollTop: $(`#${link}`).offset().top - $(".boxheader").height() - 50}, 1000); //di chuyen den vi tri(co tru hoa header)
            setTimeout(function(){$(`#${link}`).css("background-color", "rgb(100, 100, 100)");}, 900);
            setTimeout(function(){$(`#${link}`).css("background-color", "rgb(67, 66, 68)");}, 1700);
        }
        if(link == "allprojects"){
            $("html, body").animate({ scrollTop: $("#portfolio").offset().top - $(".boxheader").height()}, 1000);
        }
        if(link == "newproducts"){
            $("html, body").animate({ scrollTop: $("#news").offset().top - $(".boxheader").height()}, 1000); //di chuyen den vi tri(co tru hoa header)
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImageNews .btnleft`).css("opacity", "0.9");}, 900);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImageNews .btnright`).css("opacity", "0.9");}, 900);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImageNews .btnleft`).css("opacity", "0");}, 1700);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImageNews .btnright`).css("opacity", "0");}, 1700);
            
        }
        if(link == "promotion"){
            $("html, body").animate({ scrollTop: $("#news").offset().top - $(".boxheader").height()}, 1000); //di chuyen den vi tri(co tru hoa header)
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImagePromotion .btnleft`).css("opacity", "0.9");}, 900);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImagePromotion .btnright`).css("opacity", "0.9");}, 900);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImagePromotion .btnleft`).css("opacity", "0");}, 1700);
            setTimeout(function(){$(`.news .boxNews .boxNewsAndPromotion .boxImagePromotion .btnright`).css("opacity", "0");}, 1700);
            
        }
    });
    //End footer

    //Event cuộn ******************************
    var linkNow = "banner";
    $(window).scroll(function() {
        //Xử lý header
        if ($(this).scrollTop() >= 50) {
            $(".boxheader").css("padding-top", "10px")
            $(".boxheader").css("padding-bottom", "10px")
            $(".boxheader").css("background-color", "black");
            $(".boxheader").css("box-shadow", "1px 1px 1px #AAA");
        } else {
            $(".boxheader").css("padding-top", "20px")
            $(".boxheader").css("padding-bottom", "20px")
            $(".boxheader").css("background-color", "rgba(0, 0 , 0 ,0)");
            $(".boxheader").css("box-shadow", "none");
        }

        //Header scroll
        //xử lý thanh header khi scroll
        
        let top = $(this).scrollTop() + $(".boxheader").height() + 10;;
        let banner = $('#banner').offset().top
        let about = $('#about').offset().top;
        let services = $('#services').offset().top;
        let portfolio = $('#portfolio').offset().top;
        let news = $('#news').offset().top;
        let contact = $('#contact').offset().top;
        if (top < about && linkNow.localeCompare("banner") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-home").addClass("linkHeaderActive");
            linkNow = "banner";
        }
        if (about <= top && top < services && linkNow.localeCompare("about") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-about").addClass("linkHeaderActive");
            linkNow = "about";
        }

        if (services <= top && top < portfolio && linkNow.localeCompare("services") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-service").addClass("linkHeaderActive");
            linkNow = "services";
        }

        if (portfolio <= top && top < news && linkNow.localeCompare("portfolio") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-portfolio").addClass("linkHeaderActive");
            linkNow = "portfolio";
        }

        if (news <= top && top < contact && linkNow.localeCompare("news") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-new").addClass("linkHeaderActive");
            linkNow = "news";
        }

        if (contact <= top && linkNow.localeCompare("contact") != 0) {
            $("*").removeClass("linkHeaderActive");
            $(".link-contact").addClass("linkHeaderActive");
            linkNow = "contact";
        }
    });

    //Event done load page *********************
    resetPage();
    //Event resize *****************************
    $(window).resize(function() {
        resetPage();
    });

    //User send file, image
    $("#file-upload").on('change', function() {
        var file = $("#file-upload")[0].files;
        if (file.length > 0) {
            var dataform = new FormData();
            for (let i = 0; i < file.length; i++){
                dataform.append("file[]", document.getElementById("file-upload").files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/sendfile", //Chatcontroller
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    data.forEach(message => {
                        if(message.kind == "text"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <p class="content">${message.message}</p>
                                </div>
                            `);
                        }
                        if(message.kind == "file"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <p class="content">
                                        <a class="content" href="/files/$${message.name}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `);
                        }
                        if(message.kind == "image"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <div class="image-chat">
                                    <a href="/images/${message.name}" target="_blank"><img src="/images/${message.name}" alt="image"></a>
                                    </div>
                                </div>
                            `);
                        }
                        if(message.kind == "time"){
                            $(".contentChat").append(`
                                <div class="time">
                                    <p>${message.message}</p>
                                </div>
                            `);
                        }
                        socket.emit('send', {email: message.email, name: message.name, userpost: message.userpost, message:message.message, kind:message.kind, time:message.time});
                        //$(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
                    })
                },
                error: function() {
                    alert("Error!");
                }
            });
        }
        //$(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50); 
        $("#file-upload").val("");
    })


    //User send message
    $("#sendMessage").click((e) => {
        var message = $("#conctentMessage").val();
        if(message.replace(/\s+/g, '') != ""){
            var dataform = new FormData();
            dataform.append("message", message);
            $.ajax({
                type: "POST",
                url: "/sendmessage", //Chatcontroller
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    data.forEach(message => {
                        if(message.kind == "text"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <p class="content">${message.message}</p>
                                </div>
                            `);
                        }
                        if(message.kind == "file"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <p class="content">
                                        <a class="content" href="/files/$${message.name}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `);
                        }
                        if(message.kind == "image"){
                            $(".contentChat").append(`
                                <div class="right">
                                    <div class="image-chat">
                                    <a href="/images/${message.name}" target="_blank"><img src="/images/${message.name}" alt="image"></a>
                                    </div>
                                </div>
                            `);
                        }
                        if(message.kind == "time"){
                            $(".contentChat").append(`
                                <div class="time">
                                    <p>${message.message}</p>
                                </div>
                            `);
                        }
                        socket.emit('send', {email: message.email, name: message.name, userpost: message.userpost, message:message.message, kind:message.kind, time:message.time});
                        //$(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
                    })  
                },
                error: function() {
                    alert("Error!");
                }
            });
            //$(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
        }else{
            $("#conctentMessage").val("")
        }
        $("#conctentMessage").val("")
    });

    //nhan tin nhan realtime tu admin
    socket.on("send", function (message) {
        let email = $("#sendMessage").attr("data-email");
        if(message.userpost == "admin" && message.email == email){
            if(message.kind == "text"){
                $(".contentChat").append(`
                    <div class="left">
                        <p class="content">${message.message}</p>
                    </div>
                `);
            }
            if(message.kind == "file"){
                $(".contentChat").append(`
                    <div class="left">
                        <p class="content">
                            <a class="content" href="/files/$${message.name}" target="_blank">${message.message}</a>
                        </p>
                    </div>
                `);
            }
            if(message.kind == "image"){
                $(".contentChat").append(`
                    <div class="left">
                        <div class="image-chat">
                        <a href="/images/${message.name}" target="_blank"><img src="/images/${message.name}" alt="image"></a>
                        </div>
                    </div>
                `);
            }
            if(message.kind == "time"){
                $(".contentChat").append(`
                    <div class="time">
                        <p>${message.message}</p>
                    </div>
                `);
            }
        }
        $(".contentChat").animate({ scrollTop: $(".contentChat")[0].scrollHeight }, 50);    
    })

    //Bấm enter để gửi tin nhắn hoặc form contact
    //bam enter thi gui tin nhan
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            if($("#conctentMessage").val() != ""){
                $("#sendMessage").click();
                $("#conctentMessage").val("");
                //$("#conctentMessage").focus();
            }else{
                $(".btnSendInfoUser").click();
            }
        }
    });
});

function resetPage() {
    let h = $(window).height();
    let w = $(window).width();

    if (w > 1950) {
        $(".banner .boxbanner").css("max-height", "700px");
        $(".banner .boxbanner img").css("max-height", "700px");
        $(".banner .boxbanner video").css("max-height", "700px");
        $(".banner .boxbanner video source").css("max-height", "700px");

    } else {
        $(".banner .boxbanner").css("max-height", "100%");

        $(".banner").css("max-height", "100%");
        //$(".banner .boxbanner").css("height", $(".banner .boxbanner").height() - 5);
        $(".banner .boxbanner img").css("max-height", "100%");
        $(".banner .boxbanner video").css("max-height", "100%");
        $(".banner .boxbanner video source").css("max-height", "100%");
    }

    //chinh padding
    if (w >= 1920) {
        document.getElementById("boxheader").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxheader").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("menu_down").style.right = (246 + (w - 1920) / 2) + "px";
        document.getElementById("about").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("about").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxservices").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxservices").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxTitlePort").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxTitlePort").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxContact").style.paddingLeft = (446 + (w - 1920) / 2) + "px";
        document.getElementById("boxContact").style.paddingRight = (446 + (w - 1920) / 2) + "px";
        document.getElementById("boxFooter").style.paddingLeft = (246 + (w - 1920) / 2) + "px";
        document.getElementById("boxFooter").style.paddingRight = (246 + (w - 1920) / 2) + "px";
        

        //image portfolio
        let wp = $(".imagePort").width();
        $(".imagePort").css("height", wp * (4 / 3) + "px");

        //image news

        let wi = $(".boxImageNews").width();
        $(".news").css("background-color", "rgb(235, 235, 235)");
        $(".boxNewsAndPromotion").css("max-height", wi * (4 / 3) + "px");
        $(".boxImageNews").css("max-height", wi * (4 / 3) + "px");
        $(".boxImagePromotion").css("max-height", wi * (4 / 3) + "px");
        $(".boxNewsAndPromotion").css("height", wi * (4 / 3) + "px");
        $(".boxImageNews").css("height", wi * (4 / 3) + "px");
        $(".boxImagePromotion").css("height", wi * (4 / 3) + "px");

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "33.33%");
        $(".services .boxservices .boxicon .b").css("width", "33.33%");
        $(".services .boxservices .boxicon .c").css("width", "33.33%");
    }
    if (w < 1920 && w >= 1280) {
        document.getElementById("boxheader").style.paddingLeft = "100px";
        document.getElementById("boxheader").style.paddingRight = "100px";
        document.getElementById("menu_down").style.right = "100px";

        document.getElementById("about").style.paddingLeft = "100px";
        document.getElementById("about").style.paddingRight = "100px";
        document.getElementById("boxservices").style.paddingLeft = "100px";
        document.getElementById("boxservices").style.paddingRight = "100px";
        document.getElementById("boxTitlePort").style.paddingLeft = "100px";
        document.getElementById("boxTitlePort").style.paddingRight = "100px";
        document.getElementById("boxContact").style.paddingLeft = "200px";
        document.getElementById("boxContact").style.paddingRight = "200px";
        document.getElementById("boxFooter").style.paddingLeft = "100px";
        document.getElementById("boxFooter").style.paddingRight = "100px";

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "33.33%");
        $(".services .boxservices .boxicon .b").css("width", "33.33%");
        $(".services .boxservices .boxicon .c").css("width", "33.33%");
    }
    if (w < 1280 && w >= 1024) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("menu_down").style.right = "10px";
        document.getElementById("about").style.paddingLeft = "10px";
        document.getElementById("about").style.paddingRight = "10px";
        document.getElementById("boxservices").style.paddingLeft = "10px";
        document.getElementById("boxservices").style.paddingRight = "10px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxContact").style.paddingLeft = "200px";
        document.getElementById("boxContact").style.paddingRight = "200px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "50%");
        $(".services .boxservices .boxicon .b").css("width", "50%");
        $(".services .boxservices .boxicon .c").css("width", "50%");
    }
    if (w < 1024 && w >= 768) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("menu_down").style.right = "10px";
        document.getElementById("about").style.paddingLeft = "10px";
        document.getElementById("about").style.paddingRight = "10px";
        document.getElementById("boxservices").style.paddingLeft = "10px";
        document.getElementById("boxservices").style.paddingRight = "10px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxContact").style.paddingLeft = "150px";
        document.getElementById("boxContact").style.paddingRight = "150px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";
        

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "100%");
        $(".services .boxservices .boxicon .b").css("width", "100%");
        $(".services .boxservices .boxicon .c").css("width", "100%");
    }

    if (w < 768 && w >= 550) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("menu_down").style.right = "10px";
        document.getElementById("about").style.paddingLeft = "10px";
        document.getElementById("about").style.paddingRight = "10px";
        document.getElementById("boxservices").style.paddingLeft = "10px";
        document.getElementById("boxservices").style.paddingRight = "10px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxContact").style.paddingLeft = "50px";
        document.getElementById("boxContact").style.paddingRight = "50px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "100%");
        $(".services .boxservices .boxicon .b").css("width", "100%");
        $(".services .boxservices .boxicon .c").css("width", "100%");
    }

    if (w < 550 && w >= 0) {
        document.getElementById("boxheader").style.paddingLeft = "10px";
        document.getElementById("boxheader").style.paddingRight = "10px";
        document.getElementById("menu_down").style.right = "10px";
        document.getElementById("about").style.paddingLeft = "10px";
        document.getElementById("about").style.paddingRight = "10px";
        document.getElementById("boxservices").style.paddingLeft = "10px";
        document.getElementById("boxservices").style.paddingRight = "10px";
        document.getElementById("boxTitlePort").style.paddingLeft = "10px";
        document.getElementById("boxTitlePort").style.paddingRight = "10px";
        document.getElementById("boxContact").style.paddingLeft = "50px";
        document.getElementById("boxContact").style.paddingRight = "50px";
        document.getElementById("boxFooter").style.paddingLeft = "10px";
        document.getElementById("boxFooter").style.paddingRight = "10px";

        //Responsive
        $(".services .boxservices .boxicon .a").css("width", "100%");
        $(".services .boxservices .boxicon .b").css("width", "100%");
        $(".services .boxservices .boxicon .c").css("width", "100%");
    }

    let wItem = $(".portfolio .boxContentPort .boxSlideImagePort .owl-carousel .item").width();
    if (w >= 700) {
        $(".portfolio .boxContentPort").css("height", wItem * (5 / 3));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung ").css("top", "-61px");
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung").css("height", wItem * (1 / 2.8));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung2").css("height", wItem * (1 / 2.8));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung2").css("top", wItem * (4.1 / 3));
    } else {
        $(".portfolio .boxContentPort").css("height", wItem * (5.5 / 3));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung ").css("top", "-50px");
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung").css("height", wItem * (1 / 2.5));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung2").css("height", wItem * (1 / 2.5));
        $(".portfolio .boxContentPort .boxSlideImagePort .vongcung2").css("top", wItem * (4.3 / 3));
    }

    $(".portfolio .boxContentPort .boxSlideImagePort .owl-carousel .item").css("height", wItem * (4 / 3));
    $(".portfolio .boxContentPort .boxSlideImagePort .owl-carousel .item img").css("height", wItem * (4 / 3));
    $(".portfolio .boxContentPort .boxSlideImagePort .divleft").css("width", wItem * (6 / 10));
    $(".portfolio .boxContentPort .boxSlideImagePort .divright").css("width", wItem * (6 / 10));
    $(".portfolio .boxContentPort .boxSlideImagePort .divleft").css("height", wItem * (4.6 / 3));
    $(".portfolio .boxContentPort .boxSlideImagePort .divright").css("height", wItem * (4.6 / 3));
    $(".portfolio .boxContentPort .boxSlideImagePort .vongcung").css("width", $(window).width() + 400);
    $(".portfolio .boxContentPort .boxSlideImagePort .vongcung2").css("width", $(window).width() + 400);
    $(".portfolio .boxContentPort .boxSlideImagePort .boxDivLeftRight").css("width", $(window).width());

}

/*Lien he*******************************/
var listLienhe = "hide";
var formchat = "off";
var xBtn, yBtn, xForm, yForm;
$(document).ready(function() {
    let w = $(window).width();
    if (w >= 1024) {
        xBtn = 125;
        yBtn = 435;
        xForm = 125;
        yForm = 125
    } else {
        xBtn = 80;
        yBtn = 1200;
        xForm = 10;
        yForm = 1200;
    }
    $(".sendChat").hide();
    setInterval(changeIconLienHe, 1000);
    var indexIcon = 1;

    function changeIconLienHe() {
        if (indexIcon == 0) {
            $(".boxLienhe1").css("opacity", "1");
            $(".boxLienhe2").css("opacity", "0");
            $(".boxLienhe3").css("opacity", "0");
            $(".boxLienhe3").css("transform", "translateX(" + (-(indexIcon) * 100) + "%)");
            indexIcon = indexIcon + 1;
        } else {
            $(".boxLienhe1").css("opacity", "0");
            $(".boxLienhe2").css("opacity", "1");
            $(".boxLienhe3").css("opacity", "1");
            $(".boxLienhe3").css("transform", "translateX(" + (-(indexIcon - 1) * 100) + "%)");
            if (indexIcon == 4) {
                indexIcon = 0
            } else {
                indexIcon = indexIcon + 1;
            }
        }
    }

    $(".startCall").click(function() {
        let phone = $(this).attr("data-phone");
        window.location.href = `tel:${phone}`;
    });

    //Còn kakaotalk
    $(".startKakao").click(function(){
        window.location.href = `http://qr.kakao.com/talk/IPA072yiLXSQ6DdWWhw_FIxtRpE-`;
    })

    $(".startEmail").click(function() {
        let email = $(this).attr("data-email");
        window.location.href = `mailto:${email}`;
    });


    //click start in List Lien He
    $(".startChat").click(function() {
        $(".formchat").show(0);
        $(".closeStartChat").show();
        $(".listLienhe").hide(200);
        $(".closeListLienhe").hide();
        $(".lienhe1").show();
        $(".lienhe2").show();
        $(".lienhe3").show();
        $(".formchat").css("right", xForm) //di chuyen form chat sang trai
        $(".closeStartChat").css("right", xBtn) //di chuyen sang phai
        $(".miniChat").css("right", xBtn) //di chuyen sang phai
        listLienhe = "hide";
        formchat = "on";

        var emailguest = $(this).attr("data-emailguest");
        if(emailguest == ""){
            $(".contentChat").html(`
                <p class="getInfoChat">Hi! Please fill in some info below<br>to start chattting me</p>
                <input class="getInfoChat nameInfoChat" type="text" placeholder="Your Name">
                <input class="getInfoChat emailInfoChat" type="email" placeholder="Your Email">
                <button class="getInfoChat sendInfoChat" onclick="sendInfoChat()">Start chat</button>
            `);
        }else{
            loadMessage(emailguest);
        }
    });

    //close start chat
    $(".closeStartChat").click(function() {
        $(".formchat").hide(0);
        $(".closeStartChat").hide();
        formchat = "off";

        //tra ve vi tri 125px sau 0.2s
        setTimeout(function() {
            $(".formchat").css("right", xForm) //di chuyen form chat sang trai
            $(".closeStartChat").css("right", xBtn) //di chuyen sang phai
            $(".miniChat").css("right", xBtn) //di chuyen sang phai
        }, 200);
    });




    //mini chat click(thu nhỏ hoặc mở to form chat)
    $(".miniChat").click(function() {
        if ($(".formchat").css("display") == "none") {
            $(".formchat").show(0);
        } else {
            $(".formchat").hide(0);
        }
    });


    //close form chat
    $(".closeChat").click(function() {
        $(".closeChat").hide();
        $(".formchat").hide(0);
        $(".miniChat").hide();
        $(".closeStartChat").hide();
        formchat = "off";
        $(".formchat").css("right", xForm) //di chuyen form chat sang phai
        $(".closeStartChat").css("right", xBtn) //di chuyen sang phai
        $(".miniChat").css("right", xBtn) //di chuyen sang phai

        //chuyen form ve trang thai lấy thông tin
        document.getElementById("titleFormChat").innerHTML = "Let’s chat? - Online";
        document.getElementById("contentChat").innerHTML = `
                                <p class="getInfoChat">Hi! Please fill in some info below<br>to start chattting me</p>
                                <input class="getInfoChat nameInfoChat" type="text" placeholder="Your Name">
                                <input class="getInfoChat emailInfoChat" type="email" placeholder="Your Email">
                                <button class="getInfoChat sendInfoChat" onclick="sendInfoChat()">Start chat</button>
                                `
        $(".sendChat").hide(); //phần nhập tin nhắn
    });


    $('.contentChat').bind('DOMNodeInserted DOMNodeRemoved', function() {
        $(".contentChat").animate({ scrollTop: 1000000 }, 0);
    });
});

function getListContact() {
    let w = $(window).width();
    if (w >= 1024) {
        xBtn = 125;
        yBtn = 435;
        xForm = 125;
        yForm = 435
    } else {
        xBtn = 80;
        yBtn = 1200;
        xForm = 10;
        yForm = 1200;
    }
    if (listLienhe == "hide") {
        $(".listLienhe").show(200);
        $(".closeListLienhe").show();
        $(".lienhe1").hide();
        $(".lienhe2").hide();
        $(".lienhe3").hide();

        if (formchat == "on") {
            $(".formchat").css("right", yForm) //di chuyen form chat sang phai
            $(".closeStartChat").css("right", yBtn) //di chuyen sang phai
            $(".miniChat").css("right", yBtn) //di chuyen sang phai
        }
        listLienhe = "show";
    } else {
        $(".listLienhe").hide(200);
        $(".closeListLienhe").hide();
        $(".lienhe1").show();
        $(".lienhe2").show();
        $(".lienhe3").show();

        if (formchat == "on") {
            $(".formchat").css("right", xForm) //di chuyen form chat sang phai
            $(".closeStartChat").css("right", xBtn) //di chuyen sang phai
            $(".miniChat").css("right", xBtn) //di chuyen sang phai
        }
        listLienhe = "hide";
    }
}

function sendInfoChat() {
    //Kết nối tới server socket đang lắng nghe
    var socket = io();
    let name = $(".nameInfoChat").val().replace(/\s+/g, '');
    let email = $(".emailInfoChat").val().replace(/\s+/g, '');
    if (name.length === 0 || email.length === 0) {
        if(name.length === 0){
            $(".nameInfoChat").focus();
        }else{
            $(".emailInfoChat").focus();
        }
    } else {
        var dataform = new FormData();
        dataform.append("name", name);
        dataform.append("email", email);
        dataform.append("phone", "");
        dataform.append("title", "");
        dataform.append("message", "");
        $.ajax({
            type: "POST",
            url: "/sendinfochat", //HomeController
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                loadMessage(email);
                $(".startChat").attr("data-emailguest", data.email);
                $("#sendMessage").attr("data-email", email);
                //setTimeout(function() {
                //    $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 0); 
                //}, 700);
                socket.emit('boxchat', {name: data.name, email: data.email, phone:data.phone, lastmessage:data.lastmessage, status:data.status, lasttime:data.lasttime});
            },
            error: function() {
                alert("Error!");
            }
        });
    }
}

function loadMessage(emailguest){
    //chuyển form sang trạng thái nhắn tin
    document.getElementById("titleFormChat").innerHTML = "Admin";
    $(".closeChat").show();
    $(".closeStartChat").hide();
    $(".miniChat").show();

    $(".sendChat").show(); //phần nhập tin nhắn
    var dataform = new FormData();
    dataform.append("email", emailguest);
    dataform.append("countload", 1); //để load tin nhắn dạng phân trang(nhưng chưa dùng đến)
    $.ajax({
        type: "POST",
        url: "/loadmessage", //HomeController
        cache: false,
        contentType: false,
        processData: false,
        data: dataform,
        success: function(data) {
            $(".contentChat").html('');
            data.forEach(message => {
                if(message.userpost == "admin"){
                    if(message.kind == "text"){
                        $(".contentChat").prepend(`
                            <div class="left">
                                <p class="content">${message.message}</p>
                            </div>
                        `);
                    }
                    if(message.kind == "file"){
                        $(".contentChat").prepend(`
                            <div class="left">
                                <p class="content">
                                    <a class="content" href="/files/$${message.name}" target="_blank">${message.message}</a>
                                </p>
                            </div>
                        `);
                    }
                    if(message.kind == "image"){
                        $(".contentChat").prepend(`
                            <div class="left">
                                <div class="image-chat">
                                <a href="/images/${message.name}" target="_blank"><img src="/images/${message.name}" alt="image"></a>
                                </div>
                            </div>
                        `);
                    }
                    if(message.kind == "time"){
                        $(".contentChat").prepend(`
                            <div class="time">
                                <p>${message.message}</p>
                            </div>
                        `);
                    }
                }else{
                    if(message.kind == "text"){
                        $(".contentChat").prepend(`
                            <div class="right">
                                <p class="content">${message.message}</p>
                            </div>
                        `);
                    }
                    if(message.kind == "file"){
                        $(".contentChat").prepend(`
                            <div class="right">
                                <p class="content">
                                    <a class="content" href="/files/$${message.name}" target="_blank">${message.message}</a>
                                </p>
                            </div>
                        `);
                    }
                    if(message.kind == "image"){
                        $(".contentChat").prepend(`
                            <div class="right">
                                <div class="image-chat">
                                <a href="/images/${message.name}" target="_blank"><img src="/images/${message.name}" alt="image"></a>
                                </div>
                            </div>
                        `);
                    }
                }
            });
        },
        error: function() {
            alert("Error!");
            $(".btnIconStartChat").attr("data-email", "");
        }
    });
}
