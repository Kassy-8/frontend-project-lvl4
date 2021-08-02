import ReactDOM from 'react-dom';
import init from './init.jsx';

const render = async () => {
  const dom = await init();
  ReactDOM.render(
    dom, document.getElementById('chat'),
  );
};

render();
