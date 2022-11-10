//Cargar de manera automatica los datos registrados
function loadTablePaises() {
    $.ajax({
        url: 'http://localhost:9000/api/paises',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {            

            registros +=`
                        <tr class="table-active">
                            <th>`+item.id+`</th>
                            <td>`+item.codigo+`</td>
                            <td>`+item.descripcion+`</td>
                            <td>`+(item.estado==true?'Activo':'Inactivo')+`</td>
                            <td>`+item.continenteId.descripcion+`</td>
                            <td>
                            <button type="button" class="btn btn-outline-primary" onclick="Editar(`+item.id+`);">Editar</button>                            
                            </td>
                            <td>
                            <button type="button" class="btn btn-outline-primary" onclick="Eliminar(`+item.id+`);">Eliminar</button>                            
                            </td>
                        </tr>`;
        })
        $("#dataResult").html(registros);
        Limpiar();        
    })
}

// Busqueda por id
function Editar(id) {
    $.ajax({
        url: 'http://localhost:9000/api/paises/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)        
        $("#codigo").val(item.codigo)        
        $("#nombre").val(item.descripcion)        
        $("#estado").val(item.estado==true?1:0)
        $("#continenteId").val(item.continenteId.id)        
    })
}

//Accion de adicionar un registro
function Agregar(){
    $.ajax({
        url: 'http://localhost:9000/api/paises',
        data: JSON.stringify({            
            codigo: $("#codigo").val(),
            descripcion: $("#nombre").val(),
            estado: parseInt($("#estado").val()),
            continenteId: {
                id:$("#continenteId").val()
            }
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTablePaises();
    })
}

//Accion de modificar un registro
function Modificar(){    
    $.ajax({
        url: 'http://localhost:9000/api/paises/'+parseInt($("#id").val()),
        data: JSON.stringify({
            codigo: $("#codigo").val(),
            descripcion: $("#nombre").val(),
            estado: parseInt($("#estado").val()),
            continenteId: {
                id:$("#continenteId").val()
            }            
        }),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTablePaises();        
    })
}

function Eliminar(id){    
    $.ajax({
        url: 'http://localhost:9000/api/paises/'+id,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTablePaises();
    })
}

function Limpiar(){
    $("#id").val("");
    $("#codigo").val("");   
    $("#nombre").val("");   
    $("#estado").val("");
    $("#continenteId").val("");   
}

//Listar continentes
function loadTableContinentes() {
    $.ajax({
        url: 'http://localhost:9000/api/continentes',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros =`<option value="">--SELECCIONAR--</option>`;
        items.forEach(function (item, index, array) {            

            registros +=`<option value="`+item.id+`">`+item.descripcion+` </option>`;
        })
        $("continenteId").html(registros);        
    })
}