
//Clase Alta-Lectura-Actualizar-Borrar
export class ALAB{
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
                {id:1, cat: "anillos", mod: "royal", precio: 350, stk:10, title: "Anillo Royal", desc: "Este anillo te transportará dos siglos atrás donde las reinas lucían las creaciones de sus propios orfebres que eran ", img: "anillo_imperial.jpg"},
                {id:2, cat: "anillos", mod: "solitario", precio: 200, stk:10, title: "Anillo Rococó", desc: "Una pieza que supera la prueba del tiempo, este glamoroso anillo de halo tiene en el centro una impresionante circonia cú", img: "anillo_rococo.jpg"},
                {id:3, cat: "anillos", mod: "heart", precio: 350, stk:10, title: "Anillo Cuore", desc: "Expresa el verdadero deseo de tu corazón con este brillante anillo de eternidad. Acabado a mano en Recubrimiento en Oro", img: "anillo_cuore.jpg"},
                {id:4, cat: "dijes", mod: "star", precio: 50, stk:10, title: "Gargantilla Star", desc: "Da un toque de brillo a tus outfits con la gargantilla de Estrellas Asimétricas. Inspirado en la belleza celestial", img: "gar_star.jpg"},
                {id:5, cat: "dijes", mod: "nature", precio: 550, stk:3, title: "Gargantilla Leaf", desc: "Usa un deslumbrante tributo a la naturaleza con la gargantilla Hojas relucientes. Este anillo acabado a mano en plata esterl", img: "gar_nature.jpg"},
                {id:6, cat: "aros", mod: "heart", precio: 300, stk:10, title: "Aros Heart", desc: "Muestre amor a sus oídos con estos aretes de corazón brillantes. Estos aretes chapados en oro rosado de 14k, termina", img: "aros1.jpg"},
                {id:7, cat: "aros", mod: "Pave-Heart", precio: 500, stk: 5, title: "Aros Pave Heart", desc: "Enmarque su rostro con estos aretes de aro Pavé Heart en tonos cálidos. Estas argollas enchapadas en oro de 14k es", img: "aros2.jpg"},
                {id:8, cat: "dijes", mod: "baloon-birthday", precio: 350, stk: 10, title: "Dije Baloon", desc: "Deje que su espíritu se eleve con este dije de globo aerostático de feliz cumpleaños. Acabado a mano en plata esterl", img: "dije_JB.jpg"},
                {id:9, cat: "dijes", mod: "turtle", precio: 400, stk: 5, title: "Dije Turtle", desc: "El dije colgante de tortuga marina de cristal de Murano está inspirado en las pacíficas criaturas del mar azul profundo", img: "dije2.jpg"}
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
