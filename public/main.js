const tableBodyRows=document.querySelectorAll('.dataRows')
setInterval(()=>{
    fetch('/timer-update')
    .then(response => response.json())
    .then(data => {
        data.forEach((d,ind)=>{
            const cells=tableBodyRows[ind].querySelectorAll('td')
            cells[1].textContent=d.name;
            cells[2].textContent=d.last;
            cells[3].textContent=d.buy;
            cells[4].textContent=d.sell;
            cells[5].textContent=d.volume;
            cells[6].textContent=d.base_unit;
        })
    })
},60000)