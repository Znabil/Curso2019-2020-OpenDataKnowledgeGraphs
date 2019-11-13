
$(function () {
  var width = 1;
  var count =0;
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                var elem = document.getElementById("myBar");
                reader.onload = function (e) {
                    var table = $("<table id=\"tables\"  cellspacing=\"0\" class=\"tables filterable\" />");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                      if(i==0){
                        var row = $("<tr />");
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                            for (var j = 0; j < cells.length; j++) {
                                var cell = $("<th />");
                                if(cells[j].includes("http")){
                                  cell.html("<a href="+cells[j]+ " target=\"popup\" onclick=\"window.open(\'"+cells[j]+"',\'popup\',\'width=600,height=600\'); return false;\">"+cells[j]+"</a>");
                                }else{
                                  cell.html(cells[j]);
                                }
                                row.append(cell);
                            }
                            table.append(row);                                                                                        
                        } 
                      }else{
                        count = parseInt((i*100)/rows.length);
                        width =  count+1;                          
                        elem.style.width = width + "%";
                        elem.innerHTML = width  + "%";                          
                          var row = $("<tr />");
                          var cells = rows[i].split(",");
                          if (cells.length > 1) {
                              for (var j = 0; j < cells.length; j++) {
                                  var cell = $("<td />");
                                  if(cells[j].includes("http")){
                                    cell.html("<a href="+cells[j]+ " target=\"popup\" onclick=\"window.open(\'"+cells[j]+"',\'popup\',\'width=600,height=600\'); return false;\">"+cells[j]+"</a>");
                                  }else{
                                    cell.html(cells[j]);
                                  }
                                  row.append(cell);
                              }
                              table.append(row);                                                                                        
                          } 
                      }
                           
                    }
                    $("#dvCSV").html('');
                    $("#dvCSV").append(table);
                }
                reader.readAsText($("#fileUpload")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });
  });

