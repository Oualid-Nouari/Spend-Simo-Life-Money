// showing the side bar:
let sideBarButton = document.querySelector('aside .gear');
let sideBar = document.querySelector('aside')
sideBarButton.addEventListener('click', function() {
    sideBar.classList.toggle('shown')
})

// switching to dark mode:

let themeChanger = document.querySelector('.dark-mode .theme-changer')
let circle = document.querySelector('.dark-mode .theme-changer .circle')
let darkP = document.querySelector('.dark-mode p')
let option = document.querySelectorAll('.option')
let products = document.querySelectorAll('main .container .product')
let shoppingProduct = document.querySelectorAll('.shopping-details .receiptEle')
themeChanger.addEventListener('click', function() {
    themeChanger.classList.toggle('dark-theme')
    circle.classList.toggle('dark-theme')
    products.forEach((product) => {
        product.classList.toggle('dark-theme')
    })
    option.forEach((op) => {
        op.classList.toggle('dark-theme')
    })
    darkP.classList.toggle('dark-theme')
    if (darkP.classList.contains('dark-theme')) {
        darkP.innerHTML = 'Dark Mode'
    } else {
        darkP.innerHTML = 'Light Mode'
    }
    if (themeChanger.classList.contains('dark-theme')) {
        document.documentElement.style.setProperty('--body-color', '#121212');
        document.documentElement.style.setProperty('--text-color', 'white');
    } else {
        document.documentElement.style.setProperty('--body-color', 'white');
        document.documentElement.style.setProperty('--text-color', '#121212');
    }
    
    
})

// changing Main Color:
let listOfColors = document.querySelectorAll('aside .main-C-changer ul li')

listOfColors.forEach((color) => {
    color.addEventListener('click', function() {
        listOfColors.forEach((c) => {
            c.classList.remove('active')
        })
        color.classList.add('active');
        document.documentElement.style.setProperty('--main-color', color.dataset.color);
    })
})

// scroll to up:
let upButton = document.querySelector('.to-up .up') 

upButton.addEventListener('click', function() {
    window.scrollTo(0, 0)
})

window.addEventListener('scroll', function() {
    let x = window.scrollY;
    if (x >= 800) {
        upButton.classList.add('show')
    } else {
        upButton.classList.remove('show')
    }
})

// Changing Number of products:
let numberOfProducts = document.querySelectorAll('main .container .product .buy-product .range .number')
let plusProd = document.querySelectorAll('main .container .product .buy-product .range .up')
let minusProd = document.querySelectorAll('main .container .product .buy-product .range .down')

plusProd.forEach((plus) => {
    plus.addEventListener('click', function() {
        plus.previousElementSibling.innerHTML = +plus.previousElementSibling.innerHTML + 1;
        let prev = plus.previousElementSibling;
        prev.previousElementSibling.classList.remove('disabled');
        // productPrice.forEach((price) => {
        //     let z = +moneyS.innerHTML - (+price.innerHTML * +price.parentElement.nextElementSibling.children[0].children[1].innerHTML)
        //     if (z < 0) {
        //         price.parentElement.nextElementSibling.children[0].children[1].innerHTML = +price.parentElement.nextElementSibling.children[0].children[1].innerHTML - 1 
        //         plus.classList.add('disabled');
        //     }
        // })
        let z = +moneyS.innerHTML - (+plus.previousElementSibling.innerHTML * +plus.parentElement.parentElement.previousElementSibling.children[0].innerHTML)
        if (z < 0) {
            plus.previousElementSibling.innerHTML = +plus.previousElementSibling.innerHTML - 1;
            plus.classList.add('disabled');
        }
    })
})

minusProd.forEach((m) => {
    m.classList.add('disabled');
    m.addEventListener('click', function() {
        m.nextElementSibling.innerHTML = +m.nextElementSibling.innerHTML - 1
        if (m.nextElementSibling.innerHTML === '1') {
            m.classList.add('disabled')
        }
        m.nextElementSibling.nextElementSibling.classList.remove('disabled');
    })
})

// Creating Shopping Details Section:
let BuyButton = document.querySelectorAll('main .container .product .buy')
let moneyS = document.querySelector('body > div.simo-life-money > span')
let mainProducts = document.querySelector('body > main')
let productsUl = document.querySelector('body > ul')
let productPrice = document.querySelectorAll('main .container .product .product-price span')
let productNumber = document.querySelectorAll('main .container .product .buy-product .range .number')
let totalPrice = document.querySelector('.total .total-price')
let totalDiv = document.querySelector('.total')
let shoppingUl = document.querySelector('.shopping-details')
let buyAll = document.querySelector('.buy-All')
let total = []
BuyButton.forEach((btn) => {
    btn.addEventListener('click', function() {
        buyAll.classList.remove('disabled');
        let audio = document.createElement('audio')
        audio.className = 'cash-sound'
        audio.setAttribute('controls', 'controls')
        audio.setAttribute('autoplay', 'autoplay')
        let audioSource = document.createElement('source')
        audioSource.setAttribute('src', 'cash-sound-effect (mp3cut.net).mp3')
        audio.appendChild(audioSource)
        document.body.appendChild(audio)
        let x = +btn.parentElement.previousElementSibling.children[0].innerHTML * +btn.previousElementSibling.children[1].innerHTML
        moneyS.innerHTML = +moneyS.innerHTML - x;
        if (+moneyS.innerHTML < 0) {
            moneyS.textContent = '0';
        }
        productPrice.forEach((price) => {
            let z = +moneyS.innerHTML - (+price.innerHTML * +price.parentElement.nextElementSibling.children[0].children[1].innerHTML)
            if (z < 0) {
                price.parentElement.nextElementSibling.children[1].classList.add('disabled');
                +price.innerHTML * +price.parentElement.nextElementSibling.children[0].children[2].classList.add('disabled');
            }
        })
        let productLi = document.createElement('li');
        productLi.classList.add('receiptEle')
        let productLiTitle = document.createElement('p');
        productLiTitle.innerHTML = btn.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        productLi.appendChild(productLiTitle)
        let howMuch = document.createElement('div');
        howMuch.className = 'much';
        howMuch.innerHTML = `${btn.parentElement.previousElementSibling.children[0].innerHTML} X ${btn.previousElementSibling.children[1].innerHTML}`
        productLi.appendChild(howMuch);
        let globalPrice = document.createElement('div');
        globalPrice.className = 'price-global';
        globalPrice.innerHTML = btn.parentElement.previousElementSibling.children[0].innerHTML * btn.previousElementSibling.children[1].innerHTML
        let r = 0;
    
        total.push(+globalPrice.innerHTML)
        console.log(total)
        let MAD = document.createElement('span');
        MAD.innerHTML += 'DH';
        globalPrice.appendChild(MAD);
        productLi.appendChild(globalPrice);
        productsUl.appendChild(productLi);
        document.body.appendChild(productsUl);
        btn.previousElementSibling.children[0].classList.add('disabled');
        btn.previousElementSibling.children[2].classList.add('disabled');
        btn.classList.add('disabled');

        for (let i=0; i<total.length; i++) {
            r += total[i]
        }
        totalPrice.innerHTML = r;
        console.log(totalPrice)
        let totalMAD = document.createElement('span')
        totalMAD.innerHTML = MAD.innerHTML;
        totalPrice.appendChild(totalMAD)
        totalDiv.appendChild(totalPrice)
        shoppingUl.after(totalDiv);
        totalDiv.after(buyAll);
    })
})

buyAll.addEventListener('click', function() {
    let overlay = document.createElement('div');
    overlay.className = 'overlay'
    document.body.appendChild(overlay)
    let simoLifeVideo = document.createElement('video')
    simoLifeVideo.setAttribute('autoplay', 'autoplay')
    simoLifeVideo.setAttribute('controls', 'controls')
    let videoSource = document.createElement('source')
    videoSource.setAttribute('src', 'simoLifeVideo.mp4')
    simoLifeVideo.appendChild(videoSource)
    document.body.appendChild(simoLifeVideo)
    let closeVid = document.createElement('span');
    closeVid.className = 'close-video';
    closeVid.innerHTML = 'x';
    document.body.appendChild(closeVid)
    simoLifeVideo.addEventListener('ended', function() {
        simoLifeVideo.remove();
        thankBox();
    })
    closeVid.addEventListener('click', function() {
        simoLifeVideo.remove();
        thankBox();
        closeVid.remove();
    })
})

function thankBox() {
    let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.append(overlay);
        let wowBox = document.createElement('div');
        wowBox.className = 'wow';
        document.body.appendChild(wowBox)
        let comment = document.createElement('span');
        comment.className = 'comment';
        comment.innerHTML = `Thank You For Playing ! `
        wowBox.appendChild(comment)
        let buttonsContainer = document.createElement('div')
        buttonsContainer.className = 'button-container';
        let playAgainBtn = document.createElement('button')
        playAgainBtn.className = 'play-again'
        playAgainBtn.innerHTML = `Play Again`
        playAgainBtn.addEventListener('click', function() {
            location.reload();
        })
        let quit = document.createElement('button');
        quit.className = 'quit'
        quit.innerHTML = `Quit`
        quit.addEventListener('click', function() {
            window.close();
        })
        buttonsContainer.append(playAgainBtn, quit)
        wowBox.appendChild(buttonsContainer)
}