import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

const TextEditor = ({ value, onChange , placeholder = "" }) => {
    const changeHandler = (event, editor) => {
        onChange(editor.getData());
    };

    return (
        <CKEditor
            placeholder={placeholder}
            onReady={(editor) => {
                // console.log(editor.ui.getEditableElement().parentElement);
                editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );

            }}
            onBlur={changeHandler}
            editor={DecoupledEditor}
            data={value}
        />
    );
};

export default TextEditor;
