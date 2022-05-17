import ContextPadProvider from './ContextPadProvider';
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import PalettesProvider from './PalettesProvider';
import LabelEditingProvider from './LabelEditingProvider';
import CustomRules from './CustomRules';

export default {
    __init__: [
        // 'customContextPad',
        // 'customPalette',
        'customRenderer',
        // 'customRules'
    ],
    labelEditingProvider: ['type', LabelEditingProvider],
    paletteProvider: ['type', PalettesProvider],
    contextPadProvider: ['type', ContextPadProvider],
    // customContextPad: ['type', CustomContextPad],
    // customPalette: ['type', CustomPalette],
    // customRules: ['type', CustomRules],
    customRenderer: ['type', CustomRenderer],
};