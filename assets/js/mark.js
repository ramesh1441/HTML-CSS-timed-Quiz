function printstudentmarks() {
  var studentmarks = JSON.parse(window.localStorage.getItem('studentmarks')) || [];
  console.log(studentmarks);
studentmarks.sort(function (a, b) {
return b.mark - a.mark;
  }
 );
  for (var i = 0; i < studentmarks.length; i += 1) {
    var li = document.createElement('li');
    li.textContent = studentmarks[i].initials + ':  mark = ' + studentmarks[i].mark;
    console.log(studentmarks.length);
    console.log(studentmarks);
    var olEl = document.getElementById('studentmarks');
    olEl.appendChild(li);
  }
}
function erasestudentmarks() {
  window.localStorage.removeItem('studentmarks');
  window.location.reload();
}
printstudentmarks();
document.getElementById('erase').onclick = erasestudentmarks;
  
  
  
  
  
  
  
  
  
  
  
  
  
  