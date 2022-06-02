import figlet from 'figlet';

import { initMsg, debug, error, warning } from '../handlers/chalkFunctions.js';

const listeningMessage = (port: number) => {
  console.log('\n');
  figlet.text(
    'dropee.pl',
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
    initMsg(`                ║            dropee.pl           ║`);
    initMsg(`                ║     http://localhost:${port}/     ║`);
    initMsg(`                ║                                ║`);
    initMsg(`                ╚════════════════════════════════╝`);
    initMsg('\n');
  }, 100);
};

export default listeningMessage;
