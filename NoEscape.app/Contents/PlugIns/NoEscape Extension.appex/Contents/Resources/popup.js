const switchEl = document.getElementById("cb2");

//get initial state from backend
browser.runtime.sendMessage({type: 'GET_STATE'}).then((res) => {
    switchEl.checked = res
})

//toggle state
switchEl.onclick = function(event){
  browser.runtime.sendMessage({type: 'TOGGLE_STATE', state: event.target.checked});
}
