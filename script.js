// lista principal de usuários
var usuarios = [
    {
        nome: "Carlos",
        sobrenome: "Mendes",
        login: "carlos.mendes",
        email: "carlos.mendes@empresa.com",
        depto: "TI",
        perfil: "Administrador",
        ativo: true
    },

    {
        nome: "Ana",
        sobrenome: "Lima",
        login: "ana.lima",
        email: "ana.lima@empresa.com",
        depto: "RH",
        perfil: "Usuário Padrão",
        ativo: true
    }
];

var logs = [];

// renderiza a tabela com os usuários
function renderizarTabela(lista) {

    var corpo = document.getElementById("tabela-corpo");

    corpo.innerHTML = "";

    if (lista.length == 0) {

        corpo.innerHTML =
            "<tr><td colspan='6' class='vazio'>Nenhum usuário encontrado.</td></tr>";

        return;
    }

    for (var i = 0; i < lista.length; i++) {

        var u = lista[i];
        var indexReal = usuarios.indexOf(u);

        var statusBadge = u.ativo
            ? "<span class='badge ativo-badge'>Ativo</span>"
            : "<span class='badge inativo-badge'>Inativo</span>";

        var textoToggle = u.ativo ? "Desativar" : "Ativar";

        corpo.innerHTML +=
            "<tr>" +
                "<td>" + u.nome + " " + u.sobrenome + "</td>" +
                "<td>" + u.login + "</td>" +
                "<td>" + u.depto + "</td>" +
                "<td>" + u.perfil + "</td>" +
                "<td>" + statusBadge + "</td>" +
                "<td>" +
                    "<button class='btn-acao btn-editar' onclick='editarUsuario(" + indexReal + ")'>Editar</button>" +
                    "<button class='btn-acao btn-toggle' onclick='toggleStatus(" + indexReal + ")'>" + textoToggle + "</button>" +
                    "<button class='btn-acao btn-excluir' onclick='excluirUsuario(" + indexReal + ")'>Excluir</button>" +
                "</td>" +
            "</tr>";
    }
}

function filtrarUsuarios() {

    var termo = document.getElementById("busca").value.toLowerCase();

    var filtrados = [];

    for (var i = 0; i < usuarios.length; i++) {

        var nomeCompleto =
            (usuarios[i].nome + " " + usuarios[i].sobrenome).toLowerCase();

        if (
            nomeCompleto.includes(termo) ||
            usuarios[i].login.toLowerCase().includes(termo)
        ) {
            filtrados.push(usuarios[i]);
        }
    }

    renderizarTabela(filtrados);
}

function salvarUsuario() {

    var nome = document.getElementById("inp-nome").value.trim();
    var sobrenome = document.getElementById("inp-sobrenome").value.trim();
    var login = document.getElementById("inp-login").value.trim();
    var email = document.getElementById("inp-email").value.trim();
    var depto = document.getElementById("inp-depto").value;
    var perfil = document.getElementById("inp-perfil").value;

    if (
        nome == "" ||
        sobrenome == "" ||
        login == "" ||
        email == "" ||
        depto == "" ||
        perfil == ""
    ) {

        document.getElementById("aviso-erro").style.display = "block";

        return;
    }

    usuarios.push({
        nome: nome,
        sobrenome: sobrenome,
        login: login,
        email: email,
        depto: depto,
        perfil: perfil,
        ativo: true
    });

    registrarLog("criado", nome + " " + sobrenome);

    renderizarTabela(usuarios);

    limparForm();

    document.getElementById("aviso-ok").style.display = "block";

    setTimeout(function () {
        document.getElementById("aviso-ok").style.display = "none";
    }, 1500);
}

function editarUsuario(index) {

    var u = usuarios[index];

    document.getElementById("inp-nome").value = u.nome;
    document.getElementById("inp-sobrenome").value = u.sobrenome;
    document.getElementById("inp-login").value = u.login;
    document.getElementById("inp-email").value = u.email;
    document.getElementById("inp-depto").value = u.depto;
    document.getElementById("inp-perfil").value = u.perfil;

    excluirUsuario(index);

    mostrarTela(
        "tela-cadastro",
        document.querySelectorAll(".sidebar button")[1]
    );
}

function excluirUsuario(index) {

    usuarios.splice(index, 1);

    renderizarTabela(usuarios);
}

function toggleStatus(index) {

    usuarios[index].ativo = !usuarios[index].ativo;

    registrarLog(
        "status",
        usuarios[index].nome + " alterou status"
    );

    renderizarTabela(usuarios);
}

function limparForm() {

    document.getElementById("inp-nome").value = "";
    document.getElementById("inp-sobrenome").value = "";
    document.getElementById("inp-login").value = "";
    document.getElementById("inp-email").value = "";
    document.getElementById("inp-depto").value = "";
    document.getElementById("inp-perfil").value = "";

    document.getElementById("aviso-erro").style.display = "none";
}

function registrarLog(tipo, descricao) {

    var agora = new Date();

    var hora =
        agora.getHours().toString().padStart(2, "0") +
        ":" +
        agora.getMinutes().toString().padStart(2, "0");

    logs.unshift({
        tipo: tipo,
        descricao: descricao,
        hora: hora
    });

    atualizarLog();
}

function atualizarLog() {

    var box = document.getElementById("log-box");

    box.innerHTML = "";

    for (var i = 0; i < logs.length; i++) {

        box.innerHTML +=
            "<div class='log-item'>" +
                "<span class='log-hora'>" + logs[i].hora + "</span>" +
                logs[i].descricao +
            "</div>";
    }
}

function mostrarTela(id, botao) {

    var telas = document.querySelectorAll(".tela");

    for (var i = 0; i < telas.length; i++) {
        telas[i].classList.remove("ativa");
    }

    document.getElementById(id).classList.add("ativa");

    var botoes = document.querySelectorAll(".sidebar button");

    for (var i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativo");
    }

    if (botao) {
        botao.classList.add("ativo");
    }

    if (id == "tela-usuarios") {
        renderizarTabela(usuarios);
    }
}

renderizarTabela(usuarios);
