window.onload = function () {
  const form = document.querySelector('#vote-form')

  form.onsubmit= function(e){

    const choise = document.querySelector('input[name=os]:checked').value;

    //console.log(choise+"-------------")
    const data = {os: choise}

    fetch('http://localhost:3000/poll',{
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(res=> res.json())
      .then(data=> console.log(data))
        .catch(err=> console.log(err))


    e.preventDefault()
  }

  fetch('http://localhost:3000/poll')
  .then(res=>res.json())
    .then(data=>{
      const votes = data.votes;
      const totalVotes = votes.length;
      const voteCounts = votes.reduce(// sum of array elements
        (acc, vote)=>(
          (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
        ),
         {}
       );


        let dataPoints = [
          {label: 'Windows', y:voteCounts.Windows},///columns y is default from database
          {label: 'Linux', y:voteCounts.Linux},
          {label: 'MacOS', y:voteCounts.MacOS},
          {label: 'Other', y:voteCounts.Other}
        ]
        const chartContainer = document.querySelector('#chartContainer');
        //console.log(chartContainer+"------------------")
        if(chartContainer){
          const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',//change to theme1 theme2
            title: {
              text:`total votes ${totalVotes}`
            },
            data: [
              {
                type: 'column', //pie bar area spline
                dataPoints: dataPoints //array of objects
              }
            ]
          })
          chart.render() //draw canvas

              // Enable pusher logging - don't include this in production
             //Pusher.logToConsole = true;

             var pusher = new Pusher('5e3627a5f1b616a24bf1', {
               cluster: 'eu',
               forceTLS: true
             });

             var channel = pusher.subscribe('os-poll');
             channel.bind('os-vote', function(data) {//req.body from form
               console.log('finished')
               dataPoints = dataPoints.map(x=>{
                 if(x.label == data.os){
                   x.y += data.points;
                   return x;
                 }else{
                   return x;
                 }
               })
               chart.render()
             });
        }

    })

}
