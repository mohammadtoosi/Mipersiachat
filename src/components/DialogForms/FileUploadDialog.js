import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fileActions } from "../../redux/file";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import DialogPanel from "./UserInfoDialog";
import routes from "../../api/routes";

const useStyles = makeStyles((theme) => ({}));

const FileUploadDialog = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);
    const fileUpload = useSelector((state) => state.dialog.fileUpload);
    const [selectedFile, setSelectedFile] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectedFileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(selectedFile);
    };

    const uploadFileAsync = async () => {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile, selectedFile.name);
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.file, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                body: uploadData,
            });
            const data = await response.json();
            dispatch(fileActions.getData(data));
        } catch (err) {
            setError(err);
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <DialogPanel
            title="اپلود فایل"
            show={fileUpload}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={uploadFileAsync}
                >
                    انتخاب
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                        <Box>
                            <p>لطفا بعد از انتخاب عکس روی ارسال کلیک کنید</p>
                        </Box>
                    <Box>
                        <input type="file" onChange={selectedFileHandler} />
                    </Box>
                    <Box>
                        {isLoading && (
                            <CircularProgress style={{ color: UI.primary }} />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </DialogPanel>
    );
};

export default FileUploadDialog;
