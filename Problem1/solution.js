const generateSolutionMatrix = (arr, max_row) => {
  let row = max_row;
  let col = arr.length;
  let mat = new Array(row);
  for(let i = 0; i < row; i++){
    mat[i] = new Array(col).fill(-1);
  }

  for(let i = 0; i < arr.length; i++){
     let ele = arr[i];
     let left = 0;
     for(let j = i; j >= 0; j--){
      left = Math.max(left, arr[j]);
     }

     let right = 0;
     for(let j = i; j < arr.length; j++){
      right = Math.max(right, arr[j]);
     }

     let min = Math.min(left, right);
     let diff = min - ele;
     let j = row - 1;
     let temp = ele;
     while(temp-- > 0){
      mat[j][i] = 1;
      j--;
     }

     while(diff-- > 0){
      mat[j][i] = 0;
      j--;
     }
  }
  return mat;
}

const generateArray = (s) => {
  if(s.length == 0){
    window.alert('Please provide some elements')
    return;
  }
  let st = s.split(',')
  st.map((val, key) => {
    if(parseInt(val) < 0){
      window.alert("Negative numbers not allowed");
    }
    if(val.length == 0){
      window.alert("Invalid format")
    }
    return parseInt(val);
  })
  return st;
}

const buildTableView = () => {
  let inputValue = document.getElementById('inputBoxContainer').value;
  let arr = generateArray(inputValue);
 
  // Removing any previous element inside "block-container"
  let body = document.getElementById("block-container");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
 }

  let table = document.createElement('table');
  let max = Math.max(...arr);
  let max_rows = max + 2;
  let max_cols = arr.length;
  
  let mat = generateSolutionMatrix(arr, max_rows);
  
  // making the table
  for(let i = 0; i < max_rows; i++){
    let row = table.insertRow(i);
    for(let j = 0; j < max_cols; j++){
      let cell = row.insertCell(j);
      let color = "white"
      if(mat[i][j] == 1){
        color = "yellow";
      }else if(mat[i][j] == 0){
        color = "blue"
      }
      cell.style.backgroundColor = color;
    }
  }

  body.appendChild(table);
}

