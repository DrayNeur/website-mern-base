import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Likes = () => {
    const [likes, setLikes] = useState();
    const [captcha, setCaptcha] = useState();

    const [responseData, setResponseData] = useState({ error: true, message: null });
    const like = () => {
        axios.post('/api/like', { "g-recaptcha-response": captcha }).then((res) => {
            setResponseData({ error: !res.data.success, message: res.data.data });
        });
    };
    useState(() => {
        axios.post('/api/getLikes', { "g-recaptcha-response": captcha }).then((res) => {
            setLikes(res.data.data);
        });
    }, []);
    return (
        <div>
            Likes {likes} 👍
            {
                responseData.error ? (
                    <>
                        <p>{responseData.message}</p>
                        <ReCAPTCHA sitekey="6Lf_urcZAAAAAKBQt_E50p48A568eVIUnSIs6SNK" onChange={setCaptcha} />
                        <button onClick={() => like()}>Like this !</button>
                    </>
                ) : (
                    <p>Sucess, you liked this content !</p>
                )
            }
        </div>
    );
};

export default Likes;