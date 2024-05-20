const formulario = document.getElementById('agregar-gasto');
const listadogastos = document.querySelector('#gastos ul');

//crear los eventos
EventListener();
function EventListener(){ 
    document.addEventListener('DOMContentLoaded', Preguntarpresupuesto);
    formulario.addEventListener('submit', AgregarGasto);
    listadogastos.addEventListener('click', eliminarGasto);
}

//clases
class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevogasto(gasto){
        this.gastos = [...this.gastos, gasto];
        //sumar la cantidad del nuevo gasto al gasto total
        this.restante -= gasto.cantidad;
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id.toString() !== id.toString());
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=> total + gasto.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }

    EncontrarGastoMasCostoso()
    {
        let GastoMasCostoso = this.gastos[0];
        this.gastos.forEach(gasto => {
            if (gasto.cantidad > GastoMasCostoso.cantidad) {
                GastoMasCostoso
            }
        });
        return GastoMasCostoso;
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
            document.querySelector('.gastos').insertBefore(divMensaje, formulario);

            //quitar la alerta despues de 5 segundos
            setTimeout( () => {
                document.querySelector('.gastos .alert').remove();
            },5000);
            
    }
    //comprobar el presupuesto restante 
    ActualizarPresupuesto(restante)
    {
        document.querySelector('span#restante').textContent = restante;
    }

    

    //inserta los gastos a la lista
    AgregarGastoListado(AgregarGasto)
    {
        //limpiar el html

        this.limpiarHTML();

        //definir el array para iterar los gastos que se van a ingresar

        AgregarGasto.forEach(gasto => {
            const {nombre, cantidad, id} = gasto;

            //creamos la lista
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //insertar el gasto en el html
            nuevoGasto.innerHTML =  `${nombre}
                <span class="badge-primary badge-pill">$ ${cantidad}</span>
            `;
            //crear boton de borrar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.textContent = 'Borrar';
            nuevoGasto.appendChild(btnBorrar);

            //insertar en el html
            listadogastos.appendChild(nuevoGasto);
        });
    }
    
    
    //cambiar de color el presupuesto restante
    ComprobarPresupuesto(Presupuestoobj)
    {
        const { presupuesto, restante } = Presupuestoobj;
        const restantediv = document.querySelector('.restante');

        console.log(restante);
        console.log(presupuesto);

        //comprobar el 25%
        if ((presupuesto / 4) > restante)
        {
            restantediv.classList.remove('alert-sucess', 'alert-warning');
            restantediv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante){
            restantediv.classList.remove('alert-sucess');
            restantediv.classList.add('alert-warning');
        } else{
            restantediv.classList.remove('alert-danger', 'alert-warning');
            restantediv.classList.add('alert-sucess');
        }
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto esta agotado', 'error');
            formulario.querySelector('button[type = "submit"]').disable = true;
        }
    }
 

    limpiarHTML() {
        while (listadogastos.firstChild) {
            listadogastos.removeChild(listadogastos.firstChild);
        }
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
        
        // Agregar al html
        ui.insertarPresupuesto(presupuesto);
}
    
function AgregarGasto(e)
{
    e.preventDefault();

    //leer de el formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //comprobamos que los campos no esten vacios
    if(nombre === '' || cantidad === '')
        {
            ui.imprimirAlerta('Ambos campos son obligatorios','error');
            // si hay una cantidad negativa o letras
        }else if (cantidad <= 0 || isNaN(cantidad)) {
            ui.imprimirAlerta('cantidad no valida', 'error');
        } else {
            const gasto = { nombre, cantidad, id: Date.now() };

            // añadir nuevo gasto
            presupuesto.nuevogasto(gasto);

            ui.imprimirAlerta('correcto', 'correcto');

            const { gastos } = presupuesto;
            ui.AgregarGastoListado(gastos);

            ui.ComprobarPresupuesto(presupuesto);

            const { restante } = presupuesto;

            ui.ActualizarPresupuesto(restante);

            formulario.reset();
        }
}
function eliminarGasto(e)
{
    if (e.target.classList.contains('borrar-gasto')){
        const { id } =e.target.parentElement.dataset;
        presupuesto.eliminarGasto(id);

        //Reembolsar
        ui.ComprobarPresupuesto(presupuesto);

        // pasar la cantidad restante para actualizar el dom
        const { restante } = presupuesto;
        ui.ActualizarPresupuesto(restante);

        // Eliminar el dom
        e.target.parentElement.remove();
    }
}

// Obtener el botón para mostrar el gasto más costoso

const btnMostrarGastoMasCostoso = document.createElement('button');
btnMostrarGastoMasCostoso.textContent = 'Mostrar gasto más costoso';
btnMostrarGastoMasCostoso.classList.add('btn', 'btn-primary');

// Agregar evento al hacer clic en el botón

btnMostrarGastoMasCostoso.addEventListener('click', function() 
{
    // Encontrar el gasto más costoso
    const GastoMasCostoso = presupuesto.EncontrarGastoMasCostoso();

    // Mostrar el gasto más costoso en una alerta
    alert(`El gasto más costoso fue: ${GastoMasCostoso.nombre} - $${GastoMasCostoso.cantidad}`);
});

// Agregar el botón al final del formulario
formulario.appendChild(btnMostrarGastoMasCostoso);