const localData=getLocalStorage('cart');
console.log('working',localData)
const displayUi=()=>{
     const thanks=document.getElementById('thanks')
     if(localData.length>0){
        thanks.innerText='Thanks for Order'
     }
     else{
        thanks.innerText='No order Found'
     }
    const homePage=document.getElementById('homepage-content');
    localData.forEach(item => {
        const { id, img, price, name } = item;
        const div=document.createElement('div');
        div.classList.add("card", 'card-compact', 'w-84', 'bg-base-100','shadow-xl', 'mt-6', 'p-4');
        div.innerHTML=`
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
                        <div class="card-actions ">
                            <label for="my-modal-3" onclick="handleModal('${id}')"
                                class="btn btn-outline btn-primary w-[48%] mx-auto flex justify-center items-center">
                                <i class="fa-solid fa-circle-info mr-2"></i> See Details
                            </label>
                            
                        </div>
                    </div>
        `
        homePage.appendChild(div)
    });
    
}
displayUi()
