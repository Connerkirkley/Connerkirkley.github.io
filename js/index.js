$(document).ready(function () {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dimensions = [width, height];

    let images = [
        {
            src: "./images/1st.png",
            alt: "test image 1",
        },
        {
            src: "./images/2nd.png",
            alt: "test image 2",
        },
        {
            src: "./images/3rd.png",
            alt: "test image 3",
        },

    ];

    let length = images.length;

    $("#sliderLeft").click(function () {
        getNextImages("left");
        console.log('left');

    });
    $("#sliderRight").click(function () {
            getNextImages("right");
            console.log('right');
    });
    let currentImages = [images[0], images[1], images[2]];
    let intImages = function () {
        $('.pictures').remove()
        $("#sliderGrid").append(
            `<img class="pictures" id="picture1" src="${currentImages[0].src}" alt="${currentImages[0].alt}">`
        );
        $("#sliderGrid").append(
            `<img class="pictures annoying" id="picture2" src="${currentImages[1].src}" alt="${currentImages[1].alt}">`
        );
        $("#sliderGrid").append(
            `<img class="pictures" id="picture3" src="${currentImages[2].src}" alt="${currentImages[2].alt}">`
        );
    };
    intImages(currentImages);
    let num = 1;
    let getNextImages = function (direction) {
        switch (direction) {
            case "right":
                console.log(num);
                console.log(num % length);
                num = (num - 1 + length) % length;
                try {
                    currentImages = [
                        images[(num - 1 + length) % length],
                        images[num],
                        images[(num + 1) % length],
                    ];
                } finally {
                    console.log(currentImages);
                    break;
                }
            case "left":
                console.log(num);
                console.log(num % length);
                num = (num + 1) % length;
                try {
                    currentImages = [
                        images[(num - 1 + length) % length],
                        images[num],
                        images[(num + 1) % length],
                    ];
                } finally {
                    console.log(currentImages);
                    break;
                }
        }
        width = window.innerWidth;
        height = window.innerHeight;
        ticScreen()
        transition(direction)
    };
    let transition = async function (direction) {
        switch(direction){
        case "left":
            if (width <= 1200) {
                $('#sliderGrid').append(
                    `<img class="pictures" id='picture5' src="${currentImages[1].src}" alt="${currentImages[1].alt}">`
                )
                $('#picture5').css({left: width / 100 * 25}).animate({left:0}, 300)
                $('#picture2').animate({left:-(width / 100 * 25), opacity: 0}, 300)
            } else {
                $("#sliderGrid").append(
                    `<img class="pictures" id="picture4" src="${currentImages[2].src}" alt="${currentImages[2].alt}">`
                )
                $('#picture4').css({left: 200})
                .animate({left: `-=${$('#picture3').position().left - ($('#picture3').position().left - 200)}px`}, 300)
                $('#picture1').animate({ left: `${-200}px`,opacity: 0}, 300)
                $('#picture2').animate({ left: `-=${imageSize.width + 55}px` }, 300);
                $('#picture3').animate({ left: `-=${imageSize.width + 55}px` }, 300);
                
            }
            await sleep(300);
            intImages()
            break;
        case "right":
            if (width <= 1200){
                $('#sliderGrid').append(
                    `<img class="pictures" id='picture5' src="${currentImages[1].src}" alt="${currentImages[1].alt}">`
                )
                $('#picture5').css({left: -(width / 100 * 25)}).animate({left:0}, 300)
                $('#picture2').animate({left: (width / 100 * 25), opacity: 0}, 300)
            }
            else{
                $("#sliderGrid").append(
                    `<img class="pictures" id="picture0" src="${currentImages[0].src}" alt="${currentImages[0].alt}">`
                )
                $('#picture0').css({left:-200})
                .animate({ left: `+=${$('#picture1').position().left - ($('#picture1').position().left -200)}px`}, 300)
                $('#picture1').animate({ left: `+=${imageSize.width + 55}px` }, 300);
                $('#picture2').animate({ left: `+=${imageSize.width + 55}px` }, 300);
                $('#picture3').animate({ left: `+=${200}px`, opacity: 0}, 300);
            }
            await sleep(300);
            intImages()
            break;
    }
    }
    let ticScreen = function () {
        width = window.innerWidth;
        height = window.innerHeight;
        dimensions = [width, height];
        console.log(dimensions);
        leftSide = $('#postContent').position()
        rightSide = $('#nextContent').position()
        imageSize = {
            width: Math.round($('#picture2').width()),
            height: Math.round($('#picture2').height())
        }
        console.log(leftSide, rightSide);
        console.log(imageSize);
        console.log($('#picture1').position(), $('#picture3').position());
        console.log($('#picture3').position());
    }
    let mainScreen = async function () {
    while (true) {
        await sleep(10000)
        ticScreen()
    }}
    ticScreen()
    mainScreen()
});
