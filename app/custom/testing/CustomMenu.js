const customMenuSvg = `
<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.75 4.5a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75zM0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75z"/><path d="M9 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842L9.77 16.005a.5.5 0 01-.77-.42z"/></svg>
`;

const customMenuSvgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(customMenuSvg);

// workaround for
// https://github.com/camunda/camunda-bpmn-js/issues/87
const LOWER_PRIORITY = 499;


export default function ConnectorsExtension(
    config,
    injector, create,
    contextPad, translate,
    elementTemplatesLoader,
    appendMenu,
    palette) {

    this._create = create;
    this._contextPad = contextPad;
    this._translate = translate;
    this._elementTemplatesLoader = elementTemplatesLoader;
    this._appendMenu = appendMenu;

    this._autoPlace = injector.get('autoPlace', false);

    this._config = config;

    contextPad.registerProvider(LOWER_PRIORITY, this);

    if (true) {
        palette.registerProvider(LOWER_PRIORITY, this);
    }
}

ConnectorsExtension.$inject = [
    'config.customMenu',
    'injector', 'create',
    'contextPad', 'translate',
    'elementTemplatesLoader',
    'customMenu',
    'palette'
];

ConnectorsExtension.prototype._getAppendMenuPosition = function (element) {

    // var X_OFFSET = 5;

    // var pad = this._contextPad.getPad(element).html;

    // var padRect = pad.getBoundingClientRect();

    // var pos = {
    //     x: padRect.right + X_OFFSET,
    //     y: padRect.top
    // };

    // return pos;

    var Y_OFFSET = 5;

    var pad = this._contextPad.getPad(element).html;

    var padRect = pad.getBoundingClientRect();

    var pos = {
        x: padRect.left,
        y: padRect.bottom + Y_OFFSET
    };

    return pos;
};

ConnectorsExtension.prototype.appendAnything = function (event, element) {
    const appendMenu = this._appendMenu;

    //
    // if (appendMenu.isEmpty(element)) {
    //     return;
    // }

    const position = {
        ...(this._getAppendMenuPosition(element)),
        cursor: event && { x: event.x, y: event.y }
    };

    return appendMenu.open(element, position).then(result => {

        if (!result) {
            return;
        }

        const {
            event,
            newElement,
            dragstart = false
        } = result;

        const createStart = (event, source, newElement) => {
            this._create.start(event, newElement, {
                source
            });
        };

        const append = !dragstart && this._autoPlace
            ? (event, source, newElement) => {
                this._autoPlace.append(source, newElement);
            }
            : createStart;

        append(event, element, newElement);
    }).catch(error => {
        if (error !== 'user-canceled') {
            console.error('append-anything :: error', error);
        }
    });
};

ConnectorsExtension.prototype.getContextPadEntries = function (element) {

    const translate = this._translate;

    if (element.labelTarget) {
        return null;
    }

    return (entries) => {

        // only allow when appending task is allowed, too
        entries['custom-menu'] = {
            group: 'edit',
            imageUrl: customMenuSvgUrl,
            title: translate('Custom menu'),
            action: {
                click: (event, element) => {
                    this.appendAnything(event, element);
                }
            }
        };
        return entries;
    };
};

ConnectorsExtension.prototype.getPaletteEntries = function () {

    return {
        // 'create-anything': {
        //     group: 'anything',
        //     imageUrl: createImageUrl,
        //     title: this._translate('Create anything'),
        //     action: {
        //         click: (event) => {

        //             const cursor = event && { x: event.x, y: event.y };

        //             const position = event && {
        //                 x: cursor.x + 35,
        //                 y: cursor.y + 10,
        //                 cursor
        //             };

        //             this.createAnything(event, position);
        //         }
        //     }
        // }
    };
};