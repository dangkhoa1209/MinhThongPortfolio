$(document).ready(function() {
    //Kết nối tới server socket đang lắng nghe
    var socket = io();

    $("#find").click(function() {
        $("#finduser").focus();
    });

    let h = $(window).height();
    let w = $(window).width();
    //chieu cao user
    $(".users").css("height", h - 103);
    //chieu rong contentchat
    wtmp = w
    if (wtmp > 1000) {
        wtmp = wtmp - $(".userchat").width() - $(".infousers").width() - 1;
    } else {
        wtmp = wtmp - $(".userchat").width() - 1;
    }
    $(".boxchat").css("width", wtmp);
    //chieu cao centent chat
    $(".content-chat").css("height", h - $(".name").height() - $(".input-chat").height() - 70);
    //chieu cao cua infousers khi chua load image va file
    $(".infousers").css("height", h);
    //chieu cao images
    $(".images").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
    //chieu cao files
    $(".files").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
    $(window).resize(function() {
        let h = $(window).height();
        let w = $(window).width();
        //chieu cao user
        $(".users").css("height", h - 103);
        //chieu rong contentchat
        wtmp = w
        if (wtmp > 1000) {
            wtmp = wtmp - $(".userchat").width() - $(".infousers").width() - 1;
        } else {
            wtmp = wtmp - $(".userchat").width() - 1;
        }
        $(".boxchat").css("width", wtmp);
        //chieu cao centent chat
        $(".content-chat").css("height", h - $(".name").height() - $(".input-chat").height() - 70);
        //chieu cao cua infousers khi chua load image va file
        $(".infousers").css("height", h);
        //chieu cao images
        $(".images").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
        //chieu cao files
        $(".files").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
    });

    //dong mo images va files
    $(".image-btn").click(function() {
        if ($(".images").css("display") === "none") {
            $(".image-btn").css("background-color", "rgb(150, 150, 150)");
            $(".file-btn").css("background-color", "rgb(200, 200, 200)");
            $(".files").css("display", "none")
            $(".images").css("display", "flex")
        }
    });
    $(".file-btn").click(function() {
        if ($(".files").css("display") === "none") {
            $(".file-btn").css("background-color", "rgb(150, 150, 150)");
            $(".image-btn").css("background-color", "rgb(200, 200, 200)");
            $(".images").css("display", "none")
            $(".files").css("display", "block")
        }
    });

    $(".content-chat").scrollTop($(".content-chat")[0].scrollHeight);

    //xử lý back end
    $(".user").click(function(e){
        var email = $(this).attr("data-email");
        var name = $(this).attr("data-name");
        var phone = $(this).attr("data-phone");
        //xoa class notseen
        var element = document.getElementById(`${email}`).children;
        element[1].classList.remove("notseen");
        //dom data vao button send file va button sendtext
        $(".send-chat").attr("data-email", email);
        $(".send-chat").attr("data-name", name);
        $(".send-chat").attr("data-phone", phone);
        $("#boxchatNameUser").html(`<h5>${name}</h5>`);
        if(phone != ""){
            $(".infouser").html(`
                <h5>${name}</h5>
                <p>
                    Phone: ${phone}&nbsp
                    <a href="#">
                        <i onclick="copyToClipboard('${phone}')" class="fa fa-clone"></i>
                    </a>&nbsp
                    <a href="tel:${phone}">
                        <i class="fa fa-phone"></i>
                    </a>
                </p>
                <p>
                    Email: ${email}&nbsp
                    <a href="#">
                        <i onclick="copyToClipboard('${email}')" class="fa fa-clone"></i>
                    </a>&nbsp
                    <a href="mailto:${email}">
                        <i class="far fa-paper-plane"></i>
                    </a>
                </p>            
            `)
        }else{
            $(".infouser").html(`
                <h5>${name}</h5>
                <p>
                </p>
                <p>
                    Email: ${email}&nbsp
                    <a href="#">
                        <i onclick="copyToClipboard('${email}')" class="fa fa-clone"></i>
                    </a>&nbsp
                    <a href="mailto:${email}">
                        <i class="far fa-paper-plane"></i>
                    </a>
                </p>            
            `)
        }

        $(".content-chat").html(``);
        //load tin nhắn
        var dataform = new FormData();
        dataform.append("email", email);
        dataform.append("countload", 1);
        $.ajax({
            type: 'POST',
            url: '/adminloadmessage',
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                data.forEach(message => {
                    if(message.userpost == "admin"){
                        if(message.kind == "time"){
                            $(".content-chat").prepend(`
                                <div class="time">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        if(message.kind == "text"){
                            $(".content-chat").prepend(`
                                <div class="right">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        if(message.kind == "file"){
                            $(".content-chat").prepend(`
                                <div class="right">
                                    <p>
                                        <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `)
                        }
                        if(message.kind == "image"){
                            $(".content-chat").prepend(`
                                <div class="right">
                                    <div class="image">
                                        <a href="/images/${message.name}" target="_blank">
                                            <img src="/images/${message.name}" alt="${message.message}">
                                        </a>
                                    </div>
                                </div>
                            `)
                        }
                    }else{
                        if(message.kind == "text"){
                            $(".content-chat").prepend(`
                                <div class="left">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        if(message.kind == "file"){
                            $(".content-chat").prepend(`
                                <div class="left">
                                    <p>
                                        <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `)
                        }
                        if(message.kind == "image"){
                            $(".content-chat").prepend(`
                                <div class="left">
                                    <div class="image">
                                        <a href="/images/${message.name}" target="_blank">
                                            <img src="/images/${message.name}" alt="">
                                        </a>
                                    </div>
                                </div>
                            `)
                        }
                    }
                });
                setTimeout(function() {
                    $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 0); 
                }, 300);
            },
            error: function() {
                alert("Error");
            }  
        })
        $.ajax({
            type: 'POST',
            url: '/adminloadimageandfile',
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                $(".images").html(``);
                $(".files").html(``);
                data.forEach(message => {
                    if(message.kind == "image"){
                        $(".images").append(`
                            <div class="image">
                                <div class="img-box">
                                    <a href="/images/${message.name}" target="_blank">
                                        <img src="/images/${message.name}" alt="${message.message}">
                                    </a>
                                </div>
                            </div>
                        `);
                    }else{
                        $(".files").append(`
                            <div class="file">
                                <p>
                                    <a href="/images/${message.name}" target="_blank">${message.message}</a>
                                </p>
                                <p>
                                    &nbsp
                                    <a href="/images/${message.name}" download="${message.message}">
                                        <i class="fas fa-download"></i>
                                    </a>
                                </p>
                            </div>
                        `)
                    }
                })
            },
            error: function() {
                alert("Error");
            }  
        });
        //chieu cao centent chat
        $(".content-chat").css("height", h - $(".name").height() - $(".input-chat").height() - 70);
        //chieu cao cua infousers khi chua load image va file
        $(".infousers").css("height", h);
        //chieu cao images
        $(".images").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
        //chieu cao files
        $(".files").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
        
    });

    //admin send file
    $("#file-upload").on('change', function() {
        var file = $("#file-upload")[0].files;
        var email = $(".send-chat").attr("data-email");
        var name = $(".send-chat").attr("data-name");
        var phone = $(".send-chat").attr("data-phone");
        if (file.length > 0 && email != "") {
            var dataform = new FormData();
            dataform.append("email", email);
            for (let i = 0; i < file.length; i++){
                dataform.append("file[]", document.getElementById("file-upload").files[i]);
            }

            $.ajax({
                type: "POST",
                url: "/adminsendfile", //Chatcontroller
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    data.forEach(message => {
                        if(message.kind == "text"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        if(message.kind == "file"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <p>
                                        <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `)
                        }
                        if(message.kind == "image"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <div class="image">
                                        <a href="/images/${message.name}" target="_blank">
                                            <img src="/images/${message.name}" alt="">
                                        </a>
                                    </div>
                                </div>
                            `)
                        }
                        if(message.kind == "time"){
                            $(".content-chat").append(`
                                <div class="time">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        socket.emit('send', {email: message.email, name: message.name, userpost: message.userpost, message:message.message, kind:message.kind, time:message.time});
                        $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
                    })
                    data.forEach(message => {
                        if(message.kind == "image"){
                            $(".images").prepend(`
                                <div class="image">
                                    <div class="img-box">
                                        <a href="/images/${message.name}" target="_blank">
                                            <img src="/images/${message.name}" alt="${message.message}">
                                        </a>
                                    </div>
                                </div>
                            `);
                        }else{
                            $(".files").append(`
                                <div class="file">
                                    <p>
                                        <a href="/images/${message.name}" target="_blank">${message.message}</a>
                                    </p>
                                    <p>
                                        &nbsp
                                        <a href="/images/${message.name}" download="${message.message}">
                                            <i class="fas fa-download"></i>
                                        </a>
                                    </p>
                                </div>
                            `)
                        }
                    })
                    data.forEach(message => {
                        var elem = document.getElementById(`${email}`);
                        elem.parentNode.removeChild(elem);
                        $(".users").prepend(`
                            <div class="user" id="${email}" data-name="${name}" data-email="${email}" data-phone="${phone}">
                                <div class="username">
                                    <h5>${name}</h5>
                                </div>
                                <div class="contentandtime">
                                    <div class="content">
                                        <p>${message.message}</p>
                                    </div>
                                    <div class="time">
                                        <p>${message.time}</p>
                                    </div>
                                </div>
                            </div>
                        `)
                    })
                },
                error: function() {
                    alert("Error!");
                }
            });
        }
        $("#file-upload").val("");
    })


    //bam enter thi gui tin nhan
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $(".send-chat").click();
            $("#inputmessage").val("");
        }
    });
    //bo chuc nang xuong dong cua the textarea
    $('textarea').keypress(function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    $(".send-chat").click(function(e){
        e.preventDefault();
        var email = $(".send-chat").attr("data-email");
        var name = $(".send-chat").attr("data-name");
        var phone = $(".send-chat").attr("data-phone");
        var message = $("#inputmessage").val();
        if(message.replace(/\s+/g, '') != ""){
            var dataform = new FormData();
            dataform.append("email", email);
            dataform.append("message", message);
            $.ajax({
                type: "POST",
                url: "/adminsendmessage", //Chatcontroller
                cache: false,
                contentType: false,
                processData: false,
                data: dataform,
                success: function(data) {
                    data.forEach(message => {
                        if(message.kind == "text"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        if(message.kind == "file"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <p>
                                        <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                    </p>
                                </div>
                            `)
                        }
                        if(message.kind == "image"){
                            $(".content-chat").append(`
                                <div class="right">
                                    <div class="image">
                                        <a href="/images/${message.name}" target="_blank">
                                            <img src="/images/${message.name}" alt="">
                                        </a>
                                    </div>
                                </div>
                            `)
                        }
                        if(message.kind == "time"){
                            $(".content-chat").append(`
                                <div class="time">
                                    <p>${message.message}</p>
                                </div>
                            `)
                        }
                        socket.emit('send', {email: message.email, name: message.name, userpost: message.userpost, message:message.message, kind:message.kind, time:message.time});
                        $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50); 
                        var boxuser = document.getElementById(`${email}`);
                        boxuser.parentNode.removeChild(boxuser);
                        $(".users").prepend(`
                            <div class="user" id="${email}" data-name="${name}" data-email="${email}" data-phone="${phone}">
                                <div class="username">
                                    <h5>${name}</h5>
                                </div>
                                <div class="contentandtime">
                                    <div class="content">
                                        <p>${message.message}</p>
                                    </div>
                                    <div class="time">
                                        <p>${message.time}</p>
                                    </div>
                                </div>
                            </div>
                        `)   
                    })
                },
                error: function() {
                    alert("Error!");
                }
            });
            $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
        }else{
            $("#conctentMessage").val("")
        }
        $("#inputmessage").val("");
        $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);    
    })

    //nhan tin nhan realtime
    socket.on("send", function (data) {
        if(data.userpost != "admin"){
            var boxuser = document.getElementById(`${data.email}`);
            var email = boxuser.dataset.email;
            var phone = boxuser.dataset.phone;
            var name = boxuser.dataset.name;
            boxuser.parentNode.removeChild(boxuser)
            var emailbottonsendchat = $(".send-chat").attr("data-email");
            //update list user
            if(email == emailbottonsendchat){
                $(".users").prepend(`
                    <div class="user" onclick="boxuserclick(${email}, ${name}, ${phone})" id="${email}" data-name="${name}" data-email="${email}" data-phone="${phone}">
                        <div class="username">
                            <h5>${name}</h5>
                        </div>
                        <div class="contentandtime">
                            <div class="content">
                                <p>${data.message}</p>
                            </div>
                            <div class="time">
                                <p>${data.time}</p>
                            </div>
                        </div>
                    </div>
                `)
                var dataform = new FormData();
                dataform.append("email", email);
                $.ajax({
                    type: "POST",
                    url: "/checkseen", //Chatcontroller
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: dataform,
                    success: function(data) {},
                    error: function() {
                        alert("Error!");
                    }
                })
            }else{
                $(".users").prepend(`
                    <div class="user" onclick="boxuserclick('${email}', '${name}', '${phone}')" id="${email}" data-name="${name}" data-email="${email}" data-phone="${phone}">
                        <div class="username">
                            <h5>${name}</h5>
                        </div>
                        <div class="contentandtime notseen">
                            <div class="content">
                                <p>${data.message}</p>
                            </div>
                            <div class="time">
                                <p>${data.time}</p>
                            </div>
                        </div>
                    </div>
                `)
            }

            //update content chat
            if(email == emailbottonsendchat){
                if(data.kind == "text"){
                    $(".content-chat").append(`
                        <div class="left">
                            <p>${data.message}</p>
                        </div>
                    `)
                }
                if(data.kind == "file"){
                    $(".content-chat").append(`
                        <div class="left">
                            <p>
                                <a href="/images/${data.name}" download="${data.message}" target="_blank">${data.message}</a>
                            </p>
                        </div>
                    `)
                }
                if(data.kind == "image"){
                    $(".content-chat").append(`
                        <div class="left">
                            <div class="image">
                                <a href="/images/${data.name}" target="_blank">
                                    <img src="/images/${data.name}" alt="">
                                </a>
                            </div>
                        </div>
                    `)
                }
                $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 50);   
            }

            //updata file and image
            if(email == emailbottonsendchat){
                if(data.kind == "image"){
                    $(".images").prepend(`
                        <div class="image">
                            <div class="img-box">
                                <a href="/images/${data.name}" target="_blank">
                                    <img src="/images/${data.name}" alt="${data.message}">
                                </a>
                            </div>
                        </div>
                    `);
                }else{
                    $(".files").prepend(`
                        <div class="file">
                            <p>
                                <a href="/images/${data.name}" target="_blank">${data.message}</a>
                            </p>
                            <p>
                                &nbsp
                                <a href="/images/${data.name}" download="${data.message}">
                                    <i class="fas fa-download"></i>
                                </a>
                            </p>
                        </div>
                    `)
                }
            }
        }
    })

    $('#finduser').on('input',function(e){
        var text = $(this).val();
        
        var dataform = new FormData();
        dataform.append("text", text);
        $.ajax({
            type: 'POST',
            url: '/finduser',
            cache: false,
            contentType: false,
            processData: false,
            data: dataform,
            success: function(data) {
                $(".users").html('');
                if(data.length == 0){
                    $(".users").html(`
                        <div class="user">
                            <p>not user</p>
                        </div>`
                    );
                    
                }else{
                    data.forEach(boxchat =>{
                        if(boxchat.status == "seen"){
                            $(".users").prepend(`
                                <div class="user" onclick="boxuserclick('${boxchat.email}', '${boxchat.name}', '${boxchat.phone}')" id="${boxchat.email}" data-name="${boxchat.name}" data-email="${boxchat.email}" data-phone="${boxchat.phone}">
                                    <div class="username">
                                        <h5>${boxchat.name}</h5>
                                    </div>
                                    <div class="contentandtime">
                                        <div class="content">
                                            <p>${boxchat.lastmessage}</p>
                                        </div>
                                        <div class="time">
                                            <p>${boxchat.lasttime}</p>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }else{
                            $(".users").prepend(`
                                <div class="user" onclick="boxuserclick('${boxchat.email}', '${boxchat.name}', '${boxchat.phone}')" id="${boxchat.email}" data-name="${boxchat.name}" data-email="${boxchat.email}" data-phone="${boxchat.phone}">
                                    <div class="username">
                                        <h5>${boxchat.name}</h5>
                                    </div>
                                    <div class="contentandtime notseen">
                                        <div class="content">
                                            <p>${boxchat.lastmessage}</p>
                                        </div>
                                        <div class="time">
                                            <p>${boxchat.lasttime}</p>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                    })
                }
            },
            error: function() {
                alert("Error");
            }  

        });
    });

    //update boxchat when change contact
    socket.on("boxchat", function (data) {
        var boxuser = document.getElementById(`${data.email}`);
        if(boxuser != null){
            boxuser.parentNode.removeChild(boxuser)
        }
        $(".users").prepend(`
            <div class="user" onclick="boxuserclick('${data.email}', '${data.name}', '${data.phone}')" id="${data.email}" data-name="${data.name}" data-email="${data.email}" data-phone="${data.phone}">
                <div class="username">
                    <h5>${data.name}</h5>
                </div>
                <div class="contentandtime notseen">
                    <div class="content">
                        <p>${data.lastmessage}</p>
                    </div>
                    <div class="time">
                        <p>${data.lasttime}</p>
                    </div>
                </div>
            </div>
        `)
    })
    
});

//luu vao  bo nho diem//
function copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    alert("Coppied: " + text);
}

//userbox event click
function boxuserclick(email, name, phone){
    let h = $(window).height();
    let w = $(window).width();
    //xoa class notseen
    var element = document.getElementById(`${email}`).children;
    element[1].classList.remove("notseen");
    //dom data vao button send file va button sendtext
    $(".send-chat").attr("data-email", email);
    $(".send-chat").attr("data-name", name);
    $(".send-chat").attr("data-phone", phone);
    $("#boxchatNameUser").html(`<h5>${name}</h5>`);
    if(phone != ""){
        $(".infouser").html(`
            <h5>${name}</h5>
            <p>
                Phone: ${phone}&nbsp
                <a href="#">
                    <i onclick="copyToClipboard('${phone}')" class="fa fa-clone"></i>
                </a>&nbsp
                <a href="tel:${phone}">
                    <i class="fa fa-phone"></i>
                </a>
            </p>
            <p>
                Email: ${email}&nbsp
                <a href="#">
                    <i onclick="copyToClipboard('${email}')" class="fa fa-clone"></i>
                </a>&nbsp
                <a href="mailto:${email}">
                    <i class="far fa-paper-plane"></i>
                </a>
            </p>            
        `)
    }else{
        $(".infouser").html(`
            <h5>${name}</h5>
            <p>
            </p>
            <p>
                Email: ${email}&nbsp
                <a href="#">
                    <i onclick="copyToClipboard('${email}')" class="fa fa-clone"></i>
                </a>&nbsp
                <a href="mailto:${email}">
                    <i class="far fa-paper-plane"></i>
                </a>
            </p>            
        `)
    }

    $(".content-chat").html(``);
    //load tin nhắn
    var dataform = new FormData();
    dataform.append("email", email);
    dataform.append("countload", 1);
    $.ajax({
        type: 'POST',
        url: '/adminloadmessage',
        cache: false,
        contentType: false,
        processData: false,
        data: dataform,
        success: function(data) {
            data.forEach(message => {
                if(message.userpost == "admin"){
                    if(message.kind == "text"){
                        $(".content-chat").prepend(`
                            <div class="right">
                                <p>${message.message}
                                </p>
                            </div>
                        `)
                    }
                    if(message.kind == "file"){
                        $(".content-chat").prepend(`
                            <div class="right">
                                <p>
                                    <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                </p>
                            </div>
                        `)
                    }
                    if(message.kind == "image"){
                        $(".content-chat").prepend(`
                            <div class="right">
                                <div class="image">
                                    <a href="/images/${message.name}" target="_blank">
                                        <img src="/images/${message.name}" alt="${message.message}">
                                    </a>
                                </div>
                            </div>
                        `)
                    }
                }else{
                    if(message.kind == "text"){
                        $(".content-chat").prepend(`
                            <div class="left">
                                <p>${message.message}</p>
                            </div>
                        `)
                    }
                    if(message.kind == "file"){
                        $(".content-chat").prepend(`
                            <div class="left">
                                <p>
                                    <a href="/images/${message.name}" download="${message.message}" target="_blank">${message.message}</a>
                                </p>
                            </div>
                        `)
                    }
                    if(message.kind == "image"){
                        $(".content-chat").prepend(`
                            <div class="left">
                                <div class="image">
                                    <a href="/images/${message.name}" target="_blank">
                                        <img src="/images/${message.name}" alt="">
                                    </a>
                                </div>
                            </div>
                        `)
                    }
                }
            });
            setTimeout(function() {
                $(".content-chat").animate({ scrollTop: $(".content-chat")[0].scrollHeight }, 0); 
            }, 300);
        },
        error: function() {
            alert("Error");
        }  
    })
    $.ajax({
        
        type: 'POST',
        url: '/adminloadimageandfile',
        cache: false,
        contentType: false,
        processData: false,
        data: dataform,
        success: function(data) {
            $(".images").html(``);
            $(".files").html(``);
            data.forEach(message => {
                if(message.kind == "image"){
                    $(".images").append(`
                        <div class="image">
                            <div class="img-box">
                                <a href="/images/${message.name}" target="_blank">
                                    <img src="/images/${message.name}" alt="${message.message}">
                                </a>
                            </div>
                        </div>
                    `);
                }else{
                    $(".files").append(`
                        <div class="file">
                            <p>
                                <a href="/images/${message.name}" target="_blank">${message.message}</a>
                            </p>
                            <p>
                                &nbsp
                                <a href="/images/${message.name}" download="${message.message}">
                                    <i class="fas fa-download"></i>
                                </a>
                            </p>
                        </div>
                    `)
                }
            })
        },
        error: function() {
            alert("Error");
        }  
    });
    //chieu cao centent chat
    $(".content-chat").css("height", h - $(".name").height() - $(".input-chat").height() - 70);
    //chieu cao cua infousers khi chua load image va file
    $(".infousers").css("height", h);
    //chieu cao images
    $(".images").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
    //chieu cao files
    $(".files").css("height", h - $(".infouser").height() - $(".imageandfile").height() - 40);
}



