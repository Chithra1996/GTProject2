const location = window.location.pathname;
if ( location === "/api/sql_data"){
    d3
    .json('../sql_tim')
    .then(data =>{
     console.log(data);
})
    .catch(err => console.log(err))
}
if (location === '/two'){
//lk
}


