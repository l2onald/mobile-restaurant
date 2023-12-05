const mainItemBtn = document.querySelector('.main__item__btn')
const checkout = document.querySelector('.checkout')
const checkoutModal = document.querySelector('.checkout-modal')
const main = document.querySelector('.main')
const checkoutCart = document.querySelector('.checkout__cart')
const checkoutPayBtn = document.querySelector('#checkout-pay-btn')


const itemsData = [
    {
        id: 1,
        name: 'Pizza',
        img: '🍕',
        ingredients: 'pepperoni, mushroom, mozzarella',
        price: 14
    },
    {
        id: 2,
        name: 'Hamburger',
        img: '🍔',
        ingredients: 'beef, cheese, lettuce',
        price: 12
    },
    {
        id: 3,
        name: 'Beer',
        img: '🍺',
        ingredients: 'grain, hops, yeast, water',
        price: 12
    }
]

let mainHTML = ''
let checkoutCartHTML = ''
const totalPriceArr = []

itemsData.map((item)=> {
    mainHTML += `
    <div class="main__item">
        <div class="main__item__product-info">
            <h2 class="main__item__product-info__name">${item.name}</h2>
            <p class="main__item__product-info__ingredients">${item.ingredients}</p>
            <p class="main__item__product-info__price">${item.price}</p>
        </div>

        <span class="main__item__img">${item.img}</span>

        <button class="main__item__btn" data-item=${item.id}>+</button>
    </div>`
})


main.innerHTML = mainHTML


document.addEventListener('click', function(e){

    
    if(e.target.className==='main__item__btn'){

        checkout.style.display = "flex"

        if(e.target.dataset.item){

            const { name, price } = itemsData.filter(function(item){
                return item.id===Number(e.target.dataset.item)
            })[0]

            totalPriceArr.push(price)

            checkoutCartHTML += `
                <div class="checkout__cart__item">
                    <h2 class="checkout__cart__item__name">${name}</h2>
                    <a class="checkout__cart__item__remove-btn">remove</a>
                    <p class="checkout__cart__item__price">$${price}</p>
                </div>`

            const totalPrice = totalPriceArr.reduce((total, current)=> {
                return total + current
            })
    
            checkoutCart.innerHTML = checkoutCartHTML
            checkoutCart.innerHTML += `
                <div class="checkout__cart__total">
                    <h2 class="checkout__cart__total__title">Total price:</h2>
                    <p class="checkout__cart__total__price">$${totalPrice}</p>
                </div>`
        }
        

    }else if(e.target.className==='checkout__cart__item__remove-btn'){
        
        checkout.style.display = "none"

    }else if(e.target.id==='complete-order-btn'){

        checkoutModal.style.display = "block"

    }else if(e.target.className==='checkout-modal__container'){

        checkoutModal.style.display = "none"

    }else if(e.target.className==='checkout-pay-btn'){
        const inputName = document.querySelector('#checkout-name').textContent
        console.log(inputName)
    }


})

checkoutPayBtn.addEventListener("click", handleCheckoutPayBtn)

function handleCheckoutPayBtn(e){

    document.querySelector('.order-completed').style.display = "block"
    
    e.preventDefault();
    const inputName = document.querySelector('#checkout-name').value

    document.querySelector('.order-completed__text').textContent = `Thanks, ${inputName}! Your order is on its way!`

    checkoutModal.style.display = "none"
    checkout.style.display = "none"

}