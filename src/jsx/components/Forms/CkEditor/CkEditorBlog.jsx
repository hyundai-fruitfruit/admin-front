/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 13:33:39
 * @modify date 2024-02-21 13:33:39
 * @desc [description]
 */
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




const CkEditorBlog = ({ onChange }) => {
    return (
        <CKEditor
            editor={ ClassicEditor }           
            onChange={ (event, editor) => {
                const data = editor.getData();
                onChange(data); // props로 받은 onChange 핸들러를 호출
            }}               
        />  
    );
};


export default CkEditorBlog;