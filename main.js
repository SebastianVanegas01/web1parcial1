var rowNumberG = 0;

function addLikes() {
    const inputField = document.getElementById("likes");

    if (inputField.value == 0) {
        return;
    }

    const table = document.getElementById("likesTable");
    var row = table.insertRow(-1);

    var likes = row.insertCell(0);
    var perc = row.insertCell(1);
    var edit = row.insertCell(2);

    likes.innerHTML = inputField.value;
    likes.setAttribute("id", "likesRow" + rowNumberG);
    perc.innerHTML = 0;
    perc.setAttribute("id", "percRow" + rowNumberG);
    edit.innerHTML =
        "<a class='edit' onclick='editValues(" + rowNumberG + ")'>Editar</a>";
    edit.setAttribute("id", "editRow" + rowNumberG);

    const redirect = document.getElementById("redirect");
    redirect.setAttribute("class", "edit");
    redirect.setAttribute("onclick", "irResultados()");

    rowNumberG += 1;
}

function aceptarCambios(rowNumber) {
    var likesEdit = document.getElementById("editLikes" + rowNumber);
    var percEdit = document.getElementById("editPerc" + rowNumber);

    var likes = document.getElementById("likesRow" + rowNumber);
    var perc = document.getElementById("percRow" + rowNumber);
    var edit = document.getElementById("editRow" + rowNumber);

    var likesValue = likesEdit.value;
    var percValue = percEdit.value;

    likes.innerHTML = likesValue;
    likes.setAttribute("id", "likesRow" + rowNumber);
    perc.innerHTML = percValue;
    perc.setAttribute("id", "percRow" + rowNumber);
    edit.innerHTML = `<a id="editRow${rowNumber}" class='edit' onclick='editValues(${rowNumber})'>Editar</a>`;
    edit.setAttribute("id", "editRow" + rowNumber);

    document.getElementById("bottom").innerHTML = "";

    const redirect = document.getElementById("redirect");
    redirect.setAttribute("onclick", "irResultados()");
}

function irResultados() {
    const lastRow = rowNumberG - 1;

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const likes = document.getElementById("likesRow" + lastRow).innerText;
    const perc = document.getElementById("percRow" + lastRow).innerText;

    window.location.href = `envio.html?name=${name}&email=${email}&phone=${phone}&likes=${likes}&perc=${perc}`;
}

function cancelarCambios(rowNumber, likesP, percP) {
    var likes = document.getElementById("likesRow" + rowNumber);
    var perc = document.getElementById("percRow" + rowNumber);
    var edit = document.getElementById("editRow" + rowNumber);

    likes.innerHTML = likesP;
    likes.setAttribute("id", "likesRow" + rowNumber);
    perc.innerHTML = percP;
    perc.setAttribute("id", "percRow" + rowNumber);
    edit.innerHTML =
        "<a class='edit' onclick='editValues(" + rowNumber + ")'>Editar</a>";
    edit.setAttribute("id", "editRow" + rowNumber);

    document.getElementById("bottom").innerHTML = "";

    const redirect = document.getElementById("redirect");
    redirect.setAttribute("onclick", "irResultados()");
}

function actualizarCampos() {
    const urlPar = new URLSearchParams(window.location.search);

    document.getElementById("name").innerHTML = urlPar.get("name");
    document.getElementById("email").innerHTML = urlPar.get("email");
    document.getElementById("phone").innerHTML = urlPar.get("phone");
    document.getElementById("likes").innerHTML = urlPar.get("likes");
    document.getElementById("percent").innerHTML = urlPar.get("perc") + "%";
}

function editValues(rowNumber) {
    var likes = document.getElementById("likesRow" + rowNumber);
    var perc = document.getElementById("percRow" + rowNumber);
    var edit = document.getElementById("editRow" + rowNumber);

    var likesValue = likes.innerText;
    likes.innerHTML = `<input class="form-control border" type="text" id="editLikes${rowNumber}">`;
    var likesEdit = document.getElementById("editLikes" + rowNumber);
    likesEdit.value = likesValue;

    var percValue = perc.innerText;
    perc.innerHTML = `<input class="form-control border" type="text" id="editPerc${rowNumber}">`;
    var percEdit = document.getElementById("editPerc" + rowNumber);
    percEdit.value = percValue;

    edit.innerHTML =
        "<span class='text-start text-secondary'>En edición</span>";

    var bottom = document.getElementById("bottom");

    bottom.innerHTML = `<div class="row pb-3"><div class="row text-start"><span class="text-secondary">Pulse Aceptar para guardar los cambios o cancelar para anularlos</span></div><div class="row"><div class="col-3"><a class="btn btn-success" onclick="aceptarCambios(${rowNumber})">Aceptar</a></div><div class="col-3"><a class="btn btn-danger" onclick="cancelarCambios(${rowNumber}, '${likesValue}', '${percValue}')">Cancelar</a></div></div></div>`;

    const redirect = document.getElementById("redirect");
    redirect.setAttribute("onclick", "");
}