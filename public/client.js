const input=document.getElementById("input");
const button=document.getElementById("button");
const dummyDiv=document.getElementById("dummyDiv");
const selectEngine=document.getElementById("selectEngine");
const choices=document.getElementById("choices");
const clear=document.getElementById("clear");
const load=document.getElementById("load");


input.value="Another One bites the";//this is a recommendation
choices.addEventListener("change",function(){
  input.value=choices.value;
})


let string=null;
let responseArray=[];
let value={};


clear.addEventListener("click",function(){
  responseArray=[];
  input.value="";
  dummyDiv.textContent="";
})


button.addEventListener("click",async function(){
    dummyDiv.textContent="";
    load.classList.add("loading");
    load.textContent="Loading...";

    value[input.name]=input.value;
    value["selectEngine"]=selectEngine.value;
    
    //make request
    console.log(value);
    let sendData={
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value)
    } 
    //make request

    const response= await fetch("/api",sendData);
    const data=await response.json();
    string=data;
    string=string.choices[0].text;

    let obj=new Object();
    obj["string"]=string;
    obj["prompt"]=input.value;

    responseArray.push(obj);
    responseArray.map((item)=>{
      load.textContent="";
      let content=document.createElement("div");
      content.classList.add("container");
      content.innerHTML=`<p class="text"><span>Prompt: </span>${item.prompt}</p>
      <p class="text"><span>Response: </span>${item.string}</p>`;
      dummyDiv.append(content);
    })
})


