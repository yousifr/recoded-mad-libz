/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // to return a list of objects
  //splitting the story.txt into objects of words
  // let newArray=rawStory.replace(/[^A-Za-z0-9-[]]+/g,"").trim().split(" ");
  
  let newArray=rawStory.split(" ");
  console.log(newArray);
  
  var listOfObjects=[];
newArray.forEach(function (entry) {
    var singleObj = {};
    let word = entry.replace(/\[n]|\[v]|\[a]+/g, "");
    singleObj["word"] = word;
    console.log(singleObj)

    
    let letterN = /[[n]]/;
    let letterV = /[[v]]/;
    let letterA = /[[a]]/;

    if (letterN.test(entry) == true) {
      singleObj["pos"] = "noun";
    }
    if (letterV.test(entry) == true) {
      singleObj["pos"] = "verb";
    }
    if (letterA.test(entry) == true) {
      singleObj["pos"] = "adj";
    } else singleObj["pos"];

    listOfObjects.push(singleObj);
  
  })
  console.log(listOfObjects)

  // console.log(rawStory);
  // Your code here.
  return listOfObjects; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    //  calling the divs by class names 
    const previewInput=document.querySelector(".madLibsPreview")
    const editInput=document.querySelector(".madLibsEdit")

    processedStory.forEach((processedStory)=>{
      if(processedStory.pos != null){
        const input=document.createElement("input");
        input.setAttribute("maxlength","20");
        input.setAttribute("type","text");
        const inputSpan=document.createElement("span");
        inputSpan.innerText= " ";
        const outputspan=document.createElement("span");
        outputspan.innerText=" ";
        const output=document.createElement("input");
        output.setAttribute("maxlength","20");
        output.setAttribute("type","text");
        editInput.appendChild(inputSpan);
        editInput.appendChild(input);

        input.placeholder = " " + processedStory.pos;

        // make the selection equal to the current object
        input.select();

        previewInput.appendChild(outputspan);
        previewInput.appendChild(output);
        output.placeholder= " " + processedStory.pos;

        input.select();

        input.addEventListener("input",(e)=>{
          output.innerHTML=input.value;
          if(input.value){
            input.setAttribute("class", "inputFilled")
          }else{
            input.removeAttribute("class","inputFilled")
          }
        })
        input.addEventListener("input",(e)=>{
          output.value=input.value;
        })

        const inputs=document.querySelectorAll("input");

        for(let i=0;i<inputs.length;i++){
          inputs[i].addEventListener("keypress",(e)=>{
            if(e.key==="Enter"){
              if(i===inputs.length-1){
                inputs[0].focus();
              }else{
                inputs[i+1].focus();
              }
            }
          })
        }
        
        
      }else{
        let inputWord=document.createElement("span");
        inputWord.innerText=`${processedStory.word} `;
        editInput.appendChild(inputWord);

        let outputWord=document.createElement("span");
        outputWord.innerText=`${processedStory.word}  `
        previewInput.appendChild(outputWord);
      }

      console.log(processedStory.word);
    })

  });
