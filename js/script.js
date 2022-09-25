// const handlehumber=()=>{
//     const resCart=document.getElementById('resCart')
//      if(!true){
//         resCart.style.display='none'
//      }
//      else{
//         resCart.style.display='block';
//      }
// }
let dataSet;
let cart = []
fetch('https://raw.githubusercontent.com/prosany/Grand-Session/main/data.json').then(res => res.json())
    .then((data) => {
        dataSet = data
        displayData(data)
    })
const displayData = (data) => {
    const homePage = document.getElementById('homepage-content');
    data.forEach(item => {
        const { id, img, price, name } = item;
        const div = document.createElement('div');
        div.classList.add("card", 'card-compact', 'w-84', 'bg-base-100', 'shadow-xl', 'mt-6', 'p-4');
        div.innerHTML = `
        <figure><img class='rounded-lg w-full h-[300px]' src="${img}" alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between">
                            <h2 class="card-title">${name}
                            </h2>
                            <div class="icon">
                                <span class="mr-4"><i class="fa-solid fa-heart text-slate-500"></i></span>
                                <span><i class="fa-solid fa-square-minus text-red-700"></i></span>
                            </div>
                        </div>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <h2 class="text-2xl font-semibold">Price: $<span id="price">${price}</span></h2>
                        <div class="card-actions justify-between">
                            <label for="my-modal-3" onclick="handleModal('${id}')"
                                class="btn btn-outline btn-primary w-[48%] mx-auto flex justify-center items-center">
                                <i class="fa-solid fa-circle-info mr-2"></i> See Details
                            </label>
                            <label  onclick=handleCart('${id}')
                                class="btn btn-outline btn-secondary w-[45%] mx-auto flex justify-center items-center">
                                <i class="fa-solid fa-bag-shopping mr-2"></i> Buy Now
                            </label>
                        </div>
                    </div>
        `
        homePage.appendChild(div)
    });
}
const handleModal = (id) => {
    const product = dataSet.find(ele => ele.id == id)
    const { name, price, img } = product;
    const modalInfo = document.getElementById('modal-info');
    modalInfo.innerHTML = `
   <div class="">
   <img src="${img}" alt="">
</div>
<h3 class="text-lg font-bold text-primary mt-2" >PRODUCT : <span>${name}</span></h3>
<p class="py-4 ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
<div class="my-2">
   <h1 class="font-semibold text-xl text-primary">FEATURES :</h1>
   <p>feature01,feature02, feature03, feature04</p>
 </div>
 <p class="font-semibold text-xl">
   <span class="text-primary">PRICE : </span> $<span>${price}</span>
 </p>
   `

}
//  Clear cart all
const handleClear = () => {
    const badge = document.getElementById('badge-count');
    badge.innerText = 0;
    count = 0;
    const cartItems = document.getElementById('cart-items')
    cartItems.textContent = '';
    document.getElementById('pdCount').innerText = 0;
    document.getElementById('pdPrice').innerText = 0;
    document.getElementById('pdTax').innerText = 0;
    document.getElementById('pdTotal').innerText = 0;
}
// Cart handle Area

let count = 0;
let newPrice = 0;
let tax = 0;
let total = 0;
const handleCart = (id) => {
    count++;
    const badge = document.getElementById('badge-count');
    badge.innerText = count;
    const product = dataSet.find((item) => item.id == id)
    cart.push(product);
    const localData = getLocalStorage("cart");
    setLocalStorage("cart", [...localData, product]);
    const { id: productId, img, price, name } = product;
    newPrice = price + newPrice;
    tax = newPrice * 0.1
    total = newPrice + tax;
    const cartItems = document.getElementById('cart-items');
    const div = document.createElement('div')
    div.classList.add('flex', 'justify-between', 'items-center', 'bg-slate-200', 'rounded-md', 'p-2', 'mb-4');
    div.innerHTML =
        `  <img class="w-[10%]" src="${img}" alt="">
   <div class="flex justify-between items-center w-[80%]">
       <p>${name}
       </p>
       <input class="border rounded-md border-green-400 w-10 p-2" type="text" name="" id=""
           value="1" readonly>
       <span onclick="handleRemove('${productId}')"><i
               class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"></i></span>

   </div>
   `
    cartItems.appendChild(div)
    document.getElementById('pdCount').innerText = count;
    document.getElementById('pdPrice').innerText = newPrice.toFixed(2);
    document.getElementById('pdTax').innerText = tax.toFixed(2);
    document.getElementById('pdTotal').innerText = total.toFixed(2);
}

// confirm order
// const handleConfirm=()=>{
//     console.log(cart)
// }

// handle remove one


const handleRemove = (id) => {

    const filter = cart.filter(ele => ele.id !== id)
    const cartItems = document.getElementById('cart-items');
     cartItems.innerHTML=''
    //remove Cart
    count--;
    const badge = document.getElementById('badge-count');
    badge.innerText = count;
    cart = filter
    setLocalStorage("cart", filter);
    filter.forEach((items => {
        const { id: productId, img, price, name } = items;
        newPrice = price - newPrice;
        tax = newPrice * 0.1
        total = newPrice +tax;
        console.log('newprice',newPrice)
        console.log("total",total)
        const div = document.createElement('div')
        div.classList.add('flex', 'justify-between', 'items-center', 'bg-slate-200', 'rounded-md', 'p-2', 'mb-4');
        div.innerHTML =
            `  <img class="w-[10%]" src="${img}" alt="">
  <div class="flex justify-between items-center w-[80%]">
      <p>${name}
      </p>
      <input class="border rounded-md border-green-400 w-10 p-2" type="text" name="" id=""
          value="1" readonly>
      <span onclick="handleRemove('${productId}')"><i
              class="fa-sharp fa-solid fa-trash text-red-700 cursor-pointer text-xl"></i></span>

  </div>
  `
        cartItems.appendChild(div)
    }))
    document.getElementById('pdCount').innerText = '';
    document.getElementById('pdCount').innerText = count;
    document.getElementById('pdPrice').innerText = '';
    document.getElementById('pdPrice').innerText = newPrice.toFixed(2);
    document.getElementById('pdTax').innerText ='';
    document.getElementById('pdTax').innerText = tax.toFixed(2);
  
    document.getElementById('pdTotal').innerText = '';
    document.getElementById('pdTotal').innerText = total.toFixed(2);
}