function ExibirTexto() {
  //Capturar o valor digitado do input 
  const valorCapturado = document.getElementById("entrada").value;
  console.log(valorCapturado);
  //Capturar o resultado da div com id de "entrada"
  const resultado = document.getElementById("resultado");

  //Criar novo elemento com createElement
  const novoParagrafo = document.createElement('p');
  //Modificar o contéudo do novo paragrafo
  novoParagrafo.textContent = "Você digitou: " + valorCapturado;
  //Atribuindo a div de resultado ao novo contéudo do paragrafo criado
  resultado.appendChild(novoParagrafo);
}

function LimparTexto() {
  document.getElementById("resultado").innerHTML = "";
}

let contador = 0;
function atualizarContador() {
  //Atribuindo o valor do elemento da div com id contador a variavel contador 
  document.getElementById("contador").textContent = contador;
}

function incrementarContador() {
  contador++;
  atualizarContador();
}

function decrementarContador(){
  contador --;
  atualizarContador();
}

function zerarContador(){
  document.getElementById("contador").textContent = "";
}