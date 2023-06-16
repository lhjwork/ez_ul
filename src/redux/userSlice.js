import { createSlice } from '@reduxjs/toolkit';

import { api } from '../api/api';
import { errMsg } from '../untils/errorMessage';


let initialStates = {
    user: null,
    token: null,
    isAdmin: null,
};
const userSlice = createSlice({
    name: 'auth',
    initialState: initialStates,
    reducers: {
        LOGIN: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAdmin = user.type === 'admin';

            // api.defaults.headers.common['Authorization'] = 'Token ' + token;
            // api.defaults.headers = {
            //     Authorization: `Token ${token}`,
            //     'Content-Type': 'application/json',
            // };

            api.defaults.headers.common['Authorization'] = `Token ${token}`;
            api.defaults.headers.post['Content-Type'] = 'application/json';
        },

        LOGOUT: (state) => {
            return initialStates;
        },
        SIGNUP: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            // api.headers.common['Authorization'] = 'Token ' + token;
            // api.defaults.headers.common['Authorization'] = 'Token ' + token;
        },

        UpdateUserGym: (state, action) => {
            state.user = action.payload;
            alert('tes');
        },
        UpdateLogo: (state, action) => {
            state.user.gym.logo = action.payload;
        },
        UpdateLicense: (state, action) => {
            console.log('pay', action.payload);
            state.user.licensePayment = action.payload;
        },
        UpdateUserProfile: (state, action) => {
            const { user, token } = action.payload;
            if (user.type === 'admin') {
                return;
            }
            state.user = user;
            state.token = token;
        },
        ChangeGym: (state, action) => {
            console.log('action payload', action.payload);
            state.user.gym = action.payload;
        },
    },
});
export const {
    LOGIN,
    LOGOUT,
    LOGINTYPE,
    UpdateUserGym,
    SIGNUP,
    UpdateLogo,
    UpdateLicense,
    UpdateUserProfile,
    ChangeGym,
} = userSlice.actions;

export const connectLogin = (body) => async (dispatch) => {
    try {
        const { data } = await api.post('web-sign-in', body);
        dispatch(LOGIN({ user: data.user, token: data.token }));
        let isAdmin = data?.user?.type === 'admin';
        if (isAdmin) {
            await (async () => {
                try {
                    const { data } = await api.get('test/');
                    if (data.length === 0) {
                        dispatch(ChangeGym([]));
                        return;
                    }
                    dispatch(ChangeGym(data[0]));
                } catch (e) {
                    errMsg(e);
                }
            })();
        }
        alert('로그인에 성공하였습니다');
    } catch (err) {
        errMsg(err);
    }
};

export const connectCenterSignUp =
    (body, setUsingErrMessage, navigateBack) => async (dispatch) => {
        try {
            const { data } = await api.post('sign-up', body);
            alert('회원가입에 성공하였습니다 \n관리자 승인 후 이용가능합니다');
            navigateBack();
        } catch (err) {
            console.log('err', err?.response);
            let msg = '서버와 통신에 실패하였습니다.';
            const { data } = err?.response;

            if (!data?.ok && data?.msg) {
                msg = data?.msg;
                setUsingErrMessage(data.msg);
            }
            alert(msg);
            // alert(msg);
        }
    };


export const updateProfile = (token) => async (dispatch) => {
    try {
        const { data } = await api.get('profile', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token,
            },
        });

        api.defaults.headers.common['Authorization'] = `Token ${token}`;
    

        console.log('유저 프로필 get', data);
        dispatch(UpdateUserProfile(data));
    } catch (e) {
        dispatch(LOGOUT());
        console.log('프로필 get 로그아웃  err', e);
        // errMsg(e);
    }
};
export const selectUser = (state) => state.user;
export default userSlice.reducer;
