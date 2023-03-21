import React from 'react';
import style from './Footer.module.scss';
import insta from '../../assets/insta_icon.png'
import face from '../../assets/face_icon.png';
import twitter from '../../assets/twiter_icon.png';


export const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.subContainer}>
                    <h3 className={style.subTittle}>About Us</h3>
                    <p className={style.aboutUs}>We take care of providing fun at your reach hand as well as detailed information on each video game released.
                        Do not miss yours!</p>
                </div>
                <div className={style.mediaContainer}>
                    <h3 className={style.subTittle}>Follow us</h3>
                    <a className={style.links} href="https://www.instagram.com/" target={'_blank'}>
                        <img className={style.icon} src={insta} alt="insta_icon" />
                        Instagram</a>
                    <a className={style.links} href="https://es-la.facebook.com/" target={'_blank'}>
                        <img className={style.icon} src={face} alt="facebook_icon" />
                        Facebook</a>
                    <a className={style.links} href="https://twitter.com/" target={'_blank'}>
                        <img className={style.icon} src={twitter} alt="twitter_icon" />
                        Twitter</a>
                </div>
            </div>
            <p className={style.lastComment}>Developed By Group 5 - Henry - All rights reserved</p>
        </footer>
    );
};