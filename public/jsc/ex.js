console.log('Inside ex.js');
var p = 0;
var questionArray = [];
var l = 0;
var resultArray = [];
var resltArray=[];

async function load(){
  await makeRes();
  window.location.href = "/exam";
}

//Fetches question array and stores it locally
async function ftch() {
  await fetch('/next', { method: 'GET' })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function (data) {
      //console.log(ar)

      questionArray = data.ar;
      console.log(data.msg)//This will show a msg from  the server side route
      resultArray = data.resArray;
      l = data.ar.length;
      uid = data.uid;
      console.log(uid);
      console.log("lis")
      console.log(l)
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(questionArray)

 await setRadio();
 await show_data_at_ptr(p)

}

//called only once via startexam to make result array inside database
async function makeRes() {
  await fetch('/mkRes', {
    method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      init: 1
    })
  })
    .then(function (response) {
      if (response.ok) {
        console.log('Start  was clicked and created result');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
    });
}

//gives value to label of radio buttons
function show_data_at_ptr(p) {
  q = p;
  console.log("show called at q=")
  console.log(q)
  document.getElementById('tque').innerHTML = `${questionArray.length}`;
  document.getElementById('qid').innerHTML = `${questionArray[q].question}`;
  document.getElementById('1').innerHTML = `${questionArray[q].a}`;
  document.getElementById('2').innerHTML = `${questionArray[q].b}`;
  document.getElementById('3').innerHTML = `${questionArray[q].c}`;
  document.getElementById('4').innerHTML = `${questionArray[q].d}`;
  document.getElementById('userId').innerHTML = `Welcome ${uid}`;

}
//sets radio button to value of result in database
async function setRadio() {
  await fetch('/setter', { method: 'GET' })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function (data) {
            resltArray =data.refArray;
     
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("in set radio")
  var elea = document.getElementById("r1")
  var eleb = document.getElementById("r2")
  var elec = document.getElementById("r3")
  var eled = document.getElementById("r4")
  console.log("The value of p is"+p)
  console.log(resltArray[p].question)
  elea.checked = resltArray[p].a;
  console.log(resltArray[p].a);
  eleb.checked = resltArray[p].b;
  console.log(resltArray[p].b);
  elec.checked = resltArray[p].c;
  console.log(resltArray[p].c);
  eled.checked = resltArray[p].d;
  console.log(resltArray[p].d);
}

//uploads value corresponding to the question in database
async function submitRadio() {
  qnm = p + 1;
  await fetch('/subRes', {
    method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: qnm,
      a: document.getElementById('r1').checked,
      b: document.getElementById('r2').checked,
      c: document.getElementById('r3').checked,
      d: document.getElementById('r4').checked,

    })
  })
    .then(function (response) {
      if (response.ok) {
        console.log('click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
    });
}

//called each time next is clicked
async function nxt(e) {
  await submitRadio();
  console.log('next button was clicked p=');
  console.log(p)

  if (p < (l - 1)) {
    p++;
   await setRadio();
    show_data_at_ptr(p);

  }
  else {
    
    console.log("invalid p");
  }
};

//called each time previous is clicked 
async function prv(e) {
  await submitRadio();
  console.log('Prev button was clicked p='+p);
  if (p > 0) {
    p--;
  //clearRadio();
   await setRadio();
    show_data_at_ptr(p);
  }
  else {
    console.log("invalid p");
  }
};