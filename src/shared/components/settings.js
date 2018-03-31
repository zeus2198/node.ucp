/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import React from 'react';
import axios from 'axios';

import GlobalStore from '../stores/global.js';
import avatarChange from '../actions/avatarChange';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: '',
            cpwd: '',
            isProcessing: false,
            pwdError: false,
            cpwdError: false,
            uploading: false,
            title: props.title
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.showFileDialog = this.showFileDialog.bind(this);
        this.avatarSelect = this.avatarSelect.bind(this);
        this.changeCurrentAvatar = this.changeCurrentAvatar.bind(this);
    }

    componentDidMount() {
        document.title = this.state.title();
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ isProcessing: true, cpwdError: false, pwdError: false });
        if (this.state.pwd != this.state.cpwd) {
            $.notiny({ text: 'Passwords do not match!', position: 'right-top' });
            this.setState({ isProcessing: false, cpwdError: true });
            return;
        }
        if (this.state.pwd.length < 4 || this.state.pwd.length > 64) {
            $.notiny({ text: 'Password\'s length should be between 4 to 64!', position: 'right-top' });
            this.setState({ isProcessing: false, cpwdError: true, pwdError: true });
            return;
        }
        axios.post('/api/changePwd', {
            pwd: this.state.pwd
        }).then(() => {
            $.notiny({ text: 'Password updated successfully!', position: 'right-top', theme: 'success' });
            this.setState({ isProcessing: false, pwd: '', cpwd: '' });
        }).catch((err) => {
            $.notiny({ text: err.response.status == 401 ? 'Failed to validate login session' : 'Something went wrong!', position: 'right-top', theme:'alert'});
            this.setState({ isProcessing: false, pwd: '', cpwd: '' });
        });
    }

    uploadAvatar(file) {
        if (this.state.uploading) return $.notiny({ text: 'Avatar uploading already in progress!', position: 'right-top' });
        if (file.size > 1000000) return $.notiny({ text: 'File size should be less than 1mb', position: 'right-top' });
        if (file.type.substring(0,5) != 'image')
            return $.notiny({ text: 'Only image type files supported', position: 'right-top' });
        this.setState({ uploading: true });
        let formData = new FormData();
        formData.append("image", file);
        axios.post('/api/avatar/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            $.notiny({ text: 'Avatar updated successfully!', position: 'right-top', theme: 'success' });            
            this.changeCurrentAvatar(file);
        }).catch(err => {
            console.log(err);
            $.notiny({ text: err.response.status == 401 ? 'Failed to validate login session' : 'Something went wrong!', position: 'right-top', theme:'alert' });
            this.setState({ uploading: false });
        });
    }

    changeCurrentAvatar(file) {       
        let reader = new FileReader();
        reader.onload = ev => {     
            avatarChange(ev.target.result);     
            this.setState({ uploading: false});
            // passing new avatar to global stores which is then used by sidebar
        };
        reader.readAsDataURL(file);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onDrop(e) {
        e.preventDefault();
        let dt = e.dataTransfer, file;
        if (dt.items) {
            for (let i = 0; i < dt.items.length; i++) {
                if (dt.items[i].kind == "file") {
                    if (file) return $.notiny({ text: 'You can upload only a single file', position: 'right-top' });
                    file = dt.items[i].getAsFile();
                }
            }
        } else {
            if (dt.files.length > 1) return $.notiny({ text: 'You can upload only a single file', position: 'right-top' });
            file = dt.files[0];
        }
        this.uploadAvatar(file);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    showFileDialog() {
        this.refs.avatarInput.click();
    }

    avatarSelect(e) {
        this.uploadAvatar(e.target.files[0]);
    }

    render() {
        const { pwd, cpwd, isProcessing, pwdError, cpwdError, nAvatar } = this.state;
        return (
            <div>
                <br />
                <div className="cont settings-cont">
                    <div className="col-md-12 justify-content-md-center header" onDrop={this.onDrop} onDragOver={this.onDragOver}>
                        <div className='aWrapper'>
                            <img src={GlobalStore.state.nAvatar ? GlobalStore.state.nAvatar : `/api/avatars/${this.props.staticContext && typeof this.props.staticContext.userID != 'undefined' ? this.props.staticContext.userID : GlobalStore.state.userID}`} />
                            <div className={`uploadingOverlay ${this.state.uploading ? 'uploading' : ''}`}>
                                <i>Uploading..</i>
                            </div>
                            <div className='uploadOverlay' onClick={this.showFileDialog}>
                                <i className="fa fa-upload fa-3x"></i>
                                <input ref="avatarInput" type="file" accept="image/*" onChange={this.avatarSelect} />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='uInfo'>
                            Drag-drop or click on avatar to upload a new avatar <br />
                            It is recommended to upload avatars with same width and height as they will be resized to it anyways.
                        </div>
                    </div>
                    <div className='content-wrapper'>
                        <br />
                        <h2>CHANGE PASSWORD</h2>
                        <br />
                        <form role='form' onSubmit={this.onSubmit}>
                            <div className={`${pwdError && "field-error"}`}>
                                <input type="password" placeholder="New password" onChange={this.onChange} aria-describedby="New password"
                                    name="pwd" value={pwd} disabled={isProcessing} />
                            </div>
                            <br />
                            <div className={`${cpwdError && "field-error"}`}>
                                <input type="password" placeholder="Confirm password" onChange={this.onChange} aria-describedby="Confirm password"
                                    name="cpwd" value={cpwd} disabled={isProcessing} />
                            </div>
                            <br />
                            <center><button type="submit" className="customB" disabled={isProcessing}><h2 className="spacing">{isProcessing ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Go!'}</h2></button></center>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;