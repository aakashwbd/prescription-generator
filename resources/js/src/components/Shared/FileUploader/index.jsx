import { Delete } from "@mui/icons-material";
import { Avatar, Grid, IconButton } from "@mui/material";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond/dist/filepond.min.css";
import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useStyles } from "./styled";

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);

const FileUploader = ({
    attachments = [],
    uploadedHandler = () => {},
    maxFiles = 3,
    checkValidity = true,
    allowMultiple = true,
    allowReorder = true,
    server = "/api/v1/site/file-uploader",
    ...props
}) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);

    return (
        <>
            {attachments.length > 0 && (
                <Grid container spacing={1} mb={1}>
                    {attachments.map((item, i) => (
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            lg={3}
                            key={i}
                            className={classes.avatarBox}
                        >
                            <Avatar src={item} className={classes.avatar} />
                            <IconButton
                                className={classes.actionBtn}
                                onClick={() => uploadedHandler(item, "delete")}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            )}
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                onprocessfile={(err, file) => {
                    let res = JSON.parse(file.serverId);
                    if (res.status === "success") {
                        uploadedHandler(res.data, "add");
                        setFiles([]);
                    }
                }}
                acceptedFileTypes={["image/png, image/jpeg, image/gif"]}
                checkValidity={checkValidity}
                allowMultiple={allowMultiple}
                allowReorder={allowReorder}
                server={server}
                maxFiles={maxFiles}
                {...props}
                name="file"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </>
    );
};

export default FileUploader;
