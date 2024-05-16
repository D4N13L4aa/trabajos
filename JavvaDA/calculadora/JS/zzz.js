var po = {
    teclas: document.querySelectorAll('#contenedor ul li'),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operations"),
    cantisig: 0,
    cantdecimal:false,
    resultado:false
}


var fun = {
    inicio: function () {
        for (var i = 0; i < po.teclas.length; i++) {
            po.teclas[i].addEventListener("click", fun.oprimirteclas)
        }
    },

    oprimirteclas: function (tecla) {
        po.accion = tecla.target.getAttribute("class");
        po.digito = tecla.target.innerHTML;
        fun.calculadora(po.accion, po.digito);

    },

    calculadora: function (accion, digito) {
        switch (accion) {

            case "Number":
                po.cantisig = 0;
                if (po.operaciones.innerHTML == 0) {
                    po.operaciones.innerHTML = digito;
                }
                else {
                    po.operaciones.innerHTML += digito;
                }
                console.log("Number");
                break;
            case "symbol":
                po.cantisig ++;
                if(po.cantisig == 1){
                    if(po.operaciones.innerHTML == 0) {
                        po.operaciones.innerHTML = 0
                    }
                    else {
                        po.operaciones.innerHTML += digito;
                        po.cantdecimal = false;
                        po.resultado = false;
                    }
                }
                console.log("symbol")
                break;
            case "decimal":
                console.log("decimal")
                if(!po.cantdecimal && po.cantisig!=1) {
                    po.operaciones.innerHTML += digito;
                    po.cantidecimal = true;
                    po.resultado = false;
                }
                    console.log("decimal");
                break;
                case "igual":
                    po.operaciones.innerHTML = eval(po.operaciones.innerHTML);
                    po.resultado = true;
                    console.log("igual")
        }
    },
    borrarcalculadora:function() {
        po.resultado=false;
        po.operaciones.innerHTML = 0;
    },
    deletenumber:function(string) { 
         if (string.length <=1){
            return ''
         }
            
        po.operaciones = po.operaciones.slice(0, -1);

    }
}

fun.inicio();