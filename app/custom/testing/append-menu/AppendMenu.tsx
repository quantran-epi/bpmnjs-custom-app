import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import {
  ChangeMenuResult
} from '../common';

import clsx from 'clsx';

export default function AppendMenu(
  config,
  elementTemplates, elementFactory,
  injector, changeMenu) {

  this._config = config;

  this._elementTemplates = elementTemplates;
  this._elementFactory = elementFactory;
  this._injector = injector;
  this._changeMenu = changeMenu;
}

AppendMenu.$inject = [
  'config.customMenu',
  'elementTemplates',
  'elementFactory',
  'injector',
  'changeMenuTest'
];

AppendMenu.prototype._isAppendAnything = function () {
  return this._config && this._config.appendAnything || false;
};

AppendMenu.prototype._getMatchingTemplates = function () {
  return this._elementTemplates.getAll().filter(template => {
    return template.appliesTo.includes('bpmn:Task') || template.appliesTo.includes('bpmn:ServiceTask');
  });
};

AppendMenu.prototype._getDefaultEntries = function () {

  if (!this._isAppendAnything()) {
    return [];
  }

  return []

};

AppendMenu.prototype._getTemplateEntries = function () {

  if (!('createElement' in this._elementTemplates)) {
    return [];
  }

  const templates = this._getMatchingTemplates();

  return []
};

AppendMenu.prototype._getContext = function (element) {

  const defaultEntries = this._getDefaultEntries();

  const templateEntries = this._getTemplateEntries();

  return {
    entries: [
      ...defaultEntries,
      ...templateEntries
    ],
    empty: !(
      templateEntries.length + defaultEntries.length
    )
  };
};

/**
 * Open append menu and return a promise to signal the result.
 *
 * If the user canceles the append operation the promise will be
 * rejected with `user-canceled`.
 *
 * @typedef { { event: DOMEvent, dragstart: boolean, newElement: DiagramElement } } AppendMenuResult
 *
 * @param { DiagramElement } element
 * @param { Point } position
 *
 * @return { Promise<AppendMenuResult> }
 */
AppendMenu.prototype.open = function (element, position) {

  const {
    entries
  } = this._getContext(element);

  const renderFn = (onClose) => <AppendMenuComponent
    entries={entries}
    onClose={onClose}
    title={this._isAppendAnything() ? 'Append element' : 'Append connector'}
    showCategories={this._isAppendAnything()}
  />;

  return this._changeMenu.open(renderFn, {
    position,
    className: 'cmd-append-menu'
  }).then((element) => {

    if (!element) {
      return Promise.reject('user-canceled');
    }

    return element;
  });
};

AppendMenu.prototype.isEmpty = function (element) {
  return this._getContext(element).empty;
};


function AppendMenuComponent(props) {

  const {
    onClose,
    entries,
    title,
    showCategories = true
  } = props;

  const onSelect = (event, entry, dragstart = false) => {
    const newElement = entry.action();

    onClose({
      event,
      newElement,
      dragstart
    });
  };

  const inputRef = useRef();
  const resultsRef = useRef();

  const [value, setValue] = useState('');

  const [templates, setTemplates] = useState(props.entries);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  useEffect(() => {

    const filter = (template) => {
      if (!value) {
        return template.rating !== -1;
      }

      const search = [
        template.name && 'connector' || '',
        template.name, template.description || '',
        template.label || '',
        template.search || ''
      ].join('---').toLowerCase();

      return value.toLowerCase().split(/\s/g).every(
        term => search.includes(term)
      );
    };

    const templates = entries.filter(filter);

    if (!templates.includes(selectedTemplate)) {
      setSelectedTemplate(templates[0]);
    }

    setTemplates(templates);
  }, [value, selectedTemplate, props.templates]);

  // focus input on initial mount
  useLayoutEffect(() => {
    if (inputRef.current) (inputRef.current as any)?.focus();
  }, []);

  // scroll to keyboard selected result
  useLayoutEffect(() => {

    const containerEl = resultsRef.current;

    const selectedEl = containerEl ? (containerEl as any).querySelector('.selected') : undefined;

    if (selectedEl) {
      // scrollIntoView(selectedEl);
    }
  }, [selectedTemplate]);

  const keyboardSelect = useCallback(direction => {

    const idx = templates.indexOf(selectedTemplate);

    let nextIdx = idx + direction;

    if (nextIdx < 0) {
      nextIdx = templates.length - 1;
    }

    if (nextIdx >= templates.length) {
      nextIdx = 0;
    }

    setSelectedTemplate(templates[nextIdx]);
  }, [templates, selectedTemplate]);

  const handleKeyDown = useCallback(event => {

    if (event.key === 'Enter' && selectedTemplate) {
      onSelect(event, selectedTemplate);

      return event.preventDefault();
    }

    if (event.key === 'Escape') {
      return onClose();
    }

    // ARROW_UP or SHIFT + TAB navigation
    if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      keyboardSelect(-1);

      return event.preventDefault();
    }

    // ARROW_DOWN or TAB navigation
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      keyboardSelect(1);

      return event.preventDefault();
    }

  }, [selectedTemplate, keyboardSelect]);

  const handleKey = useCallback((event) => {
    setValue(() => event.target.value);
  }, []);

  return <React.Fragment>
    <div className="cmd-change-menu__header">
      <h3 className="cmd-change-menu__title">
        Custom Menu
      </h3>
    </div>

    <div className="cmd-change-menu__body">
      <div className={clsx('cmd-change-menu__search', { hidden: props.entries.length < 5 })}>
        <svg className="cmd-change-menu__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          onKeyUp={handleKey}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul className="cmd-change-menu__results" ref={resultsRef}>
        {templates.map((template, idx) => <ChangeMenuResult
          key={template.id}
          template={template}
          lastTemplate={templates[idx - 1]}
          showCategories={showCategories}
          selected={template === selectedTemplate}
          draggable
          onMouseEnter={() => setSelectedTemplate(template)}
          onDragStart={(event) => { event.stopPropagation(); event.preventDefault(); onSelect(event, template, true); }}
          onClick={(event) => { event.stopPropagation(); onSelect(event, template); }}
        />)}

        {!templates.length && <li className="cmd-change-menu__muted-entry"> Custom menu content</li>}
      </ul>
    </div>
  </React.Fragment>;
}