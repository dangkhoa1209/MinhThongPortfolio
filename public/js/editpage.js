$(document).ready(function() {
    $(".editabout").show();
    $(".editbanner").hide();
    $(".editportfolio").hide();
    $(".editnew").hide();
    $(".information").hide();
    $(".reset").hide();


    $(".link-about").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-about").addClass("underline");
        $(".editabout").show(200);
        $(".editbanner").hide();
        $(".editportfolio").hide();
        $(".editnew").hide();
        $(".information").hide();
        $(".reset").hide();
    });
    $(".link-banner").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-banner").addClass("underline");
        $(".editabout").hide();
        $(".editbanner").show(200);
        $(".editportfolio").hide();
        $(".editnew").hide();
        $(".information").hide();
        $(".reset").hide();
    });
    $(".link-portfolio").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-portfolio").addClass("underline");
        $(".editabout").hide();
        $(".editbanner").hide();
        $(".editportfolio").show(200);
        $(".editnew").hide();
        $(".information").hide();
        $(".reset").hide();
    });
    $(".link-news").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-news").addClass("underline");
        $(".editabout").hide();
        $(".editbanner").hide();
        $(".editportfolio").hide();
        $(".editnew").show(200);
        $(".information").hide();
        $(".reset").hide();
    });
    $(".link-info").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-info").addClass("underline");
        $(".editabout").hide();
        $(".editbanner").hide();
        $(".editportfolio").hide();
        $(".editnew").hide();
        $(".information").show(200);
        $(".reset").hide();
    });
    $(".link-reset").click((e) => {
        e.preventDefault();
        $("*").removeClass("underline");
        $(".link-reset").addClass("underline");
        $(".editabout").hide();
        $(".editbanner").hide();
        $(".editportfolio").hide();
        $(".editnew").hide();
        $(".information").hide();
        $(".reset").show(200);
    });

    //chieu cao images portfolio
    let h = $(window).height();
    $(".editportfolio .b .images").css("height", h - 240);
    //chieu cao thanh cuon cua news
    $(".editnew .b .b2").css("height", h - 155);
    $(window).resize(function() {
        let h = $(window).height();
        $(".editportfolio .b .images").css("height", h - 240);
        $(".editnew .b .b2").css("height", h - 155);
    });

    //xem truoc anh logo khi chon
    $("#inputLogo").on('change', function() {
        //Get count of selected files
        var countFiles = $(this)[0].files.length;

        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {

                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {

                    let reader = new FileReader();
                    reader.onload = function(e) {
                        $("#boximage").html(`<img id="imageLogo" class="image" src="${e.target.result}" alt="logo">`);
                    }
                    reader.readAsDataURL($(this)[0].files[i]);

                }

            } else {
                alert("This browser does not support FileReader.");
            }
        }
    });

    //xem truoc anh va vidoe banner khi chon
    $("#inputImageBanner").on('change', function() {
        //Get count of selected files
        var countFiles = $(this)[0].files.length;

        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {

                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {

                    let reader = new FileReader();
                    reader.onload = function(e) {
                        $("#boximageBanner").html(`<img id="inputImgLogo" class="image" src="${e.target.result}" alt="logo">`);
                    }
                    reader.readAsDataURL($(this)[0].files[i]);

                }

            } else {
                alert("This browser does not support FileReader.");
            }
        } else {
            $("#boximageBanner").html(`
        		<video class="videoBanner" autoplay loop muted playsinline>
                    <source src="${URL.createObjectURL(this.files[0])}" id="videologo" class="image">
                    Your browser does not support HTML5 video.
                </video>
        	`);
        }
    });

    //xem truoc anh portfolio khi chon
    $("#inputImgPortfolio").on('change', function() {
        //Get count of selected files
        var countFiles = $(this)[0].files.length;

        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg" || extn == "svg") {
            if (typeof(FileReader) != "undefined") {

                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {

                    let reader = new FileReader();
                    reader.onload = function(e) {
                        $("#boxImagePortfolio").html(`<img id="imageLogo" src="${e.target.result}" alt="portfolio">`);
                    }
                    reader.readAsDataURL($(this)[0].files[i]);

                }

            } else {
                alert("This browser does not support FileReader.");
            }
        }
    });

    //xem truoc anh news khi chon
    $("#inputImgNews").on('change', function() {
        //Get count of selected files
        var countFiles = $(this)[0].files.length;

        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg" || extn == "svg") {
            if (typeof(FileReader) != "undefined") {
                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        $("#boxImageNews").html(`<img id="imageLogo" src="${e.target.result}" alt="portfolio">`);
                    }
                    reader.readAsDataURL($(this)[0].files[i]);

                }

            } else {
                alert("This browser does not support FileReader.");
            }
        }
    });

    //btn all product promotion 
    $(".all-btn").click(function() {
        $(".all-btn").css("background-color", "rgb(150, 150, 150)");
        $(".product-btn").css("background-color", "rgb(200, 200, 200)");
        $(".promotion-btn").css("background-color", "rgb(200, 200, 200)");
    });
    $(".product-btn").click(function() {
        $(".all-btn").css("background-color", "rgb(200, 200, 200)");
        $(".product-btn").css("background-color", "rgb(150, 150, 150)");
        $(".promotion-btn").css("background-color", "rgb(200, 200, 200)");
    });
    $(".promotion-btn").click(function() {
        $(".all-btn").css("background-color", "rgb(200, 200, 200)");
        $(".product-btn").css("background-color", "rgb(200, 200, 200)");
        $(".promotion-btn").css("background-color", "rgb(150, 150, 150)");
    });

    //News
    $(".btnn").click(function() {
        let filter = $(this).attr("data-filter");
        if (filter == "all") {
            $(".imagenews").show(100);
            $(".btnnewNews").show(100);
        }

        if (filter == "newproduct") {
            $(".promotion").hide(100);
            $(".newproduct").show(100);
            $(".btnnewNews").hide(100);
        }

        if (filter == "promotion") {
            $(".newproduct").hide(100);
            $(".promotion").show(100);
            $(".btnnewNews").hide(100);
        }
    });

    /////////// UPDATE LOGO /////////////////////////////////////////////////////
    $(".updateLogo").submit((e) => {
        e.preventDefault();
        let id = $(".updateLogoBtn").attr("data-idhome");
        let oldlogo = $(".updateLogoBtn").attr("data-oldlogo");
        let logo = $("#inputLogo")[0].files;

        var dataform = new FormData();
        dataform.append("id", id);
        dataform.append("oldlogo", oldlogo);
        var checkError = true;
        if (logo.length > 0) {
            for (let i = 0; i < logo.length; i++) {
                checkError = false;
                dataform.append("logo[]", document.getElementById("inputLogo").files[i]);
            }
        }

        if (!checkError) {
            $.ajax({
                type: 'POST',
                url: '/updatelogo',
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    $(".img-logo").attr("src", "/imagesSystem/logo/"+data.logo);
                    $(".updateLogoBtn").attr("data-oldlogo", data.logo)
                    $("#inputLogo").val("");
                    alert("Update logo successful");
                },
                error: function() {
                    alert("Error");
                }

            })
        } else {
            alert("Please choose a new logo file!")
        }
    });

    $("#formUpdateAbout").submit((e) => {
        e.preventDefault();
        var id =  $("#btnUpdateAbout").attr("data-idhome");
        var title = $("#inputTitleAbout").val();
        var oldtitle = $("#inputTitleAbout").attr("data-oldTitleAbout");
        var content = $("#inputContentAbout").val();
        var oldcontent = $("#inputContentAbout").attr("data-oldContentAbout");
        if(title != oldtitle || content != oldcontent){
            var dataform = new FormData();
            dataform.append("id", id);
            dataform.append("title", title);
            dataform.append("content", content);
            $.ajax({
                type: 'POST',
                url: '/updateabout',
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    $("#inputTitleAbout").attr("data-oldTitleAbout", title);
                    $("#inputContentAbout").attr("data-oldContentAbout", content);
                    alert("Update about successful");
                },
                error: function() {
                    alert("Error");
                }

            })
        }else{
            alert("Data is unchanged!")
        }

    });

    $("#formUpdateBanner").submit((e) => {
        e.preventDefault();
        var id = $("#btnUpdateBanner").attr("data-idhome");
        var title = $("#inputTitleBanner").val();
        var oldtitle = $("#inputTitleBanner").attr("data-oldtitle");
        var kindBanner = "";
        var banner = $("#inputImageBanner")[0].files;

        if(banner.length == 0 && title == oldtitle){
            alert("Data is unchanged!")
        }else{
            if(banner.length != 0){
                var imgPath = $("#inputImageBanner")[0].value;
                var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
                if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg" || extn == "svg") {
                    kindBanner = "image";
                }else{
                    kindBanner = "video";
                }
            }
        }
        var dataform = new FormData();
        dataform.append("id", id);
        dataform.append("title", title);
        dataform.append("kindbanner", kindBanner);
        if (banner.length > 0) {
            for (let i = 0; i < banner.length; i++) {
                dataform.append("banner[]", document.getElementById("inputImageBanner").files[i]);
            }
        }
        $.ajax({
            type: "POST",
            url: "/updatebanner",
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                alert("Update banner successful");
            },
            error: function() {
                alert("Error");
            }
        });
        
    });

    //Portfolio DOM  data
    $(".imageListPortfolio").click(function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        var image = $(this).attr("data-image");
        var name = $(this).attr("data-name");
        var introduce = $(this).attr("data-introduce");
        var kindProduct = $(this).attr("data-kindProduct");
        
        $("#boxImagePortfolio").html(`<img id="imageLogo" src="/images/${image}" alt="portfolio">`);
        $("#inputNamePortfolio").val(name);
        $("#inputIntroducePortfolio").val(introduce);
        if(kindProduct == "null"){
            document.getElementById(`optionnone`).selected = "true";
        }else{
            document.getElementById(`option${kindProduct}`).selected = "true";
        }
        $("#btnDeletePortfolio").show();
        $("#btnSureDeletePortfolio").attr("data-id", id);
        $("#btnSavePortfolio").attr("data-kindbtnsave", "update");
        $("#btnSavePortfolio").attr("data-id", id);
        $("#btnSavePortfolio").attr("data-oldimagename", name);
        $("#btnSavePortfolio").attr("data-oldkindProduct", kindProduct);
        $("#btnSavePortfolio").attr("data-oldintroduce", introduce);
        $("#inputImgPortfolio").val("");
    })

    

    //Portfolio DOM  data new
    $("#btnDeletePortfolio").hide();
    $("#newPortfolio").click(function(e){
        e.preventDefault();
        $("#boxImagePortfolio").html(``);
        $("#inputNamePortfolio").val("");
        $("#inputIntroducePortfolio").val("");
        document.getElementById(`optionnone`).selected = "true";
        $("#btnDeletePortfolio").hide();
        $("#btnSureDeletePortfolio").attr("data-id", "");
        $("#btnSavePortfolio").attr("data-kindbtnsave", "create");
        $("#btnDeletePortfolio").hide();
        $("#inputImgPortfolio").val("");
    })

    //Create portfolio
    $("#formUpdatePortfolio").submit((e) => {
        e.preventDefault();
        var kind = $("#btnSavePortfolio").attr("data-kindbtnsave");
        var image = $("#inputImgPortfolio")[0].files;
        var nameimage = $("#inputNamePortfolio").val();
        var introduce = $("#inputIntroducePortfolio").val();
        var kindProduct = $("#inputKindPortfolio").val();
        if(kindProduct == null){
            kindProduct = "otherproduct";
        }
        var dataform = new FormData();
        if(kind == "create"){
            if(image.length > 0){
                dataform.append("nameimage", nameimage);
                dataform.append("introduce", introduce);
                dataform.append("kindProduct", kindProduct);
                for (let i = 0; i < image.length; i++) {
                    checkError = false;
                    dataform.append("image[]", document.getElementById("inputImgPortfolio").files[i]);
                }

                $.ajax({
                    type: "POST",
                    url: "/createportfolio",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: dataform,
                    success: function(data) {
                        $(".images").prepend(`
                            <div class="image imageListPortfolio port${data._id}" onclick="imageListPortfolio(this)" data-id="${data._id}" data-image="${data.image}" data-name="${data.name}" data-introduce="${data.introduce}" data-kindProduct="${data.kindProduct}">
                                <img src="/images/${data.image}" alt="portfolio" />
                            </div>
                        `)
                        //cap nhat but delete port
                        $("#btnDeletePortfolio").show();
                        $("#btnSureDeletePortfolio").attr("data-id", data._id);
                        //chuyen button save tu create sang update
                        $("#btnSavePortfolio").attr("data-kindbtnsave", "update");
                        $("#btnSavePortfolio").attr("data-id", data._id);
                        $("#btnSavePortfolio").attr("data-oldimagename", data.name);
                        $("#btnSavePortfolio").attr("data-oldkindProduct", data.kindProduct);
                        $("#btnSavePortfolio").attr("data-oldintroduce", data.introduce);
                        //xoa du lieu the input
                        $("#inputImgPortfolio").val("");
                    },
                    error: function() {
                        alert("Error create portfolio");
                    }
                });
            }else{
                alert("Please choose image!");
            }
        }else{
            //update portfolio
            var id = $("#btnSavePortfolio").attr("data-id");
            var oldimagenam = $("#btnSavePortfolio").attr("data-oldimagename");
            var oldkindproduct = $("#btnSavePortfolio").attr("data-oldkindProduct");
            var oldintroduce = $("#btnSavePortfolio").attr("data-oldintroduce");

            var nameimage = $("#inputNamePortfolio").val();
            var introduce = $("#inputIntroducePortfolio").val();
            var kindProduct = $("#inputKindPortfolio").val();

            var image = $("#inputImgPortfolio")[0].files;

            if(image.length == 0){
                if(nameimage != oldimagenam || oldkindproduct != kindProduct || oldintroduce != introduce){
                    var dataform = new FormData();
                    dataform.append("id", id);
                    dataform.append("nameimage", nameimage);
                    dataform.append("introduce", introduce);
                    dataform.append("kindProduct", kindProduct);
                    $.ajax({
                        type: "POST",
                        url: "/updateportfolionotimage",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: dataform,
                        success: function(data) {
                            alert("Update portfolio successful");
                            $(`.port${id}`).attr("data-name", nameimage);
                            $(`.port${id}`).attr("data-kindproduct", kindProduct);
                            $(`.port${id}`).attr("data-introduce", introduce);
                            $("#btnSavePortfolio").attr("data-oldimagename", nameimage);
                            $("#btnSavePortfolio").attr("data-oldkindProduct", kindProduct);
                            $("#btnSavePortfolio").attr("data-oldintroduce", introduce);
                        },
                        error: function() {
                            alert("Error update portfolio");
                        }
                    });
                }else{
                    alert("Data is unchanged!")
                }
            }else{
                var dataform = new FormData();
                dataform.append("id", id);
                dataform.append("nameimage", nameimage);
                dataform.append("introduce", introduce);
                dataform.append("kindProduct", kindProduct);
                for (let i = 0; i < image.length; i++) {
                    dataform.append("image[]", document.getElementById("inputImgPortfolio").files[i]);
                }
                $.ajax({
                    type: "POST",
                    url: "/updateportfoliohaveimage",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: dataform,
                    success: function(data) {
                        //data is image
                        alert("Update portfolio successful");
                        $(`.port${id}`).attr("data-name", nameimage);
                        $(`.port${id}`).attr("data-kindproduct", kindProduct);
                        $(`.port${id}`).attr("data-introduce", introduce);
                        $("#btnSavePortfolio").attr("data-oldimagename", nameimage);
                        $("#btnSavePortfolio").attr("data-oldkindProduct", kindProduct);
                        $("#btnSavePortfolio").attr("data-oldintroduce", introduce);
                        $(`.port${id} img`).attr("src", "/images/"+data);
                        //xoa du lieu the input
                        $("#inputImgPortfolio").val("");
                    },
                    error: function() {
                        alert("Error update portfolio");
                    }
                });
            }
            
        }
    });

    //Delete Portfolio
    $("#btnSureDeletePortfolio").click((e) => {
        e.preventDefault();
        $('#removePortfolio').modal('toggle');
        var id = $("#btnSureDeletePortfolio").attr("data-id");
        var dataform = new FormData();
        dataform.append("id", id);
        $.ajax({
            type: "POST",
            url: "/deleteportfolio",
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                //xoa image in list images
                $(`.port${id}`).hide(200);
                //dom new port
                $("#boxImagePortfolio").html(``);
                $("#inputNamePortfolio").val("");
                $("#inputIntroducePortfolio").val("");
                document.getElementById(`optionnone`).selected = "true";
                $("#btnDeletePortfolio").hide();
                $("#btnSureDeletePortfolio").attr("data-id", "");
                $("#btnSavePortfolio").attr("data-kindbtnsave", "create");
                $("#btnDeletePortfolio").hide();
            },
            error: function() {
                alert("Error delete portfolio");
            }
        });
    })

    //News DOM  data
    $(".imagenews").click(function(e){
        var id = $(this).attr("data-id");
        var image = $(this).attr("data-image");
        var kindNews = $(this).attr("data-kindNews");
        if(image == ""){
            $("#boxImageNews").html(``);
            document.getElementById("optionnewnone").selected = "true";
            $(".btnCreateNew").show();
            $(".btnDeleteNew").hide();
        }else{
            $("#boxImageNews").html(`
                <img src="/images/${image}" alt="imageNew" />
            `);
            document.getElementById(`option${kindNews}`).selected = "true";
            $(".btnCreateNew").hide();
            $(".btnDeleteNew").show();
            $("#btnSureDeleteNews").attr("data-id", id);
        }
    });

    //delete new
    $(".btnDeleteNew").hide();
    $("#btnSureDeleteNews").click(function(e){
        var id = $(this).attr("data-id");
        var dataform = new FormData();
        dataform.append("id", id);
        $.ajax({
            type: "POST",
            url: "/deletenews",
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                $("#boxImageNews").html(``);
                document.getElementById("optionnewnone").selected = "true";
                $(".btnCreateNew").show();
                $(".btnDeleteNew").hide();
                $('#removeNews').modal('toggle');
                $(`.listnew${id}`).remove();
            },
            error: function() {
                alert("Error delete portfolio");
            }
        });
    })

    //create news
    $(".btnCreateNew").click(function(e){
        var image = $("#inputImgNews")[0].files;
        var kindNews = $("#inputKindNews").val();
        if(image.length != 0 && kindNews != null){
            var dataform = new FormData();
            dataform.append("kindNews", kindNews);
            for (let i = 0; i < image.length; i++) {
                dataform.append("image[]", document.getElementById("inputImgNews").files[i]);
            }
            $.ajax({
                type: "POST",
                url: "/createnews",
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    $( ".btnnewNews" ).after(`
                        <div class="imagenews ${data.kindNews} listnew${data._id}" data-id="${data._id}" data-image="${data.image}" data-kindNews="${data.kindNews}">
                            <img src="/images/${data.image}" alt="News" />
                        </div>
                    `);
                    $("#inputImgNews").val("");
                    $(".btnCreateNew").hide();
                    $(".btnDeleteNew").show();
                    $("#btnSureDeleteNews").attr("data-id", data._id);
                },
                error: function() {
                    alert("Error create portfolio");
                }
            });
        }else{
            alert("Please enter full information");
        }
    });

    //save thong tin của admin
    $("#btnsaveinformation").click(function(){
        var phonecontactold = $(this).attr("data-phonec");
        var emailcontactold = $(this).attr("data-emailc");
        var kakaocontactold = $(this).attr("data-kakaoc");
        var emailold = $(this).attr("data-email");
        var pwdold = $(this).attr("data-pwd");

        var phonecontact = $("#phonecontact").val();
        var emailcontact = $("#emailcontact").val();
        var kakaocontact = $("#kakaocontact").val();
        var email = $("#emailemail").val();
        var pwd = $("#passwordemail").val();

        if(phonecontactold != phonecontact || emailcontactold != emailcontact || kakaocontactold != kakaocontact || emailold != email || pwdold != pwd){
            var dataform = new FormData();
            dataform.append("phonecontact", phonecontact);
            dataform.append("emailcontact", emailcontact);
            dataform.append("kakaocontact", kakaocontact);
            dataform.append("email", email);
            dataform.append("pwd", pwd);

            $.ajax({
                type: "POST",
                url: "/updateinformation",
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    alert("Update successful");
                },
                error: function() {
                    alert("Error update information");
                }
            });
        }else{
            alert("Information is unchanged");
        }
    });

    //Sure reset page
    $("#btnSureReset").click(function(){
        var dataform = new FormData();
        dataform.append("codereset", "resetpage")
        $.ajax({
            type: "POST",
            url: "/systemreset",
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                alert("Reset sytem successful");
                $('#ResetPage').modal('hide');
            },
            error: function() {
                alert("Error update information");
            }
        });
    });

});

//Portfolio DOM  data new product
function imageListPortfolio(e){
    var id = $(e).attr("data-id");
    var image = $(e).attr("data-image");
    var name = $(e).attr("data-name");
    var introduce = $(e).attr("data-introduce");
    var kindProduct = $(e).attr("data-kindProduct");
    
    $("#boxImagePortfolio").html(`<img id="imageLogo" src="/images/${image}" alt="portfolio">`);
    $("#inputNamePortfolio").val(name);
    $("#inputIntroducePortfolio").val(introduce);
    if(kindProduct == "null"){
        document.getElementById(`optionnone`).selected = "true";
    }else{
        document.getElementById(`option${kindProduct}`).selected = "true";
    }
    $("#btnDeletePortfolio").show();
    $("#btnSureDeletePortfolio").attr("data-id", id);
    $("#btnSavePortfolio").attr("data-kindbtnsave", "update");
    $("#btnSavePortfolio").attr("data-id", id);
    $("#btnSavePortfolio").attr("data-oldimagename", name);
    $("#btnSavePortfolio").attr("data-oldkindProduct", kindProduct);
    $("#btnSavePortfolio").attr("data-oldintroduce", introduce);
}
