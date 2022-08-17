import {ALAB} from "./ALAB.js"

//----------------------------------------------------------------------------------------
let sistema = new ALAB("dbcontainer")
let contenedorProductos = document.getElementById('productos')

/* let productos = [
    { id: 1, cat: "anillos", mod: "royal", precio: 350, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
                { id: 2, cat: "anillos", mod: "solitario", precio: 200, stk: 10, title: "Anillo Rococó", desc: "Una pieza que supera la prueba del tiempo, este glamoroso anillo de halo tiene en el centro una impresionante circonia cú", img: "anillo_rococo.jpg"},
                { id: 3, cat: "aros", mod: "nature", precio: 150, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
                { id: 4, cat: "dijes", mod: "mariposa", precio: 50, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
] */

let productos = sistema.leerTodo()

for (const producto of productos){
    if (producto.precio == 0){
        console.log("Consulte Precio")
    } else {
        let newProd = document.createElement('div')
        newProd.className = 'col'
        newProd.innerHTML = `
        <div class="card">
                <img src="./img/${producto.img}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                    <h5>${producto.title}</h5>
                    <p class="card-text">${producto.desc}<span >...<a class="vermas" href="#">Ver más</a></span></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-white precio">U$D ${producto.precio}</small>
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary btn-custom1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gem" viewBox="0 0 16 16">
                            <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                            </svg>   Comprar</button>
                            <button type="button" class="agregar btn btn-sm btn-outline-secondary btn-custom2" id=${producto.id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>   Agregar al carro</button>
                        </div>
                    </div>
                    </div>
            </div>
        
        
        
        `
        contenedorProductos.append(newProd) 
        
    }
}

let botones = document.getElementsByClassName('agregar')
for (let i=0; i<botones.length; i++){
    botones[i].addEventListener('click', agregarAlCarrito)
}
let cantArtCarrito = 0
let totalCarr = -100
let promo = 100

function agregarAlCarrito(e) {
    let carrito = document.getElementById('carrito')
    let bCarro = document.getElementById('bCarro')
    let total = document.getElementById('total')
    let cp = document.getElementById('cp')
    let artPorAgregar = productos.find(producto => producto.id == e.target.id)
    /* let cantU = document.getElementById('inp'+artPorAgregar.id).value */
    cantArtCarrito ++
    cp.innerText = cantArtCarrito
    totalCarr = totalCarr + artPorAgregar.precio
    total.innerText = "$" + totalCarr
    bCarro.innerText = cantArtCarrito
    let cantU = 1
    let tbody = document.createElement('tbody')
    tbody.innerHTML = `
        <td>${artPorAgregar.mod}</td>
        <td>${cantU}</td>
        `
    let item = document.createElement('li')
    item.className = 'list-group-item d-flex justify-content-between lh-sm'
    item.innerHTML = `
        
            <div>
                <h6 class="my-0">${artPorAgregar.title}</h6>
                <small class="text-muted"></small>
            </div>
            <span class="text-muted">$${artPorAgregar.precio}</span>
        
    `
        
    /* carrito.append(tbody) */
    carrito.prepend(item)

    console.log(artPorAgregar)
    console.log(cantU)
    
}


    

        /* <div class="col">
        </div> */


        /* 
        <h3>${producto.mod}</h3>
        <p>Precio: ${producto.precio}</p>
        <p>Quedan ${producto.stk} un.</p> */