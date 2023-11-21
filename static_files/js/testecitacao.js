const gerarBtn = document.getElementById("gerar");
const nomeAutor = document.getElementById("nomeAutor");
const anoCita = document.getElementById("anoCita");
const volumeCita = document.getElementById("volumeCita");
const paginaCita = document.getElementById("paginaCita");
const textoCita = document.getElementById("textoCita");
const tabs = document.querySelectorAll(".tab");
const resultadoSection = document.getElementById("resultado");
const resultado_citacao_direta = document.getElementById("resultado_citacao_direta");
const resultado_citacao_indireta = document.getElementById("resultado_citacao_indireta");
var indexModelo = 0;

  //const tabs = document.querySelectorAll(".tab");

function changeTab(tabIndex) {
  // const tabs = document.querySelectorAll('.tab'); // Seleciona todas as abas

  // Remove a classe 'active' de todas as abas
  tabs.forEach((tab, index) => {
    tab.classList.remove('active');
  });

  // Adiciona a classe 'active' à aba selecionada
  tabs[tabIndex].classList.add('active');
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    if (tab.textContent === "Citação direta") {
      //resultadoSection.classList.remove("hidden");
      document.querySelectorAll(".input-group")[2].classList.remove("hidden");
      document.querySelectorAll(".input-group")[3].classList.remove("hidden");
    } else {
      //resultadoSection.classList.add("hidden");
      document.querySelectorAll(".input-group")[2].classList.add("hidden");
      document.querySelectorAll(".input-group")[3].classList.add("hidden");
    }
  });
});

gerarBtn.addEventListener("click", () => {

  const autorInput = document.getElementById("autor");
  const anoInput = document.getElementById("ano");
  const citacaoInput = document.getElementById("citacao");
  const volumeInput = document.getElementById("volume");
  const paginaInput = document.getElementById("pagina");

  //VALIDAÇÃO DOS CAMPOS
  if (!autorInput.classList.contains("hidden") && autorInput.value === "") {
    autorInput.classList.add("invalid");
  } else {
    autorInput.classList.remove("invalid");
  }

  if (!anoInput.classList.contains("hidden") && anoInput.value === "") {
    anoInput.classList.add("invalid");
  } else {
    anoInput.classList.remove("invalid");
  }

  if(!volumeInput.classList.contains("hidden") && volumeInput.value === "") {
    volumeInput.classList.add("invalid");
  } else {
    volumeInput.classList.remove("invalid");
  }

  if(!paginaInput.classList.contains("hidden") && paginaInput.value === "") {
    paginaInput.classList.add("invalid");
  } else {
    paginaInput.classList.remove("invalid");
  }

  if (citacaoInput.value === "") {
    citacaoInput.classList.add("invalid");
  } else {
    citacaoInput.classList.remove("invalid");
  }

  //TRATAMENTO AUTORES
  let arrayAutores = autorInput.value.split(",");
  let autores = "";
  
  if(arrayAutores.length > 3) {
    autores = arrayAutores[0].split(" ").pop() + " et al."
  } 
  else if(arrayAutores.length == 3) {
    autores = arrayAutores[0].split(" ").pop() + ", " + arrayAutores[1].split(" ").pop() + " e " + arrayAutores[2].split(" ").pop();
  }
  else if(arrayAutores.length == 2) {
    autores = arrayAutores[0].split(" ").pop() + " e " + arrayAutores[1].split(" ").pop();
  }
  else if(arrayAutores.length == 1){
    autores = autorInput.value.split(" ").pop();
  }

  //TRATAMENTO ANO
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();

  if(anoInput.value > anoAtual) {
    anoInput.classList.add("invalid");
  }

  //TABS
  //Citação direta
  if(tabs[0].classList.contains("active")) {
    if (
    !autorInput.classList.contains("invalid") && 
    !anoInput.classList.contains("invalid") && 
    !citacaoInput.classList.contains("invalid") &&
    !paginaInput.classList.contains("invalid") &&
    !document.querySelectorAll(".input-group")[2].classList.contains("hidden") &&
    !document.querySelectorAll(".input-group")[3].classList.contains("hidden")
    ){
    console.log("Citação Direta")
    //nomeAutor.textContent = autorInput.value.split(" ").pop();
    nomeAutor.textContent = autores;
    anoCita.textContent = anoInput.value;
    volumeCita.textContent = volumeInput.value;
    paginaCita.textContent = paginaInput.value;
    textoCita.textContent = citacaoInput.value;

    resultado_citacao_direta.classList.remove("hidden");
    resultado_citacao_indireta.classList.add("hidden");
    //Segundo <Ultimo nome do Autor> (<Ano>, <Volume>, <Pagina(s)>) "<Texto>".
    
    resultado_citacao_direta.innerHTML = buildCitacao("direta", nomeAutor.textContent, anoCita.textContent, volumeCita.textContent == "" || volumeCita == null ? null : volumeCita.textContent, paginaCita.textContent, textoCita.textContent)
  }
  }
  //Citação indireta
  else if(tabs[1].classList.contains("active")) {
    if (
    !autorInput.classList.contains("invalid") && 
    !anoInput.classList.contains("invalid") && 
    !citacaoInput.classList.contains("invalid") &&
    document.querySelectorAll(".input-group")[2].classList.contains("hidden") &&
    document.querySelectorAll(".input-group")[3].classList.contains("hidden")
  ) {
    console.log("Citação Indireta")
    nomeAutor.textContent = autores;
    anoCita.textContent = anoInput.value;
    textoCita.textContent = citacaoInput.value;

    resultado_citacao_direta.classList.add("hidden");
    resultado_citacao_indireta.classList.remove("hidden");
    //resultado_citacao_indireta.classList.innerHTML = `Segundo ${nomeAutor.textContent} (${anoCita.textContent}), "${textoCita.textContent}".`;
    resultado_citacao_indireta.innerHTML = buildCitacao("indireta", nomeAutor.textContent, anoCita.textContent, null, null, textoCita.textContent)
    
    //resultadoSection.classList.remove("hidden"); 
    } 
  }
  
});


function buildCitacao(tipo, autor, ano, volume, pagina, citacao) {
 
  // if(indexModelo > modelo.length-1 || indexModelo == 0) {
  //   if(tipo == "direta") {
  //     indexModelo = 0;
  //   } else {
  //     indexModelo = 1;
  //   }
  // }

  if(tipo == "indireta" && indexModelo == 0) {
    indexModelo = 1;
  }

  if(indexModelo == 0) {
    citacao = citacao[0].toUpperCase() + citacao.slice(1);
  }else {
    citacao = citacao[0].toLowerCase() + citacao.slice(1);
  }
  
  if(tipo == "direta") {
    if (!citacao.startsWith('"')) {
      citacao = '"' + citacao;
    }
    if (!citacao.endsWith('"')) {
      citacao = citacao + '"';
    }
  }

     
  const modelo = [
    `${citacao} (${autor}, ${ano}${volume ? ', ' + "v. " + volume : ''}${pagina ? ', p. ' + pagina : ""}) `,
    `Para ${autor} (${ano}${volume ? ', ' + "v. " + volume : ''}${pagina ? ', p. ' + pagina : ""}) ${citacao}`,
    `Segundo ${autor} (${ano}${volume ? ', ' + "v. " + volume : ''}${pagina ? ', p. ' + pagina : ""}) ${citacao}`,
    `De acordo com ${autor} (${ano}${volume ? ', ' + "v. " + volume : ''}${pagina ? ', p. ' + pagina : ""}) ${citacao}`
  ];
  
  // if(indexModelo > modelo.length-1 || indexModelo == 0) {
  //   if(tipo == "direta") {
  //     indexModelo = 0;
  //   } else {
  //     indexModelo = 1;
  //   }
  // }
  if(indexModelo > modelo.length-1 && tipo == "indireta") {
    indexModelo = 1;
  } else if(indexModelo > modelo.length-1 && tipo == "direta") {
    indexModelo = 0;
  }
  return modelo[indexModelo++]
}


  //MODELOS DE RETORNO DE CITAÇAO
  /*
  
  DIRETA
  [0] = “A comunicação é desses temas que todo mundo entende um pouco e sempre tem uma opinião. 
  Isto é compreensível, uma vez que […] ela é prática social, experiência cotidiana que leva à 
  formação de pontos de vista.” (ARAÚJO e CARDOSO, 2007, p.19)
  
  AMBOS
  [1] = Para Araújo e Cardoso (2007, p.19), “a comunicação é desses temas que todo mundo entende 
  um pouco e sempre tem uma opinião. Isto é compreensível, uma vez que […] ela é prática social, 
  experiência cotidiana que leva à formação de pontos de vista.”

  [2] = Segundo Araújo e Cardoso (2007, p.19), “a comunicação é desses temas que todo mundo entende 
  um pouco e sempre tem uma opinião. Isto é compreensível, uma vez que […] ela é prática social, 
  experiência cotidiana que leva à formação de pontos de vista.”

  [3] = De acordo com Araújo e Cardoso (2007, p.19), “a comunicação é desses temas que todo mundo entende 
  um pouco e sempre tem uma opinião. Isto é compreensível, uma vez que […] ela é prática social, 
  experiência cotidiana que leva à formação de pontos de vista.”

  */