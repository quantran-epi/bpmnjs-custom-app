import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import diagramXML from '../resources/newDiagram.bpmn';
import customModules from './custom/index';
import customPackage from '../resources/custom.json';
import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';
import 'bpmn-js-connectors-extension/dist/connectors-extension.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import TemplateIconRendererModule from '@bpmn-io/element-templates-icons-renderer';

import ZeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import ZeebeModdleModule from 'zeebe-bpmn-moddle/lib';

import minimapModule from 'diagram-js-minimap';

import CustomMenuExtension from './custom/testing';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import EMAIL_TEMPLATES from './custom/.camunda/element-templates/sendgrid-connector.json';
import REST_TEMPLATES from './custom/.camunda/element-templates/http-json-connector.json';
import HEADER_INPUT_TEMPLATES from './custom/.camunda/element-templates/header-input.json';

const TEMPLATES = [...EMAIL_TEMPLATES, ...REST_TEMPLATES, ...HEADER_INPUT_TEMPLATES];

function debounce(fn, timeout) {

  var timer;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(fn, timeout);
  };
}

export default function init() {
  var container = $('#js-drop-zone');

  var modeler = new BpmnModeler({
    container: '#js-canvas',
    additionalModules: [
      customModules,
      // ConnectorsExtensionModule,
      // BpmnPropertiesPanelModule,
      // BpmnPropertiesProviderModule,
      // ZeebePropertiesProviderModule,
      // CloudElementTemplatesPropertiesProviderModule,
      // TemplateIconRendererModule,
      // ZeebeModdleModule,
      minimapModule,

      // CustomMenuExtension
    ],
    moddleExtensions: {
      custom: customPackage,
      // zeebe: ZeebeModdle
    },
    keyboard: {
      bindTo: document
    },
    // connectorsExtension: {
    //   appendAnything: true,
    // },
    // propertiesPanel: {
    //   parent: '#js-properties-panel'
    // },
  });

  window.myModeler = modeler;

  modeler.on('elementTemplates.errors', event => {

    const { errors } = event;

    showTemplateErrors(errors);
  });

  // modeler.get('connectorsExtension').loadTemplates(TEMPLATES);

  function createNewDiagram() {
    openDiagram(diagramXML);
  }

  async function openDiagram(xml) {

    try {

      await modeler.importXML(xml);

      container
        .removeClass('with-error')
        .addClass('with-diagram');
    } catch (err) {

      container
        .removeClass('with-diagram')
        .addClass('with-error');

      container.find('.error pre').text(err.message);

      console.error(err);
    }
  }

  function registerFileDrop(container, callback) {

    function handleFileSelect(e) {
      e.stopPropagation();
      e.preventDefault();

      var files = e.dataTransfer.files;

      var file = files[0];

      var reader = new FileReader();

      reader.onload = function (e) {

        var xml = e.target.result;

        callback(xml);
      };

      reader.readAsText(file);
    }

    function handleDragOver(e) {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    container.get(0).addEventListener('dragover', handleDragOver, false);
    container.get(0).addEventListener('drop', handleFileSelect, false);
  }


  // file drag / drop ///////////////////////

  // check file api availability
  if (!window.FileList || !window.FileReader) {
    window.alert(
      'Looks like you use an older browser that does not support drag and drop. ' +
      'Try using Chrome, Firefox or the Internet Explorer > 10.');
  } else {
    registerFileDrop(container, openDiagram);
  }

  // bootstrap diagram functions

  $(function () {
    createNewDiagram();

    $('#js-create-diagram').click(function (e) {
      e.stopPropagation();
      e.preventDefault();

      createNewDiagram();
    });

    var downloadLink = $('#js-download-diagram');
    var downloadSvgLink = $('#js-download-svg');
    var downloadProperties = $('#js-download-properties');

    $('.buttons a').click(function (e) {
      if (!$(this).is('.active')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    function setEncoded(link, name, data) {
      var encodedData = encodeURIComponent(data);

      if (data) {
        link.addClass('active').attr({
          'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
          'download': name
        });
      } else {
        link.removeClass('active');
      }
    }

    var exportArtifacts = debounce(async function () {

      downloadProperties.addClass('active');

      try {

        const { svg } = await modeler.saveSVG();

        setEncoded(downloadSvgLink, 'diagram.svg', svg);
      } catch (err) {

        console.error('Error happened saving svg: ', err);
        setEncoded(downloadSvgLink, 'diagram.svg', null);
      }

      try {

        const { xml } = await modeler.saveXML({ format: true });
        setEncoded(downloadLink, 'diagram.bpmn', xml);
      } catch (err) {

        console.error('Error happened saving XML: ', err);
        setEncoded(downloadLink, 'diagram.bpmn', null);
      }
    }, 500);

    modeler.on('commandStack.changed', exportArtifacts);
  });

  return modeler;
}