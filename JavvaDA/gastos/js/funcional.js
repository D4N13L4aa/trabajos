const formulario = document.getElementById('agregar-gasto');
const listadogastos = document.querySelector('#gastos ul');

//crear los eventos
EventListener();
function EventListener(){ 
    document.addEventListener('DOMContentLoaded', Preguntarpresupuesto);
    formulario.addEventListener('submit', AgregarGasto);
    listadogastos.addEventListener('click', eliminarGasto);
}

class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevogasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id.toString() !== id);
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=> total+gasto.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }
}

class UI{

    insertarPresupuesto(cantidad){
    document.querySelector('#total').textContent = cantidad.presupuesto;
    document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje, tipo)
    {
        // crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert'); 

        //si es de tipo error me agrege una clase
        if(tipo === 'error')
            {
                divMensaje.classList.add('alert-danger');
            } else
            {
                divMensaje.classList.add('alert-succes');
            }
            //mensaje de error
            divMensaje.textContent = mensaje;

            //insertar en el dom
            document.querySelector('.gastos').insertBefore(divMensaje,formulario);

            //quitar la alerta despues de 5 segundos
            setTimeout( () => {
                document.querySelector('.gastos .alert').remove();
                },5000);
    }

    //inserta los gastos a la lista
    AgregarGastoListado(gastos)
    {
        //limpiar el html

        this.limpiarHTML();

        //definir el array para iterar los gastos que se van a ingresar

        gastos.forEach(gasto => {
            const{nombre, cantidad, id} = gasto;

            //creamos la lista
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //insertar el gasto en el html
            nuevoGasto.innerHTML =  `
                ${nombre}
                <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `;
            //crear boton de borrar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar = textContent = 'Borrar';
            nuevoGasto.appendChild(btnBorrar);

            //insertar en el html
            listadogastos.appendChild(nuevoGasto);
        });
    }
}
    

const ui = new UI();
let presupuesto;
function Preguntarpresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es el presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <=0 )
        {
            Window.location.reload();
        }

        //Presupuesto valido
        presupuesto = new Presupuesto(presupuestoUsuario);

        //console.log(presupuesto);
        ui.insertarPresupuesto(presupuesto);
}
    
function AgregarGasto()
{
    //leer de el formulario
    const nombre = document.querySelector('#gastos').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //comprobamos que los campos no esten vacios
    if(nombre === '' || cantidad === '')
        {
            ui.imprimirAlerta('Ambos campos son obligatorios','error');
            // si hay una cantidad negativa o letras
        }else
            {
                const gasto = {nombre,cantidad,id:Date.now()}

                 //añadir nuevo gasto 
                 presupuesto.nuevoGasto(gasto);
                 
                 // insertar en el html
                 ui.imprimirAlerta('correcto','correcto');
            }
}
function eliminarGasto(e)
{

}

