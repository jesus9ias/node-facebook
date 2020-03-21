
export default socketClient => {
  const stateText = document.getElementById('state-text');
  const sendState = document.getElementById('send-state');
  const states = document.getElementById('states');
  const loginForm = document.getElementById('login');
  const userName = document.getElementById('userName');
  const password = document.getElementById('password');
  const doLogin = document.getElementById('do-login');

  const clienData = {
    token: ''
  };

  function updateClientData(token) {
    clienData.token = token;
  }

  const wall = document.getElementById('wall');
  wall.style.display = 'none';

  sendState.addEventListener('click', () => {
    console.log(2, clienData);
    console.log('sendState', stateText.value);
    if (stateText.value.length > 0) {
      socketClient.emit('sendState', {
        token: clienData.token,
        text: stateText.value
      });
    }
  });

  doLogin.addEventListener('click', () => {
    if (userName.value.length > 0 && password.value.length > 0) {
      socketClient.emit('doLogin', {
        userName: userName.value,
        password: password.value
      });
    }
  });

  const sendLike = (id) => {
    console.log(id);
  }

  return {
    clienData,
    updateClientData,
    sendLike,
    wall,
    login,
    states
  }
};
