function createGrid(rows, columns){
var table = document.createElement("table");
var row;
var column;
var txt;
	for(var i = 0; i < rows; i++){
		row = document.createElement("tr");
		for(var j = 0; j < columns; j++){
			column = document.createElement("td");
			txt = document.createTextNode("");
			column.appendChild(txt);
			column.style.textAlign = "center";
			column.style.width="50px";
			column.style.height="50px";
			column.style.border="1px solid black";
			row.appendChild(column);
		}
		table.appendChild(row);
	}
	document.body.appendChild(table);
	table.style.backgroundColor="#ddd";
	table.style.border="1px solid black";
	table.style.fontFamily="verdana, sans-serif";
	table.style.borderCollapse="collapse";
}


function setCellText(row, col, str){
document.documentElement.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].firstChild.nodeValue = str;
}


createGrid(3,3);
///console.log(document.body.getElementsByTagName("table").childNodes[0].firstChild);
//var x = document.body.getElementsByTagName("table").rows[0].cells.length;
//document.body.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].firstChild.nodeValue = "X";
//var num = x.length;\
//console.log(x);
setCellText(1,2,"X");
setCellText(0,0,"O");
setCellText(2,2,"X");
setCellText(0,2,"O");
setCellText(2,0,"X");
setCellText(0,1,"O");
setCellText(2,1,"X");
setCellText(1,1,"O");
setCellText(1,0,"X");