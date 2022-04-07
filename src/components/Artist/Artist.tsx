import React from 'react';
import {IArtist} from '../../interfaces/artist';
import styles from './Artist.module.scss';

interface Props {
    data: IArtist;
    key: string;
}

const Artist = ({ data }: Props) => {
    const { url, name, imageUrl } = data;

    const openUrl = () => {
        window.open(url,'_blank');
    }

    return (
        <div className={styles.artist}>
            {imageUrl && (<span onClick={openUrl} className={styles.artist__image} style={{ backgroundImage: `url(${imageUrl})` }}/>)}
            {!imageUrl && (<span onClick={openUrl} className={styles.artist__image} />)}
            <a className={styles.artist__name} href={url} target="_blank" rel="noreferrer">{name}</a>
        </div>
    )
}

export default Artist;
