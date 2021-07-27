import ReactDOM from 'react-dom';
import app from './init.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    app(), document.getElementById('chat'),
  );
});
