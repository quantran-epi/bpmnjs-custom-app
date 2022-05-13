import CustomMenu from './CustomMenu';
import ChangeMenuModule from './change-menu';
import AppendMenuModule from './append-menu';

export default {
    __depends__: [
        ChangeMenuModule,
        AppendMenuModule,
    ],
    __init__: [
        'customMenuExtension',
    ],
    customMenuExtension: ['type', CustomMenu],
};
