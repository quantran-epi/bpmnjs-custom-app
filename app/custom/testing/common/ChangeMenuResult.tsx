import clsx from 'clsx';
import React from 'react';

export default function ChangeMenuResult(props) {

  const {
    template,
    lastTemplate,
    selected,
    showCategories = true,
    ...restProps
  } = props;

  return <React.Fragment>
    {showCategories && categoryChanged(template, lastTemplate) && <li
      key={template.category.id}
      className="cmd-change-menu__entry_header"
    >{template.category.name}</li>
    }

    <li
      class={clsx('cmd-change-menu__entry', { selected })}
      data-entry-id={template.id}
      {...restProps}
    >
      <div className="cmd-change-menu__entry-content">
        <span
          className={clsx('cmd-change-menu__name', template.classNameName)}
          title={template.label || template.name}
        >
          {template.imageUrl && <img className="cmd-change-menu__entry-icon" src={template.imageUrl} />}

          {template.label || template.name}
        </span>
        {template.description && <span className="cmd-change-menu__description" title="{template.description}">
          {template.description}
        </span>}
      </div>

      {template.documentationRef && <div className="cmd-change-menu__entry-help">
        <a
          href="{template.documentationRef}"
          onClick={(event) => event.stopPropagation()}
          title="Open element documentation"
          target="_blank"
          rel="noopener"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6368 10.6375V5.91761H11.9995V10.6382C11.9995 10.9973 11.8623 11.3141 11.5878 11.5885C11.3134 11.863 10.9966 12.0002 10.6375 12.0002H1.36266C0.982345 12.0002 0.660159 11.8681 0.396102 11.6041C0.132044 11.34 1.52588e-05 11.0178 1.52588e-05 10.6375V1.36267C1.52588e-05 0.98236 0.132044 0.660173 0.396102 0.396116C0.660159 0.132058 0.982345 2.95639e-05 1.36266 2.95639e-05H5.91624V1.36267H1.36266V10.6375H10.6368ZM12 0H7.2794L7.27873 1.36197H9.68701L3.06507 7.98391L4.01541 8.93425L10.6373 2.31231V4.72059H12V0Z" fill="#818798" />
          </svg>
        </a>
      </div>}
    </li>
  </React.Fragment>;
}

// helpers //////////////

export function categoryChanged(currentTemplate, lastTemplate) {
  const currentCategory = currentTemplate && currentTemplate.category;
  const lastCategory = lastTemplate && lastTemplate.category;

  return (currentCategory && currentCategory.id) != (lastCategory && lastCategory.id);
}
