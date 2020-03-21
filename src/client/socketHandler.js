
export default (socketClient, ui) => {
  socketClient.on('broadcastState', (data) => {
    console.log('broadcastState', data);
    ui.states.innerHTML += `<div>
      <p>${data.text}</p>
      <button onClick="window.ui.sendLike('${data.id}')">Like</button>
    </div>`;
  });

  socketClient.on('successLogin', (token) => {
    console.log(token);
    ui.updateClientData(token);
    ui.login.style.display = 'none';
    ui.wall.style.display = 'block';
  });
};