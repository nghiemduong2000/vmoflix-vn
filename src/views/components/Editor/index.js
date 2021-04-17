/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});

function imageHandler() {
  const range = this.quill.getSelection();
  const value = prompt('please copy paste the image url here.');
  if (value) {
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id='toolbar'>
    <span className='ql-formats'>
      <select className='ql-header text-left' defaultValue=''>
        <option value=''>Normal</option>
        <option value='1'>Heading 1</option>
        <option value='2'>Heading 2</option>
        <option value='3'>Heading 3</option>
      </select>
    </span>
    <span className='ql-formats'>
      <button type='button' className='ql-list' value='bullet' />
      <button type='button' className='ql-list' value='ordered' />
    </span>
    <span className='ql-formats'>
      <button type='button' className='ql-bold' />
      <button type='button' className='ql-italic' />
      <button type='button' className='ql-underline' />
    </span>
    <span className='ql-formats'>
      <select className='ql-align' />
      <select className='ql-color' />
    </span>
    <span className='ql-formats'>
      <button type='button' className='ql-blockquote' />
      <button type='button' className='ql-code-block' />
    </span>
    <span className='ql-formats'>
      <button type='button' className='ql-link' />
      <button type='button' className='ql-image' />
    </span>
  </div>
);

/*
 * Editor component with custom toolbar and content containers
 */
export default class Editor extends React.Component {
  static modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: {
      container: '#toolbar',
      handlers: {
        image: imageHandler,
      },
    },
  };

  static formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'align',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
  ];

  render() {
    const { editorHtml, handleOnChange } = this.props;
    return (
      <div className='text-editor text-left'>
        <CustomToolbar />
        <ReactQuill
          value={editorHtml}
          onChange={handleOnChange}
          placeholder='Viết nội dung topic của bạn tại đây'
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  editorHtml: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
