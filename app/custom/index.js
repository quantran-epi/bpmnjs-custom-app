import ContextPadProvider from './ContextPadProvider';
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import PalettesProvider from './PalettesProvider';

export default {
    __init__: [
        // 'customContextPad',
        // 'customPalette',
        'customRenderer',
    ],
    paletteProvider: ['type', PalettesProvider],
    contextPadProvider: ['type', ContextPadProvider],
    // customContextPad: ['type', CustomContextPad],
    // customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer],
};