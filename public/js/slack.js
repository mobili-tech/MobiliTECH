function notificarSlack(tipo, descricao) {
  const usuario = sessionStorage.EMAIL_USUARIO || "Desconhecido";

  fetch("http://localhost:8080/api/slack/evento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tipo: tipo,
      usuario: usuario,
      descricao: descricao
    })
  }).catch(erro => {
    console.warn("Erro ao notificar Slack:", erro);
  });
}
