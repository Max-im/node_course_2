function fetchFunc1(val) {
  return new Promise(res => {
    setTimeout(() => res(val), 2000);
  });
}


function fetchFunc2(val) {
  return new Promise(res => {
    setTimeout(() => res(val), 4000);
  });
}


async function launch() {
  const a = await fetchFunc1(20);
  const b = await fetchFunc2(30);
  return a + b;
}

launch()
.then(data => console.log(data));


// 22222222222222222222222222222222222222222222222

async function launch2() {
  const a = fetchFunc1(20);
  const b = fetchFunc2(30);
  return await a + await b;
}

launch2()
.then(data => console.log(data));