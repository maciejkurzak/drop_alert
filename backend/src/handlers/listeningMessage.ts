import figlet from 'figlet';

import { initMsg, debug, error, warning } from '../handlers/chalkFunctions.js';

const listeningMessage = (port: number) => {
  console.log('\n');
  figlet.text(
    'drop_alert',
    {
      // font: 'Dr Pepper',
      font: 'Larry 3D',
      // font: 'Rectangles',
    },
    function (err: any, data: any) {
      console.log(data);
    }
  );
  setTimeout(() => {
    initMsg('\n');
    initMsg(`                ╔════════════════════════════════╗`);
    initMsg(`                ║                                ║`);
    initMsg(`                ║           drop_alert           ║`);
    initMsg(`                ║     http://localhost:${port}/     ║`);
    initMsg(`                ║                                ║`);
    initMsg(`                ╚════════════════════════════════╝`);
    initMsg('\n');
  }, 100);
};

export default listeningMessage;
