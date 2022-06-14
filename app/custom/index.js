import ContextPadProvider from './ContextPadProvider';
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';
import PalettesProvider from './PalettesProvider';
import LabelEditingProvider from './LabelEditingProvider';
// import CustomRules from './CustomRules';
import RulesModule from './Rules';

export default {
    __depends__: [
        RulesModule,
    ],
    __init__: [
        // 'customContextPad',
        // 'customPalette',
        // 'customRules',
        'customRenderer'
    ],
    labelEditingProvider: ['type', LabelEditingProvider],
    paletteProvider: ['type', PalettesProvider],
    contextPadProvider: ['type', ContextPadProvider],
    // customContextPad: ['type', CustomContextPad],
    // customPalette: ['type', CustomPalette],
    // customRules: ['type', CustomRules],
    customRenderer: ['type', CustomRenderer],
};