function trataAutores(str) {
  let array = str.toString().split(",");
  let authors = "";
  
  for(let idx = 0; idx < array.length; idx++) {
      let autor = array[idx].toUpperCase().split(" ");
      //console.log("idx: "+ idx + ", autor: " + autor);
      //exclui campo vazio de array
      autor = autor.filter((vazio)=> {
          return vazio !== '';
      }) 
      //console.log("idx: "+ idx + ", autor: " + autor);
      
      console.log("idx: "+ idx + ", autors: " + autor[autor.length-1]);
      authors += autor[autor.length-1];
      autor.pop();
      
      //console.log("idx: "+ idx + ", autors: " + authors);

      //console.log(autor)
      for(let y = 0; y < autor.length; y++) {
          autor[y] = autor[y].slice(0, 1);
          if(!y == autor.length-1){
              autor[y] += ".";
          }
      }
      autor = autor.toString();
      
      autor = autor.replace(/,/g, ' ');
      console.log(autor)
      authors += ", " + autor + "; "
      
  }
  authors = authors.slice(0, authors.length-2);
  authors += ".";
  console.log("function de autores: " + authors);
  return authors;
}

function trataTitulo(str) {
  let title;
  let subtitulo;

  if(str.split(":").length > 1) {
      let titleSplit = str.split(":");
      title = titleSplit[0]
      subtitulo = ": " + titleSplit[1].toLowerCase();
  } else {
      title = str + ". ";
      subtitulo = null;
  }

  return subtitulo == null ? title : title + subtitulo;
}