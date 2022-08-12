//Clase Alta-Lectura-Actualizar-Borrar
class ALAB{
    #nombreTabla = null
    #data = null

    constructor(nombreTabla){
        this.#setNombreTabla(nombreTabla)
        this.#setData()
    }

    #setNombreTabla(nombreTabla){
		this.#nombreTablaValidar(nombreTabla);
        this.#nombreTabla = nombreTabla;
	}
    
    #setData(){
        /* Si el repositorio en Localstorage esta vacio, carga por unica vez los datos del array */
        
        let repositorio = this.#recuperar(this.#nombreTabla)
        if (repositorio == null){
            this.#data = [
                { id: 1, cat: "anillos", mod: "royal", precio: 350, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
                { id: 2, cat: "anillos", mod: "solitario", precio: 200, stk: 10, title: "Anillo Rococó", desc: "Una pieza que supera la prueba del tiempo, este glamoroso anillo de halo tiene en el centro una impresionante circonia cú", img: "anillo_rococo.jpg"},
                { id: 3, cat: "aros", mod: "nature", precio: 150, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
                { id: 4, cat: "dijes", mod: "mariposa", precio: 50, stk: 10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
            ]
            this.#guardar()
        } else {
            this.#data = repositorio
        }
    }

    #nombreTablaValidar(nombreTabla){
		if(nombreTabla == undefined) throw new Error("Nombre de tabla requerida!");
    }

    #guardar(){
        let datosAGuardar = JSON.stringify(this.#data)
        localStorage.setItem(this.#nombreTabla, datosAGuardar)
    }

    #recuperar(key){
        let data = localStorage.getItem(key)
        return JSON.parse(data)
    }

    #existeId(id){
        let idi = parseInt(id) - 1
        console.log(idi)
        return this.#data[idi] === undefined ? false : true
    }

    #existeRegistro(id) {
        console.log("h"+this.#existeId(id))
        if (!this.#existeId(id)) throw new Error("El registro no existe")
    }

    alta(data){
        this.#data.push(data)
        this.#guardar()
        return this.#data.length
    }

    leer(id){
        this.#existeRegistro(id)
        return this.#data[id-1]
    }

    actualizar(id, data){
        this.#existeRegistro(id)
        this.#data[id-1] = data
        this.#guardar()
        return true
    }

    borrar(id){
        this.#existeRegistro(id)
        this.#data.splice(id-1, 1)
        this.#guardar()
        return true
    }

    leerTodo(){
        return this.#data
    }

    asignarId(){
        //Se asigna automaticamente el primer id disponible
        //Si el ultimo id asignado coincide con la cantidad de objetos, se asigna el siguiente
        let idA = this.#data.length
        if (this.#data[idA-1].id == idA) { 
            return this.#data.length + 1
        } else {
            //si no coincide se recorre el array 
            for (let i = 0; i < this.#data.length; i++) {
                //se chequea que el id coincida con la posicion en el array
                if (parseInt(this.#data[i].id) == i + 1){
                    console.log("id "+parseInt(i+1)+" ocupado")
                } else {
                    //Si no coincide se encontró el id vacante y se lo asigna
                    console.log("id faltante :"+parseInt(i+1))
                    return i+1
                }
                
            }
        }
    }

    buscarCat(str){
        let busqueda = this.#data.find((el) => el.cat === str)
        return busqueda
    }

    filtrar(str){
        let filtro = this.#data.filter((el) => el.cat.includes(str))
        return filtro
    }

    ordenar(){
        //Se ordena el array por id para mantener el orden
        this.#data.sort(function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            // si a es igual a b 
            return 0;
        });
    }

}


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
    
    //Funcion que renderiza la Tabla con los datos
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

    btnCrearItem.addEventListener('click', ()=>{
        document.getElementById('form').reset()
        document.getElementById('id01').style.display='block'
        opcion = 'crear'
    })

    btnLeerTodo.addEventListener('click', (e)=>{
        mostrar(sistema.leerTodo())
    })

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

    //Funcion para dar funcionalidad a btn Editar y Borrar de cada articulo 
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

    //Procedimiento para BORRAR
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

    //Procedimiento para EDITAR
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

    /* // Agrega un objeto al Array
    sistema.alta({id: 5, cat: "dijes", mod: "flor", precio: 50})
    console.log(sistema.asignarId())
 */
    //La siguiente funciona como Funcion de orden superior(funcion que recibe una funcion)
    console.log(sistema.leerTodo())
    mostrar(sistema.leerTodo())
/* 
    // Metodo para buscar x categoria
    let bus = prompt("Indique la categoria a BUSCAR (aros/anillos/dijes)>")
    console.log(sistema.buscarCat(bus))

    //Metodo para filtrar
    let fil = prompt("Indique la categoria a FILTRAR (aros/anillos/dijes)>")
    console.log(sistema.filtrar(fil))
    alert(JSON.stringify(sistema.filtrar(fil)))
 */

    function mostrarTostada(a){
        if (a == "add") {

            Toastify({
                text: "Articulo AGREGADO!!!",
                duration: 4000,
                style: {
                    background: "rgb(50,200,55)",
                  },

                }).showToast();
        } else {
            Toastify({
                text: "Articulo BORRADO!!!!!",
                duration: 4000,
                style: {
                    background: "rgb(255,0,0)",
                  },
                }).showToast();
        }
    }
}
app();

