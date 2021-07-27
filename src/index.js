import ReactDOM from 'react-dom';
import App from './init.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    App(), document.getElementById('chat'),
  );
});
