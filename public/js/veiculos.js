function editarOnibus() {
    if(div_adicionar.style.display == "none" || div_adicionar.style.display == "") {
        icone_editar.innerHTML = `<i class="bi bi-check"></i>`;
        div_adicionar.style.display = "flex";
        delete_onibus.style.display = "flex";
        
    } else {
        icone_editar.innerHTML = `<i class="bi bi-pencil"></i>`;
        div_adicionar.style.display = "none";
        delete_onibus.style.display = "none";
    }
}

function abrirModal() {
    modal_adicionar.style.display = "flex";
}