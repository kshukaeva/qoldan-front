import React, {useRef} from 'react'

const ImageFileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file.size > 5120)
            onFileSelectError({ error: "File size cannot exceed more than 5MB" });
        else
            onFileSelectSuccess(file);
    };
}