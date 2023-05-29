$(() => {

    let result = JSON.parse(localStorage["result"]);
    let workdays  = ["Mon", "Tue", "Wedn", "Thurs", "Fri"]
    let times =  JSON.parse(localStorage["times"]);

    if (result[0][0] == -1){
        $('#preview').append("<h1>Unable to generate result, try changing input</h1>");
    }else{
        var table = $('<table>').addClass('preview-table').attr('id', 'preview-table');

        for(let i=0; i<times.length + 1; i++){
            var row = $('<tr>').addClass('table-row');
    
            if (i == 0){
                row.append($('<td>').addClass('table-cell').text('Timeslot'));
                for (const workday of workdays)
                {
                    var cell = $('<td>').addClass('table-cell').text(workday);
                    row.append(cell);
                }
            }else{
                for(let j=0; j<6; j++){
                    if (j == 0){
                        var cell = $('<td>').addClass('table-cell').text(times[i-1]);
                    }else{
                        var cell = $('<td>').addClass('table-cell').text(result[(i-1) + (j-1)*6][1]);
                    }
                    row.append(cell);
                }
            }
            table.append(row);
            
        }
    
        $('#preview').append(table);
    }
    console.log(result)

    $("#download").click(function(){
        $("#preview-table").tableHTMLExport({

            type:'csv',
          
            filename:'schedule.csv',

            separator: ',',
            newline: '\r\n',
            trimContent: true,
            quoteFields: true,
            
        });
    });

})