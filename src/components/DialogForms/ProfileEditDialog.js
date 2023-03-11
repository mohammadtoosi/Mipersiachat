import React from "react";
import { useSelector } from "react-redux";
import DialogPanel from "./DialogPanel";
import ProfileEditForm from "./ProfileEditForm";
import Button from "@material-ui/core/Button";

const ProfileEditDialog = () => {
    const profile = useSelector((state) => state.dialog.profile);
    return (
        <DialogPanel
            title="ویرایش"
            show={profile}
            action1={
                <Button variant="contained" color="primary">
                    ذخیره
                </Button>
            }
        >
            <ProfileEditForm />
        </DialogPanel>
    );
};

export default ProfileEditDialog;
