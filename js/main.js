import {ALAB} from "./ALAB.js"
import {mostrarTostada} from "./toastManager.js"


function app() {
    const contenedor = document.querySelector('tbody')
    const id = document.getElementById('id')
    const cat = document.getElementById('cat')
    const mod = document.getElementById('mod')
    const precio = document.getElementById('precio')
    const stk = document.getElementById('stk')
    const title = document.getElementById('title')
    const desc = document.getElementById('desc')
    const img = document.getElementById('img')
    
    let resultados = ''
    let opcion = ''
    let idx = 0
    
    //Funcion RENDER de la tabla con los datos
    const mostrar = (articulos) => {
        resultados = ''
        articulos.forEach(articulo => {
            resultados +=   `<tr>
                                <td>${articulo.id}</td>
                                <td>${articulo.cat}</td>
                                <td>${articulo.mod}</td>
                                <td>${articulo.precio}</td>
                                <td>${articulo.stk}</td>
                                <td>${articulo.title}</td>
                                <td>${articulo.desc}</td>
                                <td>${articulo.img}</td>
                                <td>
                                    <button class="btnEditar w3-button w3-white w3-border w3-tiny w3-border-green w3-round-large w3-text-green w3-hover-green">Editar </button>
                                    <button class="btnBorrar w3-button w3-white w3-border w3-tiny w3-border-red w3-round-large w3-text-red w3-hover-red">Borrar</button>
                                </td>
                            </tr>`
        });
        contenedor.innerHTML = resultados
    }
    
    //--------------------------------------------------------
    //Eventos para los Botones
    //--------------------------------------------------------
    
    ///// GUARDAR ///////
    btnGuardar.addEventListener('click', (e)=>{
        e.preventDefault()
        if (opcion == 'crear'){
            console.log('crear')
            console.log(`${idx} ${cat.value} - ${mod.value} - ${precio.value} - ${stk.value} -`)
            sistema.alta({id: sistema.asignarId(), cat: cat.value, mod: mod.value, precio: precio.value, stk: stk.value, title: title.value, desc: desc.value, img: img.value})
            sistema.ordenar()
            mostrar(sistema.leerTodo())
            mostrarTostada("add")
        }
        if (opcion == 'editar'){
            console.log('editar')
            console.log(idx)
            console.log(`${idx} ${cat.value} - ${mod.value} - ${precio.value} - ${stk.value} -`)
            data = { id: parseInt(idx), cat: cat.value, mod: mod.value, precio: parseInt(precio.value), stk: parseInt(stk.value), title: title.value, desc: desc.value, img: img.value }
            sistema.actualizar(idx, data)
            mostrar(sistema.leerTodo())
        }
        document.getElementById('id01').style.display='none'
    })

    ///// CREAR ARTICULO ////////
    btnCrearItem.addEventListener('click', ()=>{
        document.getElementById('form').reset()
        document.getElementById('id01').style.display='block'
        opcion = 'crear'
    })

    ///////// LEER TODO /////////
    btnLeerTodo.addEventListener('click', (e)=>{
        mostrar(sistema.leerTodo())
    })

    ///// FILTRO POR CATEGORIA ////////
    btnFiltro.addEventListener('click', (e)=>{
        document.getElementById('id02').style.display='block'
    })

    btnFiltrar.addEventListener('click', (e)=>{
        e.preventDefault()
        dataFiltrada = sistema.filtrar(cate.value)
        console.log(dataFiltrada)
        mostrar(dataFiltrada)
        document.getElementById('id02').style.display='none'
    })

    //Funcion para dar funcionalidad a btn EDITAR y BORRAR de cada articulo 
    const on = (Element, Event, selector, handler) => {
        /* console.log(Element)
        console.log(Event)
        console.log(selector)
        console.log(handler) */
        Element.addEventListener(Event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }
        })
    }

    ///////Procedimiento para BORRAR/////////
    on(document, 'click', '.btnBorrar', e => {
        const fila = e.target.parentNode.parentNode
        idx = fila.firstElementChild.innerHTML
        console.log(idx)
        document.getElementById('id03').style.display='block'
        return idx
    })

    btnOkBorrar.addEventListener('click', (e)=>{
        console.log("antes de borrar id "+idx)
        sistema.borrar(idx)
        mostrar(sistema.leerTodo())
        document.getElementById('id03').style.display='none'
        mostrarTostada()
    })

    /////////Procedimiento para EDITAR/////////
    let idForm =0
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode
        idForm = fila.children[0].innerHTML
        const catForm = fila.children[1].innerHTML
        const modForm = fila.children[2].innerHTML
        const precioForm = fila.children[3].innerHTML
        const stkForm = fila.children[4].innerHTML
        const nameForm = fila.children[5].innerHTML
        const descForm = fila.children[6].innerHTML
        const imgForm = fila.children[7].innerHTML
        /* console.log(`ID: ${idForm} - CATEGORIA: ${catForm} MODELO: ${modForm} PRECIO: ${precioForm} STOCK: ${stkForm}`) */
        idx = idForm
        cat.value = catForm
        mod.value = modForm
        precio.value = precioForm
        stk.value = stkForm
        title.value = nameForm
        desc.value = descForm
        img.value = imgForm
        opcion = 'editar'
        console.log(`${idx} - ${cat.value} - ${mod.value} - ${precio.value} - ${stk.value} -`)
        document.getElementById('id01').style.display='block'
    })

    //Se crea tabla mediante la funcion/metodo constructor
    let sistema = new ALAB("dbcontainer")

    console.log(sistema.leerTodo())
    mostrar(sistema.leerTodo())
/* 
    // Metodo para buscar x categoria
    let bus = prompt("Indique la categoria a BUSCAR (aros/anillos/dijes)>")
    console.log(sistema.buscarCat(bus))

    
 */
    
}
app();

