 /////// MANAGER DE TOSTADAS /////////////
    
export function mostrarTostada(a){
    if (a == "add") {

        Toastify({
            text: "Articulo AGREGADO!!!",
            duration: 4000,
            position: "center",
            style: {
                background: "rgb(50,200,55)",
              },

            }).showToast();
    } else {
        Toastify({
            text: "Articulo BORRADO!!!!!",
            duration: 4000,
            position: "center",
            style: {
                background: "rgb(255,0,0)",
              },
            }).showToast();
    }
}